<!--
 * @Author: abc
 * @Date: 2021-03-10 15:52:51
 * @LastEditors: abc
 * @LastEditTime: 2021-04-20 11:25:55
 * @Description: miner details
-->
<template>
  <div class="warp">
    <h2 class="warp-title">{{ $t('mine.detail') }}</h2>
    <div class="miner-details">
      <div class="miner-warp miner-details-left">
        <div class="miner-warp-item miner-warp-flex">
          <!-- address -->
          <div class="miner-warp-item">
            <span class="miner-item-label">{{ $t('mine.address') }}:</span>
            <el-tooltip
              effect="dark"
              :content="`${util.formatKeyId(objMineInfo.devid)}`"
              placement="bottom"
            >
              <strong class="miner-item-bolder">
                {{ util.formatKeyId(objMineInfo.devid) }}
              </strong>
            </el-tooltip>
          </div>
          <el-button @click="handleshowEditMiner" type="primary">
            {{ $t('mine.switch_keyid') }}
          </el-button>
        </div>
        <div class="miner-warp-item">
          <span class="miner-item-label">{{ $t('mine.number') }}:</span>
          <span>{{ objMineInfo.mine_number || '--' }}</span>
        </div>
        <div class="miner-warp-item">
          <span class="miner-item-label"
            >{{ $t('pool.currentcompute') }}：</span
          >
          <el-tooltip
            effect="dark"
            :content="`${objMineInfo.total_count}`"
            placement="bottom"
          >
            <strong class="miner-item-bolder"
              >{{ objMineInfo.total_count || 0 }}
            </strong>
          </el-tooltip>
        </div>
        <!-- Current Pool -->
        <div class="miner-warp-item">
          <span class="miner-item-label">{{ $t('CurrentPool') }}：</span>
          <el-tooltip
            effect="dark"
            :content="`${objMineInfo.name}`"
            placement="bottom"
          >
            <strong class="miner-item-bolder"
              >{{ objMineInfo.name || '--' }}
            </strong>
          </el-tooltip>
        </div>
        <div class="miner-warp-item">
          <span class="miner-item-label">{{ $t('mine.mine_inscount') }}:</span>
          <el-tooltip
            effect="dark"
            :content="`${objMineInfo.mine_inscount}`"
            placement="bottom"
          >
            <strong class="miner-item-bolder">
              {{ objMineInfo.mine_inscount }}
            </strong>
          </el-tooltip>
          <span>{{ $t('mine.time') }}</span>
        </div>
        <!-- time -->
        <div class="miner-warp-item">
          <span class="miner-item-label">{{ $t('mine.activetime') }}:</span>
          <el-tooltip
            :content="objMineInfo.atime | formatTimeUtc"
            placement="bottom"
          >
            <strong class="miner-item-bolder">
              {{ util.formatTime(objMineInfo.atime) }}
            </strong>
          </el-tooltip>
        </div>
        <div class="miner-warp-flex">
          <div class="miner-warp-item">
            <div class="miner-item-label">{{ $t('mine.capacity') }}:</div>
            <p class="miner-income-item-num">
              <el-tooltip
                effect="dark"
                :content="`${objMineInfo.mine_capacity} T`"
                placement="bottom"
              >
                <strong class="miner-item-bolder">{{
                  objMineInfo.mine_capacity || '--'
                }}</strong>
              </el-tooltip>
              <small>T</small>
            </p>
          </div>
          <div class="miner-warp-item">
            <div class="miner-item-label">{{ $t('mine.maxcapacity') }}:</div>
            <p class="miner-income-item-num">
              <el-tooltip
                effect="dark"
                :content="`${objMineInfo.max_capacity} T`"
                placement="bottom"
              >
                <strong class="miner-item-bolder"
                  >{{ objMineInfo.max_capacity || '--' }}
                </strong>
              </el-tooltip>
              <small>T</small>
            </p>
          </div>
          <div class="miner-warp-item">
            <div class="miner-item-label">{{ $t('mine.mincapacity') }}:</div>
            <p class="miner-income-item-num">
              <el-tooltip
                effect="dark"
                :content="`${objMineInfo.min_capacity} T`"
                placement="bottom"
              >
                <strong class="miner-item-bolder"
                  >{{ objMineInfo.min_capacity || '--' }}
                </strong>
              </el-tooltip>
              <small>T</small>
            </p>
          </div>
        </div>
      </div>
      <!-- amount -->
      <div class="miner-details-other">
        <p class="miner-details-other-yellow">
          {{ $t('mine.stake_total_amount') }}
        </p>
        <p class="miner-income-item-num">
          <el-tooltip
            effect="dark"
            :content="`${util.money_format(
              objMineInfo.amount
            )} ${util.formatUnit(1, true)}`"
            placement="bottom"
          >
            <strong class="miner-item-bolder">{{ objMineInfo.amount }} </strong>
          </el-tooltip>
          <small class="miner-item-label">
            {{ util.formatUnit(1, true) }}
          </small>
        </p>
      </div>
      <!-- mine ins -->
      <div class="miner-details-other">
        <p class="miner-details-other-lime">{{ $t('mine.mine_ins') }}</p>
        <p class="miner-income-item-num">
          <el-tooltip
            effect="dark"
            :content="`${util.formatAmount(
              objMineInfo.mine_ins
            )} ${util.formatUnit(1, true)}`"
            placement="bottom"
          >
            <strong class="miner-item-bolder">
              {{ util.formatAmount(objMineInfo.mine_ins) }}
            </strong>
          </el-tooltip>
          <small class="miner-item-label">{{ util.formatUnit(1, true) }}</small>
        </p>
      </div>
    </div>
    <!-- record -->
    <miner-record
      :objStakeRecord="objStakeRecord"
      v-if="objStakeRecord.devid"
    ></miner-record>
    <!-- transfer -->
    <dialog-transfer
      :dialogTransfer="dialogTransfer"
      v-if="objMineInfo.devid"
      :objMineInfo="objMineInfo"
    ></dialog-transfer>
  </div>
</template>
<script>
import DialogTransfer from './components/DialogTransfer.vue';
import MinerRecord from './components/MinerRecord.vue';
export default {
  components: { MinerRecord, DialogTransfer },
  props: {},
  data() {
    return {
      dialogTransfer: false,
      objMineInfo: {},
      objStakeRecord: { balance: 0 }
    };
  },
  computed: {
    isReject() {
      //  console.log(this.$store.getters.handleGettersReject);
      return this.$store.getters.handleGettersReject;
    }
  },
  watch: {},
  created() {
    const devid = this.$route.params.id;
    this.handleMinerSummaryDetial(devid);
  },
  mounted() {},
  methods: {
    handleshowEditMiner() {
      console.log(this.isReject);
      if (this.isReject) {
        return this.$alert(
          this.$t('mine.reject_switch_keyid'),
          this.$t('tips'),
          {
            confirmButtonText: this.$t('confirm'),
            callback: () => {}
          }
        );
      }
      this.dialogTransfer = true;
    },
    async handleMinerSummaryDetial(devid) {
      // open loading
      this.handleOpenLoading();
      const res = await this.$http.get(
        `/minekeystakecountsummarydetial/${devid}`,
        {},
        { interType: 'mainserver' }
      );
      if (res.code === 0) {
        console.log(res);
        this.objMineInfo = res.data;
        this.objStakeRecord.devid = res.data.devid;
        this.objStakeRecord.mine_capacity = res.data.mine_capacity;
        this.objStakeRecord.mine_number = res.data.mine_number;
      }
      this.handleCloseLoading();
    }
  }
};
</script>
