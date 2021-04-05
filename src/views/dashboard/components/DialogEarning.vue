<!--
 * @Author: abc
 * @Date: 2021-02-02 18:44:20
 * @LastEditors: abc
 * @LastEditTime: 2021-03-30 14:44:07
 * @Description: agree judgment
-->
<template>
  <el-dialog
    :visible.sync="dialogEarning"
    width="40%"
    :before-close="handleClose"
  >
    <h3 slot="title">{{ $t('mine.how_to_raseup') }}</h3>
    <div class="pool-dialog" style="height: 300px; line-height: 2em">
      <el-scrollbar style="height: 100%">
        <div
          v-html="$t('mine.hot_to_raseup_detail')"
          class="login-agree-box-content"
        ></div>
      </el-scrollbar>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('close') }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogEarning: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$parent.dialogEarning = false;
    }
  }
};
</script>
