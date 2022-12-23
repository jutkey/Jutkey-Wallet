<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, reactive, Ref } from 'vue';
import axios from 'axios';
import qs from 'qs';
import util from '@/plugins/util';
import networks from '@/plugins/ethereum/data/network';
import ETH from '@/plugins/ethereum';
import { handleSecondUTC, handleSecond } from '@/plugins/day';
import { recordType } from '@/plugins/dataType';

const dataing = ref(false);
const { account, privateKey } = util.getCache('current');
const showEthNetwork = util.getCache('showEthNetwork');
console.log(showEthNetwork);
const isEth = ref(true);
const tokenList = reactive({ list: [] }) as any;
const arrRecord = reactive({
  list: [],
  pageNum: {
    total: 1,
    offset: 10
  }
});
const currentNetWork = ref({}) as any;
const balance = ref('') as Ref<string>;
const ethPrice = ref('') as Ref<string>;
const loading = ref(false);
if (showEthNetwork) {
  currentNetWork.value = showEthNetwork;
} else {
  const [firstItem] = networks;
  currentNetWork.value = firstItem;
}
console.log(currentNetWork.value);
console.log(account);
const { api, chainId, rpcUrl, apikey, brower } = currentNetWork.value;
console.log(brower);
const eth = new ETH(privateKey, rpcUrl, api, apikey);
console.log(eth);
const { address } = eth;
console.log(brower);
const handleGetBalance = async (address: string, apikey: string) => {
  balance.value = (await eth.getBalance(address, apikey)) || '0';
  // console.log(price);
  console.log(ethPrice.value);
};
handleGetBalance(address, eth.apikey);
console.log(address, chainId);
const arrCurrency = util.getCache(`${address}-${chainId}`)
  ? util.getCache(`${address}-${chainId}`)
  : [];
