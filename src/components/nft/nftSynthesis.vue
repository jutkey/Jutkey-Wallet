<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, reactive, inject, computed, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';
import { handleBlockexplorer, handleWalletserver } from '@/plugins/common';
import { axiosType } from '@/plugins/dataType';

const emit = defineEmits(['update:isSynthesis', 'close', 'confirm', 'cancel']);
const props = defineProps({
  isSynthesis: {
    type: Boolean,
    default: () => false
  },
  txHash: {
    type: String,
    default: () => ''
  }
});
const { txHash } = toRefs(props);
console.log(txHash.value);
const isSynthesis = computed({
  get() {
    return props.isSynthesis;
  },
  set(val) {
    emit('update:isSynthesis', val);
  }
});
const router = useRouter();
const nftSynthesis = reactive({ list: [], info: {} }) as any;
const isShare = ref(false);
const buildImg = ref('');
const axios = inject('axios') as axiosType;
const url = handleWalletserver();
// eslint-disable-next-line no-unused-vars
const handleBuildImage = async (txHash: string) => {
  const res = await axios.get(
    `/nft_miner_synthesis_info/${txHash}`,
    {},
    'walletserver'
  );
  console.log(res);
  if (res.code === 0) {
    buildImg.value = `${url}/api/v1/nft_miner_file/${res.data.id}`;
    nftSynthesis.info = res.data;
    /* for (let index = 0; index < 5; index = +1) {
      const obj = {} as any;
      switch (index) {
        case 0:
          obj.network = 'facebook';
          break;
        case 1:
          obj.network = 'linkedin';
          break;
        case 2:
          obj.network = 'reddit';
          break;
        case 3:
          obj.network = 'telegram';
          break;
        case 4:
          obj.network = 'twitter';
          break;
        default:
          obj.network = 'facebook';
          break;
      }
      obj.url = `${url}/api/v1/nft_miner_file/${res.data.id}`;
      obj.title = 'IBAX NETWORK NFT Miner';
      // nftSynthesis.list.push(obj);
    } */
    console.log(nftSynthesis.list);
  }
};
handleBuildImage(txHash.value);
const handleShare = () => {
  isShare.value = !isShare.value;
};
const handleCloseSynthesis = () => {
  if (buildImg.value) {
    router.replace('/nft');
  }
};
const browser = handleBlockexplorer();
/* watch(
  () => props.txHash,
  (newVal) => {
    console.log(newVal);
    if (newVal) {
      console.log(newVal);
      handleBuildImage(txHash.value);
    }
  },
  {
    immediate: true
  }
); */
defineExpose({
  handleBuildImage
});
</script>
<template>
  <el-dialog
    v-model="isSynthesis"
    class="bg-basic-box"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="40%"
    destroy-on-close
    center
    :append-to-body="true"
    :before-close="handleCloseSynthesis"
  >
    <template #header>
      <h3 class="font-semibold text-first">{{ $t('nft.nftsynthesis') }}</h3>
    </template>
    <div class="nft-img">
      <div class="w-full">
        <img :src="buildImg" alt="nft-1" style="max-height: 40vh" />
      </div>
      <div class="flex items-center mb-3">
        <span class="flex-shrink-0">HASH:</span>
        <el-tooltip
          effect="dark"
          :content="`${nftSynthesis.info.tokenHash}`"
          placement="bottom"
        >
          <a
            :href="`${browser}/meta/${nftSynthesis.info.tokenHash}`"
            target="_blank"
            class="hover:text-blue truncate ml-1"
          >
            {{ nftSynthesis.info.tokenHash }}
          </a>
        </el-tooltip>
      </div>
      <div class="my-5 flex justify-center">
        <el-button
          type="primary"
          class="text-center text-sm rounded bg-btn text-white border-btn mx-3"
          @click="handleShare"
        >
          {{ $t('nft.share') }}
        </el-button>
      </div>
      <div v-show="isShare" class="my-5 flex justify-center">
        <div class="shareon">
          <ShareNetwork
            class="facebook"
            network="facebook"
            :url="buildImg"
            title="IBAX NETWORK NFT Miner"
          ></ShareNetwork>
          <ShareNetwork
            class="linkedin"
            network="linkedin"
            :url="buildImg"
            title="IBAX NETWORK NFT Miner"
          ></ShareNetwork>
          <ShareNetwork
            class="reddit"
            network="reddit"
            :url="buildImg"
            title="IBAX NETWORK NFT Miner"
          ></ShareNetwork>
          <ShareNetwork
            class="telegram"
            network="telegram"
            :url="buildImg"
            title="IBAX NETWORK NFT Miner"
          ></ShareNetwork>
          <ShareNetwork
            class="twitter"
            network="twitter"
            :url="buildImg"
            title="IBAX NETWORK NFT Miner"
          ></ShareNetwork>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
