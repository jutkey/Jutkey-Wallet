<!--
 * @Author: abc
 * @Date: 2021-03-17 10:57:30
 * @LastEditors: abc
 * @LastEditTime: 2021-03-17 11:37:00
 * @Description: miner transfer
-->
<template>
  <el-dialog
    :visible.sync="dialogTransfer"
    width="40%"
    :before-close="handleClose"
    class="dialog"
    v-loading="transferLoading"
    :close-on-click-modal="false"
    element-loading-text="Loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h3 slot="title">{{ $t('mine.edit_address') }}</h3>
    <div class="dialog-body">
      <el-alert
        :closable="false"
        style="margin-bottom: 15px"
        :title="$t('mine.switchkeyid_alert')"
        type="warning"
        show-icon
      >
      </el-alert>
      <!-- miner transfer  -->
      <el-form
        :model="transferFrom"
        status-icon
        :rules="transferCheck"
        ref="transferFrom"
        label-position="top"
      >
        <el-form-item :label="$t('contract.address')" prop="address">
          <el-input
            v-model="transferFrom.address"
            :placeholder="$t('transfer.enter_address')"
            type="text"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleTransferCancel('transferFrom')">{{
        $t('cancel')
      }}</el-button>
      <el-button
        type="primary"
        @click="handleTransferConfirm('transferFrom')"
        >{{ $t('confirm') }}</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTransfer: {
      type: Boolean,
      default: () => false
    },
    objMineInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const regAddress = /^\d{4}-\d{4}-\d{4}-\d{4}-\d{4}$/;
    var checkRecipient = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('PleaseAddress')));
      } else if (!regAddress.test(value)) {
        return callback(new Error(this.$t('zzzpleseaarrress')));
      } else {
        callback();
      }
    };
    return {
      transferLoading: false,
      transferFrom: {
        address: ''
      },
      transferCheck: {
        address: [
          { validator: checkRecipient, trigger: 'blur', required: true }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$parent.dialogTransfer = false;
      this.$refs['transferFrom'].resetFields();
    },
    handleTransferConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(this.$t('mine.confirm_switch_keyid'), this.$t('tips'), {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning'
          })
            .then(() => {
              this.auth.checkTradepass(() => {
                this.transferLoading = true;
                const { address } = this.transferFrom;
                const { devid } = this.objMineInfo;
                this.auth.callContract(
                  'SwitchMineOwnerForKeyID',
                  {
                    DevAddr: devid,
                    NewKeyAddr: address
                  },
                  {
                    Expedite: '' //
                  },
                  (res, status) => {
                    if (status === 'error') {
                      this.$message.error(res.errmsg.error);
                    } else if (status === 'loading') {
                      this.$message.success(this.$t('table.chain'));
                    } else if (status === 'success') {
                      this.$message.success(this.$t('contract.tx_batch'));
                    }
                    this.$router.back();
                    this.transferLoading = false;
                    this.$parent.dialogTransfer = false;
                  }
                );
              });
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    handleTransferCancel(formName) {
      this.$parent.dialogTransfer = false;
      this.$refs[formName].resetFields();
    }
  }
};
</script>
