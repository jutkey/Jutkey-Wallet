<script setup lang="ts">
import { ref, reactive, watch, toRefs, inject } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { handleI18n } from 'plugins/i18n';
import { useRouter } from 'vue-router';
import { tradeType, axiosType, inputType } from '@/plugins/dataType';
import utxo from '@/plugins/lib';
import util from '@/plugins/util';
import keyring from '@/plugins/keyring';

const axios = inject('axios') as axiosType;
const router = useRouter();
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
const arrInput = ref([]);
const search = ecoId.value === 1 ? [1] : [1, ecoId.value];
const inputParams = {
  wallet: account,
  search
};
const handleGetInput = async (params: inputType) => {
  const res = await axios.post('/get_utxo_input', params, 'walletserver');
  console.log(res);
  if (res.code === 0) {
    arrInput.value = res.data;
  }
};
handleGetInput(inputParams);
const tradeFrom: tradeType = reactive({
  account: '',
  amount: 0,
  urgent: 0,
  comment: ''
});
const tradeFormRef = ref<FormInstance>();
const validateAccount = (rule: any, value: any, callback: any) => {
  const address = /^\d{4}-\d{4}-\d{4}-\d{4}-\d{4}$/;
  if (value === '') {
    callback(new Error(handleI18n('user.inputAddress')));
  } else if (!address.test(value)) {
    callback(new Error(handleI18n('user.addressType')));
  } else {
    callback();
  }
};
const validateAmount = (rule: any, value: any, callback: any) => {
  const amount = keyring.formatUnits((ecoInfo.value as any).amount);
  console.log(amount);
  const reg = /^\d+.?\d{0,12}$/;
  if (!value) {
    callback(new Error(handleI18n('user.inputAmount')));
  } else if (amount <= value) {
    callback(new Error(handleI18n('user.amountShort')));
  } else if (Number(value) <= 0) {
    callback(new Error(handleI18n('eth.zero')));
  } else if (!reg.test(value)) {
    callback(new Error(handleI18n('user.inputtwelve')));
  } else {
    callback();
  }
};
const validateUrgent = (rule: any, value: any, callback: any) => {
  const reg = /^\d+.?\d{0,12}$/;
  const amount = keyring.formatUnits((ecoInfo.value as any).amount);
  console.log(amount);
  if (value) {
    if (amount <= value) {
      callback(new Error(handleI18n('user.amountShort')));
    } else if (Number(value) <= 0) {
      callback(new Error(handleI18n('eth.zero')));
    } else if (!reg.test(value)) {
      callback(new Error(handleI18n('user.inputtwelve')));
    } else {
      callback();
    }
  } else {
    callback();
  }
};
const gas = reactive({ first: 0, other: 0 });
const tradeRules = reactive<FormRules>({
  account: [{ validator: validateAccount, trigger: 'blur', required: true }],
  amount: [{ validator: validateAmount, trigger: 'blur', required: true }],
  urgent: [{ validator: validateUrgent, trigger: 'blur', required: false }]
});
const handleSubmitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      util.checkTradepass(() => {
        util.showLoading();
        const { amount, comment, account, urgent } = tradeFrom;
        console.log(amount);
        const transferParms = {
          Amount: String(amount),
          toAddress: account!,
          Comment: comment,
          ecosystem: ecoId.value,
          Expedite: String(urgent)
        };
        utxo.sendUTXO(transferParms, (res: any, status: string) => {
          if (status === 'error') {
            console.log(res);
            ElMessage.error(res.errmsg.error);
          } else if (status === 'loading') {
            ElMessage.success(handleI18n('user.chain'));
          } else if (status === 'success') {
            ElMessage.success(handleI18n('user.dosuccess'));
          } else {
            ElMessage.error(res.msg);
          }
          util.closeLoading();
          router.replace('/assets');
          formEl.resetFields();
        });
      });
    } else {
      console.log('error submit!', fields);
    }
  });
};
const handleResetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const handleInput = () => {
  const { amount, comment, account, urgent } = tradeFrom;
  if (account && amount) {
    //  const PRICE = 0.0000005;
    const transferParms = {
      Amount: String(amount),
      toAddress: account!,
      Comment: comment,
      ecosystem: ecoId.value
      //  Expedite: String(urgent)
    };
    const blob = utxo.blobSize(transferParms);
    arrInput.value.forEach((item: any) => {
      // console.log(item);
      if (item.ecosystem === 1) {
        //  console.log(Number(item.fuelRate / 10) * (blob.size + item.input));
        gas.first =
          Number(
            util.formatFixed(
              String(Number(item.fuelRate / 10) * (blob.size + item.input))
            )
          ) + Number(urgent);
      } else {
        gas.other = util.formatFixed(
          String(Number(item.fuelRate / 10) * (blob.size + item.input))
        ) as any;
      }
    });
  }
};
watch(
  () => activeName.value,
  () => {
    handleResetForm(tradeFormRef.value);
  }
);
</script>
<template>
  <div class="form-box">
    <el-form
      ref="tradeFormRef"
      :model="tradeFrom"
      :rules="tradeRules"
      label-width="120px"
      label-position="top"
      @submit.prevent
    >
      <el-form-item prop="account" class="mb-5">
        <template #label>
          <span class="text-tinge-text text-sm">
            {{ $t('user.address') }}
          </span>
        </template>
        <el-input
          v-model="tradeFrom.account"
          class="placeholder-place"
          type="text"
          autocomplete="off"
          :placeholder="$t('user.inputAddress')"
          clearable
        />
      </el-form-item>
      <el-form-item prop="amount" class="mb-5">
        <template #label>
          <span class="text-tinge-text text-sm">{{ $t('user.amount') }}</span>
        </template>
        <el-input
          v-model="tradeFrom.amount"
          class="placeholder-place"
          type="number"
          autocomplete="off"
          :placeholder="$t('user.inputAmount')"
          clearable
          @input="handleInput"
        />
      </el-form-item>
      <el-form-item prop="comment" class="mb-5">
        <template #label>
          <span class="text-tinge-text text-sm">
            {{ $t('user.remarks') }}
          </span>
        </template>
        <el-input
          v-model="tradeFrom.comment"
          class="placeholder-place"
          type="text"
          autocomplete="off"
          :placeholder="$t('user.inputRemarks')"
          clearable
          @input="handleInput"
        />
      </el-form-item>
      <el-form-item prop="urgent" class="mb-2">
        <template #label>
          <span class="text-tinge-text text-sm">{{ $t('user.urgent') }}</span>
        </template>
        <el-input
          v-model="tradeFrom.urgent"
          class="placeholder-place"
          type="number"
          autocomplete="off"
          :placeholder="$t('user.inputUrgent')"
          clearable
          @input="handleInput"
        />
      </el-form-item>
      <div class="flex mb-5 mt-3">
        <span>{{ $t('user.gas') }} ≈</span>
        <div class="ml-1">
          <div>
            <span>{{ gas.first }}</span>
            <span class="ml-1 text-xs">IBXC</span>
          </div>
          <div v-if="ecoId !== 1">
            <span>{{ gas.other }}</span>
            <span class="ml-1 text-xs">{{ ecoInfo.tokenSymbol }}</span>
          </div>
        </div>
      </div>
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
</template>
