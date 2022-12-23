<script setup lang="ts">
import { ref, toRefs, inject, onMounted, computed, watch } from 'vue';
import { axiosType } from '@/plugins/dataType';
import Chart from '@/plugins/echarts';
import util from '@/plugins/util';
import { handleTimeUTC } from '@/plugins/day';
import store from '@/store';

const nftVisible = ref(false);
const theme = computed(() => {
  return store.getters.postTheme;
});
const axios = inject('axios') as axiosType;
const props = defineProps({
  account: {
    type: String,
    default: () => ''
  }
});

const { account } = toRefs(props);
const nftParams = {
  wallet: account.value
};
const handleNftIncome = async (params: any) => {
  const chart = new Chart('nftLine');
  console.log(chart);
  if (chart.dom) {
    const res = await axios.post('key_income_day', params, 'walletserver');
    console.log(JSON.stringify(res));
    if (res.code === 0 && res.data) {
      const time = res.data.map((item: any) => {
        return handleTimeUTC(item.time);
      });
      const amount = res.data.map((item: any) => {
        return `${util.formatUnits(item.amount)}`;
      });
      console.log(time, amount);
      chart.lineChart(time, amount);
    }
  }
};
onMounted(() => {
  handleNftIncome(nftParams);
});
const handleHow = () => {
  nftVisible.value = true;
};
const handleClose = () => {
  nftVisible.value = false;
};
watch(
  () => theme.value,
  () => {
    handleNftIncome(nftParams);
  },
  {
    immediate: true
  }
);
</script>
<template>
  <div class="w-full">
    <div class="flex justify-between text-first">
      <span>{{ $t('home.nftmin') }}</span>
      <span class="cursor-pointer" @click="handleHow">
        {{ $t('home.how') }}
      </span>
    </div>
    <div id="nftLine" class="w-full" style="height: 350px"></div>
    <el-dialog
      v-model="nftVisible"
      class="bg-basic-box"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
      center
      :append-to-body="true"
      :before-close="handleClose"
    >
      <template #header>
        <h3 class="font-semibold text-first">{{ $t('home.how') }}</h3>
      </template>
      <div class="mb-3">
        {{ $t('home.network') }}
      </div>
      <h4 class="text-first mb-2">{{ $t('home.top') }}</h4>
      <div class="mb-3">
        {{ $t('home.member') }}
      </div>
      <h4 class="mb-2 text-first">{{ $t('home.value') }}</h4>
      <div class="mb-5">
        {{ $t('home.mining') }}
      </div>
    </el-dialog>
  </div>
</template>
