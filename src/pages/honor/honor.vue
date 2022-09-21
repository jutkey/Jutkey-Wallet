<script setup lang="ts">
import { ref, reactive, inject, Ref } from 'vue';
import { axiosType, honorType } from '@/plugins/dataType';
import util from '@/plugins/util';
import { handleWalletserver } from '@/plugins/common';
import keyring from '@/plugins/keyring';
import HonorVote from '@/components/honor/HonorVote.vue';

const { account, keyId } = util.getCache('current');
console.log(keyId);
console.log(keyring.addressToID(account));
const isDialog = ref(false) as Ref<boolean>;
const honorName = ref('') as Ref<string>;
const honorId = ref(0) as Ref<number>;
const axios = inject('axios') as axiosType;
const candidateTotal = ref('') as Ref<string>;
const honorTotal = ref('') as Ref<string>;
const honorList = reactive({
  list: [],
  pageNum: { page: 1, limit: 10, total: 1 }
}) as any;
const primaryColor = '#3961F5';
const handleHonorNode = async () => {
  const res = await axios.get('/node_statistics', {}, 'walletserver');
  if (res.code === 0 && res.data) {
    honorTotal.value = res.data.honor_total;
    candidateTotal.value = res.data.candidate_total;
  }
};
handleHonorNode();
const honorParams = {
  wallet: account,
  page: 1,
  limit: 10,
  order: ''
};

