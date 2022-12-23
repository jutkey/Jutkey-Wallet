<script setup lang="ts">
import { ref, reactive, watch, Ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { handleI18n } from '@/plugins/i18n';
import util from '@/plugins/util';
import keyring from '@/plugins/keyring';
import ETH from '@/plugins/ethereum/';
import { ethTrade } from '@/plugins/dataType';

const route = useRoute();
const router = useRouter();
const objNetwork = reactive({ network: {} }) as any;
const balance = ref('') as Ref<string>;
const sendAddress = ref('') as Ref<string>;
const { privateKey } = util.getCache('current');
const { rpcUrl, api, apikey, symbol } = util.getCache('showEthNetwork');

const tradeFrom: ethTrade = reactive({
  toAddress: '',
  amount: 0,
  gasLimit: 0,
  gasPrice: 0
});
const eth = new ETH(privateKey, rpcUrl, api, apikey);
console.log(eth);
sendAddress.value = eth.address;
const handleGasLimitPrice = async () => {
  const network = await eth.getNetWork();
  const gasPrice = await eth.getGasPrice();
  // const gasLimit = await eth.gasLimit();
  // console.log(gasLimit);
  console.log(gasPrice);
  objNetwork.network = network;
  tradeFrom.gasPrice = gasPrice;
  tradeFrom.gasLimit = 45000;
};

handleGasLimitPrice();
const handleGetBalance = async (address: string, apikey: string) => {
  balance.value = (await eth.getBalance(address, apikey)) || '0';
  console.log(balance.value);
};
handleGetBalance(eth.address, eth.apikey);
watch(
  () => route.path,
  () => {
    if (route.params.address && route.name === 'EthTransfer') {
      console.log(route.params.address);
      sendAddress.value = route.params.address as string;
    }
  },
  {
    immediate: true
  }
);
const tradeFormRef = ref<FormInstance>();
const validateAccount = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(handleI18n('user.inputAddress')));
  } else if (!keyring.isAddress(value)) {
    callback(new Error(handleI18n('eth.addressError')));
  } else {
    callback();
  }
};
const validateAmount = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(handleI18n('user.inputAmount')));
  } else if (Number(value) <= 0) {
    callback(new Error(handleI18n('eth.zero')));
  } else {
    callback();
  }
};
const validateLimit = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(handleI18n('eth.limit')));
  } else if (Number(value) < 21000) {
    callback(new Error(handleI18n('eth.min')));
  } else {
    callback();
  }
};
const tradeRules = reactive<FormRules>({
  toAddress: [{ required: true, validator: validateAccount, trigger: 'blur' }],
  amount: [{ required: true, validator: validateAmount, trigger: 'blur' }],
  gasLimit: [{ required: true, validator: validateLimit, trigger: 'blur' }],
  gasPrice: [
    {
      required: true,
      message: handleI18n('eth.price'),
      trigger: 'blur'
    }
  ]
});
// eslint-disable-next-line no-unused-vars
const handleSubmitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      util.checkTradepass(() => {
        const { toAddress, amount, gasLimit, gasPrice } = tradeFrom;
        util.showLoading();
        eth.ethTranfer(
          sendAddress.value,
          toAddress,
          String(amount),
          String(gasLimit),
          String(gasPrice),
          (msg: any) => {
            console.log(msg);
            if (msg.hash) {
              ElMessage.success(handleI18n('eth.tradesuccess'));
            }
            if (msg === 'notEnough') {
              ElMessage.error(handleI18n('eth.notenough'));
            }
            if (msg === 'error') {
              ElMessage.error(handleI18n('eth.tradeError'));
            }
            util.closeLoading();
            router.replace('/ethereum');
          }
        );
      });
    } else {
      console.log('error submit!', fields);
    }
  });
};
const handleResetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  handleGasLimitPrice();
};
</script>
<template>
  <div>
    <div class="mb-3 flex justify-between font-semibold">
      <span @click="router.go(-1)">
        <i class="iconfont el-ui-back pr-20px text-2xl cursor-pointer"></i>
      </span>
    </div>
    <div class="bg-basic-box rounded form-box">
      <div class="w-1/2 m-auto p-20px">
        <h2 class="text-center mb-10 text-first">{{ $t('user.trade') }}</h2>
        <div class="mb-5">
          <span class="text-tinge-text">{{ $t('eth.nameCoin') }}:</span>
          <span class="font-semibold text-lime ml-1">{{ symbol }}</span>
        </div>
        <div class="mb-5">
          <span class="text-tinge-text">{{ $t('user.balance') }}:</span>
          <span class="font-semibold text-lime ml-1">
            {{ balance }}
          </span>
          <span class="ml-1 text-xs">{{ symbol }}</span>
        </div>
        <el-form
          ref="tradeFormRef"
          :model="tradeFrom"
          :rules="tradeRules"
          label-width="120px"
          label-position="top"
        >
          <el-form-item prop="toAddress" class="mb-5">
            <template #label>
              <span class="text-tinge-text text-sm">
                {{ $t('user.address') }}
              </span>
            </template>
            <el-input
              v-model="tradeFrom.toAddress"
              class="placeholder-place"
              type="text"
              autocomplete="off"
              :placeholder="$t('user.inputAddress')"
              clearable
            />
          </el-form-item>
          <el-form-item prop="amount" class="mb-5">
            <template #label>
              <span class="text-tinge-text text-sm">
                {{ $t('user.amount') }}
              </span>
            </template>
            <el-input
              v-model="tradeFrom.amount"
              class="placeholder-place"
              type="number"
              autocomplete="off"
              :placeholder="$t('user.inputAmount')"
              clearable
            />
          </el-form-item>
          <el-form-item prop="gasLimit" class="mb-5">
            <template #label>
              <span class="text-tinge-text text-sm">Gas Limit:</span>
            </template>
            <el-input
              v-model="tradeFrom.gasLimit"
              class="placeholder-place"
              type="number"
              autocomplete="off"
              :placeholder="$t('user.inputUrgent')"
              clearable
            />
          </el-form-item>
          <el-form-item prop="gasPrice" class="mb-5">
            <template #label>
              <span class="text-tinge-text text-sm">Gas Price (Gwei):</span>
            </template>
            <el-input
              v-model="tradeFrom.gasPrice"
              class="placeholder-place"
              type="number"
              autocomplete="off"
              :placeholder="$t('user.inputRemarks')"
              clearable
            />
          </el-form-item>
          <div class="text-center mb-3">
            <el-button
              class="text-center text-sm rounded text-light-blue border border-light-blue mx-3 hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue"
              @click="handleResetForm(tradeFormRef)"
            >
              {{ $t('login.cancel') }}
            </el-button>
            <el-button
              type="primary"
              class="text-center text-sm rounded bg-btn text-white border-btn mx-3"
              @click="handleSubmitForm(tradeFormRef)"
            >
              {{ $t('login.confirm') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
