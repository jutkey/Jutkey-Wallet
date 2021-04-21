<!--
 * @Author: abc
 * @Date: 2021-03-22 17:56:21
 * @LastEditors: abc
 * @LastEditTime: 2021-04-20 18:01:02
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
        }  ${util.formatUnit(1, true)} / ${$t('10KPower')}`"
        placement="bottom"
      >
        <strong class="pool-coll-content-item-num">{{
          util.money_format(objPoolInfo.day_theoretical_income)
        }}</strong>
      </el-tooltip>
      <small>{{ util.formatUnit(1, true) }} &nbsp;/ {{ $t('10KPower') }}</small>
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
    <div class="pool-details-left-item">
      <span class="pool-details-left-item-text">
        {{ $t('URL') }}
      </span>
      <span v-if="objPoolInfo.home_url === ''">null</span>
      <el-tooltip
        effect="dark"
        :content="`${objPoolInfo.home_url}`"
        placement="bottom"
      >
        <span
          class="warp-ecology-item-content-right-text pool-coll-content-item-url"
          v-if="objPoolInfo.home_url"
          style="color: #5e81f7"
          @click.stop="handleHomeUrl(objPoolInfo)"
          >{{ objPoolInfo.home_url }}
        </span>
      </el-tooltip>
    </div>
    <!-- home_url -->
    <dialog-url
      :dialogUrl="dialogUrl"
      v-if="objPoolInfo.home_url"
      :objPoolUrl="objPoolInfo"
    ></dialog-url>
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
    return {
      dialogUrl: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    console.log(this.objPoolInfo);
  },
  methods: {
    handleHomeUrl(obj) {
      console.log(obj);
      this.dialogUrl = true;
    }
  }
};
</script>
