<!--
 * @Author: abc
 * @Date: 2021-02-21 16:26:23
 * @LastEditors: abc
 * @LastEditTime: 2021-03-30 18:37:44
 * @Description: 404 page
-->
<template>
  <div class="error about">
    <div class="error-box">
      <img src="@/assets/image/404.png" alt="404" />
      <p class="error-link">
        Sorry! the page you are looking for doesn't exist.
      </p>
      <p>
        Go back to content
        <router-link :to="{ path: '/' }" class="error-link">home</router-link>
        of
        <router-link :to="{ path: '/' }" class="error-link"
          >contact us</router-link
        >
        about a problem.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