const handleNodeList = async (params: honorType) => {
  const res = await axios.post('node_list', params, 'walletserver');
  if (res.code === 0) {
    honorList.list = res.data.list;
    honorList.pageNum.page = res.data.page;
    honorList.pageNum.limit = res.data.limit;
    honorList.pageNum.total = res.data.total;
  }
};
handleNodeList(honorParams);
const handleChangePage = (page: number) => {
  console.log(page);
  honorParams.page = page;
  handleNodeList(honorParams);
};
const handleOpenVate = (id: number, name: string) => {
  console.log(id);
  isDialog.value = true;
  honorId.value = id;
  honorName.value = name;
};
const handeClose = () => {
  isDialog.value = false;
};
const handleConfirm = () => {
  handleNodeList(honorParams);
  isDialog.value = false;
};
const url = handleWalletserver();
</script>
<template>
  <div class="w-full text-basic">
    <div class="w-full bg-basic-box p-20px rounded mb-20px">
      <h3 class="mb-5 text-muted">
        <span>{{ $t('honor.node') }}:</span>
        <span>{{ util.format(honorTotal) }}</span>
        <span class="ml-1 text-sm">{{ $t('honor.a') }}</span>
      </h3>
      <div class="mb-2">{{ $t('honor.behalf') }}</div>
      <div class="mb-5">{{ $t('honor.honorary') }}</div>
      <h3 class="mb-5 text-muted">
        <span>{{ $t('honor.candidate') }}:</span>
        <span>{{ util.format(candidateTotal) }}</span>
        <span class="ml-1 text-sm">{{ $t('honor.a') }}</span>
      </h3>
      <div class="mb-5">{{ $t('honor.application') }}</div>
    </div>
    <div class="bg-basic-box rounded text-basic p-20px">
      <div v-if="honorList.list.length" class="table-box">
        <div class="mb-20px">
          <el-table :data="honorList.list" stripe style="width: 100%">
            <el-table-column :label="$t('node.ranking')" width="80">
              <template #default="scope">
                <span
                  :class="{
                    'text-ashy': !scope.row.committee
                  }"
                >
                  {{ scope.row.ranking }}
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('node.name')" show-overflow-tooltip>
              <template #default="scope">
                <router-link
                  v-if="scope.row.id"
                  class="hover:text-blue flex truncate items-center"
                  :to="{
                    name: 'HonorId',
                    params: { id: scope.row.id }
                  }"
                  :class="{
                    'text-ashy': !scope.row.committee
                  }"
                >
                  <img
                    v-if="scope.row.iconUrl"
                    class="w-8"
                    :src="`${url}${scope.row.iconUrl}`"
                    alt=""
                  />
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="scope.row.name"
                    placement="bottom"
                  >
                    <span class="max-w-70 truncate">{{ scope.row.name }}</span>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="scope.row.website"
                    placement="bottom"
                  >
                    <i
                      class="ml-1 iconfont el-ui-Group17 text-blue"
                      :class="{
                        'text-ashy': !scope.row.committee
                      }"
                    ></i>
                  </el-tooltip>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column :label="$t('node.region')" show-overflow-tooltip>
              <template #default="scope">
                <span
                  :class="{
                    'text-ashy': !scope.row.committee
                  }"
                >
                  {{ scope.row.address }}
                </span>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.api_address"
                  placement="bottom"
                >
                  <i
                    class="iconfont el-Description"
                    :class="{
                      'text-ashy': !scope.row.committee
                    }"
                  ></i>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column :label="$t('node.pack')">
              <template #default="scope">
                <span
                  :class="{
                    'text-ashy': !scope.row.committee
                  }"
                >
                  {{ util.format(String(scope.row.packed)) }}
                </span>
                <span
                  v-if="scope.row.packedRate"
                  class="border border-basic px-2 ml-1 h-6 inline-block leading-6"
                  :class="{
                    'text-ashy': !scope.row.committee
                  }"
                >
                  {{ scope.row.packedRate }}%
                </span>
                <span
                  v-else
                  class="border border-basic p-1 inline-block"
                  :class="{
                    'text-ashy': !scope.row.committee
                  }"
                >
                  0%
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('node.vote')" width="200">
              <template #default="scope">
                <div
                  class="meta-honor-vote"
                  :class="{
                    'text-ashy': !scope.row.committee
                  }"
                >
                  <span>{{ util.format(String(scope.row.vote)) }}</span>
                  <template v-if="scope.row.committee">
                    <i
                      v-if="scope.row.voteTrend === 1"
                      class="iconfont el-ui-rise text-xs text-success ml-1"
                    ></i>
                    <i
                      v-else-if="scope.row.voteTrend === 2"
                      class="iconfont el-ui-Decline text-xs text-error ml-1"
                    ></i>
                    <i
                      v-else
                      class="iconfont el-ui-Refuse text-xs text-dimGray ml-1"
                    ></i>
                  </template>
                </div>
                <div
                  v-if="scope.row.voteRate !== '0'"
                  class="meta-honor-rate"
                  :class="{
                    'text-ashy': !scope.row.committee
                  }"
                >
                  <el-progress
                    :color="primaryColor"
                    :text-inside="true"
                    :stroke-width="14"
                    :percentage="Number(scope.row.voteRate)"
                  ></el-progress>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('node.cash')">
              <template #default="scope">
                <span
                  :class="{
                    'text-ashy': !scope.row.committee
                  }"
                >
                  {{ util.formatFixed(scope.row.staking) }}
                </span>
                <span
                  class="ml-1 text-xs"
                  :class="{
                    'text-ashy': !scope.row.committee
                  }"
                >
                  {{ $t('page.symbol') }}
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('node.dao')">
              <template #default="scope">
                <span
                  v-if="scope.row.frontCommittee"
                  :class="{
                    'text-ashy': !scope.row.committee
                  }"
                >
                  {{ $t('node.front') }}
                </span>
                <span
                  v-if="scope.row.frontCommittee"
                  class="chain-account-item-symbol"
                >
                  ,
                </span>
                <span
                  v-if="scope.row.committee"
                  :class="{
                    'text-ashy': !scope.row.committee
                  }"
                >
                  {{ $t('node.current') }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="">
              <template #default="scope">
                <div @click="handleOpenVate(scope.row.id, scope.row.name)">
                  <span
                    v-if="Number(scope.row.myVote) === 0"
                    class="inline-block px-2 h-6 leading-6 text-center text-xs rounded bg-blue text-white border-blue cursor-pointer"
                  >
                    {{ $t('node.votes') }}
                  </span>
                  <div
                    v-else
                    class="inline-block px-2 text-xs py-0.5 text-center rounded text-light-blue border border-light-blue hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue cursor-pointer"
                  >
                    <div>{{ util.format(scope.row.myVote) }}</div>
                    <div>{{ $t('node.voted') }}</div>
                  </div>
                </div>
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
            :current-page="Number(honorList.pageNum.page)"
            :page-size="Number(honorList.pageNum.limit)"
            :total="Number(honorList.pageNum.total)"
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
    <honor-vote
      :honor-id="honorId"
      :is-dialog="isDialog"
      :honor-name="honorName"
      @close="handeClose"
      @confirm="handleConfirm"
    ></honor-vote>
  </div>
</template>
