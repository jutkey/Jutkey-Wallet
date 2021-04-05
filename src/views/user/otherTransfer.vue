<!--
 * @Author: abc
 * @Date: 2021-03-31 18:51:30
 * @LastEditors: abc
 * @LastEditTime: 2021-04-01 17:21:35
 * @Description: other Transfer
-->
<template>
  <div class="warp-trans" v-loading="otherLoading">
    <h2 class="warp-title">{{ $t('transferrecord') }}</h2>
    <div class="warp-box">
      <el-tabs v-model="activeName" @tab-click="handleTransTab">
        <template v-for="item in arrTransTags">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.name">
            <el-table
              stripe
              :data="arrHistories"
              style="width: 100%"
              class="dash-table"
              @row-click="handleTransDetails"
            >
              <el-table-column
                prop="blockNumber"
                :label="$t('contract.block_id')"
                width="100"
              >
              </el-table-column>
              <el-table-column
                :label="$t('contract.address')"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.to }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('contract.date')"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span class="ell">
                    {{ scope.row.timeStamp | formatTime }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('contract.money')"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span class="ell" style="cursor: pointer">
                    {{ is_income(scope.row) ? '+' : '-'
                    }}{{
                      scope.row.value / Math.pow(10, scope.row.tokenDecimal)
                    }}
                    USDT
                  </span>
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
  </div>
</template>
<script>
import usdt from '@/usdt-erc20';
export default {
  props: {},
  data() {
    return {
      activeName: '0',
      objPage: {
        page: 1,
        limit: 10,
        total: 20
      },
      otherLoading: false,
      arrHistories: [],
      arrTransTags: [
        {
          label: this.$t('all'),
          name: '0'
        },
        {
          label: this.$t('ecosystem.receipt'),
          name: '1'
        },
        {
          label: this.$t('ecosystem.transfer'),
          name: '2'
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {
    this.handleGetHistories();
  },
  mounted() {},
  methods: {
    is_income(item) {
      return item.type == 'income' ? true : false;
    },
    handleTransTab(tab) {
      console.log(tab.name);
      this.handleGetHistories();
    },
    async handleGetHistories(page = 1) {
      usdt._getHistories((result) => {
        if (result) {
          let arrlist = [];
          switch (this.activeName) {
            case '1':
              arrlist = result.filter((f) => f.type === 'income');
              break;
            case '2':
              arrlist = result.filter((f) => f.type === 'outcome');
              break;
            default:
              arrlist = result;
          }
          this.objPage.total = arrlist.length;
          const { limit } = this.objPage;
          this.arrHistories = this.util.pagination(page, limit, arrlist);
        }
      });
    },
    handleChangePage(page) {
      this.objPage.page = page;
      this.handleGetHistories(page);
    },
    handleTransDetails(row) {
      console.log(row);
    }
  }
};
</script>
