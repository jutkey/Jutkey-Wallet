<script setup lang="ts">
import { toRefs, inject, onMounted, computed, watch } from 'vue';
import { axiosType } from '@/plugins/dataType';
import Chart from '@/plugins/echarts';
import util from '@/plugins/util';
import { handleTimeUTC } from '@/plugins/day';
import store from '@/store';

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
        return `${util.formatFixed(item.amount)}`;
      });
      console.log(time, amount);
      chart.lineChart(time, amount);
    }
  }
};
onMounted(() => {
  handleNftIncome(nftParams);
});
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
    <div>{{ $t('home.nftmin') }}</div>
    <div id="nftLine" class="w-full" style="height: 350px"></div>
  </div>
</template>
