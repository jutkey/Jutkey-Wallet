<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { axiosType, balanceParams } from '@/plugins/dataType';
import util from '@/plugins/util';
import { handleI18n } from '@/plugins/i18n';
import contract from '@/plugins/lib';

const router = useRouter();
const axios = inject('axios') as axiosType;
const current = util.getCache('current');
const balance = ref('');
const multiple = ref(0);
const lock = ref('');
const airdrop: any = ref({});
const speed5 = ref(false);
const speed10 = ref(false);
const speed20 = ref(false);
const total: any = ref('');
const bParams = {
  wallet: current.account,
  ecosystem: 1
};
const handleGetBalance = async (params: balanceParams) => {
  const res = await axios.get(`/balance/${current.account}`, params);
  console.log(res);
  total.value = util.formatFixed(res.total);
};
handleGetBalance(bParams);
const handleAirdropInfo = async () => {
  const res = await axios.get(
    `airdrop_info/${current.account}`,
    null,
    'walletserver'
  );
  if (res.code === 0) {
    console.log(res);
    airdrop.value = res.data;
    switch (airdrop.value.now_speed_up) {
      case 5:
        balance.value = airdrop.value.x5_get;
        break;
      case 10:
        balance.value = airdrop.value.x10_get;
        break;
      case 20:
        balance.value = airdrop.value.x20_get;
        break;
      default:
        balance.value = '0';
        break;
    }
  }
};
handleAirdropInfo();
const handleSelect = (num: number) => {
  multiple.value = num;
  console.log(num);
  switch (num) {
    case 2:
      speed5.value = true;
      speed10.value = false;
      speed20.value = false;
      lock.value = util.formatFixed(airdrop.value.x5_lock);
      break;
    case 3:
      speed5.value = false;
      speed10.value = true;
      speed20.value = false;
      lock.value = util.formatFixed(airdrop.value.x10_lock);
      break;
    case 5:
      speed5.value = false;
      speed10.value = false;
      speed20.value = true;
      lock.value = util.formatFixed(airdrop.value.x20_lock);
      break;
    default:
      break;
  }
};
const reload = inject('reload') as Function;
const handleStartAccelerat = () => {
  if (!multiple.value) {
    return ElMessage.error(handleI18n('home.select'));
  }
  if (Number(lock.value) >= Number(total.value)) {
    return ElMessage.error(handleI18n('user.amountShort'));
  }
  util.checkTradepass(() => {
    util.showLoading();
    const params = { contractName: 'SpeedAirdrop', Speed: multiple.value };
    contract.tokensSend(params, (res: any, status: string) => {
      if (status === 'error') {
        console.log(res);
        ElMessage.error(res.errmsg.error);
      } else if (status === 'loading') {
        ElMessage.success(handleI18n('user.chain'));
      } else if (status === 'success') {
        ElMessage.success(handleI18n('user.dosuccess'));
        reload();
      } else {
        ElMessage.error(res.msg);
      }
      util.closeLoading();
    });
  });
};
</script>
<template>
  <div class="W-full">
    <div class="mb-3 flex justify-between font-semibold">
      <span @click="router.go(-1)">
        <i class="iconfont el-ui-back pr-20px text-2xl cursor-pointer"></i>
      </span>
    </div>
    <div class="bg-basic-box rounded form-box">
      <div class="w-1/2 m-auto p-20px">
        <h2 class="text-center mb-10 text-first">{{ $t('home.speed') }}</h2>
        <div
          class="flex items-center mb-5 pb-5 justify-around border-b border-btn"
        >
          <div class="text-center">
            <h4 class="text-first mb-3">
              {{ $t('home.airdroptotal') }}
            </h4>
            <div class="text-center">
              <span>{{ util.formatFixed(airdrop.total) }}</span>
              <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
            </div>
          </div>
          <div class="text-center">
            <h4 class="text-first mb-3">
              {{ $t('home.allock') }}
            </h4>
            <div class="text-center">
              <span>{{ util.formatFixed(airdrop.is_get) }}</span>
              <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
            </div>
          </div>
        </div>
        <div v-if="airdrop.now_speed_up === 1" class="">
          <h3 class="text-first">{{ $t('home.stacklock') }}</h3>
          <div class="mb-5 text-xs">
            {{ $t('home.startlock', { num: airdrop.surplus }) }}
          </div>
          <div class="flex items-center mb-5 pb-5 justify-around">
            <div class="text-center">
              <h4 class="text-first mb-3">
                {{ $t('home.walllock') }}
              </h4>
              <div class="text-center">
                <span>{{ util.formatFixed(airdrop.lock) }}</span>
                <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
              </div>
            </div>
            <div class="text-center">
              <h4 class="text-first mb-3">
                {{ $t('home.current') }}
              </h4>
              <div class="text-center">
                <span>{{ util.formatFixed(airdrop.per_get) }}</span>
                <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between mb-2">
            <div class="w-2/5">
              <div
                class="flex border border-btn cursor-pointer"
                :class="{ 'border-active': speed5 }"
                @click="handleSelect(2)"
              >
                <div
                  class="border-r border-btn p-3"
                  :class="{ 'border-active': speed5 }"
                >
                  <div>{{ $t('home.accelerate') }}</div>
                  <div>X 5</div>
                </div>
                <div class="p-3">
                  <div>{{ $t('node.cash') }}</div>
                  <div>
                    <span>{{ util.formatFixed(airdrop.x5_lock) }}</span>
                    <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div>{{ $t('home.twelve', { num: airdrop.x5_period }) }}</div>
                <div>
                  <span>{{ util.formatFixed(airdrop.x5_get) }}</span>
                  <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
                </div>
              </div>
            </div>
            <div class="w-2/5">
              <div
                class="flex border border-btn cursor-pointer"
                :class="{ 'border-active': speed10 }"
                @click="handleSelect(3)"
              >
                <div
                  class="border-r border-btn p-3"
                  :class="{ 'border-active': speed10 }"
                >
                  <div>{{ $t('home.accelerate') }}</div>
                  <div>X 10</div>
                </div>
                <div class="p-3">
                  <div>{{ $t('node.cash') }}</div>
                  <div>
                    <span>{{ util.formatFixed(airdrop.x10_lock) }}</span>
                    <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div>{{ $t('home.twelve', { num: airdrop.x10_period }) }}</div>
                <div>
                  <span>{{ util.formatFixed(airdrop.x10_get) }}</span>
                  <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between mb-5">
            <div class="w-full cursor-pointer">
              <div
                class="flex border border-btn"
                :class="{ 'border-active': speed20 }"
                @click="handleSelect(5)"
              >
                <div
                  class="border-r border-btn p-3"
                  :class="{ 'border-active': speed20 }"
                >
                  <div>{{ $t('home.accelerate') }}</div>
                  <div>X 20</div>
                </div>
                <div class="p-3 text-center flex-1">
                  <div>{{ $t('node.cash') }}</div>
                  <div>
                    <span>{{ util.formatFixed(airdrop.x20_lock) }}</span>
                    <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <span>
                  {{ $t('home.twelve', { num: airdrop.x20_period }) }}
                </span>
                <span class="ml-1">
                  {{ util.formatFixed(airdrop.x20_get) }}
                </span>
                <span class="ml-1 text-xs">{{ $t('page.symbol') }}</span>
              </div>
            </div>
          </div>
          <div class="text-center mb-5">
            <el-button
              :disabled="!airdrop.can_speed_up"
              type="primary"
              class="text-center text-sm rounded bg-btn text-white border-btn px-10 py-5"
              @click="handleStartAccelerat"
            >
              {{ $t('home.start') }}
            </el-button>
          </div>
          <div class="mb-2 text-center">{{ $t('home.gas') }}</div>
        </div>
        <div v-else>
          <div class="text-center mb-2">{{ $t('home.open') }}</div>
          <div class="text-center">
            <span>
              {{
                $t('home.estimate', {
                  num: airdrop.next_period,
                  balance: util.formatFixed(balance)
                })
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
