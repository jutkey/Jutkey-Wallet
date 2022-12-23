<script setup lang="ts">
import { ref, reactive, Ref, unref } from 'vue';
// eslint-disable-next-line no-unused-vars
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';
// eslint-disable-next-line no-unused-vars
import { ClickOutside as vClickOutside } from 'element-plus';
import util from '@/plugins/util';
import networks from '@/plugins/ethereum/data/network';
// eslint-disable-next-line no-unused-vars
import NetworkPopover from '@/components/ethereum/NetworkPopover.vue';
import ETH from '@/plugins/ethereum/';
import DialogDefault from '@/components/DialogDefault.vue';
import { currencyType } from '@/plugins/dataType';
import AddCurrency from '@/components/ethereum/AddCurrency.vue';

console.log(networks);
const arrNetwork = reactive({
  showEthNetwork: {},
  arrEthNetwork: []
}) as any;
const objNetwork = reactive({ network: {} }) as any;
// eslint-disable-next-line no-unused-vars
const isArrow = ref(true) as Ref<boolean>;
const balance = ref('') as Ref<string>;
const address = ref('') as Ref<string>;
const isDialog = ref(false) as Ref<boolean>;
const addCurrency = ref<InstanceType<typeof AddCurrency>>();
const netPopover = ref();
const showEthNetwork = util.getCache('showEthNetwork');
// util.removeCache('showEthNetwork');
const handleNetwork = () => {
  arrNetwork.arrEthNetwork = [];
  const ethNetwork = util.getCache('ethNetwork');
  console.log(ethNetwork);
  const arrEthNetwork = ethNetwork ? [...networks, ...ethNetwork] : networks;
  const arrAll = util.handleReduce(arrEthNetwork, 'chainId');
  if (showEthNetwork) {
    arrNetwork.showEthNetwork = showEthNetwork;
    arrNetwork.arrEthNetwork = arrAll.map((item: any) => {
      if (item.chainId === showEthNetwork.chainId) {
        item.isSelect = true;
      } else {
        item.isSelect = false;
      }
      return item;
    });
  } else {
    arrNetwork.arrEthNetwork = arrAll.map((item: any, index: number) => {
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
};
handleNetwork();
console.log(arrNetwork);
const { privateKey } = util.getCache('current');
const { api, rpcUrl, apikey, brower } = arrNetwork.showEthNetwork;
const eth = new ETH(privateKey, rpcUrl, api, apikey);
console.log(eth);
address.value = eth.address;

const handleGetNetwork = async () => {
  util.showLoading();
  const network = await eth.getNetWork();
  objNetwork.network = network;
  util.closeLoading();
  console.log(network);
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
  handleNetwork();
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
    const { chainId } = objNetwork.network;
    if (len) {
      const currency: currencyType[] = [];
      console.log(currency);
      checkedList.forEach((item: string) => {
        currencyList.forEach((ele: currencyType) => {
          if (item === ele.address) {
            currency.push(ele);
          }
        });
      });
      const list = util.handleReduce(currency, 'address');
      util.setCache(`${address.value}-${chainId}`, list);
      console.log(currency);
      isDialog.value = false;
    } else {
      util.removeCache(`${address.value}-${chainId}`);
      // ElMessage.warning(handleI18n('eth.select'));
    }
    window.location.reload();
  }
};
// util.removeCache('currency');
</script>
<template>
  <div class="w-full">
    <div class="w-full mb-20px flex">
      <div
        v-popover="netPopover"
        v-click-outside="handlePopover"
        class="flex items-center px-3 h-10 leading-10 text-sm rounded text-light-blue border border-gary ml-auto hover:bg-side hover:border-gary focus:bg-side focus:border-gary cursor-pointer"
        style="width: 250px"
      >
        <span
          class="w-3 bg-dimGray h-3 inline-block rounded-full mr-3"
          :class="{ 'bg-lime': objNetwork.network.chainId !== 0 }"
        ></span>
        <span class="text-xs capitalize truncate" style="width: 180px">
          {{ showEthNetwork.name }}
        </span>
        <el-icon v-show="isArrow" class="el-icon--right" :size="20">
          <arrow-down />
        </el-icon>
        <el-icon v-show="!isArrow" class="el-icon--right" :size="20">
          <arrow-up />
        </el-icon>
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
            :address="address"
            :network-list="(arrNetwork.arrEthNetwork as any)"
          ></network-popover>
        </el-popover>
      </div>
    </div>
    <div class="w-full bg-basic-box flex mb-8 rounded-3xl shadow-xl p-20px">
      <div class="m-3% text-center">
        <div
          class="rounded-full bg-white flex items-center justify-center w-24 h-24 mx-auto"
        >
          <img
            v-if="arrNetwork.showEthNetwork.logoURI"
            :src="arrNetwork.showEthNetwork.logoURI"
            alt="eth"
            class="w-full rounded-full"
          />
          <img
            v-else
            src="@/assets/image/evm/other.png"
            alt="eth"
            class="w-full rounded-full"
          />
        </div>
        <!--  <h3 class="mt-20px text-muted">
          {{ arrNetwork.showEthNetwork.symbol }}
        </h3> -->
        <div class="my-2">
          <a
            :href="`${brower}/address/${address}`"
            class="hover:text-blue inline-block"
            target="_blank"
          >
            {{ address }}
          </a>
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('user.copy')"
            placement="bottom"
          >
            <i
              class="iconfont el-ui-zu291 cursor-pointer text-xl ml-1"
              @click="util.copyText(address)"
            ></i>
          </el-tooltip>
        </div>
      </div>
      <div class="flex flex-auto p-20px my-3%">
        <div class="font-semibold text-xl text-first">
          <span>{{ balance }}</span>
          <span class="ml-1 text-sm">
            {{ arrNetwork.showEthNetwork.symbol }}
          </span>
        </div>
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
    <token-list
      :show-eth-network="arrNetwork.showEthNetwork"
      :eth="eth"
    ></token-list>
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
