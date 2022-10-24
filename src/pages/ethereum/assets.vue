<script setup lang="ts">
import { ref, reactive, Ref, unref } from 'vue';
// eslint-disable-next-line no-unused-vars
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';
// eslint-disable-next-line no-unused-vars
import { ClickOutside as vClickOutside, ElMessage } from 'element-plus';
import util from '@/plugins/util';
import { handleArrNetwork } from '@/plugins/common';
import NetworkPopover from '@/components/ethereum/NetworkPopover.vue';
import ETH from '@/plugins/ethereum/';
import DialogDefault from '@/components/DialogDefault.vue';
import { handleI18n } from '@/plugins/i18n';
import { currencyType } from '@/plugins/dataType';
import TokenList from '@/components/ethereum/TokenList.vue';
import AddCurrency from '@/components/ethereum/AddCurrency.vue';

const network = handleArrNetwork();
console.log(network);
const arrNetwork = reactive({
  showEthNetwork: {},
  arrEthNetwork: []
}) as any;
const objNetwork = reactive({ network: {} }) as any;
const isArrow = ref(true) as Ref<boolean>;
const balance = ref('') as Ref<string>;
const address = ref('') as Ref<string>;
const isDialog = ref(false) as Ref<boolean>;
const addCurrency = ref<InstanceType<typeof AddCurrency>>();
const netPopover = ref();
let mapNetwork = [] as any;
const ethNetwork = util.getCache('ethNetwork');
const showEthNetwork = util.getCache('showEthNetwork');
// util.removeCache('showEthNetwork');
let arrEthNetwork = network;
console.log(arrEthNetwork);
if (ethNetwork) {
  // const arrLocal = JSON.parse(decodeURIComponent(strCurrency));
  const arrAll = arrEthNetwork.concat(ethNetwork);
  console.log(arrAll);
  arrEthNetwork = arrAll;
}
// util.removeCache('showEthNetwork');
const arrNetworkReduce = util.handleReduce(arrEthNetwork);
if (showEthNetwork) {
  arrNetwork.showEthNetwork = showEthNetwork;
  mapNetwork = arrNetworkReduce.map((item: any) => {
    if (item.id === showEthNetwork.id) {
      item.isSelect = true;
    } else {
      item.isSelect = false;
    }
    return item;
  });
} else {
  mapNetwork = arrNetworkReduce.map((item: any, index: number) => {
    if (index === 0) {
      item.isSelect = true;
      arrNetwork.showEthNetwork = item;
      util.setCache('showEthNetwork', item);
    } else {
      item.isSelect = false;
    }
    return item;
  });
}
arrNetwork.arrEthNetwork = mapNetwork;
console.log(arrNetwork);
const { privateKey } = util.getCache('current');
const { api, rpcUrl, apikey } = arrNetwork.showEthNetwork;
const eth = new ETH(privateKey, rpcUrl, api, apikey);
console.log(eth);
address.value = eth.address;

const handleGetNetwork = async () => {
  const network = await eth.getNetWork();
  objNetwork.network = network;
};

handleGetNetwork();
const handleGetBalance = async (address: string, apikey: string) => {
  balance.value = (await eth.getBalance(address, apikey)) || '0';
  console.log(balance.value);
};
handleGetBalance(eth.address, eth.apikey);
// eslint-disable-next-line no-unused-vars
const handlePopover = () => {
  unref(netPopover).popperRef?.delayHide?.();
};
const handleShowPopover = () => {
  isArrow.value = false;
};
const handleHidePopover = () => {
  isArrow.value = true;
};
const handleOpenCurrency = () => {
  isDialog.value = true;
};

