<!--
 * @Author: abc
 * @Date: 2021-01-29 18:41:50
 * @LastEditors: abc
 * @LastEditTime: 2021-03-18 14:32:22
 * @Description: Side navigation
-->
<template>
  <div class="side-menu">
    <div class="logo">
      <router-link class="header-logo" :to="{ path: '/' }">
        <img src="../../assets/image/logo-32.png" alt="logo" />
        <span v-show="!isCollapse">{{ $t('jutkey') }}</span>
      </router-link>
    </div>
    <el-scrollbar style="height: calc(100% - 64px)">
      <div class="logo"></div>
      <el-menu
        class="el-menu-vertical-side"
        @open="handleOpen"
        @close="handleClose"
        :default-active="$route.path"
        :collapse="isCollapse"
        :collapse-transition="booTransition"
        :default-openeds="arrOpeneds"
      >
        <template v-for="items in handleGetBar">
          <el-submenu
            :index="items.meta.key"
            v-if="items.children && items.meta.isChild"
            :key="items.meta.key"
          >
            <template slot="title">
              <i :class="items.meta.icon"></i>
              <span slot="title">
                {{ $t(items.meta.title) }}
              </span>
            </template>
            <el-menu-item
              :index="item.path"
              v-for="item in items.children"
              :key="item.meta.key"
            >
              <router-link :to="{ path: item.path }">
                {{ $t(item.meta.title) }}
              </router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :index="items.path" :key="items.meta.key" v-else>
            <router-link
              :to="{ path: items.path }"
              v-if="items.meta.key === '1'"
              exact
            >
              <i :class="items.meta.icon"></i>
              {{ $t(items.meta.title) }}
            </router-link>
            <router-link :to="{ path: items.path }" v-else>
              <i :class="items.meta.icon"></i>
              {{ $t(items.meta.title) }}
            </router-link>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'SildeNav',
  data() {
    return {
      booTransition: true,
      activeIndex: '',
      arrOpeneds: []
    };
  },
  created() {
    this.activeIndex = this.$route.path;
    console.log(this.$route);
  },
  mounted() {},
  watch: {
    $route: {
      handler(val) {
        if (val.meta.key) {
          const strActive = val.meta.key[0];
          console.log(strActive);
          const arr = [];
          arr.push(strActive);
          this.arrOpeneds = [...arr];
        }
      },
      immediate: true
    }
  },
  methods: {
    /*  handleSelect(index, indexPath) {
      console.log(index, indexPath);
    }, */
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    isCollapse() {
      return this.$store.getters.booCollapse;
    },

    handleGetBar: {
      cache: false,
      get() {
        return [...this.$store.getters.handlePostBar];
      }
    }
  }
};
</script>
