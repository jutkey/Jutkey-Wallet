<!--
 * @Author: abc
 * @Date: 2021-03-07 18:23:30
 * @LastEditors: abc
 * @LastEditTime: 2021-04-01 18:50:10
 * @Description: transfer record
-->
<template>
  <div class="warp-trans" v-loading="loading">
    <h2 class="warp-title">{{ $t('transferrecord') }}</h2>
    <div class="warp-box">
      <el-tabs v-model="activeName" @tab-click="handleTransTab">
        <template v-for="item in arrTransTags">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.name">
            <el-table
              stripe
              :data="arrTransData"
              style="width: 100%"
              class="dash-table"
              @row-click="handleTransDetails"
            >
              <el-table-column
                prop="block_id"
                :label="$t('contract.block_id')"
                width="100"
              >
              </el-table-column>
              <el-table-column
                :label="$t('zzzsender')"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>
                    {{
                      scope.row.sender_id == auth.getUser('key_id')
                        ? 'me'
                        : util.formatKeyId(scope.row.sender_id)
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('zzzreceiver')"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>
                    {{
                      scope.row.recipient_id == auth.getUser('key_id')
                        ? 'me'
                        : util.formatKeyId(scope.row.recipient_id)
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('table.type')"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>
                    {{ handleCheckType(parseInt(scope.row.type)) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('contract.money')"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <el-tooltip
                    :content="`${util.formatAmountData(
                      scope.row.amount
                    )} ${util.formatUnit(ecosystem, true)}`"
                    placement="bottom"
                  >
                    <span
                      class="ell"
                      v-html="handleIncome(scope.row, ecosystem)"
                    ></span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('contract.date')"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <el-tooltip
                    :content="scope.row.created_at | formatTimeUtc"
                    placement="bottom"
                  >
                    <span class="ell">
                      {{ scope.row.created_at | formatTime }}
                    </span>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <div class="dash-collapse-pagination">
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
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <!-- transaction details -->
    <trans-details
      :dialogTrans="dialogTrans"
      :objTransDetails="objTransDetails"
    ></trans-details>
  </div>
</template>
<script>
import USDT from '@/usdt-erc20';
import transDetails from './components/transDetails.vue';
export default {
  components: { transDetails },
  props: {},
  data() {
    return {
      objTransDetails: {},
      activeName: 'all',
      loading: false,
      dialogTrans: false,
      objPage: {
        page: 1,
        limit: 10,
        total: 20
      },
      objTrans: {
        limit: 10,
        page: 1,
        order: 'created_at desc',
        ecosystem: '',
        opt: 'all'
      },
      arrTransTags: [
        {
          label: this.$t('all'),
          name: 'all'
        },
        {
          label: this.$t('ecosystem.receipt'),
          name: 'recipient'
        },
        {
          label: this.$t('ecosystem.transfer'),
          name: 'send'
        }
      ],
      arrTransData: [],
      ecosystem: 1
    };
  },
  computed: {},
  watch: {},
  created() {
    //  this.handleUsdtTransHistory();
    const ecosystem = (this.ecosystem = parseInt(this.$route.params.id));
    console.log(ecosystem);
    this.objTrans.ecosystem = ecosystem;
    this.handleTransHistory(this.objTrans);
  },
  mounted() {
    console.log(USDT._getAccount());
  },
  methods: {
    async handleTransHistory(obj) {
      this.loading = true;
      const res = await this.$http.post('/mint/history', obj, {
        interType: 'mainserver'
      });
      console.log(JSON.stringify(res));
      if (res.code === 0) {
        this.arrTransData = res.data.rets;
        this.objPage.total = res.data.total;
      } else {
        this.arrTransData = [];
        this.objPage.total = 0;
      }
      this.loading = false;
    },
    handleTransTab(tab) {
      this.objTrans.opt = tab.name;
      this.objPage.page = 1;
      this.objTrans.page = 1;
      console.log(tab.name);
      console.log(this.objTrans);
      this.handleTransHistory(this.objTrans);
    },
    handleCheckType(type) {
      let strTip = 'Service Charge';
      let arrTip = [
        'Service Charge',
        'Commission fee',
        'Normal transfer',
        'Number of currencies burning other ecosystems',
        'mining',
        'Amount of stake applied to create mine pool',
        'Transfer out the actual cost of stake record',
        'stake penalty',
        'create stake',
        'Create a good name',
        'Unlocking of stake amount after refusing to create mine pool',
        'Packing fee of mining pond(5%)',
        'Mine pool income',
        'Dissolve the mine pool and complete the settlement',
        'Transfer of mine pool and settlement completed',
        'Transfer the stake amount of the created mine pool',
        'New currency',
        'Settlement of mine pool',
        'Foundation Account Mint',
        'Private Offering Receive',
        'Public Offering Receive',
        'Ecosystem Partner Receive',
        'The R&T Team Receive'
      ];
      strTip = arrTip[type - 1];
      return strTip;
    },
    handleChangePage(page) {
      console.log(page);
      this.objTrans.page = page;
      this.handleTransHistory(this.objTrans);
    },
    handleTransDetails(row) {
      console.log(row);
      this.dialogTrans = true;
      this.objTransDetails = row;
    },
    async handleUsdtTransHistory() {
      const wallet = USDT._getAccount();
      const res = await this.$http.get(
        `/usdthistory/${wallet.address}`,
        {},
        {
          interType: 'mainserver'
        }
      );
      console.log(res);
    }
  }
};
</script>
