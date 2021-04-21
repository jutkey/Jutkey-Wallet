<!--
 * @Author: abc
 * @Date: 2021-02-04 17:58:27
 * @LastEditors: abc
 * @LastEditTime: 2021-04-09 12:02:28
 * @Description: Notifications
-->
<template>
  <div class="warp pool">
    <h2 class="warp-title pool-flex">
      <span>{{ $t('navbar.notice') }}</span>
      <div class="pool-flex-right">
        <el-input
          placeholder="Search……"
          v-model.trim="strNotice"
          :maxlength="100"
          clearable
          @keyup.enter.native="handleSearchMember"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </h2>
    <div class="warp-box">
      <el-tabs v-model="activeNotice" @tab-click="handleNoticeTab">
        <!-- Message on the chain -->
        <el-tab-pane :label="$t('zzMessagechain')" name="first">
          <el-table
            :data="arrNoticeList"
            stripe
            style="width: 100%"
            class="dash-table"
          >
            <el-table-column :label="$t('ecosystem.status')" width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.closed == 1" class="colorgred"></span>
                <span v-if="scope.row.closed == 0" class="cologre"></span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.type')" width="150">
              <template>
                <span> {{ $t('zzEcologicalnotice') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.title')">
              <template slot-scope="scope">
                <el-tooltip :content="scope.row.header" placement="bottom">
                  <span>{{ scope.row.header }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.date')" width="200">
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.date_created | formatTimeUtc"
                  placement="bottom"
                >
                  <span>{{ scope.row.date_created | formatTime }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.action')" width="80">
              <template slot-scope="scope">
                <span
                  @click="handleNoticeDetail(scope.row)"
                  class="warp-ecology-item-content-right-text"
                  >{{ $t('table.view') }}</span
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- General -->
        <el-tab-pane :label="$t('zzOffchainmessage')" name="second">
          <el-table
            :data="arrNoticeList"
            stripe
            style="width: 100%"
            class="dash-table"
          >
            <el-table-column :label="$t('table.type')" width="200">
              <template slot-scope="scope">
                <span v-if="parseInt(scope.row.type) === 1">
                  {{ $t('maintenance.notice') }}
                </span>
                <span v-if="parseInt(scope.row.type) === 2">
                  {{ $t('system.notice') }}
                </span>
                <span v-if="parseInt(scope.row.type) === 3">
                  {{ $t('important.notice') }}
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.title')" align="center">
              <template slot-scope="scope">
                <el-tooltip :content="scope.row.title" placement="bottom">
                  <span>{{ scope.row.title }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.date')" width="200">
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.date_created | formatTimeUtc"
                  placement="bottom"
                >
                  <span>{{ scope.row.date_created | formatTime }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.action')" width="80">
              <template slot-scope="scope">
                <span
                  @click="handleViewDetail(scope.row)"
                  class="warp-ecology-item-content-right-text"
                  >{{ $t('table.view') }}</span
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
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
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      activeNotice: 'first',
      strNotice: '',
      objPage: {
        page: 1,
        limit: 10,
        total: 1
      },
      arrNoticeList: [],
      arrGeneralList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.handleNotifications();
  },
  mounted() {},
  methods: {
    handleSearchMember() {
      if (this.activeNotice === 'first') {
        this.handleNotifications(
          '/minernotifications',
          'id desc',
          'poolserver',
          1
        );
      } else {
        this.handleNotifications(
          '/managenoticerelease',
          'date_created desc',
          'mainserver',
          1
        );
      }
    },
    handleNoticeTab(tab) {
      this.strNotice = '';
      if (tab.name === 'first') {
        this.handleNotifications(
          '/minernotifications',
          'id desc',
          'poolserver',
          1
        );
      } else {
        this.handleNotifications(
          '/managenoticerelease',
          'date_created desc',
          'mainserver',
          1
        );
      }
    },
    async handleNotifications(
      url = '/minernotifications',
      order = 'id desc',
      interType = 'poolserver',
      page = 1
    ) {
      let where = {};
      // open loading
      this.handleOpenLoading();
      this.arrNoticeList = [];
      if (this.strNotice) {
        if (url === '/minernotifications') {
          where['header'] = this.strNotice;
        } else {
          where['title'] = this.strNotice;
        }
      } else {
        where = {};
      }
      const res = await this.$http.post(
        url,
        {
          limit: 10,
          page: page,
          order,
          where
        },
        { interType }
      );
      if (res.code === 0) {
        console.log(JSON.stringify(res));
        this.notice2 = res.data;
        this.arrNoticeList = res.data.rets;
        this.objPage.total = res.data.total;
        this.objPage.limit = res.data.limit;
      } else {
        this.arrNoticeList = [];
        this.objPage.total = 1;
        this.objPage.limit = 10;
      }
      // close loading
      this.handleCloseLoading();
    },
    handleNoticeDetail(row) {
      this.$router.push({
        name: 'chainDetails',
        params: {
          id: row.id
        }
      });
    },
    handleViewDetail(row) {
      this.$router.push({
        name: `GeneralDetails`,
        params: {
          id: row.id
        }
      });
    },
    handleChangePage(page) {
      if (this.activeNotice === 'first') {
        this.handleNotifications(
          '/minernotifications',
          'id desc',
          'poolserver',
          page
        );
      } else {
        this.handleNotifications(
          '/managenoticerelease',
          'date_created desc',
          'mainserver',
          page
        );
      }
    }
  }
};
</script>
