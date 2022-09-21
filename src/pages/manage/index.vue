<script setup lang="ts">
import { ref, reactive } from 'vue';
import { saveAs } from 'file-saver';
import type { FormInstance } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import keyring from '@/plugins/keyring';
import util from '@/plugins/util';
import { handleI18n } from '@/plugins/i18n';

const passwordFormRef = ref<FormInstance>();
const words = util.getCache('words');
console.log(words);
const isShow = ref(false);
const isWord = ref(false);
const passwordData = reactive({
  password: '',
  newPassword: '',
  surePassword: ''
});
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(handleI18n('login.inputPassword')));
  } else if (value !== words.password) {
    callback(new Error(handleI18n('login.errorpass')));
  } else {
    callback();
  }
};
const validateNewPassword = (rule: any, value: any, callback: any) => {
  const reg = /^(.{0,7}|.{51,})$|^[^\d]*$|^[^a-zA-Z]*$|\s/;
  if (value === '') {
    callback(new Error(handleI18n('set.newPasswordError')));
  } else if (reg.test(value)) {
    callback(new Error(handleI18n('login.verifyPassword')));
  } else {
    callback();
  }
};
const validateAgain = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(handleI18n('set.newPasswordError')));
  } else if (value !== passwordData.newPassword) {
    callback(new Error(handleI18n('login.againNo')));
  } else {
    callback();
  }
};
const passwordRules = reactive({
  password: [{ validator: validatePassword, trigger: 'blur', required: true }],
  newPassword: [
    { validator: validateNewPassword, trigger: 'blur', required: true }
  ],
  surePassword: [{ validator: validateAgain, trigger: 'blur', required: true }]
});
const current = util.getCache('current');
const handlePasswordSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      words.password = passwordData.surePassword;
      util.setCache('words', words);
      ElMessage({
        type: 'success',
        message: handleI18n('set.successPassword'),
        onClose: () => {
          formEl.resetFields();
        }
      });
    } else {
      return false;
    }
  });
};
const handleResetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const handleWords = () => {
  if (!isWord.value) {
    util.checkTradepass(() => {
      isWord.value = !isWord.value;
    });
  } else {
    isWord.value = !isWord.value;
  }
};
const handleShow = () => {
  if (!isShow.value) {
    util.checkTradepass(() => {
      isShow.value = !isShow.value;
    });
  } else {
    isShow.value = !isShow.value;
  }
};
const handleImportWords = () => {
  util.checkTradepass(() => {
    const filename = `words.csv`;
    const blob = new Blob([words.words], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
  });
};
const handleImportKeystore = () => {
  util.checkTradepass(async () => {
    ElMessageBox.prompt('', handleI18n('set.keystorepassword'), {
      closeOnClickModal: false,
      customClass: 'form-box bg-basic-box text-basic border-basic-box',
      confirmButtonClass: 'bg-blue text-white border-blue',
      cancelButtonClass: 'text-basic hover:text-blue',
      confirmButtonText: handleI18n('login.confirm'),
      cancelButtonText: handleI18n('login.cancel'),
      inputType: 'password',
      inputPlaceholder: handleI18n('login.inputkeystore'),
      inputValidator: (value: any) => {
        const reg = /^(.{0,7}|.{51,})$|^[^\d]*$|^[^a-zA-Z]*$|\s/;
        if (!value) {
          return handleI18n('login.inputkeystore');
        }
        if (reg.test(value)) {
          return handleI18n('login.verifyPassword');
        }
        return true;
      },
      inputErrorMessage: ''
    })
      .then(async ({ action, value }) => {
        if (action === 'confirm') {
          try {
            util.showLoading();
            const res = await keyring.exportWallet(current.privateKey, value);
            console.log(res);
            const filename = `keystore.json`;
            util.closeLoading();
            const blob = new Blob([res.keyStore], {
              type: 'text/plain;charset=utf-8'
            });
            saveAs(blob, filename);
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
  });
};
</script>
<template>
  <div class="bg-basic-box rounded text-basic p-20px">
    <h4 class="mb-5">{{ $t('set.change') }}</h4>
    <!-- change password -->
    <div class="mb-3 w-1/3 form-box">
      <el-form
        ref="passwordFormRef"
        :model="passwordData"
        label-position="top"
        status-icon
        :rules="passwordRules"
        label-width="100px"
        class="wallet-form"
        @submit.prevent
      >
        <el-form-item prop="password" class="mb-5" label="">
          <el-input
            v-model="passwordData.password"
            type="password"
            show-password
            :placeholder="$t('set.currentPassword')"
          />
        </el-form-item>
        <el-form-item prop="newPassword" class="mb-5" label="">
          <el-input
            v-model="passwordData.newPassword"
            type="password"
            show-password
            :placeholder="$t('set.newPassword')"
          />
        </el-form-item>
        <el-form-item prop="surePassword" class="mb-5" label="">
          <el-input
            v-model="passwordData.surePassword"
            type="password"
            show-password
            :placeholder="$t('set.surePassword')"
          />
        </el-form-item>
        <el-form-item>
          <div class="w-full flex justify-center">
            <el-button
              type="primary"
              class="bg-blue text-white border-blue"
              @click="handlePasswordSubmit(passwordFormRef)"
            >
              {{ $t('login.confirm') }}
            </el-button>
            <el-button
              class="text-base"
              @click="handleResetForm(passwordFormRef)"
            >
              {{ $t('login.cancel') }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <h4 class="mb-5">{{ $t('set.account') }}</h4>
    <!-- check words and import words -->
    <div class="mb-3 w-1/3">
      <div class="flex items-center mb-3">
        <span>{{ $t('set.words') }}</span>
        <i
          class="iconfont text-2xl ml-3 cursor-pointer"
          :class="{
            'text-blue el-ui-yanjing-': isWord,
            'text-ashy el-ui-biyanjing': !isWord
          }"
          @click="handleWords"
        ></i>
      </div>
      <el-alert v-show="isWord" type="success" :closable="false" class="mb-3">
        <template #default>
          <div class="flex items-center py-3">
            <span class="mr-3">{{ words.words }}</span>
            <i
              class="iconfont el-ui-zu291 cursor-pointer text-lg"
              @click="util.copyText(words.words)"
            ></i>
          </div>
        </template>
      </el-alert>
      <div class="">
        <el-button
          type="primary"
          class="bg-blue text-white border-blue"
          @click="handleImportWords"
        >
          {{ $t('set.importwords') }}
        </el-button>
      </div>
    </div>
    <!-- check privateKey and import keystore -->
    <div class="mb-3 w-1/3">
      <div class="flex items-center mb-3">
        <span>{{ $t('set.check') }}</span>
        <i
          class="iconfont text-2xl ml-3 cursor-pointer"
          :class="{
            'text-blue el-ui-yanjing-': isShow,
            'text-ashy el-ui-biyanjing': !isShow
          }"
          @click="handleShow"
        ></i>
      </div>
      <el-alert v-show="isShow" type="success" :closable="false" class="mb-3">
        <template #default>
          <div class="flex items-center py-3">
            <span class="mr-3">{{ current.privateKey }}</span>
            <i
              class="iconfont el-ui-zu291 cursor-pointer text-lg"
              @click="util.copyText(current.privateKey)"
            ></i>
          </div>
        </template>
      </el-alert>
      <div class="">
        <el-button
          type="primary"
          class="bg-blue text-white border-blue"
          @click="handleImportKeystore"
        >
          {{ $t('set.importKeystore') }}
        </el-button>
      </div>
    </div>
  </div>
</template>
