<!--
 * @Author: abc
 * @Date: 2021-01-29 18:41:50
 * @LastEditors: abc
 * @LastEditTime: 2021-03-06 11:43:52
 * @Description: 
-->
<template>
  <div class="global">
    <template v-if="isLogin">
      <!-- login page content -->
      <router-view />
    </template>
    <el-container v-else>
      <!-- left nav -->
      <el-aside width="auto">
        <side-nav></side-nav>
      </el-aside>
      <el-container class="global-content">
        <!-- header -->
        <el-header height="64px">
          <public-header></public-header>
        </el-header>
        <el-main>
          <!-- all page content -->
          <div class="global-content-box">
            <el-scrollbar style="height: 100%">
              <div class="global-content-box-item">
                <transition name="fade">
                  <router-view v-if="isRouterAlive" />
                </transition>
              </div>
            </el-scrollbar>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
      isRouterAlive: true
    };
  },
  watch: {
    $route: {
      handler(val) {
        this.isLogin = this.$route.path === '/login';
        console.log(this.isLogin);
        document.title = 'Jutkey Wallet-' + this.$t(val.meta.title);
      },
      immediate: true
    }
  },
  created() {
    this.isLogin = this.$route.path === '/login';
    const that = this;
    if (!this.isElectron) {
      this.$message({
        dangerouslyUseHTMLString: true,
        message:
          that.$t('usedesktop') +
          '&nbsp;&nbsp; <a href="https://wallet.io/download" target=_blank style="margin-right:10px"><i class="fas fa-cloud-download-alt"></i>' +
          that.$t('downloadclient') +
          '</a>',
        type: 'error',
        showClose: true,
        duration: 0
      });
    }
    //  console.log(this.$route.name);
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="scss">
@import './assets/sass/_index.scss';
</style>
