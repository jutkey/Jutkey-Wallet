<script setup lang="ts">
import { reactive, watch, toRefs, inject } from 'vue';
import { ElMessage } from 'element-plus';
import { handleI18n } from 'plugins/i18n';
import { balanceData, axiosType, transferParams } from '@/plugins/dataType';
import transfer from '@/plugins/lib';
import util from '@/plugins/util';

const axios = inject('axios') as axiosType;
const balance = reactive({ data: {} as balanceData });
const props = defineProps({
  ecoId: {
    type: Number,
    default: () => 1
  },
  ecoInfo: {
    type: Object,
    default: () => {}
  },
  activeName: {
    type: String,
    default: () => ''
  }
});
const { activeName, ecoId, ecoInfo } = toRefs(props);
console.log(ecoInfo.value);
const { account } = ecoInfo.value;

const bParams = {
  ecosystem: ecoId.value
};
const handleGetBalance = async (params: any) => {
  const res = await axios.get(`/balance/${account}`, params);
  console.log(res);
  balance.data = res;
};
handleGetBalance(bParams);

const handleInto = (str: string) => {
  let params: transferParams = {
    amount: '0',
    type: 'toUtxo',
    ecosystem: 1
  };
  if (str === 'utxo') {
    if (balance.data.amount === '0')
      return ElMessage.error(handleI18n('user.contracterror'));
    params = {
      amount: balance.data.amount,
      type: 'toUtxo',
      ecosystem: ecoId.value
    };
  }
  if (str === 'contract') {
    if (balance.data.utxo === '0')
      return ElMessage.error(handleI18n('user.utxoerror'));

    params = {
      amount: balance.data.utxo,
      type: 'toContract',
      ecosystem: ecoId.value
    };
  }
  util.checkTradepass(() => {
    util.showLoading();
    transfer.accountTransfer(params, (res: any, status: string) => {
      if (status === 'error') {
        console.log(res);
        ElMessage.error(res.errmsg.error);
      } else if (status === 'loading') {
        ElMessage.success(handleI18n('user.chain'));
      } else if (status === 'success') {
        ElMessage.success(handleI18n('user.dosuccess'));
        handleGetBalance(bParams);
      } else {
        ElMessage.error(res.msg);
      }
      util.closeLoading();
    });
  });
};

watch(
  () => activeName.value,
  () => {
    handleGetBalance(bParams);
  }
);
</script>
<template>
  <div class="form-box">
    <div class="text-sm">{{ $t('user.notes') }}</div>
    <div class="flex items-center justify-around mt-5 mb-10">
      <div class="text-center">
        <h4 class="mb-3 text-first">
          <span>{{ util.formatFixed(balance.data.utxo) }}</span>
          <span class="ml-1 text-xs">{{ ecoInfo.tokenSymbol }}</span>
        </h4>
        <h4 class="text-first">{{ $t('user.utxoAccount') }}</h4>
      </div>
      <div class="text-center">
        <h4 class="mb-3 text-first">
          <span>{{ util.formatFixed(balance.data.amount) }}</span>
          <span class="ml-1 text-xs">{{ ecoInfo.tokenSymbol }}</span>
        </h4>
        <h4 class="text-first">{{ $t('user.contractAccount') }}</h4>
      </div>
    </div>
    <div class="flex items-center justify-around mb-3">
      <el-button
        type="primary"
        class="text-center text-sm rounded bg-btn text-white border-btn mx-3"
        @click="handleInto('utxo')"
      >
        {{ $t('user.intoutxo') }}
      </el-button>
      <el-button
        class="text-center text-sm rounded text-light-blue border border-light-blue mx-3 hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue"
        @click="handleInto('contract')"
      >
        {{ $t('user.intocontract') }}
      </el-button>
    </div>
  </div>
</template>
