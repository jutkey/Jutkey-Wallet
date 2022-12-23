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
const isPassword = ref(false);
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
    callback(new Error(handleI18n('login.sureinput')));
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
const handlePasswords = () => {
  if (!isPassword.value) {
    util.checkTradepass(() => {
      isPassword.value = !isPassword.value;
    });
  } else {
    isPassword.value = !isPassword.value;
  }
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
      customClass: 'form-box bg-basic-box   border-basic-box',
      confirmButtonClass: ' bg-btn text-white border-btn',
      cancelButtonClass: '  hover:text-blue',
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
  <div class="bg-basic-box rounded p-20px">
    <h2 class="mb-5 text-first">{{ $t('set.wallet') }}</h2>
    <h4 class="mb-5 text-first flex items-center">
      <span>{{ $t('set.change') }}</span>
      <i
        class="iconfont text-2xl ml-3 cursor-pointer font-normal"
        :class="{
          'text-blue el-ui-yanjing-': isPassword,
          'text-ashy el-ui-biyanjing': !isPassword
        }"
        @click="handlePasswords"
      ></i>
    </h4>
    <!-- change password -->
    <div v-show="isPassword" class="mb-5 w-1/3 form-box">
      <div class="text-xs mb-3">{{ $t('set.password') }}</div>
      <el-form
        ref="passwordFormRef"
        :model="passwordData"
        label-position="top"
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
              class="text-center text-sm rounded text-light-blue border border-light-blue mx-3 hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue"
              @click="handleResetForm(passwordFormRef)"
            >
              {{ $t('login.cancel') }}
            </el-button>
            <el-button
              type="primary"
              class="text-center text-sm rounded bg-btn text-white border-btn mx-3"
              @click="handlePasswordSubmit(passwordFormRef)"
            >
              {{ $t('login.confirm') }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <h4 class="mb-3 text-first">{{ $t('set.account') }}</h4>
    <!-- check privateKey and import keystore -->
    <div class="mb-3 w-1/3">
      <div class="flex items-center mb-1">
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
      <div class="text-xs mb-3">{{ $t('set.text') }}</div>
      <el-alert v-show="isShow" type="success" :closable="false" class="mb-3">
        <template #default>
          <div class="flex items-center py-3">
            <span class="mr-3 flex-auto break-all">
              {{ current.privateKey }}
            </span>
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
          class="bg-btn text-white border-btn"
          @click="handleImportKeystore"
        >
          {{ $t('set.importKeystore') }}
        </el-button>
      </div>
    </div>
    <!-- check words and import words -->
    <div class="mb-3 w-1/3">
      <div class="flex items-center mb-1">
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
      <div class="text-xs mb-3">{{ $t('set.csv') }}</div>
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
          class="bg-btn text-white border-btn"
          @click="handleImportWords"
        >
          {{ $t('set.importwords') }}
        </el-button>
      </div>
    </div>
  </div>
</template>
