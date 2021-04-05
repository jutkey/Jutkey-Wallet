<!--
 * @Author: abc
 * @Date: 2021-03-09 10:59:45
 * @LastEditors: abc
 * @LastEditTime: 2021-03-31 15:45:47
 * @Description: Transfer transaction
-->
<template>
  <el-dialog
    v-loading="transferLoading"
    :visible.sync="dialogTransfer"
    width="40%"
    :before-close="handleClose"
    class="dialog"
    :close-on-click-modal="false"
    element-loading-text="Loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h3 slot="title">{{ $t('ecosystem.transfer') }}</h3>
    <div class="pool-dialog" style="height: 300px">
      <el-scrollbar style="height: 100%">
        <div class="dialog-body">
          <el-form
            :model="transferFrom"
            status-icon
            :rules="transferCheck"
            ref="transferForm"
            label-position="top"
            v-if="isTransfer"
          >
            <el-form-item
              :label="$t('ecosystem.balance')"
              class="warp-form-item"
            >
              <span class="warp-form-item-text">{{
                util.formatAmount(objWallet.amount)
              }}</span>
              <span class="dash-first-box-text">
                {{ objWallet.token_title }}</span
              >
            </el-form-item>
            <el-form-item :label="$t('transferMethod')">
              <el-radio-group
                v-model="transferRadio"
                @change="handleTransferRadio"
              >
                <el-radio :label="1">{{ $t('AddressTransfer') }}</el-radio>
                <el-radio :label="2">{{ $t('NicknameTransfer') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              :label="$t('contract.address')"
              prop="Recipient"
              v-if="transferRadio === 1"
            >
              <el-input
                v-model="transferFrom.Recipient"
                :placeholder="$t('transfer.enter_address')"
                type="text"
                autocomplete="off"
                clearable
              ></el-input>
            </el-form-item>
            <!-- nickname -->
            <el-form-item
              :label="$t('user.nickname')"
              prop="MemberName"
              v-if="transferRadio === 2"
            >
              <el-input
                v-model="transferFrom.MemberName"
                :placeholder="$t('PleaseNickname')"
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
            <el-form-item :label="$t('transfer.gasfee')" prop="urgent">
              <el-input
                v-model="transferFrom.urgent"
                :placeholder="$t('transfer.enter_gasfee')"
                type="number"
                clearable
                autocomplete="off"
                @blur="handleBlur('urgent')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('contract.remark')" prop="Comment">
              <el-input
                v-model="transferFrom.Comment"
                :placeholder="$t('transfer.enter_remark')"
                type="text"
                clearable
                maxlength="50"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleTransferCancel('transferForm')">{{
        $t('cancel')
      }}</el-button>
      <el-button
        type="primary"
        @click="handleTransferConfirm('transferForm')"
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
    objWallet: {
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
    const regNick = /^[\w]{1,20}$/;
    var checkNickName = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        return callback(new Error(this.$t('PleaseNickname')));
      } else if (!regNick.test(value)) {
        return callback(new Error(this.$t('nicknameRules')));
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
      transferLoading: false,
      transferFrom: {
        MemberName: '',
        Recipient: '',
        Amount: 0,
        Comment: '',
        urgent: 0
      },
      transferCheck: {},
      transferRecipient: {
        Recipient: [
          { validator: checkRecipient, trigger: 'blur', required: true }
        ],
        Amount: [{ validator: checkAmount, trigger: 'blur', required: true }]
      },
      transferName: {
        MemberName: [
          { validator: checkNickName, trigger: 'blur', required: true }
        ],
        Amount: [{ validator: checkAmount, trigger: 'blur', required: true }]
      },
      transferRadio: 1,
      isTransfer: true
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
    },
    'transferFrom.urgent': {
      handler(newVal, oldVal) {
        // console.log(newVal);
        this.handleCheck('urgent', newVal, oldVal);
      },
      immediate: false
    }
  },
  created() {
    this.transferCheck = this.transferRecipient;
  },
  mounted() {},
  inject: ['reloadUser'],
  methods: {
    async handleTransferRadio(val) {
      this.isTransfer = false;
      if (val === 1) {
        this.transferCheck = this.transferRecipient;
      } else if (val === 2) {
        this.transferCheck = this.transferName;
      }
      await this.$nextTick();
      this.isTransfer = true;
      // console.log(this.$refs['transferForm']);
    },
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
      this.$parent.dialogTransfer = false;
      this.$refs['transferForm'].resetFields();
    },
    handleTransferConfirm(formName) {
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
    handleTransferCancel(formName) {
      this.transferRadio = 1;
      this.$parent.dialogTransfer = false;
      this.$refs[formName].resetFields();
    },
    handleTransferSend(transferFrom) {
      this.transferLoading = true;
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
            this.$message.success(this.$t('dosuccess'));
          }
          this.transferLoading = false;
          this.$parent.dialogTransfer = false;
          this.reloadUser();
          this.$refs['transferForm'].resetFields();
        }
      );
    }
  }
};
</script>
