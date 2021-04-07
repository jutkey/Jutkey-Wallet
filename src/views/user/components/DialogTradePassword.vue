<!--
 * @Author: abc
 * @Date: 2021-03-05 15:33:53
 * @LastEditors: abc
 * @LastEditTime: 2021-04-06 18:23:26
 * @Description: Trade Password
-->
<template>
  <el-dialog
    :visible.sync="dialogTrade"
    width="40%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    class="dialog"
  >
    <h3 slot="title">{{ $t('user.modifytradepass') }}</h3>
    <div class="dialog-body">
      <el-alert
        :title="$t('user.forgetpasstips')"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <el-form
        :model="tradepassFrom"
        status-icon
        :rules="checkPassword"
        ref="passwordForm"
        label-width="120px"
        label-position="top"
      >
        <el-form-item :label="$t('user.oldpassword')" prop="oldpassword">
          <el-input
            type="password"
            maxlength="20"
            v-model="tradepassFrom.oldpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.newpassword')" prop="newpassword">
          <el-input
            type="password"
            maxlength="20"
            v-model="tradepassFrom.newpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.repassword')" prop="repassword">
          <el-input
            v-model="tradepassFrom.repassword"
            type="password"
            maxlength="20"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleTardeCancel('passwordForm')">{{
        $t('cancel')
      }}</el-button>
      <el-button type="primary" @click="handleTardeConfirm('passwordForm')">{{
        $t('confirm')
      }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTrade: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    var checkOld = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('wallet.oldpassword')));
      } else if (!this.auth.compare(value, 'tradepass')) {
        return callback(new Error(this.$t('wallet.erroroldpass')));
      } else {
        callback();
      }
    };
    const regPassword = /^(?=.*[a-zA-Z])(?=.*\d)^[^\s\u4e00-\u9fa5]{8,20}$/;
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(this.$t('wallet.newpassword')));
      } else if (!regPassword.test(value)) {
        return callback(
          new Error(this.$t('wallet.passregexp', { num: '8-20' }))
        );
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('wallet.againpassword')));
      } else if (value !== this.tradepassFrom.newpassword) {
        callback(new Error(this.$t('wallet.twopassword')));
      } else {
        callback();
      }
    };
    return {
      tradeLoading: false,
      tradepassFrom: {
        oldpassword: '',
        newpassword: '',
        repassword: ''
      },
      checkPassword: {
        oldpassword: [{ validator: checkOld, trigger: 'blur', required: true }],
        newpassword: [
          { validator: validatePass, trigger: 'blur', required: true }
        ],
        repassword: [
          { validator: validatePass2, trigger: 'blur', required: true }
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
      this.$parent.dialogTrade = false;
      this.$refs['passwordForm'].resetFields();
    },
    handleTardeConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.auth.updateAccountField(
            'tradepass',
            this.tradepassFrom.newpassword
          );
          this.$message.success(this.$t('editsuccess'));
          this.$parent.dialogTrade = false;
        } else {
          return false;
        }
      });
    },
    handleTardeCancel(formName) {
      this.$parent.dialogTrade = false;
      this.$refs[formName].resetFields();
    }
  }
};
</script>
