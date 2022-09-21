<script setup lang="ts">
import { ref, reactive, inject, toRefs, computed } from 'vue';
import { axiosType, getListResponse } from '@/plugins/dataType';
import util from '@/plugins/util';
import { handleSecondUTC } from '@/plugins/day';
import store from '@/store';

const axios = inject('axios') as axiosType;
const ecoId = ref(1);
const tokenSymbol = ref('');
const ecoColl = ref('');
const ecoBalance = reactive({
  list: []
}) as any;
const props = defineProps({
  account: {
    type: String,
    default: () => ''
  }
});

const { account } = toRefs(props);
/* const ecoParams = {
  wallet: account.value,
  search: '',
  order: 'token_join'
}; */

store.dispatch('handleActEcolist', {
  account: account.value,
  order: 'token_join'
});
const ecoList = computed(() => {
  return store.getters.postEcoList;
});
const monthParams = {
  wallet: account.value,
  ecosystem: 1
};

const month = reactive({
  list: [],
  pageNum: {
    total: 1,
    page: 1,
    limit: 5
  }
}) as getListResponse;
const eachParams = {
  wallet: account.value,
  ecosystem: ecoId.value,
  limit: 5,
  page: 1,
  order: 'id desc',
  time: ''
};
const handleEachMonth = async (params: any) => {
  const res = await axios.post('month_history_detail', params, 'walletserver');
  if (res.code === 0 && res.data.list) {
    console.log(JSON.stringify(res));
    month.list = res.data.list;
    month.pageNum.page = res.data.page;
    month.pageNum.total = res.data.total;
    month.pageNum.limit = res.data.limit;
  } else {
    month.list = [];
    month.pageNum.page = 1;
    month.pageNum.total = 0;
  }
};
const handleCollapse = (month: any) => {
  console.log(month);
  if (month) {
    eachParams.page = 1;
    const obj = ecoBalance.list.find((item: any) => item.month === month);
    eachParams.time = obj.time;
    handleEachMonth(eachParams);
  }
};
const handleChangePage = (page: number) => {
  eachParams.page = page;
  handleEachMonth(eachParams);
};
const handleMontParams = async (params: any) => {
  const res = await axios.post('month_history_total', params, 'walletserver');
  if (res.code === 0) {
    console.log(JSON.stringify(res));
    ecoColl.value = res.data.list[0].month;
    eachParams.time = res.data.list[0].time;
    handleEachMonth(eachParams);
    ecoBalance.list = res.data.list;
    tokenSymbol.value = res.data.tokenSymbol;
  }
};
handleMontParams(monthParams);
const handleSelectChange = (props: number) => {
  console.log(props);
  ecoColl.value = '';
  monthParams.ecosystem = props;
  eachParams.ecosystem = props;
  handleMontParams(monthParams);
};
</script>
<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-20px">
      <span>{{ $t('home.asset') }}</span>
      <div class="select-box">
        <el-select
          v-model="ecoId"
          placeholder="Select"
          size="small"
          filterable
          @change="handleSelectChange"
        >
          <el-option
            v-for="item in ecoList"
            :key="item.id"
            :label="item.tokenSymbol"
            :value="item.id"
          >
            <span>
              {{ item.tokenSymbol }}
            </span>
          </el-option>
        </el-select>
      </div>
    </div>
    <el-scrollbar :max-height="350">
      <div class="collapse-box p-20px">
        <el-collapse v-model="ecoColl" accordion @change="handleCollapse">
          <el-collapse-item
            v-for="item in ecoBalance.list"
            :key="item.time"
            :name="item.month"
            class="bg-basic-box"
          >
            <template #title>
              <div class="w-full flex items-center justify-between text-basic">
                <div class="w-1/5">{{ item.month }}</div>

                <div class="w-2/5 truncate">
                  <span>{{ $t('home.income') }}:</span>
                  <el-tooltip
                    effect="dark"
                    :content="`${util.formatFixed(
                      item.inAmount
                    )} ${tokenSymbol}`"
                    placement="bottom"
                  >
                    <span>{{ util.formatFixed(item.inAmount) }}</span>
                  </el-tooltip>
                  <span class="ml-1 text-xs">{{ tokenSymbol }}</span>
                </div>
                <div class="w-2/5 truncate">
                  <span>{{ $t('home.expend') }}:</span>
                  <el-tooltip
                    effect="dark"
                    :content="`${util.formatFixed(
                      item.outAmount
                    )} ${tokenSymbol}`"
                    placement="bottom"
                  >
                    <span>{{ util.formatFixed(item.outAmount) }}</span>
                  </el-tooltip>
                  <span class="ml-1 text-xs">{{ tokenSymbol }}</span>
                </div>
              </div>
            </template>
            <template v-if="month.list.length">
              <div class="mb-3 table-box">
                <el-table :data="month.list" stripe style="width: 100%">
                  <el-table-column
                    :label="$t('node.time')"
                    show-overflow-tooltip
                  >
                    <template #default="scope">
                      <span>
                        {{ handleSecondUTC(scope.row.time) }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('home.do')" show-overflow-tooltip>
                    <template #default="scope">
                      <span>
                        {{ util.formatFixed(scope.row.amount) }}
                      </span>
                      <span class="ml-1 text-xs">
                        {{ tokenSymbol }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('user.balance')"
                    show-overflow-tooltip
                  >
                    <template #default="scope">
                      <span>
                        {{ util.formatFixed(scope.row.balance) }}
                      </span>
                      <span class="ml-1 text-xs">
                        {{ tokenSymbol }}
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="page-box w-full flex justify-center mb-3">
                <el-pagination
                  small
                  background
                  hide-on-single-page
                  layout="prev, pager, next"
                  :current-page="Number(month.pageNum.page)"
                  :page-size="Number(month.pageNum.limit)"
                  :total="Number(month.pageNum.total)"
                  @current-change="handleChangePage"
                ></el-pagination>
              </div>
            </template>
            <div
              v-else
              class="w-full bg-basic-box rounded-3xl p-10 flex justify-center"
            >
              <img src="@/assets/image/no-data.png" alt="no-data" />
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-scrollbar>
  </div>
</template>
