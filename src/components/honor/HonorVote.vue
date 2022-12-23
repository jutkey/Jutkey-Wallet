<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, reactive, inject, Ref, toRefs } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { handleI18n } from '@/plugins/i18n';
import util from '@/plugins/util';
import contract from '@/plugins/lib';
import DialogDefault from '@/components/DialogDefault.vue';

const emit = defineEmits(['update:isDialog', 'close', 'confirm']);
const props = defineProps({
  isDialog: {
    type: Boolean,
    default: () => false
  },
  honorId: {
    type: Number,
    default: () => 0
  },
  honorName: {
    type: String,
    default: () => ''
  }
});
const { isDialog, honorId, honorName } = toRefs(props);
const honorFormRef = ref<FormInstance>();
const honorFrom = reactive({
  amount: 1
});
const validateAmount = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(handleI18n('node.voteinput')));
  } else if (value < 1) {
    callback(new Error(handleI18n('node.voteone')));
  } else {
    callback();
  }
};
const honorRules = reactive<FormRules>({
  amount: [{ validator: validateAmount, trigger: 'blur', required: true }]
});
const handleClose = async () => {
  if (!honorFormRef.value) return false;
  honorFrom.amount = 0;
  honorFormRef.value.resetFields();
  emit('close');
};
const handleConfirm = async () => {
  if (!honorFormRef.value) return;
  await honorFormRef.value.validate((valid, fields) => {
    if (valid) {
      const params = {
        contractName: 'CandidateNodeReferendum',
        ecosystemId: 1,
        RequestId: honorId.value,
        ReferendumAmount: honorFrom.amount,
        attribute: 'ReferendumAmount'
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
            honorFrom.amount = 0;
            emit('confirm');
            if (honorFormRef.value) {
              honorFormRef.value.resetFields();
            }
          } else if (status === 'balance') {
            ElMessage.error(handleI18n('user.amountShort'));
          } else {
            ElMessage.error(res.msg);
          }
          emit('confirm');
          util.closeLoading();
        });
      });
    } else {
      console.log('error submit!', fields);
    }
  });
};
const handleCancel = () => {
  if (!honorFormRef.value) return;
  honorFrom.amount = 0;
  honorFormRef.value.resetFields();
  emit('close');
};
</script>
<template>
  <dialog-default
    :is-dialog="isDialog"
    :title="$t('node.votes')"
    @close="handleClose"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <template #default>
      <div class="text-center">
        <span>{{ $t('node.votefor') }}:</span>
        <span class="font-semibold">{{ honorName }}</span>
      </div>
      <div class="form-box">
        <el-form
          ref="honorFormRef"
          :model="honorFrom"
          :rules="honorRules"
          label-width="120px"
          label-position="top"
          @submit.prevent
        >
          <el-form-item prop="amount" class="mb-4">
            <template #label>
              <span class="text-tinge-text text-sm">
                {{ $t('node.votenum') }}
              </span>
            </template>
            <el-input
              v-model="honorFrom.amount"
              class="placeholder-place"
              type="number"
              autocomplete="off"
              :placeholder="$t('node.voteone')"
              clearable
            />
          </el-form-item>
        </el-form>
        <div class=" ">{{ $t('node.voteTip') }}</div>
      </div>
    </template>
  </dialog-default>
</template>
