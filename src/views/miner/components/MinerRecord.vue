<!--
 * @Author: abc
 * @Date: 2021-03-12 16:07:03
 * @LastEditors: abc
 * @LastEditTime: 2021-04-21 15:59:06
 * @Description: 
-->
<template>
  <div class="warp-box">
    <el-tabs v-model="activeMiner" @tab-click="handleMinerTab">
      <!-- Stake Records -->
      <el-tab-pane :label="$t('mine.stake_record')" name="first">
        <el-table
          stripe
          :data="arrMineStakeList"
          style="width: 100%"
          class="dash-table"
        >
          <el-table-column :label="$t('mine.stake_amount')">
            <template slot-scope="scope" :show-overflow-tooltip="true">
              <span>
                <strong class="miner-item-bolder">{{
                  scope.row.amount
                }}</strong>
                <small class="miner-item-label">{{
                  util.formatUnit(1, true)
                }}</small>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            :label="$t('mine.stake_time')"
          >
            <template slot-scope="scope">
              <span> {{ scope.row.cycle }} {{ $t('mine.day') }} </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('mine.stake_date')">
            <template slot-scope="scope">
              <el-tooltip
                :content="scope.row.stime | formatTimeUtc"
                placement="bottom"
              >
                <span>
                  {{ scope.row.stime | formatTime }}
                </span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column :label="$t('mine.current_state')">
            <template slot-scope="scope">
              <span>
                {{
                  scope.row.expired == 0
                    ? $t('mine.expired.no')
                    : $t('mine.expired.yes')
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('mine.transfer_out')">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">
                <el-button type="primary" @click="handleWithDraw(scope.row)">
                  {{ $t('mine.withdraw') }}
                </el-button>
              </span>
              <span v-else-if="scope.row.status == 1" style="color: #04b78a">
                {{ $t('mine.haswithdraw') }}
              </span>
              <span v-else-if="scope.row.status == 2" style="color: #f2a626">
                {{ $t('mine.checking') }}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('zziiSettlementdetails')">
            <template slot-scope="scope">
              <span
                @click="handleRecordDetails(scope.row)"
                class="miner-blockexplorer"
                >{{ $t('table.view') }}</span
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- Mining Records -->
      <el-tab-pane :label="$t('mine.mining_record')" name="second">
        <el-table
          stripe
          :data="arrMineIncomeList"
          style="width: 100%"
          class="dash-table"
        >
          <el-table-column :label="$t('mine.income')">
            <template slot-scope="scope" :show-overflow-tooltip="true">
              <span>
                <strong class="miner-item-bolder">{{
                  util.formatAmount(scope.row.amount)
                }}</strong>
                <small class="miner-item-label">{{
                  util.formatUnit(1, true)
                }}</small>
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('contract.block_id')">
            <template slot-scope="scope">
              <a
                class="miner-blockexplorer"
                href="javascript:;"
                @click.prevent="handleBrower(scope.row)"
                >{{ scope.row.block_id }}</a
              >
            </template>
          </el-table-column>
          <el-table-column :label="$t('contract.date')">
            <template slot-scope="scope">
              <el-tooltip
                :content="scope.row.date_created | formatTimeUtc"
                placement="bottom"
              >
                <span>
                  {{ scope.row.date_created | formatTime }}
                </span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="dash-collapse-pagination" style="text-align: right">
      <el-pagination
        background
        layout="prev,pager, next,jumper"
        :current-page="objPage.page"
        :pager-count="9"
        :page-size="objPage.limit"
        :hide-on-single-page="true"
        @current-change="handleChangePage"
        :total="objPage.total"
      >
      </el-pagination>
    </div>
    <div class="warp-box-stake" v-show="isStake">
      <el-button type="primary" @click="handleOpenStake" :disabled="isReject">
        {{ $t('mine.stake') }}
      </el-button>
    </div>
    <!-- record details -->
    <dialog-record
      :dialogRecord="dialogRecord"
      :objRecordDetails="objRecordDetails"
      v-if="objRecordDetails.devid"
    ></dialog-record>
    <!-- dialog stake -->
    <dialog-stake
      :objStakeShow="objStakeShow"
      @eventaddminestake="handleAddminestake"
    ></dialog-stake>
  </div>
</template>
<script>
import DialogRecord from './DialogRecord.vue';
import DialogStake from './DialogStake.vue';
export default {
  components: { DialogRecord, DialogStake },
  props: {
    objStakeRecord: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeMiner: 'first',
      objPage: {
        page: 1,
        limit: 10,
        total: 1
      },
      isStake: true,
      arrMineStakeList: [],
      arrMineIncomeList: [],
      objRecordDetails: {},
      dialogRecord: false,
      arrMinerTags: [
        {
          label: this.$t('mine.stake_record'),
          name: 'first'
        },
        {
          label: this.$t('mine.mining_record'),
          name: 'second'
        }
      ],
      arrMinerData: [],
      objStakeShow: {
        dialogStake: false
      }
    };
  },
  computed: {
    isReject() {
      console.log(this.$store.getters.handleGettersReject);
      return this.$store.getters.handleGettersReject;
    }
  },
  watch: {},
  created() {
    this.handleGetMinestake();
  },
  inject: ['reloadMiner'],
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
    handleAddminestake() {
      this.activeMiner = 'first';
      const devid = this.$route.params.id;
      this.objPage.page = 1;
      this.handleGetMinestake();
      this.handleGetMineIncome();
      this.$parent.handleMinerSummaryDetial(devid);
    },
    // miner stake
    async handleOpenStake() {
      const dialogStake = true;
      const { devid, mine_capacity, mine_number } = this.objStakeRecord;
      this.objStakeShow = {
        devid,
        mine_capacity,
        mine_number,
        dialogStake
      };
      console.log(this.objStakeShow);
    },
    handleMinerTab(tab) {
      // console.log(tab);
      this.objPage.page = 1;
      if (tab.name === 'first') {
        this.isStake = true;
        this.handleGetMinestake();
      } else {
        this.isStake = false;
        this.handleGetMineIncome();
      }
    },
    async handleRecordDetails(row) {
      console.log(row);
      this.dialogRecord = true;
      const res = await this.$http.get(
        `mineinfostakehistorydetial/${row.id}`,
        {},
        { interType: 'mainserver' }
      );
      console.log(res);
      if (res.code === 0) {
        this.objRecordDetails = res.data;
      }
    },
    handleChangePage(page) {
      if (this.activeMiner === 'first') {
        this.handleGetMinestake(page);
      } else {
        this.handleGetMineIncome(page);
      }
    },
    async handleGetMinestake(page = 1) {
      let devid = this.$route.params.id;
      const res = await this.$http.post(
        '/mint/stakehistory',
        {
          limit: 10,
          page: page,
          order: 'date_created desc',
          devid: devid
        },
        { interType: 'mainserver' }
      );
      console.log(JSON.stringify(res));
      if (res.code === 0) {
        this.arrMineStakeList = res.data.rets || [];
        this.objPage.total = res.data.total;
      } else {
        this.objPage.total = 0;
        this.arrMineStakeList = [];
      }
      this.$store.dispatch('handleActionReject', this.arrMineStakeList);
    },
    async handleGetMineIncome(page = 1) {
      let devid = this.$route.params.id;
      const res = await this.$http.post(
        '/mint/mineincome',
        {
          limit: 10,
          page: page,
          order: 'date_created desc',
          devid: devid
        },
        { interType: 'mainserver' }
      );
      // console.log(JSON.stringify(res));
      if (res.code === 0) {
        this.arrMineIncomeList = res.data.rets || [];
        this.objPage.total = res.data.total;
      } else {
        this.objPage.total = 0;
        this.arrMineIncomeList = [];
      }
    },
    async handleStakecountsummaryrefresh() {
      const res = await this.$http.get(
        '/minekeystakecountsummaryrefresh',
        {},
        { interType: 'mainserver' }
      );
      if (res.code === 0) {
        this.reloadMiner();
        console.log(res);
      }
    },
    // WithDraw
    async handleWithDraw(row) {
      const res = await this.$http.get(
        'mint/stakerulerelease',
        {},
        { interType: 'mainserver' }
      );
      if (res.code === 0) {
        console.log(JSON.stringify(res));
        let item = res.data;
        let gasfee = 0;
        try {
          if (item.ptype == 3) {
            gasfee = item.param3;
          } else if (item.ptype == 2) {
            var tmp = Date.parse(new Date()).toString();
            var nowtime = parseInt(tmp.substr(0, 10));
            var attime = parseFloat(row.etime) - parseFloat(row.stime);
            gasfee =
              (((((parseFloat(row.amount) * parseFloat(item.param1)) / 100) *
                (parseFloat(row.etime) - nowtime)) /
                attime) *
                parseFloat(item.param2)) /
              100;
          } else {
            gasfee = (row.amount * item.param1) / 100;
          }
          gasfee =
            gasfee > row.amount ? row.amount : parseFloat(gasfee.toFixed(12));
          // eslint-disable-next-line no-empty
        } catch (e) {}
        let tips =
          row.expired == 0
            ? this.$t('mine.withdrawatime_alert', {
                fee: gasfee
              })
            : this.$t('mine.withdrawatime_title');

        this.$confirm(tips, this.$t('tips'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        })
          .then(() => {
            this.auth.checkTradepass(() => {
              // open loading
              this.handleOpenLoading();
              this.auth.callContract(
                'WithdrawMineStake',
                {
                  StakeID: row.id
                },
                {
                  Expedite: '' //
                },
                (res, status) => {
                  console.log(res, status);
                  if (status === 'error') {
                    this.$message.error(res.errmsg.error);
                  } else if (status === 'loading') {
                    this.$message.success(this.$t('table.chain'));
                  } else if (status === 'success') {
                    this.$message.success(this.$t('dosuccess'));
                  }
                  this.handleStakecountsummaryrefresh();
                  // this.handleGetMinestake();
                  // close loading
                  this.handleCloseLoading();
                }
              );
            });
          })
          .catch(() => {
            // close loading
            this.handleCloseLoading();
          });
      }
      console.log(row);
    }
  }
};
</script>
