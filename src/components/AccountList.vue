<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, reactive, PropType, toRefs, toRaw } from 'vue';
import {
  Check,
  Plus,
  Bottom,
  Delete,
  UploadFilled
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { TabsPaneContext } from 'element-plus';
import util from '@/plugins/util';
import DialogDefault from '@/components/DialogDefault.vue';
import keyring from '@/plugins/keyring';
import { handleI18n } from '@/plugins/i18n';
import { handleEscapeHtml } from '@/plugins/common';
import { currentType } from '@/plugins/dataType';

const router = useRouter();

const props = defineProps<{
  accountList: Array<currentType>;
  order: number;
}>();
console.log(props);
const { accountList } = toRefs(props);
const accountName = ref('');
const importName = ref('');
const importPrivate = ref('');
const fileName = ref('');
const fileData = ref('');
const isCreate = ref(false);
const isImport = ref(false);
const index = ref(0);
const order = ref(0);
const tabName = ref('privatekey');
const id = ref(0);
const handleLoginAccount = async (item: currentType) => {
  if (!item.status) {
    console.log(item);
    const boo = await util.loginSubmitOther(item as any);
    if (boo) {
      const routeValue = router.replace('/');
      // console.log(routeValue);
      routeValue
        .then(() => {
          window.location.reload();
        })
        .catch(() => {});
    }
  }
};
let arrWords: Array<currentType>;
const handleCreateAccount = () => {
  isCreate.value = true;
  arrWords = [];
  const arr = util.getCache('accountWords');
  if (arr && arr.length) {
    const len = arr.length - 1;
    index.value = (arr[len] as any).index + 1;
    arrWords = arr;
  }
  order.value = accountList.value.length;
  console.log(order.value);
};
let arrImport: Array<currentType>;
const handleImportAccount = () => {
  isImport.value = true;
  arrImport = [];
  const arr = util.getCache('accountImport');
  console.log(arr);
  if (arr && arr.length) {
    const len = arr.length - 1;
    id.value = (arr[len] as any).id + 1;
    arrImport = arr;
  }
  console.log(arrImport);
  order.value = accountList.value.length;
  console.log(accountList.value.length);
};
const handleDialogClose = (boo: boolean) => {
  isCreate.value = boo;
  isImport.value = boo;
};
const handleCreateConfirm = () => {
  const hasher = util.getCache('hasher');
  const { words } = util.getCache('words');
  const privateKey = keyring.generatePriavte(words, index.value);
  const getKeyring = keyring.getKeyring(hasher);
  const publicKey = getKeyring.generatePublicKey(privateKey);
  const keyId = getKeyring.publicToID(publicKey);
  console.log(keyId);
  const account = keyring.addressString(keyId);
  console.log(account);
  const createAccount: currentType = {
    privateKey,
    publicKey,
    account,
    keyId,
    status: false,
    name:
      handleEscapeHtml(accountName.value) ||
      `${handleI18n('nav.account')} ${order.value}`,
    type: false,
    index: index.value
  };
  console.log(createAccount);
  arrWords.push(createAccount);
  util.setCache('accountWords', arrWords);
  util.showLoading();
  ElMessage({
    message: handleI18n('nav.createSuccess'),
    grouping: true,
    type: 'success',
    onClose: () => {
      isCreate.value = false;
      accountName.value = '';
      util.closeLoading();
    }
  });
};
const handleCreateCancel = () => {
  isCreate.value = false;
};
const handleImportCancel = () => {
  isImport.value = false;
  fileName.value = '';
  fileData.value = '';
  tabName.value = 'privatekey';
  importPrivate.value = '';
};
const handleImportWallet = (privateKey: string) => {
  const hasher = util.getCache('hasher');
  const getKeyring = keyring.getKeyring(hasher);
  const publicKey = getKeyring.generatePublicKey(privateKey);
  console.log(getKeyring);
  console.log(publicKey);
  const keyId = getKeyring.publicToID(publicKey);
  console.log(keyId);
  const account = keyring.addressString(keyId);
  console.log(account);
  const importAccount: currentType = {
    id: id.value,
    privateKey,
    publicKey,
    account,
    keyId,
    status: false,
    name:
      handleEscapeHtml(importName.value) ||
      `${handleI18n('nav.account')} ${order.value}`,
    type: true
  };
  console.log(importAccount);
  arrImport.push(importAccount);
  util.setCache('accountImport', arrImport);
  // util.showLoading();
  ElMessage({
    message: handleI18n('nav.privateSuccess'),
    grouping: true,
    type: 'success',
    onClose: () => {
      handleImportCancel();
      util.closeLoading();
    }
  });
};
const handleImportConfirm = () => {
  if (tabName.value === 'privatekey') {
    const privateKey = importPrivate.value;
    if (!keyring.validatePrivateKey(privateKey)) {
      return ElMessage({
        message: handleI18n('nav.privateError'),
        grouping: true,
        type: 'warning'
      });
    }
    util.showLoading();
    handleImportWallet(privateKey);
  } else {
    if (fileName.value === '') {
      return ElMessage({
        message: handleI18n('login.uploadkeystore'),
        grouping: true,
        type: 'warning'
      });
    }
    ElMessageBox.prompt('', handleI18n('login.password'), {
      closeOnClickModal: false,
      customClass: 'form-box bg-basic-box   border-basic-box',
      confirmButtonClass: ' bg-btn text-white border-btn',
      cancelButtonClass: '  hover:text-blue',
      confirmButtonText: handleI18n('login.confirm'),
      cancelButtonText: handleI18n('login.cancel'),
      inputType: 'password',
      inputPlaceholder: handleI18n('login.inputkeystore'),
      inputValidator: (value: any) => {
        if (!value) {
          return handleI18n('login.inputkeystore');
        }
        return true;
      },
      inputErrorMessage: ''
    })
      .then(async ({ action, value }) => {
        if (action === 'confirm') {
          try {
            util.showLoading();
            console.log(fileData.value, value);
            const data = await keyring.importWallet(fileData.value, value);
            console.log(data);
            const { privateKey } = data;
            handleImportWallet(privateKey);
          } catch (error) {
            console.log(value);
            ElMessage({
              message: handleI18n('login.keystorepassword'),
              type: 'error'
            });
            util.closeLoading();
          }
        }
      })
      .catch(() => {});
  }
};

const handleSignOut = () => {
  util.showLoading();
  localStorage.removeItem('token');
  const routerValue = router.replace('/login');
  routerValue
    .then(() => {
      window.location.reload();
      util.closeLoading();
    })
    .catch(() => {});
};
const handleDeteleAccount = (obj: currentType) => {
  console.log(obj.privateKey);
  ElMessageBox.confirm(
    `<span class=" ">${handleI18n('nav.isDetele')}:${
      obj.name
    }<strong class="font-semibold">(${obj.account})</strong></span>`,
    handleI18n('nav.detele'),
    {
      closeOnClickModal: false,
      customClass: 'form-box bg-basic-box   border-basic-box',
      dangerouslyUseHTMLString: true,
      confirmButtonClass: ' bg-btn text-white border-btn',
      cancelButtonClass: '  hover:text-blue',
      confirmButtonText: handleI18n('login.confirm'),
      cancelButtonText: handleI18n('login.cancel'),
      type: 'warning',
      showCancelButton: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = 'Loading...';
          // eslint-disable-next-line no-unused-vars
          const accountWords = util.getCache('accountWords');
          // eslint-disable-next-line no-unused-vars
          const accountImport = util.getCache('accountImport');
          console.log(accountImport);
          setTimeout(() => {
            done();
            setTimeout(() => {
              instance.confirmButtonLoading = false;
            }, 300);
            if (util.isProperty(obj, 'index')) {
              const i = accountWords.findIndex(
                (item: currentType) => item.index === obj.index
              );
              console.log(i);
              accountWords.splice(i, 1);
              console.log(accountWords);
              if (accountWords.length) {
                util.setCache('accountWords', accountWords);
              } else {
                util.removeCache('accountWords');
              }
            }
            if (util.isProperty(obj, 'id')) {
              const i = accountImport.findIndex(
                (item: currentType) => item.id === obj.id
              );
              console.log(i);
              accountImport.splice(i, 1);
              console.log(accountImport);
              if (accountImport.length) {
                util.setCache('accountImport', accountImport);
              } else {
                util.removeCache('accountImport');
              }
            }
          }, 1000);
        } else {
          done();
        }
      }
    }
  ).then(() => {
    ElMessage({
      type: 'success',
      message: `${handleI18n('nav.deleted')}`
    });
  });
};
const handleTabsImport = (tab: TabsPaneContext) => {
  console.log(tab);
  const { props } = tab;
  if (props.name === 'keystore') {
    fileName.value = '';
    fileData.value = '';
  }
  importPrivate.value = '';
};
const handleBeforeUpload = (file: File) => {
  console.log(file);
  const reader = new FileReader();
  reader.onload = () => {
    try {
      if (typeof reader.result === 'string') {
        const data = JSON.parse(reader.result);
        console.log(data);
        if (typeof data === 'object') {
          fileName.value = file.name;
          fileData.value = reader.result;
        }
      }
    } catch (error) {
      ElMessage({
        message: handleI18n('set.keystorerror'),
        type: 'error'
      });
    }
  };
  reader.readAsBinaryString(file);
};
const handleUploadRequest = () => {};
</script>
<template>
  <el-scrollbar style="height: 200px">
    <div class="p-20px">
      <div
        v-for="(item, i) in accountList"
        :key="i"
        class="h-6 flex items-center cursor-pointer mb-2"
        @click.stop="handleLoginAccount(item)"
      >
        <div class="flex-shrink-0 flex items-center w-1/2">
          <div class="w-8">
            <el-icon v-if="item.status" :size="20" color="#04b78a">
              <Check />
            </el-icon>
          </div>
          <span class="font-medium truncate w-full text-xs" :title="item.name">
            {{ item.name }}
          </span>
        </div>
        <div v-if="item.type" class="ml-auto">
          <span
            class="text-small border rounded-xl border-solid border-basic px-1 py-0.5 bg-basic text-xs"
          >
            {{ $t('nav.type') }}
          </span>
        </div>
        <template v-if="!item.status">
          <div
            v-if="item.index !== 0"
            class="ml-auto"
            @click.stop="handleDeteleAccount(item)"
          >
            <el-icon><Delete /></el-icon>
          </div>
        </template>
      </div>
    </div>
  </el-scrollbar>
  <div class="flex justify-center mb-5">
    <el-button
      class="w-2/3 h-8 rounded-xl hover: bg-btn hover:border-btn hover:text-white focus: bg-btn focus:border-btn focus:text-white"
      @click="handleCreateAccount"
    >
      <el-icon :size="20"><Plus /></el-icon>
      <span class="ml-2">{{ $t('nav.create') }}</span>
    </el-button>
  </div>
  <div class="flex justify-center mb-5">
    <el-button
      class="w-2/3 h-8 rounded-xl hover: bg-btn hover:border-btn hover:text-white focus: bg-btn focus:border-btn focus:text-white"
      @click="handleImportAccount"
    >
      <el-icon :size="20"><Bottom /></el-icon>
      <span class="ml-2">{{ $t('nav.import') }}</span>
    </el-button>
  </div>
  <div class="flex justify-center mb-5">
    <el-button
      class="w-2/3 h-8 rounded-xl hover: bg-btn hover:border-btn hover:text-white focus: bg-btn focus:border-btn focus:text-white"
      @click="handleSignOut"
    >
      <i class="iconfont el-ui-333"></i>
      <span class="ml-2">{{ $t('login.out') }}</span>
    </el-button>
  </div>
  <!-- create Account -->
  <dialog-default
    :title="$t('nav.create')"
    :is-dialog="isCreate"
    @close="handleDialogClose"
    @confirm="handleCreateConfirm"
    @cancel="handleCreateCancel"
  >
    <template #default>
      <div class="form-box">
        <div class="mb-3">{{ $t('nav.name') }}</div>
        <el-input
          v-model="accountName"
          :placeholder="`${$t('nav.account')} ${order}`"
          clearable
        />
      </div>
    </template>
  </dialog-default>
  <dialog-default
    :title="$t('nav.import')"
    :is-dialog="isImport"
    @close="handleDialogClose"
    @confirm="handleImportConfirm"
    @cancel="handleImportCancel"
  >
    <template #default>
      <div class="form-box">
        <el-alert type="info" :closable="false" show-icon class="mb-3">
          <template #title>
            <span class="text-xs">{{ $t('nav.privateInfo') }}</span>
          </template>
        </el-alert>
        <el-tabs v-model="tabName" @tab-click="handleTabsImport">
          <el-tab-pane :label="$t('nav.private')" name="privatekey">
            <div class="mb-3">
              <div class="mb-2">{{ $t('nav.name') }}</div>
              <el-input
                v-model="importName"
                :placeholder="`${$t('nav.account')} ${order}`"
                clearable
              />
            </div>
            <div class="mb-3">
              <div class="mb-2">{{ $t('nav.private') }}</div>
              <el-input
                v-model="importPrivate"
                :placeholder="$t('nav.private')"
                clearable
              />
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('nav.keystroe')" name="keystore">
            <div class="mb-3">
              <div class="mb-2">{{ $t('nav.name') }}</div>
              <el-input
                v-model="importName"
                :placeholder="`${$t('nav.account')} ${order}`"
                clearable
              />
            </div>
            <div class="upload-keystroe mb-3">
              <el-upload
                drag
                action="#"
                :http-request="(handleUploadRequest as any)"
                :show-file-list="false"
                :before-upload="handleBeforeUpload"
              >
                <template v-if="fileName">
                  <div class="p-20px">{{ fileName }}</div>
                </template>
                <template v-else>
                  <el-icon class="el-icon--upload" :size="20">
                    <upload-filled />
                  </el-icon>
                  <div class="text-xs">
                    {{ $t('set.keystore') }}
                  </div>
                </template>
              </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </dialog-default>
</template>
