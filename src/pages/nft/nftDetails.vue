<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, reactive, inject, watch, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import { handleI18n } from '@/plugins/i18n';
import util from '@/plugins/util';
import contract from '@/plugins/lib';
import {
  axiosType,
  nftReward,
  honorDeatils,
  nftlist
} from '@/plugins/dataType';
import { handleSecond, handleSecondUTC } from '@/plugins/day';
import NftCash from '@/components/nft/NftCash.vue';
import NftOut from '@/components/nft/NftOut.vue';
import { handleBlockexplorer, handleWalletserver } from '@/plugins/common';

const reload = inject('reload') as Function;
const route = useRoute();
const axios = inject('axios') as axiosType;
const { account } = util.getCache('current');
const isCash = ref(false);
const isOut = ref(false);
const dialogNft = ref(false);
const nftId = ref(0) as Ref<number>;
const nftData = reactive({
  info: {} as any,
  record: [] as any,
  recordPage: {
    total: 1,
    page: 1,
    limit: 5
  },
  mining: [] as any,
  miningPage: {
    total: 1,
    page: 1,
    limit: 10
  }
});

const nftInfo = {
  wallet: account,
  search: 0
};
const handleNftMiner = async (params: honorDeatils) => {
  const res = await axios.post('/nft_miner_detail', params, 'walletserver');
  console.log(res);
  nftData.info = res.data;
};
const recordParams = {
  search: 0,
  page: 1,
  limit: 5,
  wallet: account
};
const handleNftRecord = async (params: nftReward) => {
  const res = await axios.post('/nft_miner_staking', params, 'walletserver');
  console.log(res);
  if (res.code === 0) {
    nftData.record = res.data.list;
    nftData.recordPage.limit = res.data.limit;
    nftData.recordPage.page = res.data.page;
    nftData.recordPage.total = res.data.total;
  }
};
const miningParams = {
  search: 0,
  page: 1,
  limit: 10,
  wallet: account
};
const handleNftMining = async (params: nftlist) => {
  const res = await axios.post('/nft_miner_reward', params, 'walletserver');
  console.log(res);
  if (res.code === 0) {
    nftData.mining = res.data.list;
    nftData.miningPage.limit = res.data.limit;
    nftData.miningPage.page = res.data.page;
    nftData.miningPage.total = res.data.total;
  }
};
watch(
  () => route.path,
  () => {
    if (route.params.id && route.name === 'NFTDetails') {
      nftInfo.search = Number(route.params.id);
      recordParams.search = Number(route.params.id);
      miningParams.search = Number(route.params.id);
      nftId.value = Number(route.params.id);
      handleNftMiner(nftInfo);
      handleNftRecord(recordParams);
      handleNftMining(miningParams);
    }
  },
  {
    immediate: true
  }
);
const handleNFTOut = () => {
  isOut.value = true;
};
const handleNFTCash = () => {
  isCash.value = true;
};
const handleRecordPage = (page: number) => {
  console.log(page);
  recordParams.page = page;
  handleNftRecord(recordParams);
};
const handleMiningPage = (page: number) => {
  console.log(page);
  miningParams.page = page;
  handleNftMining(miningParams);
};
const handleNFTRelieve = () => {
  ElMessageBox.confirm(handleI18n('nft.sure'), handleI18n('nft.relieve'), {
    closeOnClickModal: false,
    customClass: 'form-box bg-basic-box text-basic border-basic-box',
    confirmButtonClass: 'bg-blue text-white border-blue',
    cancelButtonClass: 'text-basic hover:text-blue',
    confirmButtonText: handleI18n('login.confirm'),
    cancelButtonText: handleI18n('login.cancel')
  })
    .then(() => {
      util.checkTradepass(() => {
        util.showLoading();
        const params = {
          contractName: 'NFTMinerWithdraw',
          TokenId: nftId.value
        };
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
            reload();
          } else if (status === 'balance') {
            ElMessage.error(handleI18n('user.amountShort'));
          } else {
            ElMessage.error(res.msg);
          }
          util.closeLoading();
        });
      });
    })
    .catch(() => {});
};
const handleClose = () => {
  isCash.value = false;
  isOut.value = false;
};
const handleShowNft = () => {
  dialogNft.value = true;
};
// eslint-disable-next-line no-unused-vars
const url = handleWalletserver();
const browser = handleBlockexplorer();
</script>
<template>
  <div class="w-full text-basic">
    <div v-if="nftData.info" class="w-full">
      <div class="flex justify-between flex-wrap h-nft mb-20px">
        <div class="bg-basic-box p-20px rounded mb-20px w-49 h-full">
          <h4
            class="font-semibold mb-3 flex items-center justify-between text-muted"
          >
            <span>{{ $t('nft.info') }}</span>
            <el-button
              v-if="Number(nftData.info.stakeStatus) === 2"
              type="primary"
              class="text-center text-sm rounded bg-blue text-white border-blue"
              @click="handleNFTOut"
            >
              {{ $t('nft.over') }}
            </el-button>
          </h4>
          <div class="flex items-center mb-3">
            <span>{{ $t('nft.address') }}:</span>
            <a
              :href="`${browser}/blockchain/account/${nftData.info.owner}`"
              target="_blank"
              class="hover:text-blue"
            >
              {{ nftData.info.owner }}
            </a>
          </div>
          <div class="flex items-center mb-3">
            <span class="flex-shrink-0">NFT HASH:</span>
            <el-tooltip
              effect="dark"
              :content="`${nftData.info.hash}`"
              placement="bottom"
            >
              <a
                :href="`${browser}/meta/${nftData.info.hash}`"
                target="_blank"
                class="hover:text-blue truncate"
              >
                {{ nftData.info.hash }}
              </a>
            </el-tooltip>
          </div>
          <div class="flex items-center mb-3">
            <span>{{ $t('nft.power') }}:</span>
            <span>{{ util.format(nftData.info.energyPoint) }}</span>
          </div>
          <div class="flex items-center mb-3">
            <span>{{ $t('nft.value') }}:</span>
            <span>{{ util.format(nftData.info.energyPower) }}</span>
          </div>
          <div class="flex items-center mb-3">
            <span>{{ $t('nft.balance') }}:</span>
            <span>{{ util.formatFixed(nftData.info.stakeAmount) }}</span>
            <span class="ml-1">{{ $t('page.symbol') }}</span>
          </div>
          <div class="flex items-center mb-3">
            <span>{{ $t('nft.times') }}:</span>
            <span>{{ util.format(nftData.info.rewardCount) }}</span>
          </div>
          <div class="flex items-center mb-3">
            <span>{{ $t('nft.mining') }}:</span>
            <span>{{ util.formatFixed(nftData.info.ins) }}</span>
            <span class="ml-1">{{ $t('page.symbol') }}</span>
          </div>
          <div class="flex items-center">
            <span>{{ $t('nft.create') }}:</span>
            <el-tooltip
              effect="dark"
              :content="`${handleSecondUTC(nftData.info.dateCreated)}`"
              placement="bottom"
            >
              <span>{{ handleSecond(nftData.info.dateCreated) }}</span>
            </el-tooltip>
          </div>
        </div>
        <div
          class="bg-basic-box p-20px rounded mb-20px w-49 h-full cursor-pointer"
          @click="handleShowNft"
        >
          <img
            class="w-full h-full"
            :src="`${url}/api/v1/nft_miner_file/${nftData.info.id}`"
            alt="logo"
          />
        </div>
      </div>

      <div class="bg-basic-box p-20px rounded mb-20px">
        <h4
          class="font-semibold mb-3 flex items-center justify-between text-muted"
        >
          <span>{{ $t('nft.record') }}</span>
          <el-button
            v-if="
              Number(nftData.info.stakeStatus) === 0 ||
              Number(nftData.info.stakeStatus) === 2
            "
            type="primary"
            class="text-center text-sm rounded bg-blue text-white border-blue"
            @click="handleNFTCash"
          >
            {{ $t('node.cash') }}
          </el-button>
          <el-button
            v-if="Number(nftData.info.stakeStatus) === 3"
            type="primary"
            class="text-center text-xs rounded bg-blue text-white border-blue px-2 py-1"
            @click="handleNFTRelieve"
          >
            {{ $t('nft.relieve') }}
          </el-button>
        </h4>
        <div class="table-box">
          <el-table :data="nftData.record" stripe style="width: 100%">
            <el-table-column :label="$t('nft.balance')">
              <template #default="scope">
                <span>{{ util.formatFixed(scope.row.stakeAmount) }}</span>
                <span class="ml-1">{{ $t('page.symbol') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('nft.long')">
              <template #default="scope">
                <span>{{ util.format(scope.row.cycle) }}</span>
                <span class="ml-1">{{ $t('nft.day') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('nft.cashdate')" show-overflow-tooltip>
              <template #default="scope">
                <el-tooltip
                  effect="dark"
                  :content="`${handleSecondUTC(scope.row.startDated)}`"
                  placement="bottom"
                >
                  <span>{{ handleSecond(scope.row.startDated) }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column :label="$t('nft.end')">
              <template #default="scope">
                <el-tooltip
                  effect="dark"
                  :content="`${handleSecondUTC(scope.row.endDated)}`"
                  placement="bottom"
                >
                  <span>{{ handleSecond(scope.row.endDated) }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column :label="$t('nft.status')">
              <template #default="scope">
                <span v-if="scope.row.stakeStatus">
                  {{ $t('nft.unexpired') }}
                </span>
                <span v-else>{{ $t('nft.expired') }}</span>
              </template>
            </el-table-column>
            <template #empty>
              <div class="w-full p-5 flex justify-center">
                <img src="@/assets/image/no-data.png" alt="no-data" />
              </div>
            </template>
          </el-table>
        </div>
        <div class="page-box w-full flex justify-center mb-20px">
          <el-pagination
            small
            background
            hide-on-single-page
            layout="prev, pager, next"
            :current-page="Number(nftData.recordPage.page)"
            :page-size="Number(nftData.recordPage.limit)"
            :total="Number(nftData.recordPage.total)"
            @current-change="handleRecordPage"
          ></el-pagination>
        </div>
      </div>
      <div class="bg-basic-box p-20px rounded mb-20px">
        <h4
          class="font-semibold mb-3 flex items-center justify-between text-muted"
        >
          <span>{{ $t('nft.minrecord') }}</span>
        </h4>
        <div class="table-box">
          <el-table
            :data="nftData.mining"
            stripe
            style="width: 100%"
            :show-header="false"
          >
            <el-table-column :label="$t('nft.balance')">
              <template #default="scope">
                <span>{{ util.formatFixed(scope.row.ins) }}</span>
                <span class="ml-1">{{ $t('page.symbol') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('nft.cashdate')" show-overflow-tooltip>
              <template #default="scope">
                <el-tooltip
                  effect="dark"
                  :content="`${handleSecondUTC(scope.row.time)}`"
                  placement="bottom"
                >
                  <span>{{ handleSecond(scope.row.time) }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <template #empty>
              <div class="w-full p-5 flex justify-center">
                <img src="@/assets/image/no-data.png" alt="no-data" />
              </div>
            </template>
          </el-table>
        </div>
        <div class="page-box w-full flex justify-center mb-20px">
          <el-pagination
            small
            background
            hide-on-single-page
            layout="prev, pager, next"
            :current-page="Number(nftData.miningPage.page)"
            :page-size="Number(nftData.miningPage.limit)"
            :total="Number(nftData.miningPage.total)"
            @current-change="handleMiningPage"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div
      v-else
      class="w-full bg-basic-box rounded-3xl p-20 flex justify-center"
    >
      <img src="@/assets/image/no-data.png" alt="no-data" />
    </div>
    <nft-cash
      v-if="nftData.info.energyPoint"
      :nft-id="nftId"
      :is-cash="isCash"
      :energy-point="nftData.info.energyPoint"
      @close="handleClose"
    ></nft-cash>
    <nft-out
      v-if="nftId"
      :nft-id="nftId"
      :is-out="isOut"
      @close="handleClose"
    ></nft-out>

    <el-dialog
      v-model="dialogNft"
      class="bg-basic-box text-basic"
      width="80%"
      center
    >
      <div class="nft-img">
        <img
          :src="`${url}/api/v1/nft_miner_file/${nftData.info.id}`"
          alt="logo"
        />
      </div>
    </el-dialog>
  </div>
</template>