console.log(arrCurrency.length);
const i = 0;
const handleCurrencyList = async (i: number) => {
  if (arrCurrency.length) {
    loading.value = true;
    if (i <= arrCurrency.length - 1) {
      console.log(`i=${i}`);
      console.log(arrCurrency[i]);
      const contractaddress = arrCurrency[i].address;
      const { address } = eth;
      const { decimals } = arrCurrency[i];
      const balance = await eth.getTokenBalance(
        api,
        contractaddress,
        address,
        apikey,
        decimals
      );
      arrCurrency[i].balance = balance;
      arrCurrency[i].address = address;
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
const objRecord: recordType = {
  address,
  module: 'account',
  action: 'txlist',
  startblock: 0,
  endblock: 999999999,
  page: 1,
  offset: 6,
  sort: 'desc',
  apikey
};
const objTokenRecord: recordType = {
  address,
  contractaddress: '',
  module: 'account',
  action: 'tokentx',
  startblock: 0,
  endblock: 999999999,
  page: 1,
  offset: 6,
  sort: 'desc',
  apikey
};
const handletradeList = async (params: recordType) => {
  dataing.value = true;
  const res = (await axios.post(`${eth.api}`, qs.stringify(params))) as any;
  console.log(res.data);
  if (res.data.status === '1') {
    arrRecord.list = res.data.result;
    console.log(arrRecord);
  } else {
    arrRecord.list = [];
  }
  dataing.value = false;
  // util.closeLoading();
};
handletradeList(objRecord);
const handleChangeToken = (params: any) => {
  console.log(params);
  if (params.contractAddress) {
    objTokenRecord.contractaddress = params.contractAddress;
    handletradeList(objTokenRecord);
    isEth.value = false;
  } else {
    handletradeList(objRecord);
    isEth.value = true;
  }
};
</script>
<template>
  <div class="w-full flex justify-between mb-20px">
    <div class="w-49 p-20px bg-basic-box rounded-lg shadow-xl">
      <span class="text-first">{{ $t('nav.eth') }}</span>
      <el-scrollbar :max-height="350">
        <div
          v-loading="loading"
          class="my-5"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <div class="flex items-center justify-between mb-3">
            <div
              class="flex items-center flex-1 cursor-pointer hover:text-blue"
              @click="handleChangeToken('eth')"
            >
              <img
                v-if="currentNetWork.logoURI"
                :src="currentNetWork.logoURI"
                alt="eth"
                class="w-6 h-6 rounded-full"
              />
              <img
                v-else
                src="@/assets/image/evm/other.png"
                alt="eth"
                class="w-6 h-6 rounded-full"
              />
              <span class="ml-1">{{ currentNetWork.symbol }}</span>
            </div>
            <div>
              <span>{{ balance }}</span>
              <span class="text-xs ml-1">{{ currentNetWork.symbol }}</span>
            </div>
          </div>
          <div
            v-for="(item, index) in tokenList.list"
            :key="index"
            class="flex items-center justify-between mb-3"
          >
            <div
              class="flex items-center flex-1 cursor-pointer hover:text-blue"
              @click="handleChangeToken(item)"
            >
              <img
                v-if="item.logoURI"
                :src="item.logoURI"
                alt="coin"
                class="w-6 h-6 rounded-full"
              />
              <img
                v-else
                src="@/assets/image/tokens/other.png"
                alt="eth"
                class="w-6 h-6 rounded-full"
              />
              <span class="ml-1">{{ item.name }}</span>
            </div>
            <div>
              <span>{{ item.balance }}</span>
              <span class="text-xs ml-1">{{ item.symbol }}</span>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div
      v-loading="dataing"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="w-49 p-20px bg-basic-box rounded-lg shadow-xl"
    >
      <div v-show="isEth" class="w-full">
        <div v-if="arrRecord.list.length" class="table-box min-h-300">
          <el-table :data="arrRecord.list" stripe style="width: 100%">
            <el-table-column label="Txn Hash" show-overflow-tooltip>
              <template #default="scope">
                <a
                  :href="`${brower}/tx/${scope.row.hash}`"
                  target="_blank"
                  class="hover:text-blue"
                >
                  {{ scope.row.hash }}
                </a>
              </template>
            </el-table-column>
            <el-table-column label="Block" align="center">
              <template #default="scope">
                <a
                  :href="`${brower}/block/${scope.row.blockNumber}`"
                  target="_blank"
                  class="hover:text-blue"
                >
                  {{ scope.row.blockNumber }}
                </a>
              </template>
            </el-table-column>
            <el-table-column label="Time">
              <template #default="scope">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="`${handleSecond(scope.row.timeStamp)}`"
                  placement="bottom"
                >
                  <span class="text-xs">
                    {{ handleSecondUTC(scope.row.timeStamp) }}
                  </span>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--<el-table-column label="From" show-overflow-tooltip>
            <template #default="scope">
              <div class="flex justify-between items-center">
                <a
                  class="hover:text-blue inline-block truncate"
                  :href="`${eth.brower}/address/${scope.row.from}`"
                  target="_blank"
                >
                  {{ scope.row.from }}
                </a>
                <span
                  v-if="scope.row.from === address"
                  class="text-warn bg-bg-warn text-xs font-semibold py-1 w-16 ml-3 rounded-sm text-center"
                >
                  Out
                </span>
                <span
                  v-else
                  class="text-success bg-bg-success text-xs font-semibold py-1 w-16 ml-3 rounded-sm text-center"
                >
                  In
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="To" show-overflow-tooltip>
            <template #default="scope">
              <a
                :href="`${eth.brower}/address/${scope.row.to}`"
                target="_blank"
                class="hover:text-blue"
              >
                {{ scope.row.to }}
              </a>
            </template>
          </el-table-column> -->
            <el-table-column label="value" align="center">
              <template #default="scope">
                <span>
                  {{ Number(eth.decimals(scope.row.value, '18')) }}
                </span>
                <span class="ml-1 text-xs">{{ currentNetWork.symbol }}</span>
              </template>
            </el-table-column>
            <!--  <el-table-column align="center">
            <template #header>
              <el-tooltip
                class="item"
                effect="dark"
                content="(Gas Price * Gas Used by Txns) in Ether"
                placement="bottom"
              >
                <span class="multi-record-header">Txn Fee</span>
              </el-tooltip>
            </template>
            <template #default="scope">
              <span class="text-xs">
                {{
                  Number(
                    eth.decimals(
                      String(
                        parseFloat(scope.row.gasPrice) *
                          parseFloat(scope.row.gasUsed)
                      ),
                      '18'
                    )
                  )
                }}
              </span>
            </template>
          </el-table-column> -->
          </el-table>
        </div>
        <div
          v-else
          class="w-full bg-basic-box rounded-3xl p-20 flex justify-center"
        >
          <img src="@/assets/image/no-data.png" alt="no-data" />
        </div>
      </div>
      <div v-show="!isEth" class="w-full">
        <div v-if="arrRecord.list.length" class="table-box min-h-300">
          <el-table :data="arrRecord.list" stripe style="width: 100%">
            <el-table-column label="Txn Hash" show-overflow-tooltip>
              <template #default="scope">
                <a
                  :href="`${brower}/tx/${scope.row.hash}`"
                  target="_blank"
                  class="hover:text-blue"
                >
                  {{ scope.row.hash }}
                </a>
              </template>
            </el-table-column>
            <el-table-column label="Time">
              <template #default="scope">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="`${handleSecond(scope.row.timeStamp)}`"
                  placement="bottom"
                >
                  <span>
                    {{ handleSecondUTC(scope.row.timeStamp) }}
                  </span>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--  <el-table-column label="From" show-overflow-tooltip>
              <template #default="scope">
                <div class="flex justify-between items-center">
                  <a
                    class="hover:text-blue inline-block truncate"
                    :href="`${eth.brower}/address/${scope.row.from}`"
                    target="_blank"
                  >
                    {{ scope.row.from }}
                  </a>
                  <span
                    v-if="scope.row.from === address"
                    class="text-warn bg-bg-warn text-xs font-semibold py-1 w-16 ml-3 rounded-sm text-center"
                  >
                    Out
                  </span>
                  <span
                    v-else
                    class="text-success bg-bg-success text-xs font-semibold py-1 w-16 ml-3 rounded-sm text-center"
                  >
                    In
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="To" show-overflow-tooltip>
              <template #default="scope">
                <a
                  :href="`${eth.brower}/address/${scope.row.to}`"
                  target="_blank"
                  class="hover:text-blue"
                >
                  {{ scope.row.to }}
                </a>
              </template>
            </el-table-column> -->
            <el-table-column label="value" align="center">
              <template #default="scope">
                <span>
                  {{ eth.decimals(scope.row.value, scope.row.tokenDecimal) }}
                </span>
                <span class="ml-1 text-xs">{{ scope.row.tokenSymbol }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template #header>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="(Gas Price * Gas Used by Txns) in Ether"
                  placement="bottom"
                >
                  <span class="multi-record-header">Token</span>
                </el-tooltip>
              </template>
              <template #default="scope">
                <span>
                  {{ scope.row.tokenName }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div
          v-else
          class="w-full bg-basic-box rounded-3xl p-20 flex justify-center"
        >
          <img src="@/assets/image/no-data.png" alt="no-data" />
        </div>
      </div>
      <div v-show="arrRecord.list.length" class="text-center">
        <a
          :href="`${brower}/address/${address}`"
          class="hover:text-blue inline-block"
          target="_blank"
        >
          {{ $t('eth.see') }}
        </a>
      </div>
    </div>
  </div>
</template>
