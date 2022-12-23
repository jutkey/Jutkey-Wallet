<script setup lang="ts">
import { ref, reactive, inject, toRefs } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { handleI18n } from '@/plugins/i18n';
import util from '@/plugins/util';
import contract from '@/plugins/lib';
import DialogDefault from '@/components/DialogDefault.vue';

const emit = defineEmits(['update:isCash', 'close']);
const props = defineProps({
  isCash: {
    type: Boolean,
    default: () => false
  },
  nftId: {
    type: Number,
    default: () => 0
  },
  energyPoint: {
    type: Number,
    default: () => 0
  }
});
const { isCash, nftId, energyPoint } = toRefs(props);
console.log(energyPoint.value);
const min = 1000 * energyPoint.value;
const max = 10000 * energyPoint.value;
const placeholder = `${handleI18n(
  'nft.balanceint'
)} ${min} - ${max} ${handleI18n('page.symbol')} ${handleI18n('nft.integer')}`;
const cashRef = ref<FormInstance>();
const reload = inject('reload') as Function;
const cashForm = reactive({
  TokenId: 0,
  StakeAmount: '',
  energyPower: 0,
  Cycle: '30'
}) as any;
const validateStake = (rule: any, value: any, callback: any) => {
  const reg = /(^[1-9]\d*$)/;
  if (!reg.test(value)) {
    callback(new Error(placeholder));
  } else if (Number(value) < Number(min) || Number(value) > Number(max)) {
    callback(new Error(placeholder));
  } else {
    callback();
  }
};
const cashRules = reactive<FormRules>({
  StakeAmount: [
    {
      required: true,
      validator: validateStake,
      trigger: 'blur'
    }
  ]
});
const handleClose = async () => {
  if (!cashRef.value) return false;
  cashForm.StakeAmount = 0;
  cashRef.value.resetFields();
  emit('close');
};
const handleConfirm = async () => {
  if (!cashRef.value) return;
  await cashRef.value.validate((valid, fields) => {
    if (valid) {
      const { StakeAmount, Cycle } = cashForm;
      const params = {
        contractName: 'NFTMinerStake',
        TokenId: nftId.value,
        StakeAmount,
        Cycle,
        attribute: 'StakeAmount'
      };
      util.checkTradepass(() => {
        util.showLoading();
        contract.tokensSend(params, (res: any, status: string) => {
          if (status === 'error') {
            console.log(res);
            ElMessage.error(res.errmsg.error);
          } else if (status === 'loading') {
            ElMessage.success(handleI18n('user.chain'));
          } else if (status === 'success') {
            ElMessage({
              type: 'success',
              message: handleI18n('user.dosuccess')
            });
            reload();
            cashForm.StakeAmount = '';
            if (cashRef.value) {
              cashRef.value.resetFields();
            }
          } else if (status === 'balance') {
            ElMessage.error(handleI18n('user.amountShort'));
          } else {
            ElMessage.error(res.msg);
          }
          util.closeLoading();
        });
      });
    } else {
      console.log('error submit!', fields);
    }
  });
};
const handleCancel = () => {
  if (!cashRef.value) return;
  cashForm.StakeAmount = '';
  cashRef.value.resetFields();
  emit('close');
};
const handleInput = () => {
  const { StakeAmount } = cashForm;
  console.log(StakeAmount);
  cashForm.energyPower = parseInt(
    String(
      (Number(StakeAmount) / 10) * (1 + (Number(energyPoint.value) - 1) / 100)
    ),
    10
  );
};
</script>
<template>
  <dialog-default
    :is-dialog="isCash"
    :title="$t('nft.cash')"
    @close="handleClose"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <template #default>
      <div class="form-box">
        <el-form
          ref="cashRef"
          :model="cashForm"
          :rules="cashRules"
          label-position="top"
          @submit.prevent
        >
          <el-form-item :label="$t('nft.num')" prop="StakeAmount">
            <el-input
              v-model="cashForm.StakeAmount"
              class="flex-1"
              type="number"
              clearable
              :placeholder="placeholder"
              @input="handleInput"
            ></el-input>
            <span class="ml-1">{{ $t('page.symbol') }}</span>
          </el-form-item>
        </el-form>
        <div class="flex items-center mb-3">
          <span class="mr-1">{{ $t('nft.cycle') }}:</span>
          <span>{{ cashForm.Cycle }}</span>
          <span class="ml-1">{{ $t('nft.day') }}</span>
        </div>
        <div class="flex items-center">
          <span class="mr-1">{{ $t('nft.force') }}:</span>
          <span>{{ cashForm.energyPower }}</span>
        </div>
      </div>
    </template>
  </dialog-default>
</template>
