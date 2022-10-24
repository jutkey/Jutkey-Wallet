<script setup lang="ts">
import { ref, reactive, inject, toRefs } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import DialogDefault from '@/components/DialogDefault.vue';
import { handleI18n } from '@/plugins/i18n';
import util from '@/plugins/util';
import contract from '@/plugins/lib';
import { axiosType } from '@/plugins/dataType';
import { handleWalletserver } from '@/plugins/common';

const url = handleWalletserver();
const nickFormRef = ref<FormInstance>();
const axios = inject('axios') as axiosType;
const current = util.getCache('current');
const preImageUrl = ref('');
const editNicknameFee = ref('');
const imageId = ref(0);
const appId = ref(0);
const avatar = ref('');
const props = defineProps({
  isImage: {
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
avatar.value = `${url}/api/v1/get_attachment/${
  ecoInfo.value.memberImageHash
}?x=${new Date().getTime()}`;
const emit = defineEmits(['update:isImage', 'close', 'confirm', 'cancel']);
// eslint-disable-next-line no-unused-vars
const handleChangeNickName = (value: string) => {
  const regNickName = /^[\w]{1,20}$/;
  if (regNickName.test(value)) {
    const len = value.length;
    if (len <= 3 && len > 0) {
      editNicknameFee.value = '1,000 IBXC';
    } else if (len === 4) {
      editNicknameFee.value = '500 IBXC';
    } else if (len === 5) {
      editNicknameFee.value = '100 IBXC';
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
};
const handleBufferData = async (file: File, FileData: any) => {
  preImageUrl.value = `data:${
    file.type
  };base64,${util.transformArrayBufferToBase64(FileData.value)}`;
  // this.$store.commit('getuser');
  const objParams = {
    limit: 1,
    offset: 0,
    order: '',
    where: {
      account: current.account,
      ecosystem: 1,
      key: 'avatar'
    }
  };

  // const objQs = qs.stringify(objParams);
  const buffer = await (axios.request as any).post(
    `/listWhere/buffer_data`,
    null,
    {
      params: objParams
    }
  );
  const data = JSON.parse(buffer.list[0].value);
  console.log(data.binary_id);
  imageId.value = data.binary_id;
  // localStorage.setItem('ImageId', data.binary_id);
  //  this.profileForm.ImageId = data.binary_id;
  // this.$parent.handleEcologyKey();
  // this.$store.dispatch('handleActionEcology');
};
const handleBeforeAvatar = async (file: File) => {
  console.log(file);
  const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
  const extension =
    testmsg === 'jpg' ||
    testmsg === 'JPG' ||
    testmsg === 'png' ||
    testmsg === 'PNG' ||
    testmsg === 'jpeg' ||
    testmsg === 'JPEG';
  const isLt50M = file.size / 1024 / 1024 < 0.5;
  if (!extension) {
    ElMessage({
      message: handleI18n('user.imageFormatss'),
      type: 'error'
    });
    return false;
  }
  if (!isLt50M) {
    ElMessage.error(handleI18n('user.pictureSize500'));
    return false;
  }
  const objParams = {
    limit: 1,
    offset: 0,
    order: '',
    where: {
      ecosystem: 1,
      name: 'Basic',
      deleted: 0
    }
  };
  const app = await (axios.request as any).post(
    `/listWhere/applications`,
    null,
    {
      params: objParams
    }
  );
  appId.value = app.list[0].id;
  util.transfile(file, 'FileData', (FileData: any) => {
    console.log(FileData);
    util.checkTradepass(() => {
      const params = {
        contractName: 'BufferFileUpload',
        AppId: appId.value,
        FileData,
        BufferKey: 'avatar',
        FileName: ''
      };
      util.showLoading();
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
        handleBufferData(file, FileData);
        util.closeLoading();
      });
    });
  });
};
const handleUploadSubmit = async () => {
  console.log(typeof imageId.value);
  /* if (imageId.value === 0) {
    ElMessage.error(handleI18n('user.pictureEmpty'));
    return false;
  } */
  if (!nickFormRef.value) return false;
  await nickFormRef.value.validate((valid, fields) => {
    if (valid) {
      const params = {
        contractName: 'ProfileEdit',
        Name: nickFrom.nickName,
        Info: 'xx'
        // ImageId: imageId.value
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
const handleUploadAvatar = () => {};
</script>
<template>
  <dialog-default
    :title="$t('user.head')"
    :is-dialog="isImage"
    @close="handleImageCancel"
    @cancel="handleImageCancel"
    @confirm="handleUploadSubmit"
  >
    <template #default>
      <el-upload
        class="upload-box"
        drag
        action="#"
        :http-request="(handleUploadAvatar as any)"
        :show-file-list="false"
        :before-upload="handleBeforeAvatar"
      >
        <div
          v-if="ecoInfo.memberImageHash || preImageUrl"
          class="bg-white cursor-pointer rounded-full flex items-center justify-center w-24 h-24 mx-auto mb-2"
        >
          <img
            class="m-auto w-20 h-20 rounded-full"
            :src="preImageUrl || avatar"
            alt="head"
          />
        </div>
        <el-icon v-else class="el-icon--upload"><upload-filled /></el-icon>
        <div class="text-xs">
          {{ $t('user.drag') }}
        </div>
        <template #tip>
          <div class="mt-2 text-xs">
            {{ $t('user.pictureSize500') }}
          </div>
        </template>
      </el-upload>
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
