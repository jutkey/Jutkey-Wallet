<script setup lang="ts">
import { ref, reactive, watch, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import util from '@/plugins/util';
import { axiosType, honorOther, getListResponse } from '@/plugins/dataType';
import { handleSecond, handleSecondUTC } from '@/plugins/day';
import contract from '@/plugins/lib';
import { handleI18n } from '@/plugins/i18n';

const axios = inject('axios') as axiosType;
const route = useRoute();
const router = useRouter();
const { account, keyId } = util.getCache('current');
console.log(keyId);
const stake = reactive({
  list: [],
  pageNum: {
    total: 1,
    page: 1,
    limit: 10
  },
  data: {}
}) as getListResponse;
const honorId = ref(1);
const stakeParams = {
  wallet: account,
  page: 1,
  limit: 10,
  search: 1
};
const handleHonorStake = async (params: honorOther) => {
  const res = await axios.post(
    'node_substitute_history',
    params,
    'walletserver'
  );
  if (res.code === 0 && res.data) {
    stake.list = res.data.list;
    stake.data.staking = res.data.staking;
    stake.data.getStatus = res.data.getStatus;
    stake.data.dateWithdraw = res.data.dateWithdraw;
    stake.pageNum.limit = res.data.limit;
    stake.pageNum.total = res.data.total;
    stake.pageNum.page = res.data.page;
  }
};
watch(
  () => route.path,
  () => {
    if (route.params.id && route.name === 'StakeRecord') {
      stakeParams.search = Number(route.params.id);
      honorId.value = Number(route.params.id);
      handleHonorStake(stakeParams);
    }
  },
  {
    immediate: true
  }
);
const handleChangePage = (page: number) => {
  stakeParams.page = page;
  handleHonorStake(stakeParams);
};
const handleRevoke = () => {
  const params = {
    contractName: 'CandidateNodeWithdrawSubstitute',
    RequestId: honorId.value
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
        if (stake.data.getStatus === 2) {
          router.replace(`/honor/${honorId.value}`);
        } else {
          handleHonorStake(stakeParams);
        }
      } else if (status === 'balance') {
        ElMessage.error(handleI18n('user.amountShort'));
      } else {
        ElMessage.error(res.msg);
      }
      util.closeLoading();
    });
  });
};
</script>
<template>
  <div class="w-full text-basic">
    <h3 class="mb-3 flex justify-between text-basic">
      <span>{{ $t('node.bondRecord') }}</span>
      <router-link :to="`/honor/${honorId}`">
        <i class="iconfont el-ui-back pr-20px text-2xl cursor-pointer"></i>
      </router-link>
    </h3>
    <div class="w-full flex bg-basic-box p-20px rounded mb-20px">
      <div class="">
        <div class="mb-2">
          <span>{{ $t('node.paid') }}:</span>
          <span>{{ util.formatFixed(stake.data.staking) }}</span>
          <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
        </div>
        <div v-if="stake.data.getStatus !== 0">
          <span>{{ $t('node.claim') }}:</span>
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="`${handleSecond(stake.data.dateWithdraw)}`"
            placement="bottom"
          >
            <span>{{ handleSecondUTC(stake.data.dateWithdraw) }}(UTC)</span>
          </el-tooltip>
        </div>
      </div>
      <div class="ml-auto">
        <el-button
          v-if="stake.data.getStatus === 0"
          type="primary"
          class="block w-full h-8 text-center text-xs rounded bg-blue text-white border-blue"
          @click="handleRevoke"
        >
          {{ $t('node.cancel') }}
        </el-button>
        <el-button
          v-if="stake.data.getStatus === 1"
          class="w-full block h-10 text-center text-sm rounded text-light-blue border border-light-blue mb-3 ml-0 hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue"
          disabled
        >
          {{ $t('node.unclaimed') }}
        </el-button>
        <el-button
          v-if="stake.data.getStatus === 2"
          type="primary"
          class="block w-full h-8 text-center text-xs rounded bg-blue text-white border-blue"
          @click="handleRevoke"
        >
          {{ $t('node.funds') }}
        </el-button>
      </div>
    </div>
    <div class="bg-basic-box rounded text-basic p-20px">
      <div v-if="stake.list.length" class="table-box">
        <div class="mb-20px">
          <el-table :data="stake.list" stripe style="width: 100%">
            <el-table-column :label="$t('node.hash')" show-overflow-tooltip>
              <template #default="scope">
                <a
                  :href="scope.row.hash"
                  target="_blank"
                  class="inline-black hover:text-blue"
                >
                  {{ scope.row.hash }}
                </a>
              </template>
            </el-table-column>
            <el-table-column :label="$t('node.time')" show-overflow-tooltip>
              <template #default="scope">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="`${handleSecond(scope.row.time)}`"
                  placement="bottom"
                >
                  <span>{{ handleSecondUTC(scope.row.time) }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('node.amountPaid')"
              show-overflow-tooltip
            >
              <template #default="scope">
                <span>{{ util.formatFixed(scope.row.amount) }}</span>
                <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
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
            :current-page="Number(stake.pageNum.page)"
            :page-size="Number(stake.pageNum.limit)"
            :total="Number(stake.pageNum.total)"
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
