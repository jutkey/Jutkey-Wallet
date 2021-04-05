<!--
 * @Author: abc
 * @Date: 2021-03-01 17:57:07
 * @LastEditors: abc
 * @LastEditTime: 2021-03-02 14:40:37
 * @Description: pool information
-->
<template>
  <div class="dash-pool">
    <h4 class="dash-second-miner-title">
      {{ $t('MinersRevenue') }}
    </h4>
    <!-- Pool Owner's Revenue -->
    <div class="dash-overview">
      <div class="dash-overview-warp">
        <div
          class="dash-overview-warp-item"
          v-for="(item, index) in arrPoolUser"
          :key="index"
        >
          <div class="dash-first-box">
            <div class="dash-overview-icon">
              <i class="iconfont" :class="item.icon"></i>
            </div>
            <div class="dash-first-box-text">{{ item.label }}</div>

            <div v-if="index === 2" class="dash-overview-item">
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
            <div v-else-if="index === 3" class="dash-overview-item">
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
    <!-- Owner’s Five-day earnings  -->
    <div class="dash-box-content">
      <h4 class="dash-box-content-title dash-box-content-span">
        <span>{{ $t('OwnersFivedayearnings') }}</span>
        <span class="dash-first-box-text"></span>
      </h4>
      <div
        class="dash-box-content-echarts"
        id="dashOwnerPool"
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
      arrPoolUser: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.handleManagesPool();
    this.handlePoolIncomeMangeChart();
  },
  mounted() {},
  methods: {
    async handleManagesPool() {
      const res = await this.$http.get(
        '/userminepoolmanagesummary',
        {},
        { interType: 'poolserver' }
      );
      if (res.code === 0) {
        const arrPoolUser = [
          {
            value: res.data.mine_count,
            icon: 'el-ui-zu279',
            label: this.$t('Miningmachine')
          },
          {
            value: res.data.total_count,
            icon: 'el-ui-zu278',
            label: this.$t('PoolHashrate')
          },
          {
            value: res.data.day_ins,
            icon: 'el-ui-jianqu17',
            label: this.$t('TheoreticalDailyearningsss')
          },
          {
            value: res.data.total_ins,
            icon: 'el-ui-zu277',
            label: this.$t('mine.inscount')
          }
        ];
        this.arrPoolUser = [...arrPoolUser];
      }
    },
    async handlePoolIncomeMangeChart() {
      this.loading = true;
      let count = 5;
      const res = await this.$http.get(
        'userminepoolmanageincome/' + count,
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
        //    console.log(xAxisData);
        setTimeout(() => {
          const dashMiner = document.getElementById('dashOwnerPool');
          /*  draw Line  */
          const label = [this.$t('MinersRevenue')];
          this.hadnleDrawLine(dashMiner, xAxisData, seriesData, label);
          this.loading = false;
        }, 100);
      }
    }
  }
};
</script>
