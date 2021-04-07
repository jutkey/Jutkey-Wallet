<!--
 * @Author: abc
 * @Date: 2021-02-04 17:48:01
 * @LastEditors: abc
 * @LastEditTime: 2021-04-06 16:20:03
 * @Description: Dashboard 
-->
<template>
  <div class="dash">
    <!-- dash first -->
    <div class="dash-first">
      <div class="dash-first-warp">
        <a
          :href="baseUrl.blockexplorer"
          class="dash-first-warp-item"
          v-for="(item, index) in arrTopData"
          :key="index"
          target="_blank"
        >
          <div class="dash-first-box">
            <div class="dash-first-box-img">
              <img :src="item.img" :alt="`dash-${index}`" />
            </div>
            <el-tooltip
              effect="dark"
              :content="`${util.formatAmount(item.value)}`"
              placement="top"
              v-if="index === 0"
            >
              <p class="dash-first-box-num">
                {{ util.formatAmount(item.value) }}
              </p>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              :content="`${util.money_format(item.value)} T`"
              placement="top"
              v-else-if="index === 4"
            >
              <p class="dash-first-box-num">
                {{ util.money_format(item.value) }}&nbsp;T
              </p>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              :content="`${util.money_format(item.value)}`"
              placement="top"
              v-else
            >
              <p class="dash-first-box-num">
                {{ util.money_format(item.value) }}
              </p>
            </el-tooltip>
            <p class="dash-first-box-text">
              {{ $t(item.label) }}
            </p>
          </div>
        </a>
      </div>
    </div>
    <!-- dash secnond -->
    <div class="dash-second">
      <div class="dash-second-warp">
        <div class="dash-second-warp-left">
          <div class="dash-second-property">
            <h4 class="dash-second-property-title dash-second-property-warp">
              <span>{{ $t('dashboard.propertyinfo') }}</span>
              <div class="dash-second-property-warp-right">
                <el-dropdown @command="handleCommand">
                  <div class="dash-dropdown">
                    <el-tooltip effect="dark" :content="coin" placement="top">
                      <span class="dash-dropdown-link">{{ coin }}</span>
                    </el-tooltip>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      :command="index"
                      v-for="(item, index) in arrProperty"
                      :key="item.id"
                      >{{ item.token_title || item.name }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </h4>
            <div class="dash-second-property-item">
              <span> {{ objProperty.token_title || objProperty.name }}</span>
              <el-tooltip
                effect="dark"
                :content="`${util.formatAmount(objProperty.amount)}`"
                placement="bottom"
              >
                <span> {{ util.formatAmount(objProperty.amount) }}</span>
              </el-tooltip>
            </div>
            <!-- USDT  -->
            <div
              class="dash-second-property-bottom"
              v-if="!util.isEmpty(usdtWallet)"
            >
              <span class=""> USDT-ERC20 </span>
              <span class="dash-second-property-bottom-right">
                {{ usdtWallet.balance || 0 }}
              </span>
            </div>
            <!-- No USDT -->
            <div class="dash-second-property-bottom" v-else>
              <span> USDT-ERC20 </span>
              <span class="dash-second-property-bottom-right">
                <button
                  class="dash-second-property-bottom__import"
                  @click="handleUsdtImport"
                >
                  {{ $t('import') }}
                </button>
                <button
                  class="dash-second-property-bottom__usdt"
                  @click="usdt._createAccount(getUsdtWallet)"
                >
                  {{ $t('build') }}
                </button>
              </span>
            </div>
          </div>
        </div>
        <div class="dash-second-warp-right">
          <div class="dash-second-miner">
            <h4 class="dash-second-miner-title">
              {{ $t('dashboard.mineinfo') }}
            </h4>
            <div class="dash-second-miner-content">
              <div
                class="dash-second-miner-content-item"
                v-for="(item, index) in arrMinerInfo"
                :key="index"
              >
                <p>
                  <el-tooltip
                    effect="dark"
                    :content="`${util.money_format(item.value)}`"
                    placement="top"
                  >
                    <span class="dash-first-box-num">{{
                      util.money_format(item.value)
                    }}</span>
                  </el-tooltip>
                  &nbsp;
                  <span class="dash-first-box-text">{{ item.unit }} </span>
                </p>
                <p>
                  <span>{{ $t(item.label) }}</span
                  >&nbsp;
                  <span class="dash-first-box-text">({{ $t(item.zzz) }})</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- dash third -->
    <div class="dash-box">
      <div class="dash-box-warp">
        <div class="dash-box-warp-left">
          <dash-tabel></dash-tabel>
        </div>
        <div class="dash-box-warp-right">
          <dash-echarts v-if="arrProperty.length !== 0"></dash-echarts>
        </div>
      </div>
    </div>
    <!-- dash fourth -->
    <dash-view></dash-view>
    <!-- dash pool -->
    <dash-pool v-if="isPool"></dash-pool>
    <!-- import USDT -->
    <dialog-usdt-import :dialogImport="dialogImport"></dialog-usdt-import>
  </div>
</template>
<script>
import DashTabel from './components/dashTable.vue';
import DashEcharts from './components/dashEcharts.vue';
import DashView from './components/dashView.vue';
import DashPool from './components/dashPool.vue';
import usdt from '@/usdt-erc20';

export default {
  components: { DashTabel, DashEcharts, DashView, DashPool },
  props: {},
  data() {
    return {
      dialogImport: false,
      arrTopData: [
        {
          value: '0',
          img: require('../../assets/image/dash-1.png'),
          label: 'dashboard.liquidity'
        },
        {
          value: '0',
          img: require('../../assets/image/dash-2.png'),
          label: 'dashboard.blockheight'
        },
        {
          value: '0',
          img: require('../../assets/image/dash-3.png'),
          label: 'ecosystem.title'
        },
        {
          value: '0',
          img: require('../../assets/image/dash-4.png'),
          label: 'dashboard.mmcount'
        },
        {
          value: '0',
          img: require('../../assets/image/dash-5.png'),
          label: 'dashboard.minecount'
        }
      ],
      arrProperty: [],
      coin: '',
      objProperty: {},
      arrMinerInfo: [],
      isShowTabel: false,
      isPool: false,
      websocket_token_params: {
        head: {
          version: '1.0',
          msgtype: 'request',
          interface: 'websocket_token',
          remark: ''
        },
        params: {
          cmd: '001',
          ecosystem: 1,
          current_page: 1,
          page_size: 10
        }
      },
      usdtWallet: ''
    };
  },
  computed: {},
  watch: {},
  inject: ['reload'],
  created() {
    this.usdt = usdt;
    this.getUsdtWallet();
    this.handleSocketToken();
    this.handleGetminesummary();
    const poolid = localStorage.getItem('poolid');
    if (poolid) {
      this.isPool = true;
    }
  },
  mounted() {
    this.handleEcosystemkey();
  },
  methods: {
    handleUsdtImport() {
      this.dialogImport = true;
    },
    async getUsdtWallet() {
      this.usdtWallet = await usdt._account();
      console.log(this.usdtWallet);
    },
    handleCommand(index) {
      this.coin =
        this.arrProperty[index].token_title || this.arrProperty[index].name;
      this.objProperty = this.arrProperty[index];
    },
    async handleSocketToken() {
      const res = await this.$http.get(
        '/websocket_token',
        {},
        { interType: 'explorer' }
      );
      console.log(JSON.stringify(res));
      //   console.log(res.code);
      if (res.code == 0) {
        this.handleGetSocket(res.data, this.handleDashboard, 'dashboard');
      }
    },
    /* get webSocket data */
    handleDashboard(res) {
      console.log(res);
      const arr = [
        {
          value: res.data.circulations_amount,
          img: require('../../assets/image/dash-1.png'),
          label: 'dashboard.liquidity'
        },
        {
          value: res.data.block_id,
          img: require('../../assets/image/dash-2.png'),
          label: 'dashboard.blockheight'
        },
        {
          value: res.data.ecosystems,
          img: require('../../assets/image/dash-3.png'),
          label: 'ecosystem.title'
        },
        {
          value: res.data.cast_nodes,
          img: require('../../assets/image/dash-4.png'),
          label: 'dashboard.mmcount'
        },
        {
          value: res.data.total_counts,
          img: require('../../assets/image/dash-5.png'),
          label: 'dashboard.minecount'
        }
      ];
      this.arrTopData = [...arr];
    },
    async handleEcosystemkey() {
      const res = await this.$http.post(
        'ecosystemkeytotals',
        {
          limit: 1000,
          page: 1,
          order: 'id asc',
          // keyid: this.auth.getUser('key_id'),
          where: {}
        },
        { interType: 'mainserver' }
      );
      const rets = [...res.data.rets];
      rets.map((item, index) => {
        if (index === 0) {
          item.active = true;
        } else {
          item.active = false;
        }
        return item;
      });
      // console.log(JSON.stringify(rets));
      this.arrProperty = [...rets];
      this.coin = this.arrProperty[0].token_title || this.arrProperty[0].name;
      this.objProperty = this.arrProperty[0];
      this.$store.dispatch('handleActionCoin', this.coin);
      this.$store.dispatch('handleActionDash', this.arrProperty);
      this.isShowTabel = true;
    },
    async handleGetminesummary() {
      const res = await this.$http.get(
        'userminesummary',
        {},
        { interType: 'poolserver' }
      );
      const arrMinerInfo = [
        {
          value: res.data.mine_count,
          label: 'mine.device_total',
          unit: this.$t('minner_unit'),
          zzz: 'zzzTotalCount'
        },
        {
          value: res.data.mine_ins,
          label: 'mine.stake_amount',
          unit: this.currency,
          zzz: 'zzzTotalstaked'
        },
        {
          value: res.data.stake_amount,
          label: 'pool.compute',
          unit: '',
          zzz: 'zzzExcludingMinersinPool'
        },
        {
          value: res.data.total_count,
          label: 'mine.mining_total',
          unit: this.currency,
          zzz: 'zzzExcludingMinersinPool'
        }
      ];
      this.arrMinerInfo = [...arrMinerInfo];
    }
  }
};
</script>
