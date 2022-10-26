<script setup lang="ts">
import { ref, inject, toRefs } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import DialogDefault from '@/components/DialogDefault.vue';
import { handleI18n } from '@/plugins/i18n';
import util from '@/plugins/util';
import contract from '@/plugins/lib';
import { axiosType } from '@/plugins/dataType';
import { handleWalletserver } from '@/plugins/common';

const url = handleWalletserver();
const axios = inject('axios') as axiosType;
const current = util.getCache('current');
const preImageUrl = ref('');
const appId = ref(0);
const avatar = ref('');
const nickName = ref('');
const props = defineProps({
  isAvatar: {
    type: Boolean,
    default: () => false
  },
  ecoInfo: {
    type: Object,
    default: () => {}
  }
});
const { ecoInfo } = toRefs(props);
if (ecoInfo.value.memberName) {
  nickName.value = ecoInfo.value.memberName;
}
avatar.value = `${url}/api/v1/get_attachment/${
  ecoInfo.value.memberImageHash
}?x=${new Date().getTime()}`;
const emit = defineEmits(['update:isImage', 'close', 'confirm', 'cancel']);

const handleImageCancel = () => {
  emit('close');
};
const handleBufferData = async () => {
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
  const buffer = await (axios.request as any).post(
    `/listWhere/buffer_data`,
    null,
    {
      params: objParams
    }
  );
  const data = JSON.parse(buffer.list[0].value);
  console.log(data.binary_id);
  return data.binary_id;
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
        preImageUrl.value = `data:${
          file.type
        };base64,${util.transformArrayBufferToBase64(FileData.value)}`;
        util.closeLoading();
      });
    });
  });
};
const handleUploadSubmit = async () => {
  if (!nickName.value) {
    ElMessage({
      message: handleI18n('login.inputnickempty'),
      type: 'warning'
    });
    return false;
  }
  let imageId = await handleBufferData();
  imageId = imageId || 0;
  const params = {
    contractName: 'ProfileEdit',
    Name: nickName.value,
    Info: 'xx',
    ImageId: Number(imageId)
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
};
const handleUploadAvatar = () => {};
</script>
<template>
  <dialog-default
    :title="$t('user.head')"
    :is-dialog="isAvatar"
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
    </template>
  </dialog-default>
</template>
