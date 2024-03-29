<script setup lang="ts">
import { ref, reactive, watch, Ref } from 'vue';
import axios from 'axios';
import qs from 'qs';
import { useRoute } from 'vue-router';
import ETH from '@/plugins/ethereum/';
import util from '@/plugins/util';
import { recordType, recordPage } from '@/plugins/dataType';
import { handleSecondUTC, handleSecond } from '@/plugins/day';

const route = useRoute();
const address = ref('') as Ref<string>;
const objRecord: recordType = {
  address: '',
  module: 'account',
  action: 'txlist',
  startblock: 0,
  endblock: 999999999,
  page: 1,
  offset: 10,
  sort: 'desc',
  apikey: ''
};
const objPage: recordPage = {
  address: '',
  module: 'account',
  action: 'txlist',
  startblock: 0,
  endblock: 999999999,
  page: '<page number>',
  offset: '<max records to return>',
  sort: 'desc',
  apikey: ''
};
const { privateKey } = util.getCache('current');
const arrRecord = reactive({
  list: [],
  pageNum: {
    total: 1,
    offset: 10
  }
});
const { api, rpcUrl, brower, apikey, symbol } = util.getCache('showEthNetwork');
const eth = new ETH(privateKey, rpcUrl, api, apikey, brower);
console.log(eth.brower);
console.log(eth.apikey);
objPage.apikey = eth.apikey;
objRecord.apikey = eth.apikey;
const handletradeList = async (params: recordType) => {
  util.showLoading();
  const res = (await axios.post(`${eth.api}/api`, qs.stringify(params))) as any;
  console.log(res);
  if (res.data.status === '1') {
    arrRecord.list = res.data.result;
    console.log(arrRecord);
  } else {
    arrRecord.list = [];
  }
  util.closeLoading();
};
const handletradePage = async (params: recordPage) => {
  const res = (await axios.post(`${eth.api}/api`, qs.stringify(params))) as any;
  if (res.data.status === '1') {
    arrRecord.pageNum.total = res.data.result.length;
  } else {
    arrRecord.pageNum.total = 1;
  }
};
watch(
  () => route.path,
  () => {
    if (route.params.address && route.name === 'EthRecord') {
      console.log(route.params.address);
      objRecord.address = route.params.address as string;
      objPage.address = route.params.address as string;
      address.value = (route.params.address as string).toLowerCase();
      handletradeList(objRecord);
      handletradePage(objPage);
    }
  },
  {
    immediate: true
  }
);
const handleChangePage = (page: number) => {
  console.log(page);
  objRecord.page = page;
  handletradeList(objRecord);
};
</script>
<template>
  <div class="bg-basic-box rounded p-20px">
    <div v-if="arrRecord.list.length" class="table-box min-h-300">
      <el-table :data="arrRecord.list" stripe style="width: 100%">
        <el-table-column label="Txn Hash" show-overflow-tooltip>
          <template #default="scope">
            <a
              :href="`${eth.brower}/tx/${scope.row.hash}`"
              target="_blank"
              class="hover:text-blue"
            >
              {{ scope.row.hash }}
            </a>
          </template>
        </el-table-column>
        <el-table-column label="Block" align="center" width="100">
          <template #default="scope">
            <a
              :href="`${eth.brower}/block/${scope.row.blockNumber}`"
              target="_blank"
              class="hover:text-blue"
            >
              {{ scope.row.blockNumber }}
            </a>
          </template>
        </el-table-column>
        <el-table-column label="Time" width="170">
          <template #default="scope">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="`${handleSecond(scope.row.timeStamp)}`"
              placement="bottom"
            >
              <span class="text-xs">
                {{ handleSecondUTC(scope.row.timeStamp) }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="From" show-overflow-tooltip>
          <template #default="scope">
            <div class="flex justify-between items-center">
              <a
                class="hover:text-blue inline-block truncate"
                :href="`${eth.brower}/address/${scope.row.from}`"
                target="_blank"
              >
                {{ scope.row.from }}
              </a>
              <span
                v-if="scope.row.from === address"
                class="text-warn bg-bg-warn text-xs font-semibold py-1 w-16 ml-3 rounded-sm text-center"
              >
                Out
              </span>
              <span
                v-else
                class="text-success bg-bg-success text-xs font-semibold py-1 w-16 ml-3 rounded-sm text-center"
              >
                In
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="To" show-overflow-tooltip>
          <template #default="scope">
            <a
              :href="`${eth.brower}/address/${scope.row.to}`"
              target="_blank"
              class="hover:text-blue"
            >
              {{ scope.row.to }}
            </a>
          </template>
        </el-table-column>
        <el-table-column label="value" align="center">
          <template #default="scope">
            <span>
              {{ Number(eth.decimals(scope.row.value, '18')) }}
            </span>
            <span class="ml-1 text-xs">{{ symbol }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template #header>
            <el-tooltip
              class="item"
              effect="dark"
              content="(Gas Price * Gas Used by Txns) in Ether"
              placement="bottom"
            >
              <span class="multi-record-header">Txn Fee</span>
            </el-tooltip>
          </template>
          <template #default="scope">
            <span class="text-xs">
              {{
                Number(
                  eth.decimals(
                    String(
                      parseFloat(scope.row.gasPrice) *
                        parseFloat(scope.row.gasUsed)
                    ),
                    '18'
                  )
                )
              }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-box w-full flex justify-center my-20px">
        <el-pagination
          small
          background
          hide-on-single-page
          layout="prev, pager, next"
          :pager-count="11"
          :page-size="arrRecord.pageNum.offset"
          :total="arrRecord.pageNum.total"
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
</template>
