<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
import util from '@/plugins/util';
import ETH from '@/plugins/ethereum/';

const props = defineProps({
  showEthNetwork: {
    type: Object,
    default: () => {}
  }
});
const loading = ref(false);
const { showEthNetwork } = toRefs(props);
console.log(showEthNetwork.value);
const token = ref('');
// console.log(JSON.stringify(showEthNetwork));
const { chainId, rpcUrl, apikey, api } = showEthNetwork.value;
const tokenList = reactive({ list: [] }) as any;
const { privateKey } = util.getCache('current');
// const { address, apikey, api, getTokenBalance } = eth.value;

const eth = new ETH(privateKey, rpcUrl, api, apikey);
console.log(eth);
const { address } = eth;
const arrCurrency = util.getCache(`${address}-${chainId}`)
  ? util.getCache(`${address}-${chainId}`)
  : [];
console.log(arrCurrency.length);
const i = 0;
const list: any = [];
const handleCurrencyList = async (i: number) => {
  if (arrCurrency.length) {
    // util.showLoading();
    loading.value = true;
    if (i <= arrCurrency.length - 1) {
      console.log(`i=${i}`);
      console.log(arrCurrency[i]);
      const contractaddress = arrCurrency[i].address;
      const { decimals } = arrCurrency[i];
      const balance = await eth.getTokenBalance(
        eth.api,
        contractaddress,
        address,
        apikey,
        decimals
      );
      arrCurrency[i].balance = balance;
      arrCurrency[i].address = address;
      arrCurrency[i].contractAddress = contractaddress;
      tokenList.list[i] = arrCurrency[i];
      list.push(arrCurrency[i]);
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
const handleSearch = () => {
  const val = token.value;
  console.log(val);
  console.log(list);
  if (val) {
    const reg = new RegExp(val.toLowerCase());
    const arr = list.filter((item: any) => {
      const boo =
        reg.test(item.name.toLowerCase()) ||
        reg.test(item.name.toUpperCase()) ||
        reg.test(item.symbol.toLowerCase()) ||
        reg.test(item.symbol.toUpperCase());
      // const boo = item.name.indexOf(val) > -1 || item.name.indexOf(val) > -1;
      return boo;
    });
    tokenList.list = arr;
  } else {
    tokenList.list = list;
  }
};
</script>
<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="w-full"
  >
    <template v-if="list.length > 0">
      <div class="flex">
        <div class="w-30 form-box">
          <el-input
            v-model="token"
            class="placeholder-place"
            type="text"
            autocomplete="off"
            :placeholder="$t('eth.tips')"
            clearable
          />
        </div>
        <el-button
          type="primary"
          class="py-4 text-sm bg-btn text-white border-btn mb-3 ml-3"
          @click="handleSearch"
        >
          {{ $t('eth.search') }}
        </el-button>
      </div>
      <div v-if="tokenList.list.length" class="flex justify-between flex-wrap">
        <div
          v-for="item in tokenList.list"
          :key="item.name"
          class="w-49 p-20px bg-basic-box rounded-2xl mb-20px shadow-xl"
        >
          <h3 class="mb-20px text-muted flex justify-between items-center">
            <span>{{ item.name }}</span>
            <!--  <span class="text-sm">{{ item.type }}</span> -->
          </h3>
          <div class="flex justify-between">
            <div>
              <div class="w-8 mb-3">
                <img
                  v-if="item.logoURI"
                  :src="item.logoURI"
                  alt="coin"
                  class="w-8 h-8 rounded-full"
                />
                <img
                  v-else
                  src="@/assets/image/tokens/other.png"
                  alt="coin"
                  class="w-8 h-8 rounded-full"
                />
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
                class="block w-full h-10 leading-10 text-center text-sm rounded bg-btn text-white border-btn mb-3 ml-0"
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
      <div
        v-else
        class="w-full bg-basic-box rounded-3xl p-20 flex justify-center"
      >
        <img src="@/assets/image/no-data.png" alt="no-data" />
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
