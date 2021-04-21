<!--
 * @Author: abc
 * @Date: 2021-02-05 00:22:17
 * @LastEditors: abc
 * @LastEditTime: 2021-02-21 22:51:28
 * @Description: node container
-->
<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>
<script>
export default {
  props: {},
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    next((vm) => {
      vm.$router.push('/node/honor');
    });
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
