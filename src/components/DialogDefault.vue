<script lang="ts" setup>
// eslint-disable-next-line no-unused-vars
import { ref, computed } from 'vue';

const emit = defineEmits(['update:isDialog', 'close', 'confirm', 'cancel']);
const props = defineProps({
  title: {
    type: String,
    default: () => ''
  },
  isDialog: {
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
const handleClose = () => {
  emit('close', false);
};
const handleDialogConfirm = () => {
  emit('confirm');
};
const handleDialogCancel = () => {
  emit('cancel');
};
</script>
<template>
  <el-dialog
    v-model="isDialog"
    class="bg-basic-box"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="40%"
    destroy-on-close
    center
    :append-to-body="true"
    :before-close="handleClose"
  >
    <template #header>
      <h3 class="font-semibold text-first">{{ title }}</h3>
    </template>
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          class="text-center text-sm rounded text-light-blue border border-light-blue mx-3 hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue"
          @click="handleDialogCancel"
        >
          {{ $t('login.cancel') }}
        </el-button>
        <el-button
          type="primary"
          class="text-center text-sm rounded bg-btn text-white border-btn mx-3"
          @click="handleDialogConfirm"
        >
          {{ $t('login.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
