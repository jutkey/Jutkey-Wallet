<!--
 * @Author: abc
 * @Date: 2021-02-04 10:36:08
 * @LastEditors: abc
 * @LastEditTime: 2021-04-06 16:04:38
 * @Description: import  document
-->
<template>
  <el-dialog
    :title="$t('wallet.import')"
    :visible.sync="isImport"
    width="40%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    center
  >
    <el-tabs v-model="importForm.type" @tab-click="handleClick">
      <el-tab-pane :label="$t('wallet.keywords')" name="words">
        <div class="login-words">
          <el-input
            v-for="(i, index) in 15"
            :key="index"
            type="text"
            class="login-words-list"
            @keyup="watchInputWords(i)"
            @blur="watchInputWords(i)"
            @keydown="watchInputWords(i)"
            v-model="importForm.words[i]"
          ></el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('wallet.privatekey')" name="privatekey">
        <el-input
          v-if="importForm.type != 'wallet'"
          type="textarea"
          :placeholder="$t('wallet.inputprikey')"
          name="file"
          :autosize="{ minRows: 4, maxRows: 6 }"
          v-model="importForm.value"
        ></el-input>
      </el-tab-pane>
      <el-tab-pane :label="$t('wallet.keystone')" name="wallet">
        <div class="login-upload">
          <el-upload
            class="upload-demo"
            action="#"
            :multiple="false"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <div class="login-upload-icon">
              <i class="el-icon-upload" v-if="!importForm.file"></i>
              <i class="el-icon-document" v-else></i>
            </div>
            <div
              style="margin-top: 10px; margin-bottom: -5px"
              v-if="importForm.file"
            >
              {{ importForm.file }}
            </div>
            <el-button class="login-upload-btn" size="small" type="text">{{
              importForm.file
                ? $t('wallet.selectagain')
                : $t('wallet.selectfile')
            }}</el-button>
          </el-upload>
        </div>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('back') }}</el-button>
      <el-button
        type="primary"
        @click="handleSureImport"
        :disabled="
          (importForm.type == 'wallet' && importForm.disabled) ||
          (importForm.type != 'wallet' && !importForm.value) ||
          importForm.loading
        "
        >{{ $t(importForm.loading ? 'importing' : 'import') }}</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import keyring from '@/plugins/keyring.js';
var md5 = require('md5');
export default {
  props: {
    isImport: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      importForm: {
        id: false,
        file: '',
        type: 'words',
        value: '',
        disabled: true,
        words: {},
        loading: false,
        locknickname: false
      }
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {
    // eslint-disable-next-line no-undef
    FileReader.prototype.reading = function ({ encode } = pms) {
      let bytes = new Uint8Array(this.result);
      let text = new TextDecoder(encode || 'UTF-8').decode(bytes);
      return text;
    };
    FileReader.prototype.readAsBinaryString = function (f) {
      if (!this.onload)
        this.onload = () => {
          let rs = this.reading();
          console.log(rs);
        };
      this.readAsArrayBuffer(f);
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.importForm.type = 'words';
      this.importForm.value = '';
      this.importForm.file = '';
      this.importForm.words = {};
      this.$parent.isImport = false;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    watchInputWords(index) {
      let words = [],
        res = this.importForm.words;
      console.log(res[index]);
      if (res[index]) {
        var value = res[index].replace(/^\s+|\s+$/g, '');
        if (value.split(' ').length == 15) {
          var item = value.split(' ');
          for (var i = 1; i <= 15; i++) {
            res[i] = item[i - 1];
          }
        }
        for (var key in res) {
          res[key] && words.push(res[key]);
        }
        this.importForm.value = words.join(' ');
      }
    },
    beforeAvatarUpload(file) {
      console.log(file);
      this.importForm.file = file.name;
      this.read(file);
      return false;
    },
    read(f) {
      const that = this;
      let rd = new FileReader();
      rd.onload = (e) => {
        console.log(e);
        let cont = rd.reading({
          encode: 'GBK'
        });
        console.log(cont);
        that.importForm.disabled = false;
        that.importForm.value = cont;
      };
      rd.readAsBinaryString(f);
    },
    handleSureImport() {
      const that = this;
      var data = this.importForm;
      data.value = data.value.trim();
      data.locknickname = false;
      if (data.type == 'wallet') {
        var walletdata = this.importForm.value;
        console.log(walletdata);
        var sign = walletdata.substring(0, 38);
        //console.log(this.importForm.value);
        //console.log(walletdata);
        walletdata = walletdata.slice(38);
        //console.log(sign);
        //console.log(walletdata);
        //console.log(md5(walletdata).toUpperCase());
        if (sign != 'secret' + md5(walletdata).toUpperCase()) {
          return this.$message.error(this.$t('wallet.invalidkeystone'));
        }
        this.$prompt(this.$t('wallet.enteraespass'), this.$t('wallet.import'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          inputType: 'password',
          customClass: 'cusepassword',
          inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9!@#$%^&*_]{8,50}$/,
          inputErrorMessage: this.$t('wallet.passregexp1', {
            num: '8-50'
          }),
          closeOnClickModal: false
        })
          .then(({ value }) => {
            try {
              let wallet = JSON.parse(keyring.decryptAES(walletdata, value));
              console.log(wallet);
              if (wallet.privateKey && wallet.publicKey) {
                wallet.nickname = decodeURI(wallet.nickname);
              }
              const objAccount = this.auth.getWallets();
              console.log(this.util.handleHasNickname(objAccount, wallet));
              if (this.util.handleHasNickname(objAccount, wallet)) {
                this.$message.error(this.$t('wallet.existnickname'));
                return false;
              }
              this.auth.addWallet(wallet);
              const account_list = this.auth.getWallets();
              this.$emit('addaccount', account_list);
              this.$message.success(this.$t('wallet.importsuccess'));
              this.$parent.isImport = false;
              this.importForm.value = '';
              this.importForm.disabled = true;
              this.importForm.file = '';
              let keys = Object.keys(account_list);
              this.$parent.formData.username = keys[keys.length - 1];
              this.$parent.formData.password = wallet.lockpass;
              this.$parent.handleSubmit();
              return;
            } catch (e) {
              this.importForm.disabled = false;
              this.$message.error(this.$t('wallet.errorbackuppass'));
            }
          })
          .catch(() => {});
      } else if (data.type == 'privatekey') {
        if (
          !keyring.validatePrivateKey(data.value) ||
          !/^[0-9a-zA-Z]+$/.test(data.value) ||
          data.value.match(/[\uff00-\uffff]/g)
        ) {
          return that.$message.error(this.$t('wallet.invalidprivatekey'));
        }
        this.$parent.wallet_create_step(1);
        this.$parent.createData.privateKey = data.value;
        this.$parent.createData.publicKey = keyring.generatePublicKey(
          data.value
        );
        this.importForm.value = '';
        this.$parent.isImport = false;
        this.$parent.createType = 'privatekey';
      } else if (data.type == 'words') {
        if (!keyring.validateSeed(data.value)) {
          return that.$message.error(this.$t('wallet.invalidwords'));
        }
        this.$parent.wallet_create_step(1);
        this.$parent.createData.words = data.value;
        this.$parent.isImport = false;
        this.$parent.createType = 'words';
      }
    }
  }
};
</script>
