<!--
 * @Author: abc
 * @Date: 2021-03-08 11:28:48
 * @LastEditors: abc
 * @LastEditTime: 2021-03-31 15:21:25
 * @Description: user container
-->
<template>
  <transition name="fade">
    <router-view v-if="isRouterUser" />
  </transition>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      isRouterUser: true
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  provide() {
    return {
      reloadUser: this.handleReloadUser
    };
  },
  methods: {
    handleReloadUser() {
      this.isRouterUser = false;
      this.$nextTick(() => {
        this.isRouterUser = true;
      });
    }
  }
};
</script>
