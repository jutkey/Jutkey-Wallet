<script setup lang="ts">
import { ref, reactive, inject, toRefs } from 'vue';
import { handleSecond, handleSecondUS } from 'plugins/day';
import util from '@/plugins/util';
import { axiosType, honorOther, getListResponse } from '@/plugins/dataType';
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
const dao = reactive({
  list: [],
  pageNum: {
    limit: 10,
    total: 0,
    page: 1
  }
}) as getListResponse;
const nodeScroll = ref(null);
const paramsDao = {
  wallet: account,
  page: 1,
  limit: 10,
  search: honorId.value,
  order: ''
};
let daoList: any = [];
const handleHonorDao = async (params: honorOther) => {
  const res = await axios.post('node_dao_list', params, 'walletserver');
  if (res.code === 0) {
    const { list } = res.data;
    dao.pageNum.limit = res.data.limit;
    dao.pageNum.total = res.data.total;
    dao.pageNum.page = res.data.page;
    if (list) {
      daoList = [...list, ...daoList];
      const arrReduce = util.handleReduce(daoList);
      dao.list = arrReduce;
    }
  }
};
handleHonorDao(paramsDao);
const handleDaoScroll = ({ scrollTop }: any) => {
  console.log(scrollTop);
  console.log(nodeScroll.value);
  const dom = nodeScroll.value as any;
  const { scrollHeight } = dom;
  console.log(scrollHeight);
  if (scrollTop + 400 >= scrollHeight) {
    paramsDao.page += 1;
    const totalHistory = dao.pageNum.total;
    console.log(totalHistory);
    const { page } = paramsDao;
    const { limit } = paramsDao;
    const num = Math.ceil(totalHistory / limit);
    console.log(num);
    if (num >= page) {
      console.log(paramsDao.page);
      handleHonorDao(paramsDao);
    }
  }
};
const explorer = handleBlockexplorer();
</script>
<template>
  <div class="bg-basic-box p-20px rounded mb-20px">
    <div class="mb-20px">
      <span>{{ $t('node.daorecord') }}</span>
    </div>
    <template v-if="dao.list.length">
      <el-scrollbar max-height="400px" always @scroll="handleDaoScroll">
        <div ref="nodeScroll" class="mr-20px">
          <div
            v-for="item in dao.list"
            :key="item.id"
            class="flex justify-between mb-3 items-center text-sm"
          >
            <div class="flex items-center">
              <el-tooltip
                effect="dark"
                :content="item.title"
                placement="bottom"
              >
                <a
                  :href="`${explorer}/node/honor/manage/${item.id}`"
                  target="_blank"
                  class="w-2/3 truncate"
                >
                  {{ item.title }}
                </a>
              </el-tooltip>
              <div class="ml-2 border border-basic rounded p-1 w-20">
                <i class="iconfont el-ui-a-strayticket mr-1"></i>
                <span v-if="item.result === 1">
                  {{ $t('node.adopt') }}
                </span>
                <span v-else-if="item.result === 2">
                  {{ $t('node.refuse') }}
                </span>
                <span v-else-if="item.result === 3">
                  {{ $t('node.incomplete') }}
                </span>
              </div>
            </div>
            <div class="node-head-left-item-time">
              <div class="mb-1">{{ handleSecond(item.created) }}</div>
              <div>({{ handleSecondUS(item.created) }})</div>
            </div>
            <div class="w-2/5 flex justify-between">
              <div class="flex-1">
                <span>{{ $t('node.votes') }}:</span>
                <span v-if="item.status === 0">
                  {{ $t('node.permission') }}
                </span>
                <span v-else-if="item.status === 1">
                  {{ $t('node.adopt') }}
                </span>
                <span v-else-if="item.status === 2">
                  {{ $t('node.refuse') }}
                </span>
                <span v-else-if="item.status === 3">
                  {{ $t('node.no') }}
                </span>
              </div>
              <div class="flex-1 flex items-center">
                <span class="bg-warn w-3 h-3 rounded-full mr-2"></span>
                <span>{{ $t('node.voting') }}:</span>
                <span>{{ item.voted_rate }} %</span>
              </div>
              <div class="flex-1 flex items-center">
                <span class="bg-success w-3 h-3 rounded-full mr-2"></span>
                <span>{{ $t('node.pass') }}:</span>
                <span>{{ item.result_rate }} %</span>
              </div>
              <div class="flex-1 flex items-center">
                <span class="bg-error w-3 h-3 rounded-full mr-2"></span>
                <span>{{ $t('node.reject') }}:</span>
                <span>{{ item.rejected_rate }} %</span>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </template>
    <div v-else class="text-center p-20px">{{ $t('node.votno') }}</div>
  </div>
</template>
