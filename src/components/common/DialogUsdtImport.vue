<!--
 * @Author: abc
 * @Date: 2021-03-02 11:48:15
 * @LastEditors: abc
 * @LastEditTime: 2021-03-10 16:17:50
 * @Description: import USDT
-->
<template>
  <el-dialog
    :title="$t('zzImportWallet')"
    :visible.sync="dialogImport"
    width="30%"
    :before-close="handleClose"
    class="dialog"
  >
    <div class="dash-dialog">
      <span>USDT&nbsp; {{ $t('wallet.privatekey') }}</span>
      <el-input
        :placeholder="$t('wallet.enterUSDPrivateKey')"
        type="text"
        v-model="prikey"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleUsdtCancel"> {{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="handleUsdtSubmit" :disabled="!prikey">{{
        $t('confirm')
      }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import usdt from '@/usdt-erc20';
export default {
  props: {
    dialogImport: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      prikey: ''
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},

  methods: {
    handleUsdtCancel() {
      this.prikey = '';
      this.$parent.dialogImport = false;
    },
    handleUsdtSubmit() {
      let wallet = usdt._importPrivateKey(this.prikey);
      if (wallet) {
        this.$message.success('Imported successfully');
        this.$parent.dialogImport = false;
        this.prikey = '';
        this.$emit('change', wallet);
      }
    },
    handleClose() {
      this.prikey = '';
      this.$parent.dialogImport = false;
    }
  }
};
</script>
