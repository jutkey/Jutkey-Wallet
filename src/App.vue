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
import PublicHeader from '@/components/PublicHeader.vue';
import SideNav from '@/components/SideNav.vue';
import UpdateApp from '@/components/UpdateApp.vue';

const route = useRoute();
console.log(route.name);
const isLogin = ref(true);
const isRouterAlive = ref(true);
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

document.addEventListener('DOMContentLoaded', () => {
  invoke('close_splashscreen');
});
</script>

<template>
  <el-config-provider :locale="locale.lang">
    <div
      v-if="isLoad"
      class="h-screen font-pingFang-medium text-basic bg-basic"
    >
      <template v-if="isLogin">
        <!-- login page content -->
        <router-view />
      </template>
      <el-container v-else>
        <!-- left nav -->
        <el-aside width="auto" class="bg-basic-box text-basic">
          <side-nav></side-nav>
        </el-aside>
        <el-container class="global-content">
          <!-- header -->
          <el-header class="bg-basic-box h-header">
            <public-header></public-header>
          </el-header>
          <el-main>
            <!-- all page content -->
            <el-scrollbar style="height: 100%">
              <div class="app-view">
                <router-view v-if="isRouterAlive" v-slot="{ Component }">
                  <transition name="fade">
                    <component :is="Component" />
                  </transition>
                </router-view>
              </div>
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-container>
      <!-- update  verison -->
      <!--  <dialog-updater ref="updater" :isCheck="isCheck"></dialog-updater> -->
      <update-app></update-app>
    </div>
  </el-config-provider>
</template>
