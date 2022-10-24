<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, reactive, inject } from 'vue';
import { ElMessage } from 'element-plus';
import {
  axiosType,
  nftParams,
  nftLocation,
  nftRewardList
} from '@/plugins/dataType';
import { handleI18n } from '@/plugins/i18n';
import util from '@/plugins/util';
import contract from '@/plugins/lib';
import { handleWalletserver, handleBlockexplorer } from '@/plugins/common';
import { handleSecond, handleSecondUTC } from '@/plugins/day';

const axios = inject('axios') as axiosType;
console.log(util.getCache('current'));
const nftMiner = reactive({
  list: [] as any,
  locator: {} as nftLocation,
  isCreate: false,
  info: {} as any,
  arr: [] as any,
  pageNum: {
    limit: 10,
    page: 1,
    total: 1
  }
});
const { account } = util.getCache('current');
console.log(account);
const nftInfo = {
  wallet: account
};
const handleNftMiner = async (params: nftParams) => {
  const res = await axios.post('/nft_miner_key_infos', params, 'walletserver');
  console.log(res);

  if (res.code === 0 && res.data) {
    nftMiner.isCreate = res.data.isCreate;
    console.log(res.data.rets);
    if (res.data.rets) {
      nftMiner.list = res.data.rets;
    }
  }
};
handleNftMiner(nftInfo);
const handleGetlocator = async () => {
  const res = await axios.get('/get_locator', {}, 'walletserver');
  console.log(res);
  if (res.code === 0) {
    nftMiner.locator = res.data;
  }
};
handleGetlocator();
const handleGetNFT = () => {
  const { continent, nation, latitude, longitude } = nftMiner.locator;
  const params = {
    contractName: 'ClaimNFTMiner',
    Location: continent,
    Nation: nation,
    Latitude: latitude,
    Longitude: longitude
  };
  util.checkTradepass(() => {
    util.showLoading();
    contract.tokensSend(params, (res: any, status: string) => {
      if (status === 'error') {
        console.log(res);
        ElMessage.error(res.errmsg.error);
      } else if (status === 'loading') {
        ElMessage.success(handleI18n('user.chain'));
      } else if (status === 'success') {
        ElMessage({
          type: 'success',
          message: handleI18n('user.dosuccess')
        });
        handleNftMiner(nftInfo);
      } else {
        ElMessage.error(res.msg);
      }
      util.closeLoading();
    });
  });
};
const handleNftInfo = async (params: nftParams) => {
  const res = await axios.post(
    'user_nft_miner_summary',
    params,
    'walletserver'
  );
  if (res.code === 0) {
    nftMiner.info = res.data;
  }
};
handleNftInfo(nftInfo);
const nftListParams = {
  page: 1,
  limit: 10,
  search: account
};
const handleNftMinerReward = async (params: nftRewardList) => {
  const res = await axios.post(
    '/nft_miner_reward_history',
    params,
    'walletserver'
  );
  if (res.code === 0 && res.data) {
    if (res.data.list) {
      nftMiner.arr = res.data.list;
      nftMiner.pageNum.page = res.data.page;
      nftMiner.pageNum.limit = res.data.limit;
      nftMiner.pageNum.total = res.data.total;
    }
  }
};
handleNftMinerReward(nftListParams);
const handleChangePage = (page: number) => {
  nftListParams.page = page;
  handleNftMinerReward(nftListParams);
};

