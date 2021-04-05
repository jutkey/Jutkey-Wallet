<!--
 * @Author: abc
 * @Date: 2021-03-09 17:50:36
 * @LastEditors: abc
 * @LastEditTime: 2021-03-17 12:06:40
 * @Description: usdt transfer transaction
-->
<template>
  <el-dialog
    v-loading="usdtLoading"
    :visible.sync="usdtTransfer"
    width="40%"
    :before-close="handleClose"
    class="dialog"
  >
    <h3 slot="title">{{ $t('ecosystem.transfer') }}</h3>
    <div class="dialog-body">
      <el-form
        :model="transferFrom"
        status-icon
        :rules="transferCheck"
        ref="transferForm"
        label-position="top"
      >
        <el-form-item :label="$t('ecosystem.balance')" class="warp-form-item">
          <span class="warp-form-item-text">{{ objWallet.balance }}</span>
          <span class="dash-first-box-text"> USDT</span>
        </el-form-item>
        <el-form-item :label="$t('contract.address')" prop="Recipient">
          <el-input
            v-model="transferFrom.Recipient"
            :placeholder="$t('transfer.enter_address')"
            type="text"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('ecosystem.amount')" prop="Amount">
          <el-input
            v-model="transferFrom.Amount"
            :placeholder="$t('transfer.enter_money')"
            type="number"
            clearable
            autocomplete="off"
            @blur="handleBlur('Amount')"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleUsdtCancel('transferForm')">{{
        $t('cancel')
      }}</el-button>
      <el-button type="primary" @click="handleUsdtConfirm('transferForm')">{{
        $t('confirm')
      }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    usdtTransfer: {
      type: Boolean,
      default: () => false
    },
    objWallet: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    var checkRecipient = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('PleaseAddress')));
      } else {
        callback();
      }
    };
    var checkAmount = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        return callback(new Error(this.$t('amountRules')));
      } else if (value.length > 30) {
        return callback(new Error('Input number length exceeds 32'));
      } else {
        callback();
      }
    };
    return {
      usdtLoading: false,
      transferFrom: {
        MemberName: '',
        Recipient: '',
        Amount: 0
      },
      transferCheck: {
        Recipient: [
          { validator: checkRecipient, trigger: 'blur', required: true }
        ],
        Amount: [{ validator: checkAmount, trigger: 'blur', required: true }]
      }
    };
  },
  computed: {},
  watch: {
    'transferFrom.Amount': {
      handler(newVal, oldVal) {
        //  console.log(newVal);
        this.handleCheck('Amount', newVal, oldVal);
      },
      immediate: false
    }
  },
  created() {},
  mounted() {},
  inject: ['reload'],
  methods: {
    handleCheck(key, newVal) {
      console.log(newVal);
      if (!isNaN(parseFloat(newVal))) {
        //  console.log(reg.test(newVal));
        let v;
        if (Number(newVal) === 0) {
          v = newVal;
        } else {
          // eslint-disable-next-line no-useless-escape
          v = newVal.toString().replace(/^(\-)*(\d+)\.(\d{12}).*$/, '$2.$3');
        }
        if (v.toString().indexOf('-') >= 0) {
          v = '';
        }
        this['transferFrom'][key] = v >= 0 ? v : '';
      } else {
        this['transferFrom'][key] = '';
      }
    },
    handleBlur(key) {
      if (Number(this['transferFrom'][key]) === 0) {
        this['transferFrom'][key] = 0;
      } else if (this['transferFrom'][key].length > 30) {
        // var reg = /(^[1-9]([0-9]\d{0,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        this.$message({
          message: 'Input number length exceeds 32!',
          type: 'warning'
        });
        this['transferFrom'][key] = 0;
        return false;
      }
    },
    handleClose() {
      this.transferRadio = 1;
      this.$parent.usdtTransfer = false;
      this.$refs['transferForm'].resetFields();
    },
    handleUsdtConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(this.$t('ecosystem.confirmtransfer'), this.$t('tips'), {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning'
          }).then(() => {
            this.auth.checkTradepass(() => {
              this.handleTransferSend(this.transferFrom);
            });
          });
        } else {
          return false;
        }
      });
    },
    handleUsdtCancel(formName) {
      this.transferRadio = 1;
      this.$parent.usdtTransfer = false;
      this.$refs[formName].resetFields();
    },
    handleTransferSend(transferFrom) {
      this.transferLoading = true;
      const that = this;
      const { id } = this.objWallet;
      const { Amount, MemberName, Recipient, Comment, urgent } = transferFrom;
      this.auth.callContract(
        {
          name: 'TokensSend',
          ecosystem_id: id
        },
        {
          Amount,
          MemberName,
          Recipient,
          Comment
        },
        {
          Expedite: urgent //
        },
        (res, status) => {
          if (status === 'error') {
            this.$message.error(res.errmsg.error);
          } else if (status === 'loading') {
            this.$message.success(this.$t('table.chain'));
          } else if (status === 'success') {
            that.$message.success(that.$t('dosuccess'));
            this.$store.dispatch('handleActionEcology');
          }
          that.transferLoading = false;
          this.$parent.usdtTransfer = false;
        }
      );
    }
  }
};
</script>
