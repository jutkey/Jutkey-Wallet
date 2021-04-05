<!--
 * @Author: abc
 * @Date: 2021-02-02 18:44:20
 * @LastEditors: abc
 * @LastEditTime: 2021-02-02 20:01:33
 * @Description: agree judgment
-->
<template>
  <el-dialog
    class="login-agree"
    :title="$t('user.agreement')"
    :visible.sync="objShowAgree.isShowAgree"
    width="40%"
  >
    <div class="login-agree-box">
      <el-scrollbar style="height: 100%">
        <div
          v-html="objShowAgree.strAgree"
          class="login-agree-box-content"
        ></div>
      </el-scrollbar>
    </div>
    <el-divider></el-divider>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCloseAgree">{{ $t('reject') }}</el-button>
      <el-button type="primary" @click="handleAgree">{{
        $t('agree')
      }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    objShowAgree: {
      type: Object,
      default: () => {
        return { isShowAgree: false, strAgree: '' };
      }
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
    handleAgree() {
      this.$emit('agree', 1);
    },
    handleCloseAgree() {
      this.$emit('closeagree', false);
    }
  }
};
</script>