const url = handleWalletserver();
const browser = handleBlockexplorer();
</script>
<template>
  <div class="w-full">
    <div v-if="nftMiner.list.length" class="w-full rounded mb-20px">
      <div v-if="!nftMiner.isCreate" class="w-full mb-20px">
        <el-button
          type="primary"
          class="text-center text-sm rounded bg-btn text-white border-btn"
          @click="handleGetNFT"
        >
          {{ $t('nft.get') }}
        </el-button>
      </div>
      <div class="flex justify-between flex-wrap">
        <router-link
          v-for="item in nftMiner.list"
          :key="item.id"
          :to="{ name: 'NFTDetails', params: { id: item.id } }"
          class="bg-basic-box p-20px rounded w-49 flex items-stretch justify-between text-sm mb-3 shadow-xl"
        >
          <div class="flex items-center">
            <span class="bg-success w-3 h-3 rounded-full"></span>
          </div>
          <div class="w-20 h-20">
            <img :src="`${url}/api/v1/nft_miner_file/${item.id}`" alt="" />
          </div>
          <div class="w-2/3 flex flex-wrap content-around">
            <div class="flex items-center justify-between w-full">
              <div class="w-49 flex items-center">
                <span class="mr-1">{{ $t('nft.power') }}:</span>
                <span>{{ util.format(item.energy_point) }}</span>
              </div>
              <div class="w-49 flex items-center">
                <span class="mr-1">{{ $t('node.cash') }}:</span>
                <span>{{ util.formatFixed(item.stake_amount) }}</span>
                <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between w-full">
              <div class="w-49 flex items-center">
                <span class="mr-1">NFT HASH:</span>
                <el-tooltip
                  effect="dark"
                  :content="`${item.token_hash}`"
                  placement="bottom"
                >
                  <span class="truncate w-49">{{ item.token_hash }}</span>
                </el-tooltip>
              </div>
              <div class="w-49 flex items-center">
                <span class="mr-1">{{ $t('nft.explosive') }}:</span>
                <span>{{ util.format(item.burst) }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <span class="mr-1">{{ $t('nft.value') }}:</span>
            <span>{{ util.format(item.energy_power) }}</span>
          </div>
        </router-link>
      </div>
    </div>
    <div
      v-if="!nftMiner.isCreate"
      class="w-full bg-basic-box p-15vh rounded mb-20px flex items-center justify-center shadow-xl"
    >
      <el-button
        type="primary"
        class="text-center text-sm rounded bg-btn text-white border-btn mx-3"
        @click="handleGetNFT"
      >
        {{ $t('nft.get') }}
      </el-button>
    </div>
    <div class="w-full p-20px bg-basic-box rounded-lg mb-20px shadow-xl">
      <div class="w-full flex justify-between">
        <div class="flex-1 text-center">
          <div class="mb-2">{{ $t('home.nft') }}</div>
          <el-tooltip
            effect="dark"
            :content="`${util.format(nftMiner.info.nftMinerCount)} ${$t(
              'home.stand'
            )}`"
            placement="bottom"
          >
            <div class="mb-2 font-semibold w-full truncate">
              <span>{{ util.format(nftMiner.info.nftMinerCount) }}</span>
              <span class="ml-1 text-xs">{{ $t('home.stand') }}</span>
            </div>
          </el-tooltip>
        </div>
        <div class="flex-1 text-center">
          <div class="mb-2">{{ $t('home.stake') }}</div>
          <el-tooltip
            effect="dark"
            :content="`${util.formatFixed(nftMiner.info.stakeAmount)} ${$t(
              'page.symbol'
            )}`"
            placement="bottom"
          >
            <div class="mb-2 font-semibold w-full truncate">
              <span>{{ util.formatFixed(nftMiner.info.stakeAmount) }}</span>
              <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
            </div>
          </el-tooltip>
        </div>
        <div class="flex-1 text-center">
          <div class="mb-2">{{ $t('home.power') }}</div>
          <el-tooltip
            effect="dark"
            :content="`${util.format(nftMiner.info.energyPower)}`"
            placement="bottom"
          >
            <div class="mb-2 font-semibold w-full truncate">
              <span>{{ util.format(nftMiner.info.energyPower) }}</span>
            </div>
          </el-tooltip>
        </div>
        <div class="flex-1 text-center">
          <div class="mb-2">{{ $t('nft.income') }}</div>
          <el-tooltip
            effect="dark"
            :content="`${util.formatFixed(nftMiner.info.nftMinerIns)} ${$t(
              'page.symbol'
            )}`"
            placement="bottom"
          >
            <div class="mb-2 font-semibold w-full truncate">
              <span>{{ util.formatFixed(nftMiner.info.nftMinerIns) }}</span>
              <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="bg-basic-box rounded p-20px">
      <div v-if="nftMiner.arr.length" class="table-box">
        <div class="mb-20px">
          <el-table :data="nftMiner.arr" stripe style="width: 100%">
            <el-table-column label="NFT HASH" show-overflow-tooltip>
              <template #default="scope">
                <a
                  :href="`${browser}/meta/${scope.row.token_hash}`"
                  target="_blank"
                  class="hover:text-blue"
                >
                  {{ scope.row.token_hash }}
                </a>
              </template>
            </el-table-column>
            <el-table-column :label="$t('nft.profit')" show-overflow-tooltip>
              <template #default="scope">
                <span>{{ util.formatFixed(scope.row.amount) }}</span>
                <span class="ml-1">{{ $t('page.symbol') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('nft.date')" show-overflow-tooltip>
              <template #default="scope">
                <el-tooltip
                  effect="dark"
                  :content="`${handleSecondUTC(scope.row.created_at)}`"
                  placement="bottom"
                >
                  <span>{{ handleSecond(scope.row.created_at) }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-box w-full flex justify-center mb-20px">
          <el-pagination
            small
            background
            hide-on-single-page
            layout="prev, pager, next"
            :current-page="Number(nftMiner.pageNum.page)"
            :page-size="Number(nftMiner.pageNum.limit)"
            :total="Number(nftMiner.pageNum.total)"
            @current-change="handleChangePage"
          ></el-pagination>
        </div>
      </div>
      <div
        v-else
        class="w-full bg-basic-box rounded-3xl p-20 flex justify-center"
      >
        <img src="@/assets/image/no-data.png" alt="no-data" />
      </div>
    </div>
  </div>
</template>
