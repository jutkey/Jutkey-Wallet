<!--
 * @Author: abc
 * @Date: 2021-02-04 18:06:55
 * @LastEditors: abc
 * @LastEditTime: 2021-03-30 11:51:23
 * @Description: honor nodes
-->
<template>
  <div class="warp">
    <h2 class="warp-title pool-flex">
      <span>{{ $t('navbar.nodetype.honor_list') }}</span>
    </h2>
    <div class="warp-box about">
      <el-table
        stripe
        :data="arrHonorList"
        style="width: 100%"
        class="dash-table"
      >
        <el-table-column
          :label="$t('node.number')"
          type="index"
          :index="indexMethod"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column :label="$t('node.keyid')" width="220">
          <template slot-scope="scope">
            <span>
              {{ util.publicKeyToKeyId(scope.row.public_key) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('node.publickey')"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.public_key }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tcp_address"
          :label="$t('node.tcpaddress')"
          :show-overflow-tooltip="true"
          width="180"
        >
        </el-table-column>
        <el-table-column :label="$t('node.apiaddress')" width="220">
          <template slot-scope="scope" :show-overflow-tooltip="true">
            <span>
              {{ scope.row.api_address }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('node.packagepercent')" width="130">
          <template>
            <span>
              {{ Math.round((1 / arrHonorList.length) * 10000) / 100.0 + '%' }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="dash-collapse-pagination">
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
      arrHonorList: [],
      objPage: {
        page: 1,
        limit: 10,
        total: 1
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    console.log(parseInt(this.objPage.page - 1) * parseInt(this.objPage.limit));
    this.handleHonorNodes();
  },
  mounted() {},
  methods: {
    indexMethod(index) {
      let curpage = this.objPage.page;
      let limitpage = this.objPage.limit;
      return index + 1 + (curpage - 1) * limitpage;
    },
    async handleHonorNodes(page = 1) {
      const res = await this.$http.post(
        `/mint/honornodes`,
        {
          limit: 10,
          page: page
        },
        { interType: 'mainserver' }
      );
      if (res.code === 0) {
        console.log(JSON.stringify(res));
        this.objPage.total = res.data.total;
        this.arrHonorList = res.data.rets;
      } else {
        this.objPage.total = 1;
        this.arrHonorList = [];
      }
    },
    handleChangePage(page) {
      this.objPage.page = page;
      this.handleHonorNodes(page);
    }
  }
};
</script>
