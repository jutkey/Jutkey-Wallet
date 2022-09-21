<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
import util from '@/plugins/util';

const props = defineProps({
  showEthNetwork: {
    type: Object,
    default: () => {}
  },
  eth: {
    type: Object,
    default: () => {}
  }
});
const loading = ref(false);
const { showEthNetwork, eth } = toRefs(props);
console.log(JSON.stringify(showEthNetwork));
const tokenList = reactive({ list: [] }) as any;
const { address, apikey, api, getTokenBalance } = eth.value;
console.log(eth.value);
const arrCurrency = util.getCache(address) ? util.getCache(address) : [];
console.log(arrCurrency.length);
const i = 0;
const handleCurrencyList = async (i: number) => {
  if (arrCurrency.length) {
    // util.showLoading();
    loading.value = true;
    if (i <= arrCurrency.length - 1) {
      console.log(`i=${i}`);
      console.log(arrCurrency[i]);
      const contractaddress = arrCurrency[i].address;
      const { address } = eth.value;
      const { decimals } = arrCurrency[i];
      const balance = await getTokenBalance(
        api,
        contractaddress,
        address,
        apikey,
        decimals
      );
      arrCurrency[i].balance = balance;
      arrCurrency[i].address = eth.value.address;
      arrCurrency[i].contractAddress = contractaddress;
      tokenList.list[i] = arrCurrency[i];
      i += 1;
      handleCurrencyList(i);
    } else {
      i = 0;
      loading.value = false;
      // util.closeLoading();
      return false;
    }
  }
};
handleCurrencyList(i);
</script>
<template>
  <div v-loading="loading" class="w-full">
    <template v-if="tokenList.list.length > 0">
      <div class="flex justify-between flex-wrap">
        <div
          v-for="item in tokenList.list"
          :key="item.name"
          class="w-49 p-20px bg-basic-box rounded-2xl mb-20px"
        >
          <h3 class="mb-20px text-muted flex justify-between items-center">
            <span>{{ item.name }}</span>
            <span class="text-sm">{{ item.type }}</span>
          </h3>
          <div class="flex justify-between">
            <div>
              <div class="w-12 mb-3">
                <img v-if="item.logoURI" :src="item.logoURI" alt="coin" />
                <i
                  v-else
                  class="iconfont el-ui-a-Ecology1 text-basic text-xl"
                ></i>
              </div>
              <div class="font-semibold text-xl">
                <span>{{ item.balance }}</span>
                <span class="ml-1 text-sm">{{ item.symbol }}</span>
              </div>
            </div>
            <div class="ml-auto w-32">
              <router-link
                :to="{
                  name: 'TokenTransfer',
                  params: { contractAddress: item.contractAddress }
                }"
                class="block w-full h-10 leading-10 text-center text-sm rounded bg-blue text-white border-blue mb-3 ml-0"
              >
                {{ $t('user.trade') }}
              </router-link>
              <router-link
                :to="{
                  name: 'TokenRecord',
                  params: { contractAddress: item.contractAddress }
                }"
                class="w-full block h-10 leading-10 text-center text-sm rounded text-light-blue border border-light-blue mb-3 ml-0 hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue"
              >
                {{ $t('user.record') }}
              </router-link>
            </div>
          </div>
        </div>
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
