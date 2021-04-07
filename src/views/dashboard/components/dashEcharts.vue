<!--
 * @Author: abc
 * @Date: 2021-02-23 16:23:40
 * @LastEditors: abc
 * @LastEditTime: 2021-04-06 17:30:11
 * @Description: dash echarts
-->
<template>
  <!--15-day Trend of Miner Earnings  -->
  <div class="dash-box-content" v-loading="loading">
    <h4 class="dash-box-content-title dash-box-content-span">
      <span>{{ $t('dashboard.mine_income_chart') }}</span>
      <span
        class="dash-first-box-text dash-mine-chart"
        @click="handleEarning"
        style="cursor: pointer"
        >{{ $t('mine.how_to_raseup') }}
        <i class="el-icon-question" style="color: #3961f5"></i>
      </span>
    </h4>
    <div class="dash-box-content-echarts" id="dashMiner"></div>
    <dialog-earning :dialogEarning="dialogEarning"></dialog-earning>
  </div>
</template>
<script>
import DialogEarning from './DialogEarning.vue';
export default {
  components: { DialogEarning },
  props: {},
  data() {
    return {
      indexchart: [],
      indexchartdata: [],
      loading: false,
      dialogEarning: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.handleIncomechart();
  },
  methods: {
    handleEarning() {
      this.dialogEarning = true;
    },
    async handleIncomechart() {
      this.loading = true;
      const res = await this.$http.get(
        'keyincomeday',
        {},
        { interType: 'mainserver' }
      );
      if (res.code == 0) {
        let [xAxisData, seriesData] = [[], []];
        for (var i in res.data) {
          xAxisData.push(this.util.formatTime(res.data[i].time, 'm-d'));
          seriesData.push(res.data[i].amount);
        }
        this.indexchart = xAxisData;
        this.indexchartdata = seriesData;
        /*  draw Line  */
        setTimeout(() => {
          const dashMiner = document.getElementById('dashMiner');
          const label = [this.$t('zzzRevenueminingmachinery')];
          // console.log(dashMiner);
          if (dashMiner) {
            this.hadnleDrawLine(dashMiner, xAxisData, seriesData, label);
          }
          this.loading = false;
        }, 100);
      }
    }
  }
};
</script>
