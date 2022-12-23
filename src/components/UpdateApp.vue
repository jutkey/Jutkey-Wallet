<script setup lang="ts">
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/tauri';
import { installUpdate } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';
import { ElMessage } from 'element-plus';
import { listen } from '@tauri-apps/api/event';
import DialogDefault from './DialogDefault.vue';
import { handleI18n } from '@/plugins/i18n';

const emit = defineEmits(['update:isUpdate', 'close']);
defineProps({
  isUpdate: {
    type: Boolean,
    default: () => false
  },
  appInfo: {
    type: Object,
    default: () => {}
  }
});
listen('tauri://update-available', (res) => {
  console.log('New version available: ', res);
});
const isLoad = ref(false);
const handleClose = () => {
  invoke('close_tauri');
};
const handleConfirm = async () => {
  try {
    // display dialog
    emit('close');
    isLoad.value = true;
    await installUpdate();
    isLoad.value = false;
    // install complete, restart app
    await relaunch();
  } catch (error) {
    emit('close');
    isLoad.value = true;
    ElMessage.error(handleI18n('about.error'));
  }
};
</script>
<template>
  <dialog-default
    :is-dialog="isUpdate"
    :title="$t('about.update')"
    @cancel="handleClose"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <template #default>
      <div class="flex">
        <span>{{ $t('about.check') }}:</span>
        <span class="mr-1">{{ appInfo.info.body }}</span>
        <span>v{{ appInfo.info.version }}</span>
      </div>
    </template>
  </dialog-default>
  <el-dialog
    v-model="isLoad"
    class="dialog-load"
    width="30%"
    center
    align-center
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    destroy-on-close
    fullscreen
  >
    <div class="loadingThree">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </el-dialog>
</template>
