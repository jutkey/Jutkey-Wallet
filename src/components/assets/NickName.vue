<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import DialogDefault from '@/components/DialogDefault.vue';
import { handleI18n } from '@/plugins/i18n';
import util from '@/plugins/util';
import contract from '@/plugins/lib';

const nickFormRef = ref<FormInstance>();
const editNicknameFee = ref('');

const props = defineProps({
  isIname: {
    type: Boolean,
    default: () => false
  },
  ecoInfo: {
    type: Object,
    default: () => {}
  }
});
const { ecoInfo } = toRefs(props);
console.log(ecoInfo.value);
const emit = defineEmits(['update:isIname', 'close', 'confirm', 'cancel']);
// eslint-disable-next-line no-unused-vars
const handleChangeNickName = (value: string) => {
  const regNickName = /^[\w]{1,20}$/;
  if (regNickName.test(value)) {
    const len = value.length;
    if (len <= 3 && len > 0) {
      editNicknameFee.value = '10,00 IBXC';
    } else if (len === 4) {
      editNicknameFee.value = '5,000 IBXC';
    } else if (len === 5) {
      editNicknameFee.value = '1,000 IBXC';
    } else {
      editNicknameFee.value = '';
    }
  } else {
    editNicknameFee.value = '';
  }
};
const validateNickname = (rule: any, value: any, callback: any) => {
  handleChangeNickName(value);
  if (!value) {
    return callback(new Error(handleI18n('user.nicknameNotEmpty')));
  }
  // Number letter underline
  const regNickName = /^[\w]{1,20}$/;
  if (!regNickName.test(value)) {
    callback(new Error(handleI18n('user.nicknameNotRules')));
  } else {
    callback();
  }
};
const nickRules = reactive<FormRules>({
  nickName: [{ validator: validateNickname, trigger: 'blur', required: true }]
});
const nickFrom = reactive({
  nickName: ecoInfo.value.memberName
}) as any;
const handleImageCancel = () => {
  emit('close');
  nickFrom.nickName = '';
  editNicknameFee.value = '';
};

const handleUploadSubmit = async () => {
  if (!nickFormRef.value) return false;
  await nickFormRef.value.validate((valid, fields) => {
    if (valid) {
      const params = {
        contractName: 'ProfileEdit',
        Name: nickFrom.nickName,
        Info: 'xx'
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
            // nickFrom.nickFrom = '';
            emit('confirm');
            /* if (nickFormRef.value) {
              nickFormRef.value.resetFields();
            } */
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
</script>
<template>
  <dialog-default
    :title="$t('user.modify')"
    :is-dialog="isIname"
    @close="handleImageCancel"
    @cancel="handleImageCancel"
    @confirm="handleUploadSubmit"
    @submit.prevent
  >
    <template #default>
      <div class="form-box my-2">
        <el-form
          ref="nickFormRef"
          class="form-box-nickname"
          :model="nickFrom"
          :rules="nickRules"
          label-width="auto"
          status-icon
        >
          <el-form-item prop="nickName" class="mb-1 flex items-center">
            <template #label>
              <span class="text-tinge-text text-sm">
                {{ $t('user.nickname') }}
              </span>
            </template>
            <el-input
              v-model="nickFrom.nickName"
              class="placeholder-place flex-1"
              type="text"
              autocomplete="off"
              :placeholder="$t('user.modify')"
              :disabled="ecoInfo.memberName !== ''"
              clearable
            />
            <el-popover
              placement="top"
              :title="$t('user.nicknameruletitle')"
              :width="440"
              trigger="hover"
              :close-delay="10"
              class="warp-top-poover"
            >
              <template #default>
                <el-scrollbar style="height: 150px">
                  <div class="p-20px" style="white-space: pre-line">
                    {{ $t('user.nicknamerule') }}
                  </div>
                </el-scrollbar>
              </template>
              <template #reference>
                <i
                  style="color: #666"
                  class="iconfont el-ui-fa cursor-pointer text-xl ml-2"
                ></i>
              </template>
            </el-popover>
          </el-form-item>
          <div
            v-show="editNicknameFee && !ecoInfo.memberName"
            class="text-error text-xs"
          >
            <span>{{ $t('user.modifyfee') }}:</span>
            <span>{{ editNicknameFee }}</span>
          </div>
        </el-form>
      </div>
    </template>
  </dialog-default>
</template>
