<!--
 * @Author: abc
 * @Date: 2021-03-09 16:44:00
 * @LastEditors: abc
 * @LastEditTime: 2021-04-02 18:47:25
 * @Description: Receipt transaction
-->
<template>
  <el-dialog
    v-loading="receiptLoading"
    :visible.sync="dialogReceipt"
    width="40%"
    :before-close="handleClose"
    class="dialog"
  >
    <h3 slot="title">{{ $t('ecosystem.transfer') }}</h3>
    <div class="dialog-body" style="text-align: center">
      <vue-qr
        class="qrcode"
        :logoSrc="logoSrc"
        :text="util.formQrocdeData(objWallet.account, counter, objWallet.id)"
        :dotScale="0.9"
        style="height: 200px; border: 1px dashed #ddd"
        :size="200"
        ref="qrCodeUrl"
      ></vue-qr>
      <div>{{ objWallet.account }}</div>
      <div class="col-md-12 p-0">
        {{ $t('contract.money') }}：
        <el-input-number
          size="medium"
          v-model="counter"
          :min="0"
        ></el-input-number>
        <b> {{ objWallet.token_title }}</b>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleReceiptCancel">
        {{ $t('cancel') }}
      </el-button>
      <el-button type="primary" @click="handleReceiptConfirm">
        {{ $t('transfer.savepic') }}</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import VueQr from 'vue-qr';
export default {
  components: {
    VueQr
  },
  props: {
    dialogReceipt: {
      type: Boolean,
      default: () => false
    },
    objWallet: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      receiptLoading: false,
      counter: 0,
      logoSrc: require('../../../assets/image/logo-32.png')
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.counter = 0;
      this.$parent.dialogReceipt = false;
    },
    handleReceiptConfirm() {
      let a = document.createElement('a');
      a.download = 'code-' + this.counter;
      a.href = this.$refs.qrCodeUrl.$el.src;
      a.dispatchEvent(new MouseEvent('click'));
      this.$parent.dialogReceipt = false;
      this.counter = 0;
    },
    handleReceiptCancel() {
      this.counter = 0;
      this.$parent.dialogReceipt = false;
    }
  }
};
</script>
