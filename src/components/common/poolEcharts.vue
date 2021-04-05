<!--
 * @Author: abc
 * @Date: 2021-03-19 15:03:16
 * @LastEditors: abc
 * @LastEditTime: 2021-03-19 15:56:36
 * @Description: pool echarts
-->
<template>
  <div class="pool-echarts">
    <div class="pool-echarts-header">
      <span
        class="pool-echarts-header-power"
        :class="{ 'pool-echarts-active': isPower }"
        @click="handlePoolEcharts('power')"
        >{{ $t('PoolPower') }}</span
      >
      <span
        class="pool-echarts-header-income"
        :class="{ 'pool-echarts-active': !isPower }"
        @click="handlePoolEcharts('income')"
        >{{ $t('EstimatedEarnings') }}</span
      >
    </div>
    <div
      :id="`poolPower${objItem.id}`"
      class="pool-echarts-content"
      v-show="isPower"
    ></div>
    <div
      :id="`poolIncome${objItem.id}`"
      class="pool-echarts-content"
      v-show="!isPower"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    objItem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isPower: true
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handlePoolEcharts(type) {
      if (type === 'power') {
        this.isPower = true;
        const label = [this.$t('pool.compute')];
        this.handleGetPoolEcharts(
          this.objItem,
          '/minepoolcount',
          'poolPower',
          label
        );
      } else {
        this.isPower = false;
        const label = [`${this.$t('EstimatedEarnings')}(IBXC)`];
        this.handleGetPoolEcharts(
          this.objItem,
          '/minepoolexpectedincome',
          'poolIncome',
          label
        );
      }
      console.log(type);
    },
    async handleGetPoolEcharts({ id, poolid }, url, dom, label, num = 10) {
      const res = await this.$http.get(
        `${url}/${poolid}/${num}`,
        {},
        { interType: 'poolserver' }
      );
      console.log(JSON.stringify(res));
      let [xAxisData, seriesData] = [[], []];
      for (var i in res.data) {
        xAxisData.push(this.util.formatTime(res.data[i].time, 'm-d'));
        seriesData.push(res.data[i].count);
      }
      setTimeout(() => {
        let domId = `${dom}${id}`;
        let poolPower = document.getElementById(domId);
        if (poolPower) {
          this.hadnleDrawLine(poolPower, xAxisData, seriesData, label);
        }
      }, 100);
    }
  }
};
</script>
