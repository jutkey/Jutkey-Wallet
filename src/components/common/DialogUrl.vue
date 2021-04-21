<!--
 * @Author: abc
 * @Date: 2021-04-02 17:36:09
 * @LastEditors: abc
 * @LastEditTime: 2021-04-21 15:51:29
 * @Description: pool url
-->
<template>
  <el-dialog :visible.sync="dialogUrl" width="40%" :before-close="handleClose">
    <h3 slot="title">{{ $t('SecurityAlert') }}</h3>
    <div class="dialog-body">
      <h4 style="text-align: left">{{ $t('Yougoingto') }}:</h4>
      <div class="dialog-text-url">
        {{ objPoolUrl.home_url }}
      </div>
      <el-alert
        :closable="false"
        :title="$t('openingthirdparty')"
        type="warning"
      ></el-alert>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleUrlCancel">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="handleUrlConfirm">
        {{ $t('Continue') }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogUrl: {
      type: Boolean,
      default: () => false
    },
    objPoolUrl: {
      type: Object,
      default: () => {}
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
    handleUrlConfirm() {
      if (this.isElectron) {
        window.ipcRenderer.send('open-url', this.objPoolUrl.home_url);
      } else {
        window.open(this.objPoolUrl.home_url);
      }

      this.$parent.dialogUrl = false;
    },
    handleUrlCancel() {
      this.$parent.dialogUrl = false;
    },
    handleClose() {
      this.$parent.dialogUrl = false;
    }
  }
};
</script>
