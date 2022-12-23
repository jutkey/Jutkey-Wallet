<script setup lang="ts">
import { ref, reactive, inject } from 'vue';
import { ElMessage } from 'element-plus';
import { handleI18n } from 'plugins/i18n';
import util from '@/plugins/util';
import contract from '@/plugins/lib';
import { handleWalletserver, handleBlockexplorer } from '@/plugins/common';
import { ecosystemParam, axiosType, getListResponse } from '@/plugins/dataType';
import NickName from '@/components/assets/NickName.vue';
import SelectList from '@/components/SelectList.vue';
import AvatarUpload from '@/components/assets/AvatarUpload.vue';
import store from '@/store';

const url = handleWalletserver();
const brower = handleBlockexplorer();
const axios = inject('axios') as axiosType;
const reload = inject('reload') as Function;
const current = util.getCache('current');
const isIname = ref(false);
const isAvatar = ref(false);
console.log(current);
const firstEco = reactive({ obj: {} }) as any;
const assgin = reactive({
  data: {
    balance: '0',
    amount: '0'
  }
}) as any;
const airdrop = reactive({
  data: {
    lock: '0',
    amount: '0'
  }
}) as any;
const avatar = ref('');
const fisrtEcosystem = {
  wallet: current.account,
  page: 1,
  limit: 1,
  search: 'ecosystem = 1'
};
const handleFisrtEcosystem = async (params: ecosystemParam) => {
  const res = await axios.post('/ecosystem_key_totals', params, 'walletserver');
  console.log(res);
  if (res.code === 0) {
    const [obj] = res.data.rets;
    firstEco.obj = obj;
    avatar.value = `${url}/api/v1/get_attachment/${
      obj.memberImageHash
    }?x=${new Date().getTime()}`;
    store.dispatch('handleActavatar', avatar.value);
    console.log(avatar.value);
  }
};
handleFisrtEcosystem(fisrtEcosystem);
const paramsEcosystem = {
  wallet: current.account,
  page: 1,
  limit: 6,
  search: 'ecosystem > 1'
};
const otherEco = reactive({
  list: [],
  pageNum: {
    page: 1,
    total: 1,
    limit: 6
  }
}) as getListResponse;
const handleOtherEcosystem = async (params: ecosystemParam) => {
  const res = await axios.post('/ecosystem_key_totals', params, 'walletserver');
  console.log(res);
  if (res.code === 0 && res.data.rets) {
    otherEco.list = res.data.rets;
    otherEco.pageNum.page = res.data.page;
    otherEco.pageNum.limit = res.data.limit;
    otherEco.pageNum.total = res.data.total;
  } else {
    otherEco.list = [];
  }
};
handleOtherEcosystem(paramsEcosystem);

