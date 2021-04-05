<!--
 * @Author: abc
 * @Date: 2021-02-02 20:25:24
 * @LastEditors: abc
 * @LastEditTime: 2021-02-03 12:15:28
 * @Description: create use second
-->
<template>
  <div class="login-second">
    <h3 class="third-level-title__bold login-center">
      {{ $t('wallet.' + (createType == 'create' ? 'creatting' : 'setting')) }}
    </h3>
    <el-form
      ref="createUser"
      :rules="rules"
      :label-position="labelPosition"
      label-width="80px"
      :model="objCreateUser"
    >
      <el-form-item :label="$t('wallet.nickname')" prop="nickname">
        <el-input
          v-model="objCreateUser.nickname"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('wallet.tradepass')" prop="tradepass">
        <el-input
          type="password"
          v-model="objCreateUser.tradepass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('wallet.reptradepass')"
        prop="confirm_tradepass"
        v-if="createType === 'create'"
      >
        <el-input
          type="password"
          v-model="objCreateUser.confirm_tradepass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="login-btn">
          <el-button
            type="primary"
            @click="handleCreateSubmit('createUser')"
            class="login-btn-item"
            >{{
              $t(createType == 'create' ? 'create' : 'wallet.enter')
            }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    createType: {
      type: String,
      default: () => 'create'
    },
    accountList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const regPassword = /^(?=.*[a-zA-Z])(?=.*\d)^[^\s\u4e00-\u9fa5]{8,20}$/;
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('wallet.enternickname')));
      }
      setTimeout(() => {
        const isNull = Object.keys(this.accountList).length;
        if (isNull > 0) {
          for (var i in this.accountList) {
            if (this.accountList[i].nickname == this.objCreateUser.nickname) {
              return callback(new Error(this.$t('wallet.existnickname')));
            }
          }
        }
        if (this.util.Strlen(this.objCreateUser.nickname) > 20) {
          return callback(new Error(this.$t('wallet.maxnicknamelength')));
        }
        callback();
      }, 500);
    };
    let validatePass = (rule, value, callback) => {
      if (!regPassword.test(this.objCreateUser.tradepass)) {
        callback(
          new Error(
            this.$t('wallet.passregexp1', {
              num: '8-20'
            })
          )
        );
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('passwordAgain')));
      } else if (value !== this.objCreateUser.tradepass) {
        callback(new Error(this.$t('wallet.passwordnotmatch')));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'top',
      objCreateUser: {
        nickname: '',
        tradepass: '',
        confirm_tradepass: ''
      },
      rules: {
        nickname: [{ validator: checkName, trigger: 'blur' }],
        tradepass: [{ validator: validatePass, trigger: 'blur' }],
        confirm_tradepass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleCreateSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('createdata', this.objCreateUser);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
