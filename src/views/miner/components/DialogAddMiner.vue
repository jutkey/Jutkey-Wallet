<!--
 * @Author: abc
 * @Date: 2021-03-11 15:04:56
 * @LastEditors: abc
 * @LastEditTime: 2021-03-31 15:38:52
 * @Description: add miner
-->
<template>
  <el-dialog
    :visible.sync="dialogAddMine"
    width="40%"
    v-loading="addMinerLoading"
    :before-close="handleClose"
    class="dialog"
    :close-on-click-modal="false"
    element-loading-text="Loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h3 slot="title">{{ $t('mine.add') }}</h3>
    <div class="dialog-body">
      <el-form
        ref="addMinerForm"
        :model="objAddMineForm"
        :rules="checkAddMiner"
      >
        <el-form-item prop="prikey" label="">
          <el-input
            type="text"
            clearable
            :placeholder="$t('mine.inputprikey')"
            v-model="objAddMineForm.prikey"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="invite">
          <el-input
            type="text"
            maxlength="20"
            :placeholder="$t('mine.inputcode')"
            v-model="objAddMineForm.invite"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <check-verify
          v-model="verifypass"
          @checkchange="handleChangeVerify"
          ref="childVerify"
          :dragText="$t('verify.drag')"
          :passText="$t('verify.pass')"
        ></check-verify>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleAddMinerCancel('addMinerForm')">{{
        $t('cancel')
      }}</el-button>
      <el-button
        type="primary"
        :disabled="verifypass"
        @click="handleAddMinerConfirm('addMinerForm')"
        >{{ $t('confirm') }}</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import keyring from '@/plugins/keyring';
export default {
  props: {
    dialogAddMine: {
      type: Boolean,
      default: () => {}
    }
  },
  data() {
    const checkPrikey = (rule, value, callback) => {
      if (
        !keyring.validatePrivateKey(value) ||
        !/^[0-9a-zA-Z]+$/.test(value) ||
        value.match(/[\uff00-\uffff]/g)
      ) {
        return callback(new Error(this.$t('wallet.invalidprivatekey')));
      } else {
        callback();
      }
    };
    return {
      verifypass: true,
      addMinerLoading: false,
      objAddMineForm: {
        pubkey: '',
        prikey: '',
        invite: ''
      },
      paramMiner: {
        limit: 5,
        page: 1,
        order: 'date_created desc',
        where: {}
      },
      checkAddMiner: {
        prikey: [{ validator: checkPrikey, trigger: 'blur', required: true }],
        invite: [
          {
            required: false
          }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleChangeVerify(boo) {
      console.log(boo);
      this.verifypass = boo;
    },
    handleClose() {
      this.$parent.dialogAddMine = false;
      this.$refs.childVerify.verifyCode = 0;
      this.verifypass = true;
      this.$refs['addMinerForm'].resetFields();
    },
    handleAddMinerConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleActiveMineInfo(this.objAddMineForm);
        } else {
          return false;
        }
      });
    },
    // Call to add miner contract
    handleActiveMineInfo({ prikey, invite }) {
      this.addMinerLoading = true;
      this.auth.callContract(
        'ActiveMineInfo',
        {
          DevActivePubKey: keyring.generatePublicKey(prikey),
          Sign: keyring.sign('123456', prikey),
          Data: '123456',
          Invite: invite
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
            this.$message.success(this.$t('dosuccess'));
          }
          this.handleClientip(prikey);
        }
      );
    },
    async handleClientip(prikey) {
      const res = await this.$http.get(
        '/clientip',
        {},
        { interType: 'mainserver' }
      );
      if (res.code === 0) {
        console.log(res);
        let { ip, latitude, location, longitude } = res.data;
        let pubkey = keyring.generatePublicKey(prikey);
        let activeid = this.util.publicKeyToKeyId(pubkey);
        const res1 = await this.$http.post(
          '/mineactiongps',
          {
            activeid,
            ip,
            latitude,
            location,
            longitude,
            sign: keyring.sign(ip + location + longitude + latitude, prikey)
          },
          { interType: 'mainserver' }
        );
        console.log(res1);
        if (res1.code === 0) {
          //this.$message.success(this.$t('dosuccess'));
          this.$parent.paramMiner.page = 1;
          this.$parent.minerRadio = 'date_created';
          this.$parent.paramMiner.order = 'date_created desc';
          const paramMiner = this.$parent.paramMiner;
          this.$parent.handleMinerRefresh(paramMiner);
          this.$parent.dialogAddMine = false;
          this.$refs.childVerify.verifyCode = 0;
          this.verifypass = true;
          this.$refs['addMinerForm'].resetFields();
        }
        this.addMinerLoading = false;
      }
    },
    handleAddMinerCancel(formName) {
      this.$parent.dialogAddMine = false;
      this.$refs.childVerify.verifyCode = 0;
      this.verifypass = true;
      this.$refs[formName].resetFields();
    }
  }
};
</script>
