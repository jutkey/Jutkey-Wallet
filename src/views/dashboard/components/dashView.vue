<!--
 * @Author: abc
 * @Date: 2021-03-01 10:33:44
 * @LastEditors: abc
 * @LastEditTime: 2021-03-02 10:58:11
 * @Description: overview
-->
<template>
  <div class="dash-box">
    <h4 class="dash-second-miner-title">
      {{ $t('PoolDashboard') }}
    </h4>
    <!-- overview -->
    <div class="dash-overview">
      <div class="dash-overview-warp">
        <div
          class="dash-overview-warp-item"
          v-for="(item, index) in arrPoolInfo"
          :key="index"
        >
          <div class="dash-first-box">
            <div class="dash-overview-icon">
              <i class="iconfont" :class="item.icon"></i>
            </div>
            <div class="dash-first-box-text">{{ item.label }}</div>
            <div
              v-if="index === arrPoolInfo.length - 1"
              class="dash-overview-item"
            >
              <el-tooltip
                effect="dark"
                :content="`${util.money_format(item.value || 0)}`"
                placement="bottom"
              >
                <p class="dash-first-box-num">
                  {{ util.money_format(item.value || 0) }}
                </p>
              </el-tooltip>
              <span class="dash-first-box-text">{{ currency }} </span>
            </div>

            <div class="dash-first-box-num" v-else>
              <el-tooltip
                effect="dark"
                :content="`${util.money_format(item.value || 0)}`"
                placement="bottom"
              >
                <span>{{ util.money_format(item.value || 0) }}</span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 5-days Earnings Summary  -->
    <div class="dash-box-content">
      <h4 class="dash-box-content-title dash-box-content-span">
        <span>{{ $t('PoolFivedayearnings') }}</span>
        <span class="dash-first-box-text"></span>
      </h4>
      <div
        class="dash-box-content-echarts"
        id="dashPool"
        style="height: 300px"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      arrPoolInfo: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.handleUserminePool();
    this.handlePoolIncomeChart();
  },
  mounted() {},
  methods: {
    async handleUserminePool() {
      const res = await this.$http.get(
        '/userminepoolsummary',
        {},
        { interType: 'poolserver' }
      );
      // console.log(res);
      if (res.code === 0) {
        const arrPoolInfo = [
          {
            value: res.data.pool_count,
            icon: 'el-ui-zu280',
            label: this.$t('JoinedPools')
          },
          {
            value: res.data.mine_count,
            icon: 'el-ui-zu279',
            label: this.$t('Miningmachine')
          },
          {
            value: res.data.total_count,
            icon: 'el-ui-zu278',
            label: this.$t('24htotalearnings')
          },
          {
            value: res.data.mine_ins,
            icon: 'el-ui-zu277',
            label: this.$t('mine.inscount')
          }
        ];
        this.arrPoolInfo = [...arrPoolInfo];
      }
    },
    async handlePoolIncomeChart() {
      this.loading = true;
      let count = 5;
      const res = await this.$http.get(
        'userminepoolincome/' + count,
        {},
        { interType: 'poolserver' }
      );
      if (res.code == 0) {
        let [xAxisData, seriesData] = [[], []];
        for (var i in res.data) {
          xAxisData.push(this.util.formatTime(res.data[i].time, 'm-d'));
          seriesData.push(res.data[i].amount);
        }
        this.indexchart = xAxisData;
        this.indexchartdata = seriesData;
        setTimeout(() => {
          const dashMiner = document.getElementById('dashPool');
          /*  draw Line  */
          const label = [this.$t('MiningEarningsTrend')];
          this.hadnleDrawLine(dashMiner, xAxisData, seriesData, label);
          this.loading = false;
        }, 100);
      }
    }
  }
};
</script>
