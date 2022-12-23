<script setup lang="ts">
import { ref, reactive, inject, watch, Ref } from 'vue';
import { useRoute } from 'vue-router';
import type { TabsPaneContext } from 'element-plus';
import util from '@/plugins/util';
import { axiosType, historyParams, getListResponse } from '@/plugins/dataType';
import TradeRecord from '@/components/assets/TradeRecord.vue';

const activeRecord = ref('all') as Ref<string>;
const address = ref('') as Ref<string>;
// eslint-disable-next-line no-unused-vars
const record = reactive({
  pageNum: {
    page: 1,
    limit: 10,
    total: 1
  },
  list: [],
  data: {}
}) as getListResponse;
const route = useRoute();
const axios = inject('axios') as axiosType;
const recordParams = {
  ecosystem: 1,
  opt: 'all',
  wallet: '',
  page: 1,
  limit: 10
};
const recordInfo = {
  ecosystem: 1,
  wallet: ''
};
const handleTradeInfo = async (params: any) => {
  const res = await axios.post('key_total', params, 'walletserver');
  if (res.code === 0 && res.data) {
    record.data = res.data;
  }
};

const handleTradeList = async (params: historyParams) => {
  const res = await axios.post('history', params, 'walletserver');
  if (res.code === 0 && res.data) {
    record.list = res.data.list;
    record.pageNum.page = res.data.page;
    record.pageNum.limit = res.data.limit;
    record.pageNum.total = res.data.total;
  }
};
watch(
  () => route.path,
  () => {
    if (route.params.id && route.name === 'Record') {
      console.log(route.params.account);
      address.value = route.params.account as string;
      recordInfo.wallet = route.params.account as string;
      recordParams.wallet = route.params.account as string;
      recordParams.ecosystem = Number(route.params.id) as number;
      recordInfo.ecosystem = Number(route.params.id) as number;
      handleTradeList(recordParams);
      handleTradeInfo(recordInfo);
    }
  },
  {
    immediate: true
  }
);
const handleRecordClick = (tab: TabsPaneContext) => {
  const { name } = tab.props;
  console.log(name);
  recordParams.page = 1;
  recordParams.opt = name as string;
  handleTradeList(recordParams);
  handleTradeInfo(recordInfo);
};
const handleChangePage = (page: number) => {
  recordParams.page = page;
  handleTradeList(recordParams);
  handleTradeInfo(recordInfo);
};
</script>
<template>
  <div class="tabs-box bg-basic-box rounded p-20px">
    <el-tabs
      v-model="activeRecord"
      stretch
      type="card"
      @tab-click="handleRecordClick"
    >
      <el-tab-pane name="all">
        <template #label>
          <div class=" ">
            <div class="w-full flex justify-center items-center">
              <span>{{ $t('user.all') }}</span>
              <span class="ml-1">({{ util.format(record.data.allTx) }})</span>
            </div>
            <div>
              <span>{{ util.formatFixed(record.data.allAmount) }}</span>
              <span class="ml-1 text-xs">{{ record.data.tokenSymbol }}</span>
            </div>
          </div>
        </template>
        <component
          :is="TradeRecord"
          v-show="activeRecord === 'all'"
          :list="record.list"
          :address="address"
          :active="activeRecord"
        ></component>
      </el-tab-pane>
      <el-tab-pane name="recipient">
        <template #label>
          <div class=" ">
            <div class="w-full flex justify-center items-center">
              <span>{{ $t('user.in') }}</span>
              <span class="ml-1">({{ util.format(record.data.inTx) }})</span>
            </div>
            <div>
              <span>{{ util.formatFixed(record.data.inAmount) }}</span>
              <span class="ml-1 text-xs">{{ record.data.tokenSymbol }}</span>
            </div>
          </div>
        </template>
        <component
          :is="TradeRecord"
          v-show="activeRecord === 'recipient'"
          :list="record.list"
          :address="address"
          :active="activeRecord"
        ></component>
      </el-tab-pane>
      <el-tab-pane name="send">
        <template #label>
          <div class=" ">
            <div class="w-full flex justify-center items-center">
              <span>{{ $t('user.out') }}</span>
              <span class="ml-1">({{ util.format(record.data.outTx) }})</span>
            </div>
            <div>
              <span>{{ util.formatFixed(record.data.outAmount) }}</span>
              <span class="ml-1 text-xs">{{ record.data.tokenSymbol }}</span>
            </div>
          </div>
        </template>
        <component
          :is="TradeRecord"
          v-show="activeRecord === 'send'"
          :list="record.list"
          :address="address"
          :active="activeRecord"
        ></component>
      </el-tab-pane>
    </el-tabs>
    <div class="page-box w-full flex justify-center mb-20px">
      <el-pagination
        small
        background
        hide-on-single-page
        layout="prev, pager, next"
        :pager-count="11"
        :current-page="Number(record.pageNum.page)"
        :page-size="Number(record.pageNum.limit)"
        :total="Number(record.pageNum.total)"
        @current-change="handleChangePage"
      ></el-pagination>
    </div>
  </div>
</template>
