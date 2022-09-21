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
const vote = reactive({
  list: [],
  pageNum: {
    total: 1,
    page: 1,
    limit: 10
  },
  data: {}
}) as getListResponse;
const honorId = ref(1);
const voteParams = {
  wallet: account,
  page: 1,
  limit: 10,
  search: 1
};
const handleHonorVote = async (params: honorOther) => {
  const res = await axios.post('node_vote_history', params, 'walletserver');
  if (res.code === 0) {
    console.log(JSON.stringify(res));
    vote.list = res.data.list;
    vote.data.totalVote = res.data.totalVote;
    vote.data.staking = res.data.staking;
    vote.pageNum.limit = res.data.limit;
    vote.pageNum.total = res.data.total;
    vote.pageNum.page = res.data.page;
  }
};
watch(
  () => route.path,
  () => {
    if (route.params.id && route.name === 'VoteRecord') {
      voteParams.search = Number(route.params.id);
      honorId.value = Number(route.params.id);
      handleHonorVote(voteParams);
    }
  },
  {
    immediate: true
  }
);
const handleChangePage = (page: number) => {
  voteParams.page = page;
  handleHonorVote(voteParams);
};
const handleRevoke = () => {
  const params = {
    contractName: 'CandidateNodeWithdrawReferendum',
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
        router.replace(`/honor/${honorId.value}`);
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
      <span>{{ $t('node.voteRecord') }}</span>
      <router-link :to="`/honor/${honorId}`">
        <i class="iconfont el-ui-back pr-20px text-2xl cursor-pointer"></i>
      </router-link>
    </h3>
    <div class="w-full flex bg-basic-box p-20px rounded mb-20px">
      <div class="">
        <div class="mb-2">
          <span>{{ $t('node.total') }}:</span>
          <span>{{ util.format(vote.data.totalVote) }}</span>
        </div>
        <div>
          <span>{{ $t('node.lock') }}:</span>
          <span>{{ util.formatFixed(vote.data.staking) }}</span>
          <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
        </div>
      </div>
      <div class="ml-auto">
        <el-button
          type="primary"
          class="block w-full h-8 text-center text-xs rounded bg-blue text-white border-blue"
          @click="handleRevoke"
        >
          {{ $t('node.cancel') }}
        </el-button>
      </div>
    </div>
    <div class="bg-basic-box rounded text-basic p-20px">
      <div v-if="vote.list.length" class="table-box">
        <div class="mb-20px">
          <el-table :data="vote.list" stripe style="width: 100%">
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
            <el-table-column :label="$t('node.num')" show-overflow-tooltip>
              <template #default="scope">
                <span>{{ scope.row.vote }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('node.lockasset')"
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
            :current-page="Number(vote.pageNum.page)"
            :page-size="Number(vote.pageNum.limit)"
            :total="Number(vote.pageNum.total)"
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
