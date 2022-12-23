<script setup lang="ts">
import { ref, reactive, inject, provide, markRaw } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Delete, ArrowDown } from '@element-plus/icons-vue';
import i18n, { handleI18n } from '@/plugins/i18n';
import SignLogin from '@/components/login/SignLogin.vue';
import DialogLogin from '@/components/login/DialogLogin.vue';
import CreateAccount from '@/components/login/CreateAccount.vue';
import CreateWords from '@/components/login/CreateWords.vue';
import UserAgreement from '@/components/login/UserAgreement.vue';
import BackupWords from '@/components/login/BackupWords.vue';
import AddNetwork from '@/components/login/AddNetwork.vue';
import defaultUrl from '@/plugins/url/defaultUrl';
import util from '@/plugins/util';
import { networkLogin, arrNetwork } from '@/plugins/dataType';
import axios from '@/plugins/http/node';

const createType = ref('create');
const createStep = ref(0);
const strLang = ref('English');
const lang = reactive({ value: 'en' });
const networks = reactive({
  isDialog: false,
  status: false,
  innerVisible: false
});
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
const currtentList: networkLogin[] = util.getCache('networks')
  ? [...defaultUrl, ...util.getCache('networks')]
  : defaultUrl;
util.setCache('networks', util.handleReduce(currtentList));
const networkList: arrNetwork = reactive({
  list: util.handleReduce(currtentList)
});

// const networks = reactive();
const objLang = inject('objLang') as langArray;

console.log(axios);

const handleTest = async (item: any, i: number) => {
  try {
    const startTime = new Date().getTime();
    const res = await axios.get(`${item.ip}/api/v2/getuid`);
    const endTime = new Date().getTime();
    if (res.token) {
      networkList.list[i].onLine = true;
      networkList.list[i].speed = `${endTime - startTime} ms`;
      networkList.list[i].uid = res.uid;
      networkList.list[i].networkId = Number(res.network_id);
    } else {
      networkList.list[i].onLine = false;
      networkList.list[i].speed = `0 ms`;
      networkList.list[i].uid = '';
      networkList.list[i].networkId = 0;
    }
    if (networkList.list[i].onLine) {
      //  console.log(util.getCache('networkIp'));
      // console.log(networkList.list[i].networkId);
      const networkIp = util.getCache('networkIp');
      // console.log(networkIp);
      if (networkIp) {
        if (networkIp.ip === networkList.list[i].ip) {
          networkList.list[i].status = true;
          networks.status = true;
        } else {
          networkList.list[i].status = false;
        }
      } else if (i === 0) {
        networkList.list[i].status = true;
        networks.status = true;
        util.setCache('networkIp', networkList.list[i]);
      } else {
        networkList.list[i].status = false;
      }
    }
  } catch (error) {
    console.log(error);
    networkList.list[i].onLine = false;
    networkList.list[i].speed = `error`;
    networkList.list[i].uid = '';
    networkList.list[i].networkId = 0;
  }
  if (i === networkList.list.length - 1) {
    util.setCache('networks', util.handleReduce(networkList.list));
  }
};
const handleNetworkConnect = async () => {
  for (let index = 0; index < networkList.list.length; index += 1) {
    const item = networkList.list[index];
    console.log(index);
    handleTest(item, index);
  }
};
handleNetworkConnect();

// console.log(JSON.stringify(objLang));
const handleBackstep = () => {
  if (createStep.value > 0) {
    createStep.value -= 1;
  } else {
    createStep.value = 0;
  }
};
if (localStorage.getItem('lang')) {
  lang.value = localStorage.getItem('lang') as string;
}

provide('lang', lang);
const handleLangShow = (val: string) => {
  const obj = objLang.find((item) => {
    return item.value === val;
  }) as itemFace;
  strLang.value = obj.label;
};
if (lang.value) {
  handleLangShow(lang.value);
}

