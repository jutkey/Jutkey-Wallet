<script setup lang="ts">
import { ref } from 'vue';
import PublicHeader from '@/components/PublicHeader.vue';
import SideNav from '@/components/SideNav.vue';

const isRouterAlive = ref(true);
</script>

<template>
  <el-container>
    <!-- left nav -->
    <el-aside width="auto" class="bg-basic-box">
      <side-nav></side-nav>
    </el-aside>
    <el-container>
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
</template>
