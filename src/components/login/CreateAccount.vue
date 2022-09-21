<script setup lang="ts">
import { ref, reactive, inject } from 'vue';
import { handleI18n } from 'plugins/i18n';
import type { FormInstance } from 'element-plus';
import store from '@/store';
import util from '@/plugins/util';

const lang = inject('lang') as any;
console.log(lang);
const words = store.getters.postWords;
console.log(words);
const emit = defineEmits(['update:createStep', 'update']);
defineProps({
  createStep: {
    type: Number,
    default: () => 0
  }
});
const createData = reactive({
  // account: '',
  password: '',
  againPassword: ''
  // isAgree: true
});
const createFormRef = ref<FormInstance>();
/* const validateAccount = (rule: any, value: any, callback: any) => {
  console.log(value);
  if (value === '') {
    return callback(new Error(handleI18n('login.inputnickname')));
  }
  callback();
}; */
const validatePassword = (rule: any, value: any, callback: any) => {
  const reg = /^(.{0,7}|.{51,})$|^[^\d]*$|^[^a-zA-Z]*$|\s/;
  if (value === '') {
    callback(new Error(handleI18n('login.inputPassword')));
  } else if (reg.test(value)) {
    callback(new Error(handleI18n('login.verifyPassword')));
  } else {
    callback();
  }
};
const validateAgain = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(handleI18n('login.sureinput')));
  } else if (value !== createData.password) {
    callback(new Error(handleI18n('login.againNo')));
  } else {
    callback();
  }
};
/* const validateAgree = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(handleI18n('login.isAgree')));
  } else {
    callback();
  }
}; */
const createRules = reactive({
  // account: [{ validator: validateAccount, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  againPassword: [{ validator: validateAgain, trigger: 'blur' }]
  //  isAgree: [{ validator: validateAgree, trigger: 'change' }]
});
const handleCreateSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      localStorage.clear();
      const { password } = createData;
      const data = {
        words,
        password
      };
      localStorage.setItem('lang', lang.value);
      util.setCache('words', data);
      /*  util.removeCache('current');
      util.removeCache('accountWords');
      util.removeCache('accountImport');
      util.removeCache('hasher');
      localStorage.removeItem('token'); */
      emit('update', 0);
    } else {
      // emit('update', 2);
      return false;
    }
  });
};
const handleUserWords = (num: number) => {
  console.log(num);
  emit('update', num);
};
</script>
<template>
  <h3 class="text-title leading-normal text-center">
    {{ $t('login.setting') }}
  </h3>
  <el-form
    ref="createFormRef"
    :model="createData"
    label-position="top"
    status-icon
    :rules="createRules"
    label-width="100px"
    class="wallet-form"
  >
    <!-- <el-form-item prop="account" class="mb-5">
      <template #label>
        <span class="text-tinge">{{ $t('login.nickname') }}</span>
      </template>
      <el-input
        ref="securitydiscword"
        v-model="createData.account"
        class="placeholder-place"
        type="text"
        autocomplete="off"
        :placeholder="$t('login.inputnickname')"
        clearable
      />
    </el-form-item> -->
    <el-form-item prop="password" class="mb-5">
      <template #label>
        <span class="text-tinge">{{ $t('login.password') }}</span>
      </template>
      <el-input
        ref="securitydiscword"
        v-model="createData.password"
        class="placeholder-place"
        type="password"
        :show-password="true"
        autocomplete="off"
        :placeholder="$t('login.inputPassword')"
        clearable
      />
    </el-form-item>
    <el-form-item prop="againPassword" class="mb-5">
      <template #label>
        <span class="text-tinge">{{ $t('login.sure') }}</span>
      </template>
      <el-input
        ref="securitydiscword"
        v-model="createData.againPassword"
        class="placeholder-place"
        type="password"
        :show-password="true"
        autocomplete="off"
        :placeholder="$t('login.sureinput')"
        clearable
      />
    </el-form-item>
    <!--   <el-form-item prop="isAgree">
      <el-checkbox v-model="createData.isAgree">
        <span>{{ $t('login.already') }}</span>
      </el-checkbox>
      <span
        class="text-blue font-semibold cursor-pointer"
        @click.stop="handleShowAgree"
      >
        {{ $t('login.user') }}
      </span>
    </el-form-item> -->
    <el-form-item>
      <div class="w-full flex justify-between py-20px">
        <el-button
          type="primary"
          class="w-1/3 h-10 bg-blue text-white border-blue"
          @click="handleCreateSubmit(createFormRef)"
        >
          {{ $t('login.confirm') }}
        </el-button>
        <el-button class="w-1/3 h-10 text-base" @click="handleUserWords(0)">
          {{ $t('login.cancel') }}
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
