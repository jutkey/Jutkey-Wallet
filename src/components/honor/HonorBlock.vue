<script setup lang="ts">
import { reactive, inject, toRefs } from 'vue';
import util from '@/plugins/util';
import { axiosType, honorOther, getListResponse } from '@/plugins/dataType';
import { handleSecondUTC } from '@/plugins/day';
import { handleBlockexplorer } from '@/plugins/common';

const { account, keyId } = util.getCache('current');
console.log(keyId);
const axios = inject('axios') as axiosType;
const props = defineProps({
  honorId: {
    type: Number,
    default: () => 0
  }
});
const { honorId } = toRefs(props);
const block = reactive({
  list: [],
  pageNum: {
    limit: 10,
    total: 0,
    page: 1
  }
}) as getListResponse;
const paramsBlock = {
  wallet: account,
  page: 1,
  limit: 10,
  search: honorId.value,
  order: ''
};
// eslint-disable-next-line no-unused-vars
const handleHonorblock = async (params: honorOther) => {
  const res = await axios.post('node_block_list', params, 'walletserver');
  if (res.code === 0) {
    block.list = res.data.list;
    block.pageNum.limit = res.data.limit;
    block.pageNum.total = res.data.total;
    block.pageNum.page = res.data.page;
  }
};
handleHonorblock(paramsBlock);
const handleChangePage = (page: number) => {
  paramsBlock.page = page;
  handleHonorblock(paramsBlock);
};
const explorer = handleBlockexplorer();
</script>
<template>
  <div class="bg-basic-box p-20px rounded mb-20px">
    <template v-if="block.list.length">
      <div class="table-box mb-20px">
        <el-table :data="block.list" stripe style="width: 100%">
          <el-table-column :label="$t('node.block')" width="150">
            <template #default="scope">
              <a :href="`${explorer}/blockchain/block/${scope.row.block_id}`">
                {{ scope.row.block_id }}
              </a>
            </template>
          </el-table-column>
          <el-table-column :label="$t('node.time')">
            <template #default="scope">
              <span>
                {{ handleSecondUTC(scope.row.time) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('node.affair')" show-overflow-tooltip>
            <template #default="scope">
              <span>{{ util.format(String(scope.row.tx)) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('node.gasnum')" show-overflow-tooltip>
            <template #default="scope">
              <span>{{ util.format(String(scope.row.eco_number)) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="`${$t('node.exe')} 1`">
            <template #default="scope">
              <span v-if="scope.row.gas_fee_1.amount">
                {{ util.formatFixed(scope.row.gas_fee_1.amount) }}
              </span>
              <span class="ml-1 text-xs">
                {{ scope.row.gas_fee_1.token_symbol }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="`${$t('node.exe')} 2`">
            <template #default="scope">
              <span v-if="scope.row.gas_fee_2.amount">
                {{ util.formatFixed(scope.row.gas_fee_2.amount) }}
              </span>
              <span class="ml-1 text-xs">
                {{ scope.row.gas_fee_2.token_symbol }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="`${$t('node.exe')} 3`">
            <template #default="scope">
              <span v-if="scope.row.gas_fee_3.amount">
                {{ util.formatFixed(scope.row.gas_fee_3.amount) }}
              </span>
              <span class="ml-1 text-xs">
                {{ scope.row.gas_fee_3.token_symbol }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="`${$t('node.exe')} 4`">
            <template #default="scope">
              <span v-if="scope.row.gas_fee_4.amount">
                {{ util.formatFixed(scope.row.gas_fee_4.amount) }}
              </span>
              <span class="ml-1 text-xs">
                {{ scope.row.gas_fee_4.token_symbol }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="`${$t('node.exe')} 5`">
            <template #default="scope">
              <span v-if="scope.row.gas_fee_5.amount">
                {{ util.formatFixed(scope.row.gas_fee_5.amount) }}
              </span>
              <span class="ml-1 text-xs">
                {{ scope.row.gas_fee_5.token_symbol }}
              </span>
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
          :current-page="Number(block.pageNum.page)"
          :page-size="Number(block.pageNum.limit)"
          :total="Number(block.pageNum.total)"
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
</template>