// eslint-disable-next-line no-unused-vars
const handleDialogUpload = () => {
  isAvatar.value = true;
};
// eslint-disable-next-line no-unused-vars
const handleDialogIname = () => {
  isIname.value = true;
};
const handleChangePage = (page: number) => {
  console.log(page);
  paramsEcosystem.page = page;
  handleOtherEcosystem(paramsEcosystem);
};
const handleAssignBalance = async () => {
  const res = await axios.get(
    `assign_balance/${current.account}`,
    null,
    'walletserver'
  );
  if (res.code === 0) {
    console.log(res);
    assgin.data = res.data;
  }
};
handleAssignBalance();
const handleAirdropBalance = async () => {
  const res = await axios.get(
    `airdrop_balance/${current.account}`,
    null,
    'walletserver'
  );
  if (res.code === 0) {
    console.log(res);
    airdrop.data = res.data;
  }
};
handleAirdropBalance();
const handleCancel = () => {
  isIname.value = false;
  isAvatar.value = false;
};
const handleSelect = (val: number) => {
  console.log(val);
  if (val) {
    paramsEcosystem.search = `ecosystem = ${val}`;
  } else {
    paramsEcosystem.search = `ecosystem > 1`;
  }
  paramsEcosystem.page = 1;
  handleOtherEcosystem(paramsEcosystem);
};
const handleConfirm = () => {
  isIname.value = false;
  isAvatar.value = false;
  reload();
};
const handleReceive = () => {
  if (firstEco.obj.amount === '0') {
    ElMessage.error(handleI18n('eth.notenough'));
  } else {
    util.checkTradepass(() => {
      util.showLoading();
      const params = { contractName: 'GetAssignAmount' };
      contract.tokensSend(params, (res: any, status: string) => {
        if (status === 'error') {
          console.log(res);
          ElMessage.error(res.errmsg.error);
        } else if (status === 'loading') {
          ElMessage.success(handleI18n('user.chain'));
        } else if (status === 'success') {
          ElMessage.success(handleI18n('user.dosuccess'));
          reload();
        } else {
          ElMessage.error(res.msg);
        }
        util.closeLoading();
      });
    });
  }
};
const handleReceiveAirdrop = () => {
  if (firstEco.obj.amount === '0') {
    ElMessage.error(handleI18n('eth.notenough'));
  } else {
    util.checkTradepass(() => {
      util.showLoading();
      const params = { contractName: 'ClaimAirdrop' };
      contract.tokensSend(params, (res: any, status: string) => {
        if (status === 'error') {
          console.log(res);
          ElMessage.error(res.errmsg.error);
        } else if (status === 'loading') {
          ElMessage.success(handleI18n('user.chain'));
        } else if (status === 'success') {
          ElMessage.success(handleI18n('user.dosuccess'));
          reload();
        } else {
          ElMessage.error(res.msg);
        }
        util.closeLoading();
      });
    });
  }
};
</script>
<template>
  <div class="w-full">
    <div
      class="w-full flex bg-basic-box bg-no-repeat bg-center bg-100% mb-8 rounded-3xl shadow-xl p-20px"
    >
      <div class="m-3% text-center">
        <!--  <div
          class="bg-white cursor-pointer rounded-full flex items-center justify-center w-24 h-24 mx-auto"
          @click="handleDialogUpload"
        > -->
        <div
          class="bg-white rounded-full flex items-center justify-center w-24 h-24 mx-auto"
        >
          <img
            v-if="firstEco.obj.memberImageHash"
            :src="avatar"
            alt="profile"
            class="w-20 h-20 rounded-full"
          />
          <img
            v-else
            src="@/assets/image/profile.png"
            alt="profile"
            class="w-20 h-20 rounded-full"
          />
        </div>
        <h3 v-if="firstEco.obj.memberName" class="mt-20px text-muted">
          {{ firstEco.obj.memberName }}
        </h3>
        <!--  <div
          v-else
          class="mt-20px flex items-center justify-center text-first"
          @click="handleDialogIname"
        >
          <span class="italic mr-1">iName</span>
          <i class="iconfont el-ui-bianji text-xl cursor-pointer"></i>
        </div> -->
        <div v-else class="mt-20px flex items-center justify-center text-first">
          <span class="italic mr-1">iName</span>
          <!-- <i class="iconfont el-ui-bianji text-xl cursor-pointer"></i> -->
        </div>
        <div class="my-2 text-first">
          <a
            :href="`${brower}/blockchain/account/${firstEco.obj.account}`"
            target="_blank"
            class="hover:text-blue"
          >
            {{ firstEco.obj.account }}
          </a>
          <!--  {{ firstEco.obj.account }} -->
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('user.copy')"
            placement="bottom"
          >
            <i
              class="iconfont el-ui-zu291 cursor-pointer text-lg ml-1"
              @click="util.copyText(firstEco.obj.account)"
            ></i>
          </el-tooltip>
        </div>
      </div>
      <div class="flex flex-auto my-3% py-20px">
        <div class="font-semibold text-xl text- w-full">
          <div class="mb-1">
            <span>{{ util.formatFixed(firstEco.obj.amount) }}</span>
            <span class="ml-1 text-sm">{{ firstEco.obj.tokenSymbol }}</span>
          </div>
          <!-- airdrop -->
          <div v-if="airdrop.data" class="flex items-center text-sm">
            <div
              v-if="airdrop.data.lock !== '0'"
              class="flex items-center flex-1"
            >
              <span class="text-lg">
                {{ util.formatFixed(airdrop.data.lock) }}
              </span>
              <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
              <span class="ml-2 text-xs">({{ $t('home.airdroplock') }})</span>
              <router-link
                :to="{ name: 'AssetsAirdrop' }"
                class="ml-2 bg-btn text-white rounded px-4 py-2 text-xs leading-3 cursor-pointer"
              >
                {{ $t('home.speed') }}
              </router-link>
            </div>
            <div
              v-if="airdrop.data.amount !== '0'"
              class="flex items-center ml-5 flex-1"
            >
              <span class="text-lg">
                {{ util.formatFixed(airdrop.data.amount) }}
              </span>
              <span class="ml-1">{{ $t('page.symbol') }}</span>
              <span
                class="ml-2 bg-btn text-white rounded px-4 py-2 text-xs leading-3 cursor-pointer"
                @click="handleReceiveAirdrop"
              >
                {{ $t('home.airdropreceive') }}
              </span>
            </div>
          </div>
          <!-- distribution -->
          <div v-if="assgin.data" class="flex items-center text-sm">
            <div v-if="assgin.data.balance !== '0'" class="flex items-center">
              <span class="text-lg">
                {{ util.formatFixed(assgin.data.balance) }}
              </span>
              <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
              <span class="ml-2 text-xs">({{ $t('home.lock') }})</span>
            </div>
            <div
              v-if="assgin.data.amount !== '0'"
              class="flex items-center ml-5"
            >
              <span class="text-lg">
                {{ util.formatFixed(assgin.data.amount) }}
              </span>
              <span class="ml-1">{{ $t('page.symbol') }}</span>
              <span
                class="ml-2 bg-btn text-white rounded px-4 py-2 text-xs leading-3 cursor-pointer"
                @click="handleReceive"
              >
                {{ $t('home.receive') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-auto w-36">
        <router-link
          v-if="firstEco.obj.id"
          :to="{
            name: 'Transfer',
            params: { id: firstEco.obj.id, account: firstEco.obj.account }
          }"
          class="block w-full h-10 leading-10 text-center text-sm rounded bg-btn text-white border-btn mb-3 ml-0"
        >
          {{ $t('user.trade') }}
        </router-link>
        <!--   <el-button
            type="primary"
            class="w-full h-10 text-sm  bg-btn text-white border-btn mb-3 ml-0"
            @click="handleOpenTrade(firstEco.obj)"
          >
            {{ $t('user.trade') }}
          </el-button> -->
        <!--  <el-button
            type="primary"
            class="w-full h-10 block  bg-btn text-sm text-white border-btn mb-3 ml-0"
            @click="handleOpenTrade"
          >
            {{ $t('user.collection') }}
          </el-button> -->
        <router-link
          v-if="firstEco.obj.id"
          :to="{
            name: 'Record',
            params: { id: firstEco.obj.id, account: firstEco.obj.account }
          }"
          class="w-full block h-10 leading-10 text-center text-sm rounded text-light-blue border border-light-blue mb-3 ml-0 hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue"
        >
          {{ $t('user.record') }}
        </router-link>
      </div>
    </div>
    <div class="w-full">
      <div class="mb-5 select-box asset-select">
        <select-list
          :account="current.account"
          :text="$t('user.search')"
          @select="handleSelect"
        ></select-list>
      </div>
      <template v-if="otherEco.list.length">
        <div class="flex justify-between flex-wrap">
          <div
            v-for="item in otherEco.list"
            :key="item.id"
            class="w-49 p-20px bg-basic-box rounded-2xl mb-20px shadow-xl"
          >
            <h3 class="mb-20px text-muted">{{ item.name }}</h3>
            <div class="flex justify-between">
              <div>
                <div class="w-12 mb-3">
                  <img
                    v-if="item.logoHash"
                    :src="`${url}/api/v1/get_attachment/${item.logoHash}`"
                    alt="coin"
                  />
                  <i v-else class="iconfont el-ui-a-Ecology1 text-xl"></i>
                </div>
                <div class="font-semibold text-xl">
                  <span>{{ util.formatFixed(item.amount) }}</span>
                  <span class="ml-1 text-sm">{{ item.tokenSymbol }}</span>
                </div>
              </div>
              <div class="ml-auto w-32">
                <router-link
                  v-if="item.id"
                  :to="{
                    name: 'Transfer',
                    params: { id: item.id, account: item.account }
                  }"
                  class="block w-full h-10 leading-10 text-center text-sm rounded bg-btn text-white border-btn mb-3 ml-0"
                >
                  {{ $t('user.trade') }}
                </router-link>
                <!--  <el-button
                    type="primary"
                    class="w-full h-10 text-sm  bg-btn text-white border-btn mb-3 ml-0"
                    @click="handleOpenTrade(item)"
                  >
                    {{ $t('user.trade') }}
                  </el-button> -->
                <!--   <el-button
                    type="primary"
                    class="w-full h-10  bg-btn text-sm text-white border-btn mb-3 ml-0"
                    @click="handleOpenTrade"
                  >
                    {{ $t('user.collection') }}
                  </el-button> -->
                <router-link
                  v-if="item.id"
                  :to="{
                    name: 'Record',
                    params: { id: item.id, account: item.account }
                  }"
                  class="w-full block h-10 leading-10 text-center text-sm rounded text-light-blue border border-light-blue mb-3 ml-0 hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue"
                >
                  {{ $t('user.record') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center mb-20px page-wrap">
          <el-pagination
            small
            background
            hide-on-single-page
            layout="prev, pager, next"
            :pager-count="11"
            :current-page="Number(otherEco.pageNum.page)"
            :page-size="Number(otherEco.pageNum.limit)"
            :total="Number(otherEco.pageNum.total)"
            @current-change="handleChangePage"
          ></el-pagination>
        </div>
      </template>
      <div
        v-else
        class="w-full bg-basic-box rounded-3xl p-20 flex justify-center"
      >
        <img src="@/assets/image/no-data.png" alt="no-data" />
      </div>
    </div>
    <nick-name
      v-if="firstEco.obj.id"
      :eco-info="firstEco.obj"
      :is-iname="isIname"
      @close="handleCancel"
      @confirm="handleConfirm"
    ></nick-name>
    <avatar-upload
      v-if="firstEco.obj.id"
      :eco-info="firstEco.obj"
      :is-avatar="isAvatar"
      @close="handleCancel"
      @confirm="handleConfirm"
    ></avatar-upload>
  </div>
</template>