const handleCommandLang = (val: any) => {
  const oldLang = localStorage.getItem('lang');
  if (oldLang !== val) {
    console.log(val);
    i18n.global.locale.value = val;
    localStorage.setItem('lang', val);
    lang.value = val;
    handleLangShow(val);
    provide('lang', lang);
    window.location.reload();
    // reload();
  }
};
const handleDialogClose = () => {
  networks.isDialog = false;
};
const handleUpdateStep = (num: number) => {
  console.log(num);
  createStep.value = num;
};
const handleOpenInner = () => {
  networks.innerVisible = true;
};
const handleCloseInner = () => {
  networks.innerVisible = false;
};
const handleAddNetwork = async (row: any) => {
  console.log(row.ip);
  const startTime = new Date().getTime();
  util.showLoading();
  try {
    const res = await axios.get(`${row.ip}/api/v2/getuid`);
    if (res.token) {
      console.log(res);
      const endTime = new Date().getTime();
      const list = util.getCache('networks');
      console.log(list);
      const id = list[list.length - 1].id + 1;
      const obj = {
        id,
        name: row.name,
        ip: row.ip,
        uid: res.uid,
        networkId: Number(res.network_id),
        isAdd: true,
        speed: `${endTime - startTime} ms`,
        status: false,
        onLine: true
      };
      list.push(obj);
      networkList.list = util.handleReduce(list);
      console.log(networkList.list);
      util.setCache('networks', util.handleReduce(list));
      networks.innerVisible = false;
    } else {
      ElMessage.error(handleI18n('login.networkerror'));
    }
    util.closeLoading();
  } catch (error) {
    console.log(error);
    ElMessage.error(handleI18n('login.networkerror'));
    util.closeLoading();
  }
};
const handleConnectInner = async (row: networkLogin) => {
  util.setCache('networkIp', row);
  console.log(row);
  for (let index = 0; index < networkList.list.length; index += 1) {
    const item = networkList.list[index];
    item.status = false;
    if (row.ip === item.ip) {
      handleTest(row, index);
      item.status = true;
    }
  }
  util.setCache('networks', util.handleReduce(networkList.list));
};
const handleDeteleInner = (obj: networkLogin) => {
  const currtentList = util.getCache('networks');
  console.log(currtentList);
  if (currtentList && currtentList.length) {
    ElMessageBox.confirm(
      handleI18n('login.deleting'),
      handleI18n('user.tips'),
      {
        type: 'warning',
        icon: markRaw(Delete),
        customClass: 'network-box',
        cancelButtonText: handleI18n('login.cancel'),
        confirmButtonText: handleI18n('login.confirm'),
        confirmButtonClass: ' bg-btn text-white border-btn force',
        cancelButtonClass:
          'text-title text-center text-sm rounded border border-btn mx-3 hover:bg-btn hover:text-white hover:border-btn focus:bg-btn focus:border-btn',
        center: true
      }
    )
      .then(() => {
        const list = currtentList.filter((item: any) => {
          return item.ip !== obj.ip;
        });
        networkList.list = util.handleReduce(list);
        console.log(networkList.list);
        util.setCache('networks', util.handleReduce(networkList.list));
        handleNetworkConnect();
      })
      .catch(() => {});
  }
};
</script>
<template>
  <div class="flex h-full bg-white text-base">
    <div
      class="flex flex-wrap content-between w-2/5 bg-no-repeat bg-center bg-black text-white pt-5% px-5% pb-3%"
    >
      <div class="w-full">
        <h1
          class="text-white leading-tight mb-5 font-bebas login-h1 uppercase md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
        >
          {{ $t('login.keys') }}
        </h1>
        <p
          class="italic text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-xl"
        >
          {{ $t('login.more') }}
        </p>
      </div>
      <div class="flex justify-center items-center w-full">
        <div class="text-center">
          <img
            src="@/assets/image/logo-128.png"
            alt="logo"
            class="w-24 md:w-24 lg:w-28 xl:w-32 2xl:w-36"
          />
          <p
            class="mt-2 text-2xl login-h1 font-bebas md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
          >
            JUTKEY
          </p>
        </div>
      </div>
      <p class="w-full text-sm">
        {{ $t('login.by') }}
      </p>
    </div>
    <div class="w-3/5 flex flex-wrap content-between">
      <div class="flex mt-3 items-center w-full">
        <div v-show="createStep > 0" class="ml-20px">
          <el-page-header
            :title="$t('login.back')"
            :content="
              $t('login.' + (createType == 'create' ? 'create' : 'import'))
            "
            @back="handleBackstep"
          ></el-page-header>
        </div>
        <div class="flex items-center ml-auto mr-20px">
          <div
            class="flex items-center cursor-pointer"
            @click="networks.isDialog = true"
          >
            <span
              class="inline-block w-2 h-2 rounded-full mr-1 text-xs xl:text-base lg:text-sm"
              :class="{
                'bg-success': networks.status,
                'bg-error': !networks.status
              }"
            ></span>
            <span>
              {{ networks.status ? $t('login.online') : $t('login.offline') }}
            </span>
          </div>
          <!-- i18n change -->
          <el-dropdown @command="handleCommandLang">
            <span class="ml-2 text-xs xl:text-base lg:text-sm">
              {{ strLang }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
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
        </div>
      </div>
      <div class="w-3/5 xl:w-3/5 lg:w-10/12 mx-auto">
        <template v-if="createStep === 0">
          <sign-login
            :create-step="createStep"
            @update="handleUpdateStep"
          ></sign-login>
        </template>
        <template v-if="createStep === 1">
          <user-agreement
            :create-step="createStep"
            @update="handleUpdateStep"
          ></user-agreement>
        </template>
        <template v-if="createStep === 2">
          <create-words
            :create-step="createStep"
            @update="handleUpdateStep"
          ></create-words>
        </template>
        <template v-if="createStep === 3">
          <backup-words
            :create-step="createStep"
            @update="handleUpdateStep"
          ></backup-words>
        </template>
        <template v-if="createStep === 4">
          <create-account
            :create-step="createStep"
            @update="handleUpdateStep"
          ></create-account>
        </template>
      </div>
      <div class="w-full text-right pb-3% pr-3%">2022 © JUTKEY TEAM</div>
    </div>
    <!-- Add network -->
    <dialog-login
      :title="$t('login.network')"
      :is-dialog="networks.isDialog"
      :inner-visible="networks.innerVisible"
      @close="handleDialogClose"
      @innerclose="handleCloseInner"
      @add="handleAddNetwork"
    >
      <template #default>
        <add-network
          :network-list="networkList.list"
          @open="handleOpenInner"
          @detele="handleDeteleInner"
          @connact="handleConnectInner"
        ></add-network>
      </template>
    </dialog-login>
  </div>
</template>
