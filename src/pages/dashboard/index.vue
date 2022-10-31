<script setup lang="ts">
import { ref, reactive, inject, onMounted, onBeforeUnmount } from 'vue';
import util from '@/plugins/util';
import { axiosType, ecosystemParam, getListResponse } from '@/plugins/dataType';
import socket from '@/plugins/webSocket';
import NftChart from '@/components/home/NftChart.vue';
import MounthAsset from '@/components/home/MounthAsset.vue';

const { account } = util.getCache('current');
const panel = reactive({ statistics: {}, nft: {} }) as any;
const axios = inject('axios') as axiosType;
const handlePanleData = (data: any) => {
  // console.log(JSON.stringify(data));
  panel.statistics = data.info;
};
const handleInit = async () => {
  const res = await axios.get('statistics', {}, 'walletserver');
  if (res.code === 0) {
    panel.statistics = res.data;
    socket.handleGetSocket(handlePanleData, 'dashboard');
  }
};

const handleNft = async () => {
  const params = {
    wallet: account
  };
  const res = await axios.post(
    'user_nft_miner_summary',
    params,
    'walletserver'
  );
  if (res.code === 0) {
    panel.nft = res.data;
  }
};
handleInit();
handleNft();
const current = util.getCache('current');
const ecosystemScroll = ref(null);
// eslint-disable-next-line no-unused-vars
const heightBox = ref(0);
const paramsEcosystem = {
  wallet: current.account,
  page: 1,
  limit: 6
};
const ecosystem = reactive({
  list: [],
  pageNum: {
    page: 1,
    total: 1,
    limit: 6
  }
}) as getListResponse;
let ecoststemList: any = [];
const handleOtherEcosystem = async (params: ecosystemParam) => {
  const res = await axios.post('/ecosystem_key_totals', params, 'walletserver');
  console.log(res);
  if (res.code === 0) {
    const { rets } = res.data;
    ecosystem.pageNum.page = res.data.page;
    ecosystem.pageNum.limit = res.data.limit;
    ecosystem.pageNum.total = res.data.total;
    if (rets) {
      ecoststemList = [...ecoststemList, ...rets];
      const arrReduce = util.handleReduce(ecoststemList);
      ecosystem.list = arrReduce;
    }
  } else {
    ecosystem.list = [];
  }
};
handleOtherEcosystem(paramsEcosystem);
onMounted(() => {
  const { offsetHeight } = document.getElementById('ecosystemRef')!;
  console.log(offsetHeight);
  heightBox.value = offsetHeight;
});
const handleDaoScroll = ({ scrollTop }: any) => {
  const dom = ecosystemScroll.value as any;
  const { scrollHeight } = dom;
  if (scrollTop + 400 >= scrollHeight) {
    paramsEcosystem.page += 1;
    const totalHistory = ecosystem.pageNum.total;
    const { page } = paramsEcosystem;
    const { limit } = paramsEcosystem;
    const num = Math.ceil(totalHistory / limit);
    if (num >= page) {
      console.log(paramsEcosystem.page);
      handleOtherEcosystem(paramsEcosystem);
    }
  }
};
onBeforeUnmount(() => {
  socket.handleDisconnect('dashboard');
});
</script>
<template>
  <div class="w-full">
    <div class="flex justify-between mb-20px">
      <div class="p-20px bg-basic-box w-19 text-center rounded-lg shadow-xl">
        <div class="mb-2">
          <img
            src="@/assets/image/dash-1.png"
            alt="dash-1"
            class="m-auto w-12 h-12"
          />
        </div>
        <el-tooltip
          effect="dark"
          :content="`${util.formatFixed(panel.statistics.circulations)} ${$t(
            'page.symbol'
          )}`"
          placement="bottom"
        >
          <div class="mb-2 w-full truncate text-first">
            {{ util.formatFixed(panel.statistics.circulations) }}
            <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
          </div>
        </el-tooltip>
        <div>{{ $t('home.liquidity') }}</div>
      </div>
      <div class="p-20px bg-basic-box w-19 text-center rounded-lg shadow-xl">
        <div class="mb-2">
          <img
            src="@/assets/image/dash-2.png"
            alt="dash-2"
            class="m-auto w-12 h-12"
          />
        </div>
        <el-tooltip
          effect="dark"
          :content="`${panel.statistics.blockId}`"
          placement="bottom"
        >
          <div class="mb-2 w-full truncate text-first">
            {{ panel.statistics.blockId }}
          </div>
        </el-tooltip>
        <div>{{ $t('home.blockheight') }}</div>
      </div>
      <div class="p-20px bg-basic-box w-19 text-center rounded-lg shadow-xl">
        <div class="mb-2">
          <img
            src="@/assets/image/dash-3.png"
            alt="dash-3"
            class="m-auto w-12 h-12"
          />
        </div>
        <el-tooltip
          effect="dark"
          :content="`${util.format(panel.statistics.ecosystemCount)}`"
          placement="bottom"
        >
          <div class="mb-2 w-full truncate text-first">
            {{ util.format(panel.statistics.ecosystemCount) }}
          </div>
        </el-tooltip>
        <div>{{ $t('home.ecological') }}</div>
      </div>
      <div class="p-20px bg-basic-box w-19 text-center rounded-lg shadow-xl">
        <div class="mb-2">
          <img
            src="@/assets/image/dash-4.png"
            alt="dash-4"
            class="m-auto w-12 h-12"
          />
        </div>
        <el-tooltip
          effect="dark"
          :content="`${util.format(panel.statistics.nftMinerCount)}`"
          placement="bottom"
        >
          <div class="mb-2 w-full truncate text-first">
            {{ util.format(panel.statistics.nftMinerCount) }}
          </div>
        </el-tooltip>
        <div>{{ $t('home.mmcount') }}</div>
      </div>
      <div class="p-20px bg-basic-box w-19 text-center rounded-lg shadow-xl">
        <div class="mb-2">
          <img
            src="@/assets/image/dash-5.png"
            alt="dash-5"
            class="m-auto w-12 h-12"
          />
        </div>
        <el-tooltip
          effect="dark"
          :content="`${util.formatFixed(panel.statistics.nftMinerStaking)} ${$t(
            'page.symbol'
          )}`"
          placement="bottom"
        >
          <div class="mb-2 w-full truncate text-first">
            <span>
              {{ util.formatFixed(panel.statistics.nftMinerStaking) }}
            </span>
            <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
          </div>
        </el-tooltip>
        <div>{{ $t('home.minecount') }}</div>
      </div>
    </div>
    <div class="w-full flex justify-between mb-20px">
      <div
        id="ecosystemRef"
        ref="ecosystemRef"
        class="w-49 bg-basic-box rounded-lg pb-4 shadow-xl"
      >
        <el-scrollbar :max-height="heightBox" @scroll="handleDaoScroll">
          <template v-if="ecosystem.list.length">
            <div ref="ecosystemScroll" class="p-20px">
              <div
                v-for="item in ecosystem.list"
                :key="item.id"
                class="flex justify-between mb-2"
                :class="{
                  'border-b border-basic pb-3 mb-6': item.id === 1
                }"
              >
                <div class="">{{ item.name }}</div>
                <div class="text-first">
                  <span>{{ util.formatFixed(item.amount) }}</span>
                  <span class="ml-1 text-xs">{{ item.tokenSymbol }}</span>
                </div>
              </div>
            </div>
          </template>
          <div
            v-else
            class="w-full bg-basic-box rounded-3xl flex justify-center items-center"
            :style="{ height: `${heightBox}px` }"
          >
            <img src="@/assets/image/no-data.png" alt="no-data" class="w-40" />
          </div>
        </el-scrollbar>
      </div>
      <div class="w-49 p-20px bg-basic-box rounded-lg shadow-xl">
        <h4 class="font-semibold mb-3 text-muted">{{ $t('home.survey') }}</h4>
        <div class="w-full flex justify-between">
          <div class="flex-1 text-center">
            <div class="mb-2">{{ $t('home.nft') }}</div>
            <el-tooltip
              effect="dark"
              :content="`${util.format(panel.nft.nftMinerCount)} ${$t(
                'home.stand'
              )}`"
              placement="bottom"
            >
              <div class="mb-2 w-full truncate text-first">
                <span>{{ util.format(panel.nft.nftMinerCount) }}</span>
                <span class="ml-1 text-xs">{{ $t('home.stand') }}</span>
              </div>
            </el-tooltip>
          </div>
          <div class="flex-1 text-center">
            <div class="mb-2">{{ $t('home.stake') }}</div>
            <el-tooltip
              effect="dark"
              :content="`${util.formatFixed(panel.nft.stakeAmount)} ${$t(
                'page.symbol'
              )}`"
              placement="bottom"
            >
              <div class="mb-2 w-full truncate text-first">
                <span>{{ util.formatFixed(panel.nft.stakeAmount) }}</span>
                <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
              </div>
            </el-tooltip>
          </div>
          <div class="flex-1 text-center">
            <div class="mb-2">{{ $t('home.power') }}</div>
            <el-tooltip
              effect="dark"
              :content="`${util.format(panel.nft.energyPower)}`"
              placement="bottom"
            >
              <div class="mb-2 w-full truncate text-first">
                <span>{{ util.format(panel.nft.energyPower) }}</span>
              </div>
            </el-tooltip>
          </div>
          <div class="flex-1 text-center">
            <div class="mb-2">{{ $t('home.excavated') }}</div>
            <el-tooltip
              effect="dark"
              :content="`${util.formatFixed(panel.nft.nftMinerIns)} ${$t(
                'page.symbol'
              )}`"
              placement="bottom"
            >
              <div class="mb-2 w-full truncate text-first">
                <span>{{ util.formatFixed(panel.nft.nftMinerIns) }}</span>
                <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-between mb-20px">
      <div class="w-49 p-20px bg-basic-box rounded-lg shadow-xl">
        <mounth-asset :account="account"></mounth-asset>
      </div>
      <div class="w-49 p-20px bg-basic-box rounded-lg shadow-xl">
        <nft-chart :account="account"></nft-chart>
      </div>
    </div>
  </div>
</template>
