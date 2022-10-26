<script setup lang="ts">
import { ref, reactive, toRefs, inject } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { handleI18n } from '@/plugins/i18n';
import util from '@/plugins/util';
import contract from '@/plugins/lib';
import DialogDefault from '@/components/DialogDefault.vue';
import { handleWalletserver } from '@/plugins/common';
import { axiosType } from '@/plugins/dataType';

const router = useRouter();
console.log(router);
const axios = inject('axios') as axiosType;
const emit = defineEmits(['update:isBuild', 'close']);
const props = defineProps({
  isBuild: {
    type: Boolean,
    default: () => false
  },
  nftId: {
    type: Number,
    default: () => 0
  },
  nftImg: {
    type: String,
    default: () => ''
  },
  account: {
    type: String,
    default: () => ''
  }
});
const { isBuild, nftId, nftImg, account } = toRefs(props);

const seleId = ref('') as any;
const seleImg = ref('');
const nftList = reactive({ list: {}, locator: {} }) as any;
const nftParams = {
  search: nftId.value,
  wallet: account.value
};
const handleGetNft = async (params: any) => {
  const res = await axios.post(
    'nft_miner_synthesizable',
    params,
    'walletserver'
  );
  if (res.code === 0) {
    console.log(JSON.stringify(res));
    nftList.list = res.data;
  }
};
handleGetNft(nftParams);

const handleClose = async () => {
  if (isBuild.value) emit('close');
};
const handleGetlocator = async () => {
  const res = await axios.get('/get_locator', {}, 'walletserver');
  console.log(res);
  if (res.code === 0) {
    nftList.locator = res.data;
  }
};
handleGetlocator();
const handleConfirm = async () => {
  if (!seleId.value) return ElMessage.success(handleI18n('user.chain'));

  const { continent, nation, latitude, longitude } = nftList.locator;
  const params = {
    contractName: 'NFTMinerSynthesis',
    TokenIdA: nftId.value,
    TokenIdB: seleId.value,
    Location: continent,
    Nation: nation,
    Latitude: latitude,
    Longitude: longitude
  };
  util.checkTradepass(() => {
    util.showLoading();
    contract.tokensSend(params, (res: any, status: string) => {
      if (status === 'error') {
        console.log(res);
        ElMessage.error(res.errmsg.error);
      } else if (status === 'loading') {
        ElMessage.success(handleI18n('user.chain'));
        seleId.value = '';
      } else if (status === 'success') {
        ElMessage({
          type: 'success',
          message: handleI18n('user.dosuccess')
        });
        seleId.value = '';
        router.replace('/nft');
      } else {
        ElMessage.error(res.msg);
      }
      util.closeLoading();
    });
  });
};
const handleCancel = () => {
  if (isBuild.value) emit('close');
};
const url = handleWalletserver();
const handleSelectChange = (id: number) => {
  console.log(id);
  if (id) {
    seleId.value = id;
    seleImg.value = `${url}/api/v1/nft_miner_file/${id}`;
  }
};
</script>
<template>
  <dialog-default
    :is-dialog="isBuild"
    :title="$t('nft.nftsynthesis')"
    @close="handleClose"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <template #default>
      <div>
        <el-alert type="warning" :closable="false" show-icon class="mb-3">
          <template #title>
            <span class="text-xs">{{ $t('nft.des') }}</span>
          </template>
        </el-alert>
        <div class="flex justify-between items-center mb-20px">
          <h3 class="text-first">{{ $t('nft.nftsynthesis') }}</h3>
          <div class="select-box">
            <el-select
              v-model="seleId"
              class="select-nft"
              :placeholder="$t('nft.select')"
              clearable
              @change="handleSelectChange"
            >
              <el-option
                v-for="item in nftList.list"
                :key="item.id"
                :label="item.token_hash"
                :value="item.id"
                class="p-0"
              >
                <span class="w-full truncate select-nft-item">
                  {{ item.token_hash }}
                </span>
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="flex justify-between">
          <div v-if="nftId" class="w-2/5">
            <img :src="nftImg" alt="nft-1" />
          </div>
          <div v-if="seleId" class="w-2/5">
            <img :src="seleImg" alt="nft-2" />
          </div>
        </div>
      </div>
    </template>
  </dialog-default>
</template>
