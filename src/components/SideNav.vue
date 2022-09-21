<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { handleRouter } from '@/plugins/common';
import store from '@/store';

export interface API {
  handleChangeActive: Function;
}
const route = useRoute();
const router = useRouter();
const arrOpeneds: string[] = [];
const arrRouter = reactive(handleRouter());
console.log(router);
const pathActive = ref('/');
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

watch(
  () => route.name,
  (newVal: any, oldVal: any) => {
    console.log(`new:${newVal},old:${oldVal}`);
    switch (newVal) {
      case 'Home':
        pathActive.value = '/';
        break;
      case 'Assets':
      case 'Record':
      case 'Transfer':
        pathActive.value = '/assets';
        break;
      case 'Ethereum':
      case 'EthRecord':
      case 'EthTransfer':
      case 'TokenTransfer':
      case 'TokenRecord':
        pathActive.value = '/ethereum';
        break;
      case 'Honor':
      case 'HonorId':
      case 'VoteRecord':
      case 'StakeRecord':
        pathActive.value = '/honor';
        break;
      case 'Manage':
        pathActive.value = '/manage';
        break;
      case 'NFT':
      case 'NFTDetails':
        pathActive.value = '/nft';
        break;
      case 'Message':
      case 'MessageDetails':
        pathActive.value = '/message';
        break;
      case 'Help':
      case 'HelpDetails':
        pathActive.value = '/help';
        break;
      case 'About':
        pathActive.value = '/about';
        break;
      default:
        break;
    }
  },
  {
    immediate: true
  }
);
const isCollapse = computed(() => {
  return store.getters.postCollapse;
});
const theme = computed(() => {
  return store.getters.postTheme;
});
</script>
<template>
  <el-scrollbar style="height: 100%">
    <el-menu
      :default-active="pathActive"
      class="text-basic"
      :collapse="isCollapse"
      :default-openeds="arrOpeneds"
      router
      unique-opened
      :background-color="theme === 'light' ? '#fff' : '#1d2742'"
      @open="handleOpen"
      @close="handleClose"
    >
      <router-link
        class="flex items-center pl-20px h-header"
        :to="{ path: '/' }"
      >
        <img src="@/assets/image/logo-32.png" alt="logo" class="w-img" />
        <span v-show="!isCollapse" class="ml-3 text-blue text-lg">
          Jutkey Wallet
        </span>
      </router-link>
      <template v-for="item in arrRouter">
        <el-sub-menu
          v-if="item.children"
          :key="item.key"
          class="text-basic"
          :index="item.path"
          popper-class="text-basic"
        >
          <template #title>
            <div class="text-basic">
              <i :class="item.icon" class="text-icon"></i>
              <span class="ml-3">{{ $t(item.title) }}</span>
            </div>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.key"
            :index="child.path"
            class="text-basic"
          >
            <span class="ml-3">{{ $t(child.title) }}</span>
          </el-menu-item>
        </el-sub-menu>
        <template v-else>
          <el-menu-item
            v-if="item.path"
            :key="item.key"
            :index="item.path"
            class="text-basic"
          >
            <i :class="item.icon" class="text-icon"></i>
            <span class="ml-3">{{ $t(item.title) }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>
