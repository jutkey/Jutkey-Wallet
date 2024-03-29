<script setup lang="ts">
import { ref, watch, reactive, provide, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import zhTw from 'element-plus/es/locale/lang/zh-tw';
import ja from 'element-plus/es/locale/lang/ja';
import es from 'element-plus/es/locale/lang/es';
import tr from 'element-plus/es/locale/lang/tr';
import { invoke } from '@tauri-apps/api/tauri';
import { checkUpdate } from '@tauri-apps/api/updater';
import UpdateApp from '@/components/UpdateApp.vue';
import { handleIsTauri } from '@/plugins/common';

const isUpdate = ref(false);
const isTauri = ref(handleIsTauri());
const appInfo = reactive({ info: {} }) as any;
const route = useRoute();
console.log(route.name);
const isLogin = ref(true);
isLogin.value = route.path === '/login';
watch(
  () => route.path,
  (newVal: string, oldVal: string) => {
    console.log(`new:${newVal},old:${oldVal}`);
    isLogin.value = newVal === '/login';
    console.log(isLogin.value);
  }
);
const locale: any = reactive({ lang: en });
const objLang = reactive([
  {
    label: 'English',
    value: 'en'
  },
  /* {
    label: 'Español',
    value: 'es'
  },
  {
    label: 'Türkçe',
    value: 'tr'
  },
  {
    label: '日本語',
    value: 'ja'
  }, */
  {
    label: '中文简体',
    value: 'zh-cn'
  },
  {
    label: '中文繁体',
    value: 'zh-tw'
  }
]);
const isLoad = ref(true);
const reload = () => {
  isLoad.value = false;
  nextTick(() => {
    isLoad.value = true;
  });
};
provide('reload', reload);
provide('objLang', objLang);
onMounted(() => {
  const lang = localStorage.getItem('lang');
  switch (lang) {
    case 'en':
      locale.lang = en;
      break;
    case 'zh-cn':
      locale.lang = zhCn;
      break;
    case 'zh-tw':
      locale.lang = zhTw;
      break;
    case 'ja':
      locale.lang = ja;
      break;
    case 'es':
      locale.lang = es;
      break;
    case 'tr':
      locale.lang = tr;
      break;
    default:
      locale.lang = en;
      break;
  }
});
// tauri check latest version
if (isTauri.value) {
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
  handleCheckTauri();
  document.addEventListener('DOMContentLoaded', () => {
    invoke('close_splashscreen');
  });
}
const handleClose = () => {
  isUpdate.value = false;
};
</script>

<template>
  <el-config-provider :locale="locale.lang">
    <div
      v-if="isLoad"
      class="h-screen font-pingFang-medium bg-basic text-secnod"
    >
      <!-- login page content -->
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
      <update-app
        v-if="isTauri"
        :is-update="isUpdate"
        :app-info="appInfo"
        @close="handleClose"
      ></update-app>
    </div>
  </el-config-provider>
</template>
