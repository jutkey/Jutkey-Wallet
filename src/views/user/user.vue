<!--
 * @Author: abc
 * @Date: 2021-02-04 17:48:43
 * @LastEditors: abc
 * @LastEditTime: 2021-03-31 15:28:36
 * @Description: user center
-->
<template>
  <div class="warp">
    <h2 class="warp-title">{{ $t('navbar.user_center') }}</h2>
    <!-- user first -->
    <div class="warp-top" :style="parseInt(theme) === 0 ? backLight : backDark">
      <div class="warp-top-user">
        <div class="warp-top-user-head" @click="handleDialogUpload">
          <img :src="userInfo.avatar" alt="head" v-if="userInfo.avatar" />
          <img src="@/assets/image/profile.png" alt="head" v-else />
        </div>
        <h3 class="warp-top-user-name">
          {{ userInfo.member_name || $t('user.modifynickname') }}
          <i class="iconfont el-ui-bianji" @click="handleDialogUpload"></i>
        </h3>
        <div class="job">
          {{
            userInfo.isadmin
              ? $t('user.admin', { id: userInfo.ecosystem_id })
              : ''
          }}
        </div>
        <div>
          {{ auth.getUser('account') }}
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('copy')"
            placement="bottom"
          >
            <i
              @click="util.copyText(auth.getUser('account'))"
              class="iconfont el-ui-zu291"
            ></i>
          </el-tooltip>
        </div>
      </div>
      <!-- right -->
      <div class="warp-top-right">
        <div class="warp-top-right-money">
          <div class="warp-top-right-money-ava">
            <div class="warp-top-right-money-left">
              <!--  <span>{{ $t('availableAmount') }}:</span> -->
              <el-tooltip
                effect="dark"
                :content="`${util.formatAmount(
                  userInfo.amount
                )} ${util.formatUnit(userInfo.ecosystem_id, 1)}`"
                placement="bottom"
              >
                <span class="warp-top-right-money-num dash-first-box-num">
                  {{ util.formatAmount(userInfo.amount) }}
                </span>
              </el-tooltip>
              <span class="dash-first-box-text">
                {{ util.formatUnit(userInfo.ecosystem_id, 1) }}
              </span>
            </div>
            <div class="warp-top-right-money-box" v-if="objReceive.show">
              <div class="warp-top-right-money-receive">
                <span class="warp-top-right-money-title">
                  {{ $t('recoverableAmount') }}:
                </span>
                <el-tooltip
                  effect="dark"
                  :content="`${util.formatAmount(
                    objReceive.amount
                  )} ${util.formatUnit(userInfo.ecosystem_id, 1)}`"
                  placement="bottom"
                >
                  <span class="dash-first-box-num">
                    {{ util.formatAmount(objReceive.amount) }}
                  </span>
                </el-tooltip>
                <span class="dash-first-box-text"
                  >{{ util.formatUnit(userInfo.ecosystem_id, 1) }}
                </span>
                <a
                  class="warp-ecology-item-content-right-text"
                  style="margin-left: 10px"
                  @click="handleAvailableAmount"
                >
                  {{ $t('receive') }}
                </a>
              </div>
              <div class="warp-top-right-money-receive">
                <span class="warp-top-right-money-title">
                  {{ $t('frozenAmount') }}:
                </span>
                <el-tooltip
                  effect="dark"
                  :content="`${util.formatAmount(
                    objReceive.balance
                  )} ${util.formatUnit(userInfo.ecosystem_id, 1)}`"
                  placement="bottom"
                >
                  <span class="dash-first-box-num">
                    {{ util.formatAmount(objReceive.balance) }}
                  </span>
                </el-tooltip>
                <span class="dash-first-box-text">
                  {{ util.formatUnit(userInfo.ecosystem_id, 1) }}
                </span>
              </div>
            </div>
          </div>
          <div class="warp-ecology-item-content-right">
            <!-- Transfer button -->
            <el-button
              type="primary"
              @click="handleTransferReceipt('dialogTransfer', userInfo)"
            >
              {{ $t('ecosystem.transfer') }}
            </el-button>
            <!-- Receipt button -->
            <el-button
              type="primary"
              @click="handleTransferReceipt('dialogReceipt', userInfo)"
              >{{ $t('ecosystem.receipt') }}</el-button
            >
            <el-button @click="handleTransferRecord" class="warp-el-button">{{
              $t('transferrecord')
            }}</el-button>
          </div>
        </div>
        <!-- other card -->
        <div class="warp-top-right-card">
          <!-- Export Wallet File -->
          <div class="warp-top-right-card-item" @click="handleExporterWallet">
            <i class="iconfont el-ui-zu143"></i>
            <span>{{ $t('user.exportwallet') }}</span>
          </div>
          <!-- Export Private Key -->
          <div
            class="warp-top-right-card-item"
            @click="handleExporter('privateKey')"
          >
            <i class="iconfont el-ui-zu145"></i>
            <span>{{ $t('user.exportprivatekey') }}</span>
          </div>
          <!-- Modify Trade Password -->
          <div
            class="warp-top-right-card-item"
            @click="handleExporter('words')"
          >
            <i class="iconfont el-ui-zu146"></i>
            <span> {{ $t('user.exportwords') }}</span>
          </div>
          <!-- Modify Trade Password -->
          <div class="warp-top-right-card-item" @click="handleOpenarrtal">
            <i class="iconfont el-ui-zu144"></i>
            <span> {{ $t('user.modifytradepass') }}</span>
          </div>
          <!--  Miner invitation Code -->
          <div class="warp-top-right-card-item" @click="handleOpenMineCode">
            <i class="iconfont el-ui-zu147"></i>
            <span> {{ $t('mine.invitecode') }}</span>
          </div>
          <div
            class="warp-top-right-card-item"
            v-if="$store.state.userInfo.isadmin"
            @click="$message.error('Retention features')"
          ></div>
        </div>
      </div>
    </div>
    <!-- Transfer transaction -->
    <dialog-transfer-trans
      :dialogTransfer="dialogTransfer"
      :objWallet="objWallet"
      v-if="objWallet.account"
    ></dialog-transfer-trans>
    <!-- Receipt transaction -->
    <dialog-receipt-trans
      :dialogReceipt="dialogReceipt"
      :objWallet="objWallet"
      v-if="objWallet.account"
    ></dialog-receipt-trans>
    <!-- Modify Trade Password -->
    <dialog-trade-password :dialogTrade="dialogTrade"></dialog-trade-password>
    <!--  Miner invitation Code -->
    <dialog-mine-invite :dialogMine="dialogMine"></dialog-mine-invite>
    <more-ecology></more-ecology>
    <!-- upload head and change nickname -->
    <dialog-upload-name :dialogUpload="dialogUpload"></dialog-upload-name>
  </div>
</template>
<script>
import DialogUploadName from './components/DialogUploadName.vue';
var md5 = require('md5');
import keyring from '@/plugins/keyring';
import MoreEcology from './components/moreEcology.vue';
import DialogTradePassword from './components/DialogTradePassword.vue';
import DialogTransferTrans from './components/DialogTransferTrans.vue';
import DialogReceiptTrans from './components/DialogReceiptTrans.vue';
export default {
  components: {
    DialogUploadName,
    MoreEcology,
    DialogTradePassword,
    DialogTransferTrans,
    DialogReceiptTrans
  },
  props: {},
  data() {
    return {
      backDark: {
        backgroundImage: `url(${require('@/assets/image/user-dark.png')})`
      },
      backLight: {
        backgroundImage: `url(${require('@/assets/image/user-light.png')})`
      },
      dialogReceipt: false,
      dialogTransfer: false,
      dialogTrade: false,
      dialogMine: false,
      dialogUpload: false,
      objEcology: {},
      objReceive: {
        amount: 0,
        balance: 0,
        show: false
      },
      ecosystem_id: '',
      ecosystem: '1',
      account: '',
      imgid: 0,
      profileForm: {
        ImageId: '',
        nickname: ''
      },
      objWallet: {}
    };
  },
  computed: {
    userInfo() {
      // console.log(JSON.stringify(this.$store.getters.handleGettersUserInfo));
      return this.$store.getters.handleGettersUserInfo;
    },
    theme() {
      return this.$store.getters.handleGettersTheme;
    }
  },
  watch: {},
  created() {
    //  this.handleEcologyKey();
    this.$store.dispatch('handleActionEcology').then(() => {
      console.log(this.$store.state.arrEcologyKey);
      const data = this.$store.state.arrEcologyKey.rets;
      this.profileForm.nickname = data[0].nick_name;
      this.imgid = parseInt(data[0].member_image_id);
      const account = (this.account = data[0].account);
      this.ecosystem_id = data[0].id;
      this.handleAssignBalance(account);
    });
  },
  mounted() {},
  inject: ['reloadUser'],
  methods: {
    handleTransferReceipt(key, obj) {
      console.log(obj, this[key]);
      this.objWallet = obj;
      this[key] = true;
    },
    handleTransferRecord() {
      this.$router.push({ name: 'UserTransfer', params: { id: 1 } });
    },
    handleOpenMineCode() {
      this.dialogMine = true;
    },
    handleDialogUpload() {
      this.dialogUpload = true;
    },
    async handleAssignBalance(account) {
      const res = await this.$http.get(`/assignbalance/${account}`);
      if (res.code === 0) {
        this.objReceive = res.data;
      }
    },
    handleAvailableAmount() {
      this.auth.checkTradepass(() => {
        this.handleAssignAvailableAmount();
      });
    },
    handleAssignAvailableAmount() {
      // open loading
      this.handleOpenLoading();
      this.auth.callContract(
        {
          name: 'GetAssignAvailableAmount',
          ecosystem_id: this.ecosystem_id
        },
        {
          Account: this.account
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
          this.reloadUser();
          // close loading
          this.handleCloseLoading();
        }
      );
    },
    handleExporterWallet() {
      const that = this;
      this.auth.checkTradepass(() => {
        var wallet = this.auth.getAccount();
        wallet.nickname = encodeURI(wallet.nickname);
        var string = JSON.stringify(wallet);
        this.$prompt(that.$t('wallet.setaespass'), that.$t('wallet.backup'), {
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel'),
          inputType: 'password',
          inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9!@#$%^&*_]{8,50}$/,
          inputErrorMessage: that.$t('wallet.passregexp1', {
            num: '8-50'
          }),
          closeOnClickModal: false
        }).then(({ value }) => {
          string = keyring.encryptAES(string, value);
          //console.log(md5(string).toUpperCase());
          that.util.export(
            'wallet.dat',
            'secret' + md5(string).toUpperCase() + string
          );
        });
      });
    },
    // Export Private Key or Modify Trade Password
    handleExporter(field) {
      var info = this.auth.getAccount(field);
      if (field == 'words' && !info) {
        return this.$message.error(this.$t('user.emptywords'));
      }
      this.auth.checkTradepass(() => {
        if (info) {
          this.util.export(field + '.txt', info);
        } else {
          this.$message.error(this.$t('dofail'));
        }
      });
    },
    //  Modify Trade Password
    handleOpenarrtal() {
      this.dialogTrade = true;
    }
  }
};
</script>
