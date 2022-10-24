<script setup lang="ts">
import { ref, reactive, inject, watch, Ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import { useRoute } from 'vue-router';
import util from '@/plugins/util';
import UtxoTransfer from '@/components/assets/UtxoTransfer.vue';
import ContractTransfer from '@/components/assets/ContractTransfer.vue';
import InsideTransfer from '@/components/assets/InsideTransfer.vue';
import { ecosystemParam, axiosType } from '@/plugins/dataType';

const route = useRoute();
const axios = inject('axios') as axiosType;
const ecoInfo = reactive({ obj: {} }) as any;
const ecoId = ref(1) as Ref<number>;
const transferName = ref('utxo');
const ecosystemParams = {
  wallet: '',
  page: 1,
  limit: 1,
  search: 'ecosystem = 1'
};
const handleEcosystem = async (params: ecosystemParam) => {
  const res = await axios.post('/ecosystem_key_totals', params, 'walletserver');
  console.log(res);
  if (res.code === 0) {
    const [obj] = res.data.rets;
    ecoInfo.obj = obj;
  }
};

watch(
  () => route.path,
  () => {
    if (route.params.id && route.name === 'Transfer') {
      console.log(route.params.account);
      ecosystemParams.wallet = route.params.account as string;
      ecoId.value = Number(route.params.id);
      ecosystemParams.search = `ecosystem = ${Number(route.params.id)}`;
      handleEcosystem(ecosystemParams);
    }
  },
  {
    immediate: true
  }
);

const handleTabsTransfer = (tab: TabsPaneContext) => {
  const { name } = tab.props;
  console.log(name);
};
</script>
<template>
  <div class="bg-basic-box rounded form-box">
    <div class="w-1/2 m-auto p-20px">
      <h2 class="text-center mb-10">{{ $t('user.trade') }}</h2>
      <div class="mb-5">
        <span class="text-tinge-text">{{ $t('user.econame') }}:</span>
        <span class="font-semibold text-lime ml-1">{{ ecoInfo.obj.name }}</span>
      </div>
      <div class="mb-5">
        <span class="text-tinge-text">{{ $t('user.ecoid') }}:</span>
        <span class="font-semibold text-lime ml-1">{{ ecoInfo.obj.id }}</span>
      </div>
      <div class="mb-5">
        <span class="text-tinge-text">{{ $t('user.balance') }}:</span>
        <span class="font-semibold text-lime ml-1">
          {{ util.formatFixed(ecoInfo.obj.amount) }}
        </span>
        <span class="ml-1 text-xs">{{ ecoInfo.obj.tokenSymbol }}</span>
      </div>
      <el-tabs v-model="transferName" @tab-click="handleTabsTransfer">
        <el-tab-pane :label="$t('user.utxo')" name="utxo">
          <utxo-transfer
            v-if="ecoInfo.obj.id"
            :eco-id="ecoId"
            :active-name="transferName"
            :eco-info="ecoInfo.obj"
          ></utxo-transfer>
        </el-tab-pane>
        <el-tab-pane :label="$t('user.contransfer')" name="contract">
          <contract-transfer
            v-if="ecoInfo.obj.id"
            :eco-id="ecoId"
            :active-name="transferName"
            :eco-info="ecoInfo.obj"
          ></contract-transfer>
        </el-tab-pane>
        <el-tab-pane :label="$t('user.inside')" name="inside">
          <inside-transfer
            v-if="ecoInfo.obj.id"
            :eco-id="ecoId"
            :active-name="transferName"
            :eco-info="ecoInfo.obj"
          ></inside-transfer>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
