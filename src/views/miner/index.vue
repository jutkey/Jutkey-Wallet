<!--
 * @Author: abc
 * @Date: 2021-03-10 09:39:58
 * @LastEditors: abc
 * @LastEditTime: 2021-04-09 11:24:30
 * @Description: miner container
-->
<template>
  <transition name="fade">
    <router-view v-if="isRouterMiner" />
  </transition>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      isRouterMiner: true
    };
  },
  provide() {
    return {
      reloadMiner: this.handleReloadPool
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleReloadPool() {
      this.isRouterMiner = false;
      this.$nextTick(() => {
        this.isRouterMiner = true;
      });
    }
  }
};
</script>
