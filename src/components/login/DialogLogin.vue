<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
import { handleI18n } from '@/plugins/i18n';
import util from '@/plugins/util';
import { networkLogin } from '@/plugins/dataType';

let arrName: string[] = [];
let arrIp: string[] = [];
let networks: networkLogin[] = [];
const handleCheck = () => {
  networks = util.getCache('networks');
  console.log(networks);
  if (networks) {
    arrName = networks.map((item: any) => {
      return item.name;
    });
    arrIp = networks.map((item: any) => {
      return item.ip;
    });
  }
  return { arrName, arrIp };
};

const addNetworkLoading = ref(false);
const networkForm = reactive({
  name: '',
  ip: ''
});
const validateName = (rule: any, value: any, callback: any) => {
  const { arrName } = handleCheck();
  if (value === '') {
    callback(new Error(handleI18n('nav.networkName')));
  } else if (arrName.find((item) => value === item)) {
    callback(new Error(handleI18n('nav.networkSave')));
  } else {
    callback();
  }
};
const validateIp = (rule: any, value: any, callback: any) => {
  const { arrIp } = handleCheck();
  if (value === '') {
    callback(new Error(handleI18n('nav.nodeAddress')));
  } else if (arrIp.find((item) => value === item)) {
    callback(new Error(handleI18n('nav.nodeSave')));
  } else {
    callback();
  }
};
const networkRules = reactive({
  // username: [{ validator: validateUsername, trigger: 'change' }],
  name: [
    {
      required: true,
      validator: validateName,
      trigger: 'blur'
    }
  ],
  ip: [
    {
      required: true,
      validator: validateIp,
      trigger: 'blur'
    },
    {
      type: 'url',
      message: handleI18n('nav.domain'),
      trigger: 'blur'
    }
  ]
}) as any;
const newworkRef = ref<FormInstance>();
const emit = defineEmits([
  'update:isDialog',
  'update:innerVisible',
  'close',
  'innerclose',
  'confirm',
  'cancel',
  'add'
]);
const props = defineProps({
  width: {
    type: String,
    default: () => '50%'
  },
  title: {
    type: String,
    default: () => ''
  },
  isDialog: {
    type: Boolean,
    default: () => false
  },
  isFooter: {
    type: Boolean,
    default: () => false
  },
  innerVisible: {
    type: Boolean,
    default: () => false
  }
});
const isDialog = computed({
  get() {
    return props.isDialog;
  },
  set(val) {
    emit('update:isDialog', val);
  }
});
const innerVisible = computed({
  get() {
    return props.innerVisible;
  },
  set(val) {
    emit('update:innerVisible', val);
  }
});
const handleClose = () => {
  emit('close', false);
};
const handleDialogConfirm = () => {
  emit('confirm');
};
const handleDialogCancel = () => {
  emit('cancel');
};
const handleCloseInner = () => {
  emit('innerclose', false);
  if (newworkRef.value) {
    newworkRef.value.resetFields();
  }
};
const handleSubmitInner = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const { name, ip } = networkForm;
      console.log(name, ip);
      emit('add', { name, ip });
      // formEl.resetFields();
    } else {
      console.log('error submit!', fields);
    }
  });
};
const handleRestInner = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  emit('innerclose', false);
  formEl.resetFields();
};
</script>
<template>
  <el-dialog
    v-model="isDialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :width="width"
    destroy-on-close
    center
    :append-to-body="true"
    :before-close="handleClose"
  >
    <template #header>
      <h3 class="font-semibold text-base">{{ title }}</h3>
    </template>
    <slot></slot>
    <el-dialog
      v-model="innerVisible"
      width="30%"
      :before-close="handleCloseInner"
      append-to-body
      @close="handleCloseInner"
    >
      <template #header>
        <h3 class="font-semibold text-base text-center">
          {{ $t('login.addNet') }}
        </h3>
      </template>
      <div class="network-content">
        <el-form
          ref="newworkRef"
          :model="networkForm"
          :rules="networkRules"
          class="wallet-form"
          label-position="top"
          @submit.prevent
        >
          <el-form-item :label="$t('nav.network')" prop="name">
            <el-input
              v-model="networkForm.name"
              :placeholder="$t('nav.networkName')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav.nodeip')" prop="ip">
            <el-input
              v-model="networkForm.ip"
              placeholder="https://"
            ></el-input>
          </el-form-item>
          <el-form-item class="text-center">
            <div class="w-full">
              <el-button
                class="text-center text-sm rounded border border-btn mx-3 hover:bg-btn hover:text-white hover:border-btn focus:bg-btn focus:border-btn"
                @click="handleRestInner(newworkRef)"
              >
                {{ $t('login.cancel') }}
              </el-button>
              <el-button
                v-loading.fullscreen.lock="addNetworkLoading"
                type="primary"
                class="bg-btn text-sm text-white border-none"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                @click="handleSubmitInner(newworkRef)"
              >
                {{ $t('login.confirm') }}
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <template v-if="isFooter" #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          class="text-center text-sm rounded bg-btn text-white border-btn mx-3"
          @click="handleDialogConfirm"
        >
          {{ $t('login.confirm') }}
        </el-button>
        <el-button
          class="text-center text-sm rounded border border-btn mx-3 hover:bg-btn hover:text-white hover:border-btn focus:bg-btn focus:border-btn"
          @click="handleDialogCancel"
        >
          {{ $t('login.cancel') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
