<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, reactive } from 'vue';
import keyring from '@/plugins/keyring';
import util from '@/plugins/util';
import store from '@/store';

const emit = defineEmits(['update:createStep', 'update']);
const words = reactive({ arr: [] as string[] });
const mnemonic = keyring.generateSeed();
console.log(mnemonic);
store.dispatch('handleActWords', mnemonic);
words.arr = mnemonic.split(' ');
const handleExport = (field: string) => {
  util.export(`${field}.txt`, mnemonic);
};
defineProps({
  createStep: {
    type: Number,
    default: () => 0
  }
});
const handleCreateStep = (num: number) => {
  emit('update', num);
};
</script>
<template>
  <h3 class="pb-20px text-title leading-normal text-center">
    {{ $t('login.backupMn') }}
  </h3>
  <div class="flex text-tinge pb-3 justify-between">
    <span>{{ $t('login.words') }}</span>
    <a class="text-blue" href="javascript:;" @click="handleExport('words')">
      {{ $t('login.export') }}
    </a>
  </div>
  <div class="flex justify-between flex-wrap bg-gray p-3 mb-20px">
    <span
      v-for="(item, index) in words.arr"
      :key="index"
      class="w-1/5 text-sm m-2 bg-white rounded-md text-center h-8 leading-8"
    >
      {{ item }}
    </span>
  </div>
  <div class="w-full">
    <el-button
      type="primary"
      class="w-full h-10 bg-btn text-white border-btn"
      @click="handleCreateStep(3)"
    >
      {{ $t('login.backups') }}
    </el-button>
  </div>
</template>
