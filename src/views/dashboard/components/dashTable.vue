<!--
 * @Author: abc
 * @Date: 2021-02-23 16:09:47
 * @LastEditors: abc
 * @LastEditTime: 2021-04-06 19:20:24
 * @Description: dash Tabel
-->
<template>
  <div class="dash-box-content" v-loading="totalLoading">
    <div class="dash-box-content-title dash-box-warp">
      <span class="dash-box-warp-span">{{ $t('dashboard.monthbill') }}</span>
      <div class="dash-box-warp-right-box">
        <el-dropdown @command="handleChangeCoin">
          <div class="dash-dropdown dash-dropdown-text">
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
        <el-button
          :disabled="util.isEmpty(usdtWallet)"
          class="dash-disabled"
          @click="handleChangeCoin('usdt')"
        >
          USDT-ERC20
        </el-button>
      </div>
    </div>
    <el-collapse
      accordion
      class="dash-collapse"
      v-model="active_month"
      @change="handleChageMonth"
    >
      <el-collapse-item
        v-for="(item, index) in monthehistorytotal"
        :key="index"
        :name="item.time + ''"
      >
        <template slot="title" v-if="(index + 1) % 2 !== 0">
          <div class="dash-collapse-title">
            <img src="../../../assets/image/dash-7.png" alt="dash-7" />
            <span class="dash-collapse-title-time">
              {{ util.formatTime(item.time, 'y/m') }}
            </span>
            <div class="dash-collapse-title-box">
              <span class="dash-collapse-title-text">
                {{ $t('dashboard.income') }}:
              </span>
              <el-tooltip
                effect="dark"
                :content="`${util.formatAmount(item.inamount)}`"
                placement="top"
              >
                <span class="dash-collapse-title-num">
                  {{ util.formatAmount(item.inamount) }}
                </span>
              </el-tooltip>
            </div>
            <div class="dash-collapse-title-box">
              <span class="dash-collapse-title-text">
                {{ $t('dashboard.expend') }}:
              </span>
              <el-tooltip
                effect="dark"
                :content="`${util.formatAmount(item.outamount)}`"
                placement="top"
              >
                <span class="dash-collapse-title-num">
                  {{ util.formatAmount(item.outamount) }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </template>
        <template slot="title" v-else>
          <div class="dash-collapse-title">
            <img src="../../../assets/image/dash-8.png" alt="dash-8" />
            <span class="dash-collapse-title-time">
              {{ util.formatTime(item.time, 'y/m') }}</span
            >
            <div class="dash-collapse-title-box">
              <span class="dash-collapse-title-text">
                {{ $t('dashboard.income') }}:
              </span>
              <el-tooltip
                effect="dark"
                :content="`${util.formatAmount(item.inamount)}`"
                placement="top"
              >
                <span class="dash-collapse-title-num">
                  {{ util.formatAmount(item.inamount) }}</span
                >
              </el-tooltip>
            </div>
            <div class="dash-collapse-title-box">
              <span class="dash-collapse-title-text">
                {{ $t('dashboard.expend') }}:
              </span>
              <el-tooltip
                effect="dark"
                :content="`${util.formatAmount(item.outamount)}`"
                placement="top"
              >
                <span class="dash-collapse-title-num">
                  {{ util.formatAmount(item.outamount) }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </template>
        <el-table
          :data="monthehistorydetial"
          style="width: 100%"
          height="202"
          v-loading="detialLoading"
          class="dash-table"
        >
          <el-table-column
            fixed
            width="130"
            align="left"
            :show-overflow-tooltip="true"
            :label="$t('contract.date')"
          >
            <template slot-scope="scope">
              <el-tooltip
                :content="scope.row.createdat | formatMounthTimeUtc"
                placement="top"
              >
                <span>{{
                  util.formatTime(scope.row.createdat, 'm-d h:i:s')
                }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('dashboard.action')"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span
                class="ell"
                v-html="handleIncome(scope.row, ecosystem)"
              ></span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="monthbill != 'usdt'"
            :label="$t('ecosystem.balance')"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span class="ell">
                {{
                  util.formatAmount(
                    scope.row[
                      handleIncome(scope.row, ecosystem)
                        ? 'recipient_balance'
                        : 'sender_balance'
                    ]
                  )
                }}
                {{ util.formatUnit(ecosystem, true) }}
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="dash-collapse-pagination">
          <el-pagination
            small
            background
            layout="prev,pager, next,jumper"
            :current-page="page"
            :pager-count="5"
            :page-size="limit"
            :hide-on-single-page="true"
            @current-change="handleChangePage"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import usdt from '@/usdt-erc20/index';
export default {
  data() {
    return {
      request_month: '',
      monthbill: 1,
      ecosystem: 1,
      autoplay: false,
      monthehistorytotal: [],
      monthehistorydetial: [],
      active_month: null,
      totalLoading: false,
      detialLoading: false,
      page: 1,
      limit: 5,
      total: 20,
      usdtWallet: ''
    };
  },
  computed: {
    arrProperty() {
      const arrCoin = this.$store.getters.handleGettersDash;
      return arrCoin;
    },
    coin() {
      return this.$store.getters.handleGettersCoin;
    }
  },
  created() {
    const ecosystem = this.ecosystem;
    this.handleMonthTotal(ecosystem);
    this.getUsdtWallet();
  },
  mounted() {},
  methods: {
    async getUsdtWallet() {
      this.usdtWallet = await usdt._account();
      console.log(this.usdtWallet);
    },
    /* change currency */
    handleChangeCoin(index) {
      console.log(index);
      if (index === 'usdt') {
        this.$store.dispatch('handleActionCoin', 'usdt');
        this.monthbill = 'usdt';
        this.handleMonthTotal(1);
      } else {
        const coin1 =
          this.arrProperty[index].token_title || this.arrProperty[index].name;
        this.$store.dispatch('handleActionCoin', coin1);
        this.monthbill = this.ecosystem = this.arrProperty[index].id;
        this.handleMonthTotal(this.arrProperty[index].id);
      }
    },
    async handleMonthTotal(ecosystem) {
      this.monthehistorytotal = [];
      this.monthehistorydetial = [];
      this.active_month = this.monthbill + '-' + this.ecosystem;
      for (var i = 0; i < 3; i++) {
        this.monthehistorytotal.push({
          time: this.util.time(this.util.getMonth(i) + '-01 00:00:00')
        });
      }
      this.totalLoading = true;
      if (this.monthbill == 'usdt') {
        this.usdt_record = {};
        return usdt._getMonthRecord((res) => {
          console.log(res);
          this.usdt_record = res;
          let list = [];
          for (var i in res) {
            list.push({
              month: i,
              time: this.util.time(i + '-01 00:00:00'),
              inamount: res[i].totalinfo.inamount,
              outamount: res[i].totalinfo.outamount
            });
          }
          console.log(list);
          this.monthehistorytotal = list;
          console.log(this.monthehistorytotal);
          this.totalLoading = false;
        });
      }
      const res = await this.$http.post(
        'monthehistorytotal',
        {
          ecosystem: ecosystem,
          zone: 0
        },
        { interType: 'mainserver' }
      );
      //  console.log(JSON.stringify(res));
      if (res.code === 0) {
        this.monthehistorytotal = res.data || [];
        setTimeout(() => {
          this.active_month = [res.data[0].time.toString()];
          this.totalLoading = false;
          this.handleMonthDetial(res.data[0].time);
        }, 300);
      }
    },
    async handleMonthDetial(val, page = 1) {
      if (val) {
        this.request_month = val;
        this.monthehistorydetial = [];
        this.total = 0;
        this.page = 1;
      }
      this.detialLoading = true;
      setTimeout(() => {
        if (this.monthbill == 'usdt') {
          this.detialLoading = false;
          let result = this.usdt_record[
            this.util.formatTime(this.request_month, 'y-m')
          ].list;
          this.total = result.length;
          this.monthehistorydetial = [];
          var list = this.util.pagination(this.page || 1, this.limit, result);
          list.forEach((item) => {
            item.createdat = item.timeStamp;
            item.amount = item.value;
            this.monthehistorydetial.push(item);
          });
        } else {
          this.$http
            .post(
              'monthehistorydetial',
              {
                ecosystem: this.ecosystem,
                order: 'id desc',
                page: page,
                limit: this.limit,
                zone: 0,
                time: Number(this.request_month)
              },
              { interType: 'mainserver' }
            )
            .then((res) => {
              //  console.log(JSON.stringify(res));
              this.monthehistorydetial = res.data.rets || [];
              this.total = res.data.total;
              this.page = res.data.page;
              this.detialLoading = false;
            });
        }
      }, 300);
    },
    /* change page */
    handleChangePage(page) {
      console.log(page);
      const val = this.request_month;
      this.handleMonthDetial(val, page);
    },
    handleChageMonth(val) {
      console.log(val);
      this.page = 1;
      this.handleMonthDetial(val);
    }
  }
};
</script>
