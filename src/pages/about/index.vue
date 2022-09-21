<script setup lang="ts">
import { version } from '../../../package.json';

console.log(version);
const versionstr = `BPN-α-v${version}`;
</script>
<template>
  <div class="bg-basic-box rounded form-box text-basic">
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
      <div class="mx-auto inline-flex justify-between">
        <a
          href="https://ibax.io/server/privacy-policy"
          target="_blank"
          class="flex-shrink-0 underline text-blue"
        >
          {{ $t('about.privacy') }}
        </a>
        <a
          href="https://ibax.io/contact"
          target="_blank"
          class="mx-20 flex-shrink-0 underline text-blue"
        >
          {{ $t('about.contact') }}
        </a>
        <a
          href="https://ibax.io"
          target="_blank"
          class="flex-shrink-0 underline text-blue"
        >
          {{ $t('about.web') }}
        </a>
      </div>
    </div>
    <div class="py-10 text-center flex justify-around">
      <img src="@/assets/image/about.png" alt="about" class="w-3/12" />
      <div class="flex flex-wrap content-around w-1/4" style="display: none">
        <div class="mb-3 w-full">
          <h2 class="text-muted mb-3">{{ $t('about.tip') }}</h2>
          <div class="mb-5">{{ $t('about.desktop') }}</div>
          <div class="text-left">
            <el-button
              type="primary"
              class="text-center text-sm rounded bg-blue text-white border-blue"
            >
              {{ $t('about.download') }}
            </el-button>
          </div>
        </div>
        <div class="flex justify-between items-center w-full">
          <a href="https://www.facebook.com/IBAXNetwork" target="_blank">
            <i class="iconfont el-ui-facebook text-2xl"></i>
          </a>
          <a href="https://twitter.com/IbaxNetwork" target="_blank">
            <i class="iconfont el-ui-twitter text-2xl"></i>
          </a>
          <a
            href="https://www.youtube.com/channel/UC-oneUwzz01xaCkFTTyR0QQ/featured"
            target="_blank"
          >
            <i class="iconfont el-ui-youtube text-2xl"></i>
          </a>
          <!--   <a href="https://t.me/IBAXNetwork" target="_blank">
        <i class="iconfont el-telegram"></i>
      </a> -->
          <a href="https://www.linkedin.com/company/ibaxio/" target="_blank">
            <i class="iconfont el-ui-linkedin text-2xl"></i>
          </a>
          <a href="https://discord.gg/zRX6Mwafya" target="_blank">
            <i class="iconfont el-ui-discord text-2xl"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