const handleClose = () => {
  isDialog.value = false;
};
const handleConfim = () => {
  if (addCurrency.value) {
    const { checkedList, currencyList } = addCurrency.value;
    console.log(checkedList, currencyList);
    const len = checkedList.length;
    console.log(len);
    if (len) {
      const currency = util.getCache(address.value)
        ? util.getCache(address.value)
        : [];
      console.log(currency);
      checkedList.forEach((item: string) => {
        currencyList.forEach((ele: currencyType) => {
          if (item === ele.address) {
            currency.push(ele);
          }
        });
      });
      const list = util.handleReduce(currency, 'address');
      util.setCache(address.value, list);
      console.log(currency);
      isDialog.value = false;
      window.location.reload();
    } else {
      ElMessage.warning(handleI18n('eth.select'));
    }
  }
};
// util.removeCache('currency');
</script>
<template>
  <div class="w-full">
    <!--  <div class="w-full mb-20px flex">
      <div
        v-popover="netPopover"
        v-click-outside="handlePopover"
        class="flex items-center px-3 h-10 leading-10 text-center text-sm rounded text-light-blue border border-light-blue ml-auto hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue cursor-pointer"
      >
        <span
          class="w-3 bg-dimGray h-3 inline-block rounded-full mr-3"
          :class="{ 'bg-lime': objNetwork.network.chainId !== 0 }"
        ></span>
        <span class="text-xs capitalize">{{ objNetwork.network.name }}</span>
        <el-icon v-show="isArrow" class="el-icon--right" :size="20">
          <arrow-down />
        </el-icon>
        <el-icon v-show="!isArrow" class="el-icon--right" :size="20">
          <arrow-up />
        </el-icon>
      </div>
    </div> -->
    <div class="w-full bg-basic-box flex mb-8 rounded-3xl shadow-xl">
      <div class="m-3% text-center">
        <div
          class="rounded-full bg-white flex items-center justify-center w-24 h-24 mx-auto"
        >
          <img
            src="@/assets/image/eth.png"
            alt="eth"
            class="w-full rounded-full"
          />
        </div>
        <h3 class="mt-20px text-muted">ETH</h3>
        <div class="my-2">
          {{ address }}
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('user.copy')"
            placement="bottom"
          >
            <i
              class="iconfont el-ui-zu291 cursor-pointer text-xl"
              @click="util.copyText(address)"
            ></i>
          </el-tooltip>
        </div>
      </div>
      <div class="flex flex-auto p-20px">
        <div class="font-semibold text-xl">
          <span>{{ balance }}</span>
          <span class="ml-1 text-sm">ETH</span>
        </div>
        <div class="ml-auto w-36">
          <el-button
            type="primary"
            class="w-full h-10 text-sm bg-btn text-white border-btn mb-3 ml-0"
            @click="handleOpenCurrency"
          >
            {{ $t('eth.add') }}
          </el-button>
          <router-link
            :to="{
              name: 'EthTransfer',
              params: { address }
            }"
            class="block w-full h-10 leading-10 text-center text-sm rounded bg-btn text-white border-btn mb-3 ml-0"
          >
            {{ $t('user.trade') }}
          </router-link>
          <!--  <el-button
            type="primary"
            class="w-full h-10 block  bg-btn text-sm text-white border-btn mb-3 ml-0"
            @click="handleOpenTrade"
          >
            {{ $t('user.collection') }}
          </el-button> -->
          <router-link
            :to="{
              name: 'EthRecord',
              params: { address }
            }"
            class="w-full block h-10 leading-10 text-center text-sm rounded text-light-blue border border-light-blue mb-3 ml-0 hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue"
          >
            {{ $t('user.record') }}
          </router-link>
        </div>
      </div>
    </div>
    <token-list
      :show-eth-network="arrNetwork.showEthNetwork"
      :eth="eth"
    ></token-list>
    <el-popover
      ref="netPopover"
      trigger="click"
      :title="$t('eth.network')"
      virtual-triggering
      persistent
      width="250px"
      popper-class="bg-basic-box"
      @show="handleShowPopover"
      @hide="handleHidePopover"
    >
      <network-popover
        :network-list="(arrNetwork.arrEthNetwork as any)"
      ></network-popover>
    </el-popover>
    <dialog-default
      :is-dialog="isDialog"
      :title="$t('eth.add')"
      @close="handleClose"
      @confirm="handleConfim"
      @cancel="handleClose"
    >
      <template #default>
        <add-currency ref="addCurrency" :address="eth.address"></add-currency>
      </template>
    </dialog-default>
  </div>
</template>
