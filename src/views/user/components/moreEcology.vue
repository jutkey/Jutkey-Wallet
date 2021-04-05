<!--
 * @Author: abc
 * @Date: 2021-03-05 15:03:02
 * @LastEditors: abc
 * @LastEditTime: 2021-04-02 18:24:18
 * @Description:  more ecology
-->
<template>
  <div class="warp-ecology">
    <!-- USDT not exist -->
    <div
      class="warp-ecology-item"
      v-if="util.isEmpty(usdtWallet)"
      :style="arrEcologyKey.length <= 1 ? width : {}"
    >
      <div class="warp-ecology-item-box">
        <h4 class="dash-second-miner-title">USDT Wallet &nbsp;ERC20</h4>
        <div class="warp-ecology-item-content-right">
          <el-button @click="handleUsdtImport">
            {{ $t('import') }}
          </el-button>
          <el-button type="primary" @click="usdt._createAccount(getUsdtWallet)">
            {{ $t('build') }}
          </el-button>
        </div>
      </div>
    </div>
    <!-- USDT exist -->
    <div
      class="warp-ecology-item"
      v-else
      :style="arrEcologyKey.length <= 1 ? width : {}"
    >
      <div class="warp-ecology-item-box">
        <h4 class="dash-second-miner-title">USDT Wallet&nbsp; ERC20</h4>
        <div class="warp-ecology-item-content">
          <div class="warp-ecology-item-content--left">
            <div class="warp-ecology-item-content--left-box">
              <el-tooltip
                effect="dark"
                :content="usdtWallet.address"
                placement="bottom"
              >
                <div class="warp-ecology-item-content--left-box--right">
                  {{ usdtWallet.address }}
                </div>
              </el-tooltip>
              <i
                @click="util.copyText(usdtWallet.address)"
                class="iconfont el-ui-zu291"
              ></i>
            </div>
            <div class="warp-ecology-item-content--left-box">
              <div class="warp-ecology-item-content--left-box--left">
                <el-tooltip
                  effect="dark"
                  :content="`${usdtWallet.balance} USDT`"
                  placement="bottom"
                >
                  <span class="dash-first-box-num">
                    {{ usdtWallet.balance }}
                  </span>
                </el-tooltip>
                <span
                  class="dash-first-box-text"
                  style="margin-top: 5px; margin-left: 5px"
                  >USDT</span
                >
              </div>
            </div>
            <div class="warp-ecology-item-content--left-box">
              <!-- usdt transfer -->
              <em
                class="warp-ecology-item-content-right-text warp-ecology-item-text"
                @click="handleTransferReceipt('usdtTransfer', usdtWallet)"
                >{{ $t('ecosystem.transfer') }}</em
              >
              <!-- usdt receipt -->
              <em
                class="warp-ecology-item-content-right-text warp-ecology-item-text"
                @click="handleTransferReceipt('usdtReceipt', usdtWallet)"
                >{{ $t('ecosystem.receipt') }}</em
              >
            </div>
          </div>

          <div class="warp-ecology-item-content-right">
            <el-button
              @click="usdt._exportPrivatekey()"
              class="warp-el-button"
              >{{ $t('user.exportprivatekey') }}</el-button
            >
            <el-button @click="handleDeleteUsdtWallet">{{
              $t('delete.wallet')
            }}</el-button>
            <span
              class="warp-ecology-item-content-right-text"
              @click="handleOtherTransfer"
              >{{ $t('transferrecord') }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- other ecology -->
    <template v-for="item in arrEcologyKey">
      <div class="warp-ecology-item" :key="item.id" v-if="item.id !== 1">
        <div class="warp-ecology-item-box">
          <h4 class="dash-second-miner-title">
            {{ item.name }}
          </h4>
          <div class="warp-ecology-item-content">
            <div class="warp-ecology-item-content-img">
              <img
                :src="item.member_image_url"
                alt="profile"
                v-if="item.member_image_url"
              />
              <img
                src="../../../assets/image/profile.png"
                alt="profile"
                v-else
              />
            </div>
            <div class="warp-ecology-item-content-middle">
              <el-tooltip
                effect="dark"
                :content="`${util.formatAmount(item.amount)} ${
                  item.token_title
                }`"
                placement="bottom"
              >
                <span class="dash-first-box-num">
                  {{ util.formatAmount(item.amount) }}
                </span>
              </el-tooltip>
              <span class="dash-first-box-text">{{ item.token_title }} </span>
            </div>
            <div class="warp-ecology-item-content-right">
              <!-- Transfer transaction -->
              <el-button
                @click="handleTransferReceipt('dialogTransfer', item)"
                >{{ $t('ecosystem.transfer') }}</el-button
              >
              <!-- Receipt transaction -->
              <el-button
                type="primary"
                @click="handleTransferReceipt('dialogReceipt', item)"
                >{{ $t('ecosystem.receipt') }}</el-button
              >
              <span
                class="warp-ecology-item-content-right-text"
                @click="handleTransferRecord(item.id)"
                >{{ $t('transferrecord') }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </template>
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
    <!-- import USDT -->
    <dialog-usdt-import :dialogImport="dialogImport"></dialog-usdt-import>
    <!-- usdt transfer -->
    <trans-usdt
      :usdtTransfer="usdtTransfer"
      :objWallet="objWallet"
      v-if="objWallet.address"
    ></trans-usdt>
    <!-- usdt receipt -->
    <receipt-usdt
      :usdtReceipt="usdtReceipt"
      :objWallet="objWallet"
      v-if="objWallet.address"
    ></receipt-usdt>
  </div>
</template>
<script>
import usdt from '@/usdt-erc20';
import DialogTransferTrans from './DialogTransferTrans.vue';
import DialogReceiptTrans from './DialogReceiptTrans.vue';
import TransUsdt from '@/usdt-erc20/transUsdt.vue';
import ReceiptUsdt from '../../../usdt-erc20/ReceiptUsdt.vue';
export default {
  components: {
    DialogTransferTrans,
    DialogReceiptTrans,
    TransUsdt,
    ReceiptUsdt
  },
  props: {},
  data() {
    return {
      width: {
        width: '100%'
      },
      dialogTransfer: false,
      dialogReceipt: false,
      dialogImport: false,
      usdtTransfer: false,
      usdtReceipt: false,
      objWallet: {},
      usdtWallet: usdt._getAccount()
    };
  },
  computed: {
    arrEcologyKey() {
      console.log(this.$store.getters.handleGettersEcologyKey);
      return this.$store.getters.handleGettersEcologyKey || [];
    }
  },
  watch: {},
  created() {
    this.usdt = usdt;
    this.getUsdtWallet();
    // console.log(this.util.isEmpty(this.usdtWallet));
  },
  mounted() {},
  methods: {
    handleUsdtImport() {
      this.dialogImport = true;
    },
    handleDeleteUsdtWallet() {
      usdt._deleteAccount(() => {
        this.usdtWallet = {};
        this.getUsdtWallet();
      });
    },
    handleTransferReceipt(key, obj) {
      console.log(key);
      console.log(obj);
      this.objWallet = obj;
      this[key] = true;
    },
    async getUsdtWallet() {
      this.usdtWallet = await usdt._account();
      console.log(this.usdtWallet);
    },
    handleTransferRecord(id) {
      this.$router.push({ name: 'UserTransfer', params: { id: id } });
    },
    handleOtherTransfer() {
      this.$router.push({ name: 'OtherTransfer', params: { id: 'usdt' } });
    }
  }
};
</script>
