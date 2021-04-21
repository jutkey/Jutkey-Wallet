<!--
 * @Author: abc
 * @Date: 2021-02-04 17:50:45
 * @LastEditors: abc
 * @LastEditTime: 2021-04-21 15:58:51
 * @Description: Miner list
-->
<template>
  <div class="warp">
    <h2 class="warp-title">{{ $t('navbar.mine') }}</h2>
    <div class="warp-box">
      <div class="warp-box-top">
        <el-radio-group
          v-model="minerRadio"
          @change="handleMinerRadio"
          v-if="arrMinerList.length"
        >
          <el-radio label="date_created">{{ $t('default') }}</el-radio>
          <el-radio label="total_count">{{ $t('pool.compute') }}</el-radio>
          <el-radio label="amount">{{ $t('mine.stake_amount') }}</el-radio>
          <el-radio label="mine_inscount">{{
            $t('mine.mine_inscount')
          }}</el-radio>
        </el-radio-group>
        <div class="warp-box-top-right">
          <span class="warp-box-top-right-text" @click="handleOpenMineCode">
            {{ $t('mine.invitecode') }}
          </span>
          <span class="warp-box-top-right-text" @click="handleAddMiner">
            <i class="iconfont el-ui-zu62"></i>
            {{ $t('mine.add') }}
          </span>
        </div>
      </div>
      <!-- miner list -->
      <div class="miner">
        <div class="miner-noData" v-if="!arrMinerList.length">
          <img src="@/assets/image/miner-1.png" alt="noData" />
          <div>
            {{ $t('emptyData') }}
          </div>
        </div>
        <template v-else>
          <div
            class="miner-item"
            v-for="item in arrMinerList"
            :key="item.id"
            :class="{ 'miner-item-active': item.online > 0 }"
            @click="handleMinerDetails(item)"
          >
            <!-- compute number-->
            <div class="miner-item-small">
              <div class="miner-item-small-num">
                <span> {{ $t('pool.compute') }}: </span>
                <strong> {{ item.total_count }} </strong>
              </div>
              <div class="miner-item-small-text">
                <span> {{ $t('mine.number') }}: </span>
                <span> {{ item.mine_number || '--' }} </span>
              </div>
            </div>
            <!-- stake  capacity-->
            <div class="miner-item-small">
              <div class="miner-item-small-num">
                <span> {{ $t('mine.stake') }}: </span>
                <strong> {{ item.amount }} </strong>
                <small> {{ util.formatUnit(1, 1) }}</small>
              </div>
              <div class="miner-item-small-text">
                <span> {{ $t('mine.capacity') }}：</span>
                <strong> {{ item.mine_capacity || '--' }}</strong>
                <small>T</small>
              </div>
            </div>
            <!-- time mine_name -->
            <div class="miner-item-small">
              <div class="miner-item-small-num">
                <span> {{ $t('mine.totaltime') }}: </span>
                <strong>{{ item.mine_inscount }}</strong>
                <small>{{ $t('mine.time') }}</small>
              </div>
              <div class="miner-item-small-text">
                <span> {{ item.mine_name }}</span>
              </div>
            </div>
            <!-- CurrentPool -->
            <div class="miner-item-small">
              <div class="miner-item-small-num">
                <span> {{ $t('CurrentPool') }}： </span>
                <span> {{ item.name || '--' }} </span>
              </div>
            </div>
          </div>
          <div class="dash-collapse-pagination" style="text-align: right">
            <el-pagination
              background
              layout="prev,pager, next"
              :current-page="objPage.page"
              :pager-count="9"
              :page-size="objPage.limit"
              :hide-on-single-page="true"
              @current-change="handleChangePage"
              :total="objPage.total"
            >
            </el-pagination>
          </div>
        </template>
      </div>
    </div>
    <!-- miner income -->
    <div class="miner-income">
      <div class="miner-income-item">
        <p>{{ $t('mine.inscount') }}</p>
        <p>（{{ $t('zzzExcludingPoolEarnings') }}）</p>
        <p class="miner-income-item-num">
          <el-tooltip
            effect="dark"
            :content="`${
              util.money_format(objMinerTotal.mine_ins) || 0
            } ${util.formatUnit(1, 1)}`"
            placement="bottom"
          >
            <strong class="dash-first-box-num"
              >{{ util.money_format(objMinerTotal.mine_ins) || 0 }}
            </strong>
          </el-tooltip>
          <small class="text"> {{ util.formatUnit(1, 1) }}</small>
        </p>
      </div>
      <div class="miner-income-item">
        <p class="miner-income-item-title">{{ $t('mine.device_total') }}</p>
        <p class="miner-income-item-num">
          <el-tooltip
            effect="dark"
            :content="`${util.money_format(objMinerTotal.mine_count) || 0}`"
            placement="bottom"
          >
            <strong class="dash-first-box-num"
              >{{ objMinerTotal.mine_count || 0 }}
            </strong>
          </el-tooltip>
          <small class="text"> {{ $t('minner_unit') }}</small>
        </p>
      </div>
      <div class="miner-income-item">
        <p class="miner-income-item-title">{{ $t('mine.stake_total') }}</p>
        <p class="miner-income-item-num">
          <el-tooltip
            effect="dark"
            :content="`${
              util.money_format(objMinerTotal.stake_amount) || 0
            } ${util.formatUnit(1, 1)}`"
            placement="bottom"
          >
            <strong class="dash-first-box-num"
              >{{ util.money_format(objMinerTotal.stake_amount) || 0 }}
            </strong>
          </el-tooltip>
          <small class="text"> {{ util.formatUnit(1, 1) }}</small>
        </p>
      </div>
      <div class="miner-income-item">
        <p>{{ $t('pool.computetotal') }}</p>
        <p>（{{ $t('zzzExcludingPoolComputingPower') }}）</p>
        <p class="miner-income-item-num">
          <el-tooltip
            effect="dark"
            :content="`${util.money_format(objMinerTotal.total_count)}`"
            placement="bottom"
          >
            <strong class="dash-first-box-num"
              >{{ util.money_format(objMinerTotal.total_count || 0) }}
            </strong>
          </el-tooltip>
        </p>
      </div>
    </div>
    <div class="miner-table">
      <el-table
        :data="arrMinerIncome"
        style="width: 100%"
        class="dash-table"
        stripe
        v-loading="minerLoading"
        element-loading-text="Loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column
          header-align="center"
          align="center"
          :label="$t('mine.number')"
        >
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('mine.income')"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <span style="color: #04b78a">
              {{ util.formatAmount(scope.row.amount) }}
            </span>
            {{ util.formatUnit(1, 1) }}</template
          >
        </el-table-column>
        <el-table-column
          :label="$t('contract.block_id')"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope"
            ><a
              class="miner-blockexplorer"
              href="javascript:;"
              @click.stop="handleBrower(scope.row)"
              >{{ scope.row.block_id }}</a
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="date_created"
          header-align="center"
          align="center"
          :label="$t('contract.date')"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.date_created | formatTimeUtc"
              placement="bottom"
            >
              <span>{{ util.formatTime(scope.row.date_created) }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="dash-collapse-pagination" style="text-align: right">
        <el-pagination
          background
          layout="prev,pager, next,jumper"
          :current-page="objIncome.page"
          :pager-count="9"
          :page-size="objIncome.limit"
          :hide-on-single-page="true"
          @current-change="handleChangePage($event, 'income')"
          :total="objIncome.total"
        >
        </el-pagination>
      </div>
    </div>
    <!--  Miner invitation Code -->
    <dialog-mine-invite :dialogMine="dialogMine"></dialog-mine-invite>
    <!--  add miner -->
    <dialog-add-miner :dialogAddMine="dialogAddMine"></dialog-add-miner>
  </div>
</template>
<script>
import DialogAddMiner from './components/DialogAddMiner.vue';
export default {
  components: { DialogAddMiner },
  props: {},
  data() {
    return {
      minerRadio: 'date_created',
      arrMinerList: [],
      arrMinerIncome: [],
      dialogMine: false,
      dialogAddMine: false,
      minerLoading: false,
      paramMiner: {
        limit: 5,
        page: 1,
        order: 'date_created desc',
        where: {}
      },
      objPage: {
        page: 1,
        limit: 5,
        total: 1
      },
      objIncome: {
        page: 1,
        limit: 10,
        total: 1
      },
      paramIncome: {
        limit: 10,
        page: 1,
        order: 'id desc'
      },
      objMinerTotal: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    const paramMiner = this.paramMiner;
    this.handleMinerRefresh(paramMiner);
    const paramIncome = this.paramIncome;
    this.handleMinerIncomeHistory(paramIncome);
  },
  mounted() {},
  methods: {
    handleBrower(row) {
      const url = `${this.baseUrl.blockexplorer}/blockHeight/${row.block_id}`;
      if (this.isElectron) {
        window.ipcRenderer.send('open-url', url);
      } else {
        window.open(url);
      }
    },
    handleMinerRadio(val) {
      console.log(val);
      this.paramMiner.page = 1;
      this.paramMiner.order = `${val} desc`;
      this.handleMinerRefresh(this.paramMiner);
    },
    handleChangePage($event, type) {
      if (type === 'income') {
        this.paramIncome.page = $event;
        this.handleMinerIncomeHistory(this.paramIncome);
      } else {
        this.paramMiner.page = $event;
        this.handleMinerRefresh(this.paramMiner);
      }
    },
    async handleMinerRefresh(obj) {
      // open loading
      this.handleOpenLoading();
      const res = await this.$http.get(
        '/minekeystakecountsummaryrefresh',
        {},
        { interType: 'mainserver' }
      );
      if (res.code === 0) {
        console.log(res);
        this.handleMinerSummary(obj);
      }
    },
    async handleMinerSummary(obj) {
      // open loading
      // this.handleOpenLoading();
      const res = await this.$http.post('/minekeystakecountsummary', obj, {
        interType: 'mainserver'
      });
      if (res.code === 0) {
        this.objMinerTotal = res.data.mine_key_total;
        this.arrMinerList = res.data.rets || [];
        this.objPage.total = res.data.total;
        this.objPage.limit = res.data.limit;
        this.objPage.page = res.data.page;
      } else {
        this.objPage.page = 1;
        this.objPage.limit = 5;
        this.objPage.total = 0;
      }
      // close loading
      this.handleCloseLoading();
    },
    // income history
    async handleMinerIncomeHistory(obj) {
      // open loading
      this.minerLoading = true;
      const res = await this.$http.post('/mint/incomehistory', obj, {
        interType: 'mainserver'
      });
      if (res.code === 0) {
        console.log(JSON.stringify(res));
        this.arrMinerIncome = res.data.rets;
        this.objIncome.total = res.data.total;
      } else {
        this.objIncome.total = 0;
        this.objPage.page = 1;
        this.objPage.limit = 10;
      }
      // close loading
      this.minerLoading = false;
    },
    // open Miner invitation Code
    handleOpenMineCode() {
      this.dialogMine = true;
    },
    // jump miner details
    handleMinerDetails(item) {
      this.$router.push({ name: 'MinerDetails', params: { id: item.devid } });
    },
    // add miner
    handleAddMiner() {
      this.dialogAddMine = true;
    }
  }
};
</script>
