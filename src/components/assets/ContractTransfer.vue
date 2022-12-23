<script setup lang="ts">
import { ref, reactive, watch, toRefs, Ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { handleI18n } from 'plugins/i18n';
import { useRouter } from 'vue-router';
import contract from '@/plugins/lib';
import util from '@/plugins/util';
import { tradeType } from '@/plugins/dataType';
import keyring from '@/plugins/keyring';

const expediteNum = ref(0) as Ref<number>;
const boo = ref(false) as Ref<boolean>;
// eslint-disable-next-line no-unused-vars
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
const { expedite, tokenSymbol, followFuel } = ecoInfo.value as any;
console.log(expedite);
boo.value = ecoId.value !== 1 && expedite.flag === '2';
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
    return callback(new Error(handleI18n('user.inputAddress')));
  }
  if (!address.test(value)) {
    return callback(new Error(handleI18n('user.addressType')));
  }
  return callback();
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
const tradeRules = reactive<FormRules>({
  account: [{ validator: validateAccount, trigger: 'blur', required: true }],
  amount: [{ validator: validateAmount, trigger: 'blur', required: true }],
  urgent: [{ validator: validateUrgent, trigger: 'blur', required: false }]
});
// eslint-disable-next-line no-unused-vars
const handleSubmitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      util.checkTradepass(() => {
        util.showLoading();
        const { amount, comment, account, urgent } = tradeFrom;
        const params = {
          contractName: 'TokensSend',
          Amount: amount,
          Recipient: account,
          Comment: comment,
          ecosystem: ecoId.value,
          Expedite: String(urgent),
          attribute: 'Amount'
        };
        contract.tokensSend(params, (res: any, status: string) => {
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
          console.log(res);
          util.closeLoading();
          // router.replace('/assets');
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
watch(
  () => activeName.value,
  () => {
    handleResetForm(tradeFormRef.value);
  }
);
const handleUrgentInput = () => {
  expediteNum.value = tradeFrom.urgent / followFuel / expedite.conversion_rate;
};
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
        />
      </el-form-item>
      <el-form-item prop="urgent" :class="{ 'mb-1': boo, 'mb-5': !boo }">
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
          @input="handleUrgentInput"
        />
      </el-form-item>
      <div class="text-center mb-3">
        <div v-if="boo" class="flex items-center text-xs text-left mb-5">
          <span>{{ $t('user.expedite') }}</span>
          <span class="ml-1">{{ expediteNum }}</span>
          <span class="mx-0.5">{{ tokenSymbol }}</span>
          <div v-if="tradeFrom.urgent">
            <span class="mx-0.5">≈</span>
            <span>{{ tradeFrom.urgent }}</span>
            <span>IBXC</span>
          </div>
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="$t('user.urgentpay')"
            placement="bottom"
          >
            <i class="iconfont el-ui-up10 cursor-pointer ml-2"></i>
          </el-tooltip>
        </div>
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
