<script setup lang="ts">
import { ref, reactive, watch, inject, Ref } from 'vue';
import { useRoute } from 'vue-router';
import util from '@/plugins/util';
import { honorDeatils, axiosType } from '@/plugins/dataType';
import { handleWalletserver, handleBlockexplorer } from '@/plugins/common';
import HonorVote from '@/components/honor/HonorVote.vue';
import HonorStake from '@/components/honor/HonorStake.vue';
import HonorDao from '@/components/honor/HonorDao.vue';
import HonorBlock from '@/components/honor/HonorBlock.vue';

const route = useRoute();
const axios = inject('axios') as axiosType;
const isVote = ref(false) as Ref<boolean>;
const isStake = ref(false) as Ref<boolean>;
const honorId = ref(0) as Ref<number>;
const honorName = ref('') as Ref<string>;
const honorData = reactive({ info: {} }) as any;
const { account } = util.getCache('current');
console.log(account);
const paramsDetails = {
  wallet: account,
  search: 1
};
const handleHonorDetails = async (params: honorDeatils) => {
  util.showLoading();
  const res = await axios.post('/node_detail', params, 'walletserver');
  console.log(res);
  if (res.code === 0 && res.data) {
    honorData.info = res.data;
  }
  util.closeLoading();
};
watch(
  () => route.path,
  () => {
    if (route.params.id && route.name === 'HonorId') {
      paramsDetails.search = Number(route.params.id);
      honorId.value = Number(route.params.id);
      handleHonorDetails(paramsDetails);
    }
  },
  {
    immediate: true
  }
);
const handleOpenStake = (id: number, name: string) => {
  console.log(id);
  isStake.value = true;
  honorId.value = id;
  honorName.value = name;
};
const handleOpenVate = (id: number, name: string) => {
  console.log(id);
  isVote.value = true;
  honorId.value = id;
  honorName.value = name;
};
const handeClose = () => {
  isVote.value = false;
  isStake.value = false;
};
const handleConfirm = () => {
  handleHonorDetails(paramsDetails);
  isVote.value = false;
  isStake.value = false;
};
const url = handleWalletserver();
const explorer = handleBlockexplorer();
</script>
<template>
  <div class="w-full">
    <div
      v-if="honorData.info.id"
      class="w-full flex justify-between bg-basic-box p-20px rounded mb-20px text-sm"
    >
      <div class="flex">
        <div class="w-20">
          <img :src="`${url}${honorData.info.iconUrl}`" alt="logo" />
        </div>
        <div class="node-head-left-content">
          <div class="mb-1">
            <a
              :href="`${explorer}/node/honor/${honorId}`"
              target="_blank"
              class="hover:text-blue"
            >
              {{ honorData.info.name }}
            </a>
            <el-tooltip
              class="item"
              effect="dark"
              :content="honorData.info.apiAddress"
              placement="bottom"
            >
              <i class="iconfont el-ui-Group17 cursor-pointer ml-1"></i>
            </el-tooltip>
          </div>
          <a
            :href="`${honorData.info.website}`"
            target="_blank"
            class="block mb-1 hover:text-blue"
          >
            {{ honorData.info.website }}
          </a>
          <a
            class="block mb-1 hover:text-blue"
            :href="`${explorer}/blockchain/block/${honorData.info.account}`"
            target="_blank"
          >
            <span>{{ honorData.info.account }}</span>
          </a>
        </div>
      </div>
      <div class="">
        <div class="flex">
          <router-link
            v-if="Number(honorData.info.myStaking) !== 0"
            :to="{ name: 'StakeRecord', params: { id: honorData.info.id } }"
            class="pl-2 mb-2 hover:text-blue ml-2"
          >
            <span>{{ $t('node.already') }}</span>
            <span v-if="honorData.info.pending">
              ({{ $t('node.unclaimed') }})
            </span>
            <span>:{{ util.formatFixed(honorData.info.myStaking) }}</span>
            <span class="ml-1 text-xs">
              {{ $t('page.symbol') }}
            </span>
          </router-link>
          <router-link
            v-if="Number(honorData.info.myVote) !== 0"
            :to="{ name: 'VoteRecord', params: { id: honorData.info.id } }"
            class="pl-2 mb-2 hover:text-blue"
          >
            <span>{{ $t('node.alvote') }}:</span>
            <span>{{ honorData.info.myVote }}</span>
            <span class="ml-1 text-xs">
              {{ $t('page.symbol') }}
            </span>
          </router-link>
        </div>
        <div class="flex h-20">
          <div class="p-2 border border-basic ml-3 rounded">
            <div class="flex mb-4 items-center">
              <span>{{ $t('node.packnum') }}:</span>
              <span>{{ util.format(String(honorData.info.packed)) }}</span>
            </div>
            <div>
              {{
                honorData.info.packedRate === ''
                  ? 0
                  : honorData.info.packedRate
              }}%
            </div>
          </div>
          <div class="p-2 border border-basic ml-3 rounded">
            <div class="flex mb-3 items-center">
              <span>{{ $t('node.ranking') }}:</span>
              <span>{{ util.format(String(honorData.info.ranking)) }}</span>
              <div v-if="honorData.info.ranking <= 101" class="meta-honor-vote">
                <i
                  v-if="honorData.info.voteTrend === 1"
                  class="iconfont el-ui-rise text-xs text-success ml-1"
                ></i>
                <i
                  v-else-if="honorData.info.voteTrend === 2"
                  class="iconfont el-ui-Decline text-xs text-error ml-1"
                ></i>
                <i
                  v-else
                  class="iconfont el-ui-Refuse text-xs text-dimGray ml-1"
                ></i>
              </div>
            </div>
            <div class="flex items-center">
              <span>{{ util.format(String(honorData.info.vote)) }}</span>
              <span class="ml-1">
                {{ $t('node.ticket') }}
              </span>
              <span class="ml-2">
                ({{
                  honorData.info.voteRate === '' ? 0 : honorData.info.voteRate
                }}
                %)
              </span>
            </div>
          </div>
          <div class="p-2 border border-basic ml-3 rounded">
            <div class="flex mb-4 items-center">
              <span>{{ $t('node.cash') }}:</span>
              <span>
                {{ util.formatFixed(String(honorData.info.staking)) }}
              </span>
              <span class="ml-1 text-xs">
                {{ $t('page.symbol') }}
              </span>
            </div>
            <div class="flex items-center">
              <span>
                {{
                  honorData.info.stakeRate === ''
                    ? 0
                    : honorData.info.stakeRate
                }}%
              </span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('node.pledge')"
                placement="bottom"
              >
                <i class="iconfont el-ui-Group17 cursor-pointer ml-1"></i>
              </el-tooltip>
            </div>
          </div>
          <div
            v-if="honorData.info.frontCommittee || honorData.info.committee"
            class="p-2 border border-basic rounded ml-3"
          >
            <div v-if="honorData.info.frontCommittee" class="mb-4">
              <span>{{ $t('node.front') }}</span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('node.members')"
                placement="bottom"
              >
                <i class="iconfont el-ui-Group17 cursor-pointer ml-1"></i>
              </el-tooltip>
            </div>
            <div v-if="honorData.info.committee">
              <span>{{ $t('node.current') }}</span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('node.top')"
                placement="bottom"
              >
                <i class="iconfont el-ui-Group17 cursor-pointer ml-1"></i>
              </el-tooltip>
            </div>
          </div>
          <div class="ml-3 w-36 flex flex-wrap content-between">
            <el-button
              type="primary"
              class="block w-full h-8 text-center text-xs rounded bg-btn text-white border-btn"
              @click="handleOpenStake(honorData.info.id, honorData.info.name)"
            >
              {{ $t('node.act') }}
            </el-button>
            <el-button
              type="primary"
              class="block w-full h-8 text-center text-xs rounded bg-btn text-white border-btn ml-0"
              @click="handleOpenVate(honorData.info.id, honorData.info.name)"
            >
              {{ $t('node.for') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- dao manage-->
    <honor-dao :honor-id="honorId"></honor-dao>
    <!-- honor block -->
    <honor-block :honor-id="honorId"></honor-block>
    <honor-vote
      :honor-id="honorId"
      :is-dialog="isVote"
      :honor-name="honorName"
      @close="handeClose"
      @confirm="handleConfirm"
    ></honor-vote>
    <honor-stake
      :honor-id="honorId"
      :is-dialog="isStake"
      :honor-name="honorName"
      @close="handeClose"
      @confirm="handleConfirm"
    ></honor-stake>
  </div>
</template>
