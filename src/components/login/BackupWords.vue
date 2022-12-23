<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import store from '@/store';
import util from '@/plugins/util';
import keyring from '@/plugins/keyring';
import { handleI18n } from '@/plugins/i18n';

const emit = defineEmits(['update:createStep', 'update']);
defineProps({
  createStep: {
    type: Number,
    default: () => 0
  }
});
interface objSel {
  [propName: string]: {
    index: string;
    value: string;
  };
}
const handleUserWords = (num: number) => {
  console.log(num);
  emit('update', num);
};
const words = store.getters.postWords;
console.log(words);
const arrWords = words.split(' ');
const arrRandom: Array<string> = util.shuffle(arrWords);
console.log(arrRandom);
const selected: any = {};
const random: any = {};
for (let i = 0; i < arrWords.length; i += 1) {
  selected[`${i}`] = '';
  random[`${i}`] = arrRandom[i];
}
const checkWords = reactive({ selected, random });
// eslint-disable-next-line no-unused-vars
const handlePickWords = (index: number) => {
  const word = checkWords.random[index];
  if (word) {
    // eslint-disable-next-line no-restricted-syntax
    for (const i in checkWords.selected) {
      if (!checkWords.selected[i] || !checkWords.selected[i].value) {
        checkWords.selected[i] = {
          index,
          value: word
        };
        break;
      }
    }
  }
  checkWords.random[index] = '';
};
const handleRemoveWord = (index: number) => {
  if (checkWords.selected[index] && checkWords.selected[index].value) {
    const current = checkWords.selected[index];
    checkWords.random[current.index] = current.value;
    checkWords.selected[index] = {};
  }
};
const handleSelectWords = () => {
  const objSelect: objSel = checkWords.selected;
  // eslint-disable-next-line no-unused-vars
  const arrSelect: string[] = [];
  Object.keys(objSelect).forEach((k: string) => {
    const value = objSelect[k].value ? objSelect[k].value : '';
    console.log(value);
    arrSelect[Number(k)] = value;
  });
  console.log(words);
  const strSelect = arrSelect.join(' ');
  console.log(strSelect);
  if (strSelect === words && keyring.verifyWords(strSelect)) {
    emit('update', 4);
    ElMessage({
      showClose: true,
      message: handleI18n('login.wordSuccess'),
      type: 'success'
    });
    store.dispatch('handleActWords', strSelect);
  } else {
    ElMessage({
      showClose: true,
      message: handleI18n('login.wrong'),
      type: 'warning'
    });
  }
};
</script>
<template>
  <!--   <h3 class="pb-20px text-center text-title leading-normal">
    {{ $t('login.info') }}
  </h3> -->
  <div class="pb-20px">{{ $t('login.test') }}</div>
  <div class="flex justify-between flex-wrap bg-gray p-3 mb-3">
    <span
      v-for="(item, index) in checkWords.selected"
      :key="index"
      class="w-1/5 text-sm m-1.5 bg-white rounded-md text-center cursor-pointer h-8 leading-8"
      @click="handleRemoveWord(index)"
    >
      {{ item.value }}
    </span>
  </div>
  <div class="flex justify-between flex-wrap bg-gray p-3 mb-3">
    <span
      v-for="(item, index) in checkWords.random"
      :key="index"
      class="w-1/5 text-sm m-2 bg-white rounded-md text-center cursor-pointer h-8 leading-8"
      @click="handlePickWords(index)"
    >
      {{ item }}
    </span>
  </div>
  <div class="w-full flex justify-between">
    <el-button
      class="w-1/3 h-10 text-center text-sm rounded border border-btn hover:bg-btn hover:text-white hover:border-btn focus:bg-btn focus:border-btn"
      @click="handleUserWords(2)"
    >
      {{ $t('login.previous') }}
    </el-button>
    <el-button
      type="primary"
      class="w-1/3 h-10 bg-btn text-white border-btn"
      @click="handleSelectWords"
    >
      {{ $t('login.affirm') }}
    </el-button>
  </div>
</template>
