<!--
 * @Author: abc
 * @Date: 2021-03-22 17:56:21
 * @LastEditors: abc
 * @LastEditTime: 2021-03-22 18:02:59
 * @Description: pool  information
-->
<template>
  <div class="pool-details-info">
    <div class="pool-details-left-item">
      <img :src="objPoolInfo.Logo" alt="logo" />
      <el-tooltip
        effect="dark"
        :content="`${objPoolInfo.name}`"
        placement="bottom"
      >
        <span class="pool-details-left-item-span">{{ objPoolInfo.name }}</span>
      </el-tooltip>
    </div>
    <div class="pool-details-left-item">
      <span class="pool-details-left-item-text">{{ $t('currentPower') }}</span>
      <el-tooltip
        effect="dark"
        :content="`${util.money_format(objPoolInfo.count) || 0}`"
        placement="bottom"
      >
        <strong class="pool-coll-content-item-num">{{
          util.money_format(objPoolInfo.count)
        }}</strong>
      </el-tooltip>
    </div>
    <div class="pool-details-left-item">
      <span class="pool-details-left-item-text">{{ $t('totalEarning') }}</span>
      <el-tooltip
        effect="dark"
        :content="`${util.money_format(objPoolInfo.total_income_amount) || 0}`"
        placement="bottom"
      >
        <strong class="pool-coll-content-item-num">{{
          util.money_format(objPoolInfo.total_income_amount)
        }}</strong>
      </el-tooltip>
      <small> {{ util.formatUnit(1, true) }}</small>
    </div>
    <div class="pool-details-left-item">
      <span class="pool-details-left-item-text">
        {{ $t('theoreticalDailyEarning') }}
      </span>
      <el-tooltip
        effect="dark"
        :content="`${
          util.money_format(objPoolInfo.day_theoretical_income) || 0
        }  IBXC/${$t('10KPower')}`"
        placement="bottom"
      >
        <strong class="pool-coll-content-item-num">{{
          util.money_format(objPoolInfo.day_theoretical_income)
        }}</strong>
      </el-tooltip>
      <small>IBXC/ {{ $t('10KPower') }}</small>
    </div>
    <div class="pool-details-left-item">
      <span class="pool-details-left-item-text">
        {{ $t('zzminPaymentAmount') }}
      </span>
      <el-tooltip
        effect="dark"
        :content="`${objPoolInfo.settlement_amount || 0}  IBXC`"
        placement="bottom"
      >
        <strong class="pool-coll-content-item-num">{{
          objPoolInfo.settlement_amount
        }}</strong>
      </el-tooltip>
      <small>IBXC</small>
    </div>
    <div class="pool-details-left-item">
      <span class="pool-details-left-item-text">
        {{ $t('EarningsDivisionMode') }}
      </span>
      <el-tooltip
        effect="dark"
        :content="`${objPoolInfo.settlement_method}`"
        placement="bottom"
      >
        <strong class="pool-coll-content-item-num">{{
          objPoolInfo.settlement_method
        }}</strong>
      </el-tooltip>
    </div>
    <div class="pool-details-left-item">
      <span class="pool-details-left-item-text">
        {{ $t('Rate') }}
      </span>
      <el-tooltip
        effect="dark"
        :content="`${objPoolInfo.settlement_rate || 0} %`"
        placement="bottom"
      >
        <strong class="pool-coll-content-item-num">{{
          objPoolInfo.settlement_rate
        }}</strong>
      </el-tooltip>
      <small>%</small>
    </div>
    <div class="pool-details-left-item">
      <span class="pool-details-left-item-text">
        {{ $t('SettlementDate') }}
      </span>
      <el-tooltip
        effect="dark"
        :content="`${objPoolInfo.settlement_cyclestr || 0}`"
        placement="bottom"
      >
        <strong class="pool-coll-content-item-num">{{
          objPoolInfo.settlement_cyclestr
        }}</strong>
      </el-tooltip>
      <small>({{ $t('PerDay') }} UTC)</small>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    objPoolInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
