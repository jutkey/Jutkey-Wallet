<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { handleI18n } from '@/plugins/i18n';
import util from '@/plugins/util';
import contract from '@/plugins/lib';
import DialogDefault from '@/components/DialogDefault.vue';

const router = useRouter();
console.log(router);
const emit = defineEmits(['update:isOut', 'close']);
const props = defineProps({
  isOut: {
    type: Boolean,
    default: () => false
  },
  nftId: {
    type: Number,
    default: () => 0
  }
});
const { isOut, nftId } = toRefs(props);

const outRef = ref<FormInstance>();
const outForm = reactive({
  address: ''
}) as any;
const validateAccount = (rule: any, value: any, callback: any) => {
  const address = /^\d{4}-\d{4}-\d{4}-\d{4}-\d{4}$/;
  if (value === '') {
    callback(new Error(handleI18n('nft.outaddress')));
  } else if (!address.test(value)) {
    callback(new Error(handleI18n('user.addressType')));
  } else {
    callback();
  }
};
const outRules = reactive<FormRules>({
  address: [
    {
      required: true,
      validator: validateAccount,
      trigger: 'blur'
    }
  ]
});
const handleClose = async () => {
  if (!outRef.value) return false;
  outForm.address = '';
  outRef.value.resetFields();
  emit('close');
};
const handleConfirm = async () => {
  if (!outRef.value) return;
  await outRef.value.validate((valid, fields) => {
    if (valid) {
      const { address } = outForm;
      const params = {
        contractName: 'NFTMinerSafeTransferFrom',
        TokenId: nftId.value,
        ToAddress: address
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
            router.replace('/nft');
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
  if (!outRef.value) return;
  outRef.value.resetFields();
  emit('close');
};
</script>
<template>
  <dialog-default
    :is-dialog="isOut"
    :title="$t('nft.transfer')"
    @close="handleClose"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <template #default>
      <div class="form-box">
        <el-alert type="warning" :closable="false" show-icon class="mb-3">
          <template #title>
            <span class="text-xs">{{ $t('nft.change') }}</span>
          </template>
        </el-alert>
        <el-form
          ref="outRef"
          :model="outForm"
          :rules="outRules"
          @submit.prevent
        >
          <el-form-item label=" " prop="address">
            <el-input
              v-model="outForm.address"
              class="flex-1"
              clearable
              :placeholder="$t('nft.outaddress')"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </dialog-default>
</template>
