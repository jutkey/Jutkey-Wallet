<script setup lang="ts">
import { ref, reactive, inject } from 'vue';
import util from '@/plugins/util';
import { handleWalletserver } from '@/plugins/common';
import { ecosystemParam, axiosType, getListResponse } from '@/plugins/dataType';
import ImageNickname from '@/components/assets/ImageNickname.vue';
import lib from '@/plugins/lib';
import SelectList from '@/components/SelectList.vue';

const url = handleWalletserver();
const axios = inject('axios') as axiosType;
const reload = inject('reload') as Function;
const current = util.getCache('current');
const isImage = ref(false);
console.log(current);
const handleBalance = async () => {
  const res = await lib.getBalance(1);
  console.log(res);
};
handleBalance();
const firstEco = reactive({ obj: {} }) as any;
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

const handleDialogUpload = () => {
  isImage.value = true;
};
const handleChangePage = (page: number) => {
  console.log(page);
  paramsEcosystem.page = page;
  handleOtherEcosystem(paramsEcosystem);
};

// eslint-disable-next-line no-unused-vars
const handleActionUser = async () => {
  const res = await axios.get(`keyinfo/${current.keyId}`);
  console.log(res);
  // const assign = Object.assign({}, res, obj);
  //  console.log(assign);
  // commit('handleKeyInfo', assign);
};
handleActionUser();
const handleCancel = () => {
  isImage.value = false;
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
  isImage.value = false;
  reload();
};
</script>
<template>
  <div class="w-full">
    <div
      class="w-full flex bg-user-image bg-no-repeat bg-center bg-100% mb-8 rounded-3xl"
    >
      <div class="m-3% text-center">
        <div
          class="bg-white cursor-pointer rounded-full flex items-center justify-center w-24 h-24 mx-auto"
          @click="handleDialogUpload"
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
        <h3 v-else class="mt-20px" @click="handleDialogUpload">
          <span class="text-ashy italic">iName</span>
          <i class="iconfont el-ui-bianji text-xl cursor-pointer"></i>
        </h3>
        <div class="my-2">
          {{ firstEco.obj.account }}
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('user.copy')"
            placement="bottom"
          >
            <i
              class="iconfont el-ui-zu291 cursor-pointer text-xl"
              @click="util.copyText(firstEco.obj.account)"
            ></i>
          </el-tooltip>
        </div>
      </div>
      <div class="flex flex-auto p-20px">
        <div class="font-semibold text-xl">
          <span>{{ util.formatFixed(firstEco.obj.amount) }}</span>
          <span class="ml-1 text-sm">{{ firstEco.obj.tokenSymbol }}</span>
        </div>
        <div class="ml-auto w-36">
          <router-link
            v-if="firstEco.obj.id"
            :to="{
              name: 'Transfer',
              params: { id: firstEco.obj.id, account: firstEco.obj.account }
            }"
            class="block w-full h-10 leading-10 text-center text-sm rounded bg-blue text-white border-blue mb-3 ml-0"
          >
            {{ $t('user.trade') }}
          </router-link>
          <!--   <el-button
            type="primary"
            class="w-full h-10 text-sm bg-blue text-white border-blue mb-3 ml-0"
            @click="handleOpenTrade(firstEco.obj)"
          >
            {{ $t('user.trade') }}
          </el-button> -->
          <!--  <el-button
            type="primary"
            class="w-full h-10 block bg-blue text-sm text-white border-blue mb-3 ml-0"
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
            class="w-49 p-20px bg-basic-box rounded-2xl mb-20px"
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
                  <i
                    v-else
                    class="iconfont el-ui-a-Ecology1 text-basic text-xl"
                  ></i>
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
                  class="block w-full h-10 leading-10 text-center text-sm rounded bg-blue text-white border-blue mb-3 ml-0"
                >
                  {{ $t('user.trade') }}
                </router-link>
                <!--  <el-button
                    type="primary"
                    class="w-full h-10 text-sm bg-blue text-white border-blue mb-3 ml-0"
                    @click="handleOpenTrade(item)"
                  >
                    {{ $t('user.trade') }}
                  </el-button> -->
                <!--   <el-button
                    type="primary"
                    class="w-full h-10 bg-blue text-sm text-white border-blue mb-3 ml-0"
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
        <div class="w-full flex justify-center mb-20px">
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
    <image-nickname
      v-if="firstEco.obj.id"
      :eco-info="firstEco.obj"
      :is-image="isImage"
      @close="handleCancel"
      @confirm="handleConfirm"
    ></image-nickname>
  </div>
</template>
