<!--
 * @Author: abc
 * @Date: 2021-02-04 18:00:19
 * @LastEditors: abc
 * @LastEditTime: 2021-04-09 14:10:07
 * @Description: Ecolibs list
-->
<template>
  <div class="warp pool">
    <h2 class="warp-title pool-flex">
      <span>{{ $t('navbar.ecosystems') }}</span>
    </h2>
    <div class="warp-box">
      <el-table
        stripe
        :data="arrEcolibsList"
        style="width: 100%"
        class="dash-table"
      >
        <el-table-column prop="id" :label="$t('ecosystem.id')" width="100">
        </el-table-column>
        <el-table-column prop="name" :label="$t('ecosystem.name')">
        </el-table-column>
        <el-table-column
          :label="$t('ecosystem.intro')"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.info.description }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          :label="$t('ecosystem.totaluser')"
          :show-overflow-tooltip="true"
          width="150"
        >
        </el-table-column>
        <el-table-column :label="$t('ecosystem.cointype')" width="120">
          <template slot-scope="scope" :show-overflow-tooltip="true">
            <span>
              {{ util.formatUnit(scope.row.id, true) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ecosystem.status')" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status">
              {{ $t('ecosystem.joined') }}
            </span>
            <span v-else>
              {{ $t('ecosystem.joined') }}
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
      arrEcolibsList: [],
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
    this.handleEcosystemTotals();
  },
  mounted() {},
  methods: {
    async handleEcosystemTotals(page = 1) {
      const res = await this.$http.post(
        `/ecosystemtotals`,
        {
          limit: 10,
          page: page,
          order: 'id asc',
          where: {}
        },
        { interType: 'mainserver' }
      );
      if (res.code === 0) {
        console.log(JSON.stringify(res));
        let list = res.data.rets || [];
        var ecosystems = {};
        for (var i in list) {
          var item = list[i];
          ecosystems[item.id] = {
            name: item.name,
            token_title: item.token_title || ''
          };
          try {
            list[i].info = JSON.parse(list[i].info);
          } catch (e) {
            list[i].info = {};
          }
        }
        this.objPage.total = res.data.total;
        this.objPage.limit = res.data.limit;
        this.arrEcolibsList = list;
        this.util.setCache('ecosystems', ecosystems);
      } else {
        this.objPage.total = 1;
        this.arrEcolibsList = [];
      }
    },
    handleChangePage(page) {
      this.handleEcosystemTotals(page);
    }
  }
};
</script>
