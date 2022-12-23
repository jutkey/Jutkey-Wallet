<script setup lang="ts">
import { ref, reactive } from 'vue';
import { invoke } from '@tauri-apps/api/tauri';
import { checkUpdate } from '@tauri-apps/api/updater';
import { version } from '../../../package.json';
import { handleIsTauri } from '@/plugins/common';
import UpdateApp from '@/components/UpdateApp.vue';
import PrivacyPolicy from '@/components/about/PrivacyPolicy.vue';

const isUpdate = ref(false);
const appInfo = reactive({ info: {} }) as any;
const isTauri = ref(handleIsTauri());
const isDialog = ref(false);
const versionstr = `BPN-α-v${version}`;
const handleCheckTauri = async () => {
  const isTauri = await invoke('is_tauri');
  console.log(`%c${isTauri}`, 'color: red;font-size:20px');
  if (isTauri === 'tauri') {
    try {
      const { shouldUpdate, manifest } = await checkUpdate();
      console.log(shouldUpdate, manifest);
      if (shouldUpdate) {
        isUpdate.value = true;
        appInfo.info = manifest;
      } else {
        isUpdate.value = false;
      }
    } catch (error) {
      isUpdate.value = false;
      console.log(error);
    }
  }
};
const handleClose = () => {
  isUpdate.value = false;
};
const handleDialogClose = () => {
  isDialog.value = false;
};
const handleDialogOpen = () => {
  isDialog.value = true;
};
</script>
<template>
  <div class="bg-basic-box rounded form-box">
    <div class="p-10 text-center">
      <img
        src="@/assets/image/logo-512.png"
        alt="logo-512"
        class="w-40 mx-auto mb-3"
      />
      <div class="mb-3">
        <span>{{ $t('about.version') }}:</span>
        <span>{{ versionstr }}</span>
      </div>
      <div class="mx-auto inline-flex justify-between text-first">
        <a
          href="javascript:;"
          class="flex-shrink-0 underline text-first hover:text-blue"
          @click="handleDialogOpen"
        >
          {{ $t('about.privacy') }}
        </a>
        <a
          href="https://jutkey.com/"
          target="_blank"
          class="mx-20 flex-shrink-0 underline text-first hover:text-blue"
        >
          {{ $t('about.web') }}
        </a>
        <a
          href="https://twitter.com/jut_key"
          target="_blank"
          class="flex-shrink-0 underline text-first hover:text-blue"
        >
          {{ $t('about.contact') }}
        </a>
        <span
          v-if="isTauri"
          class="flex-shrink-0 mx-20 underline cursor-pointer text-first hover:text-blue"
          @click="handleCheckTauri"
        >
          {{ $t('about.new') }}
        </span>
      </div>
    </div>
    <div class="py-10 text-center flex justify-around">
      <img src="@/assets/image/about.png" alt="about" class="w-3/12" />
      <div class="flex flex-wrap content-around w-1/4">
        <div v-if="!isTauri" class="mb-3 w-full">
          <a
            class="block text-muted mb-3 underline hover:text-blue"
            target="_blank"
            href="https://github.com/jutkey/Jutkey-Wallet/releases"
          >
            {{ $t('about.tip') }}
          </a>
          <div class="mb-5">{{ $t('about.desktop') }}</div>
        </div>
        <!--  <div class="flex justify-between items-center w-full">
          <a href="https://www.facebook.com/IBAXNetwork" target="_blank">
            <i class="iconfont el-ui-facebook text-2xl hover:text-blue"></i>
          </a>
          <a href="https://twitter.com/IbaxNetwork" target="_blank">
            <i class="iconfont el-ui-twitter text-2xl hover:text-blue"></i>
          </a>
          <a
            href="https://www.youtube.com/channel/UC-oneUwzz01xaCkFTTyR0QQ/featured"
            target="_blank"
          >
            <i class="iconfont el-ui-youtube text-2xl hover:text-blue"></i>
          </a>
          <a href="https://t.me/IBAXNetwork" target="_blank">
            <i class="iconfont el-ui-telegram hover:text-blue"></i>
          </a>
          <a href="https://www.linkedin.com/company/ibaxio/" target="_blank">
            <i class="iconfont el-ui-linkedin text-2xl hover:text-blue"></i>
          </a>
          <a href="https://discord.gg/zRX6Mwafya" target="_blank">
            <i class="iconfont el-ui-discord text-2xl hover:text-blue"></i>
          </a>
        </div> -->
      </div>
    </div>
    <update-app
      v-if="isTauri"
      :is-update="isUpdate"
      :app-info="appInfo"
      @close="handleClose"
    ></update-app>
    <privacy-policy
      :is-dialog="isDialog"
      @close="handleDialogClose"
    ></privacy-policy>
  </div>
</template>
