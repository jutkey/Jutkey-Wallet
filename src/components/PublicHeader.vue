<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import {
  ref,
  reactive,
  computed,
  onBeforeUnmount,
  inject,
  unref,
  onMounted
} from 'vue';
import { Fold, Expand, ArrowDown, ArrowUp } from '@element-plus/icons-vue';
import { ClickOutside as vClickOutside } from 'element-plus';
import store from '@/store';
import { handleUpdateTime, handleWalletserver } from '@/plugins/common';
import i18n from '@/plugins/i18n';
import AccountList from './AccountList.vue';
import util from '@/plugins/util';
import { ecosystemParam } from '@/plugins/dataType';
import http from '@/plugins/http';

const url = handleWalletserver();
const avatar = ref('');
const firstEco = reactive({ obj: {} }) as any;
const current = util.getCache('current');
const reload = inject('reload') as Function;
const fisrtEcosystem = {
  wallet: current.account,
  page: 1,
  limit: 1,
  search: 'ecosystem = 1'
};
const handleFisrtEcosystem = async (params: ecosystemParam) => {
  const res = await http.post('/ecosystem_key_totals', params, 'walletserver');
  console.log(res);
  if (res.code === 0) {
    const [obj] = res.data.rets;
    firstEco.obj = obj;
    avatar.value = `${url}/api/v1/get_attachment/${
      obj.memberImageHash
    }?x=${new Date().getTime()}`;

    console.log(avatar.value);
  }
};
handleFisrtEcosystem(fisrtEcosystem);
interface itemFace {
  value: string;
  label: string;
}
type langArray = [
  {
    value: string;
    label: string;
  }
];
// eslint-disable-next-line no-unused-vars
const isPopover = ref(true);
const isArrow = ref(true);
const AccountPopover = ref();
const objLang = inject('objLang') as langArray;
const strLang = ref('English');
const theme = ref('dark');
const lang = ref('en');
const order = ref(0);
interface dateType {
  date: string;
  time: string;
}
const data: dateType = {
  date: '',
  time: ''
};
interface currentType {
  id?: number;
  privateKey: string;
  publicKey: string;
  account: string;
  keyId: string;
  status: boolean;
  name: string;
  type: boolean;
  index?: number;
}
console.log(localStorage.getItem('lang'));
if (localStorage.getItem('lang')) {
  lang.value = localStorage.getItem('lang') as string;
}
console.log(lang.value);
const objDate = reactive({ data });
let timer: ReturnType<typeof setTimeout>;
const isCollapse = computed({
  get() {
    return store.getters.postCollapse;
  },
  set(val) {
    return !val;
  }
});
const handletoggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  store.dispatch('handleActCollapse', !isCollapse.value);
};
onMounted(() => {
  const handleGetTime = () => {
    const date = new Date();
    objDate.data = handleUpdateTime(date);
    timer = setTimeout(() => {
      handleGetTime();
    }, 1000); //
    // console.log(timer);
  };
  handleGetTime();
});

onBeforeUnmount(() => {
  clearTimeout(timer);
});
theme.value = localStorage.getItem('theme') || 'dark';
console.log(theme.value);
if (localStorage.theme === 'light') {
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
} else {
  document.documentElement.classList.add('dark');
  document.documentElement.classList.remove('light');
}
const handleChangeTheme = (str: string) => {
  console.log(theme);
  const val = localStorage.getItem('theme');
  store.dispatch('handleActTheme', str);
  if (val !== str) {
    console.log(theme);
    theme.value = str;
    document.documentElement.classList.add(str);
    if (str === 'dark') {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', str);
    reload();
  }
};
const handleLangShow = (val: string) => {
  console.log(val);
  const obj = objLang.find((item) => {
    return item.value === val;
  }) as itemFace;
  console.log(obj);
  i18n.global.locale.value = val as any;
  strLang.value = obj.label;
};
if (lang.value) {
  console.log(lang.value);
  handleLangShow(lang.value);
}
const handleCommandLang = (val: any) => {
  const oldLang = localStorage.getItem('lang');
  if (oldLang !== val) {
    console.log(val);
    localStorage.setItem('lang', val);
    lang.value = val;
    handleLangShow(val);
    window.location.reload();
    // reload();
  }
};
const handlePopover = () => {
  unref(AccountPopover).popperRef?.delayHide?.();
};
let arrAccount: Array<currentType> = [];
const arrList = reactive({ arrAccount });
const handleShowPopover = () => {
  isArrow.value = false;
  arrList.arrAccount = [];
  let accountWords: Array<currentType> = [];
  let accountImport: Array<currentType> = [];
  arrAccount = [];
  accountWords = util.getCache('accountWords');
  accountImport = util.getCache('accountImport');
  console.log(accountImport);
  arrAccount = accountWords ? [...arrAccount, ...accountWords] : arrAccount;
  arrAccount = accountImport ? [...arrAccount, ...accountImport] : arrAccount;
  console.log(arrAccount);
  arrList.arrAccount = arrAccount;
  console.log(arrList);
  order.value = arrAccount.length;
};
const handleHidePopover = () => {
  isArrow.value = true;
};
</script>
<template>
  <div class="h-header flex items-center justify-between">
    <div class="flex items-center flex-shrink-0">
      <div class="cursor-pointer" @click="handletoggleCollapse">
        <el-icon v-if="isCollapse" :size="25">
          <Expand />
        </el-icon>
        <el-icon v-else :size="25">
          <Fold />
        </el-icon>
      </div>
      <div v-if="objDate.data" class="ml-20px text-sm">
        <div>{{ objDate.data.time }}(UTC)</div>
        <div>{{ objDate.data.date }}</div>
      </div>
      <i
        class="iconfont el-ui-Group20 text-icon mx-5 cursor-pointer"
        :class="{ 'text-blue': theme === 'light' }"
        @click="handleChangeTheme('light')"
      ></i>
      <i
        class="iconfont el-ui-moon text-icon mx-5 cursor-pointer"
        :class="{ 'text-blue': theme === 'dark' }"
        @click="handleChangeTheme('dark')"
      ></i>
    </div>
    <div class="flex items-center flex-shrink-0">
      <!-- i18n change -->
      <el-dropdown @command="handleCommandLang">
        <span class="ml-2 text-xs xl:text-base lg:text-sm">
          {{ strLang }}
          <el-icon class="el-icon--right" :size="20">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, index) in objLang"
              :key="index"
              :command="item.value"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div
        v-popover="AccountPopover"
        v-click-outside="handlePopover"
        class="flex ml-20px cursor-pointer items-center"
      >
        <img
          v-if="firstEco.obj.memberImageHash"
          :src="avatar"
          alt="profile"
          class="w-8 rounded-full"
        />

        <img
          v-else
          src="@/assets/image/profile.png"
          alt="profile"
          class="w-8 rounded-full"
        />
        <el-icon v-show="isArrow" class="el-icon--right" :size="20">
          <arrow-down />
        </el-icon>
        <el-icon v-show="!isArrow" class="el-icon--right" :size="20">
          <arrow-up />
        </el-icon>
        <el-popover
          ref="AccountPopover"
          trigger="click"
          :title="$t('nav.info')"
          virtual-triggering
          persistent
          width="250px"
          popper-class="bg-basic-box"
          @show="handleShowPopover"
          @hide="handleHidePopover"
        >
          <account-list
            :account-list="arrList.arrAccount"
            :order="order"
          ></account-list>
        </el-popover>
      </div>
    </div>
  </div>
</template>
