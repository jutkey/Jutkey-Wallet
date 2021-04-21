<!--
 * @Author: abc
 * @Date: 2021-03-15 10:50:08
 * @LastEditors: abc
 * @LastEditTime: 2021-04-09 11:41:20
 * @Description: dialog Stake
-->
<template>
  <el-dialog
    :visible.sync="objStakeShow.dialogStake"
    width="40%"
    :before-close="handleClose"
    class="dialog dialog-miner"
    top="10vh"
    v-loading="stakeMinerLoading"
    :close-on-click-modal="false"
    element-loading-text="Loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h3 slot="title">{{ $t('mine.stake') }}</h3>
    <div class="dialog-body">
      <el-alert
        :closable="false"
        style="margin-bottom: 15px"
        :title="$t('mine.stake_tips')"
        type="warning"
        v-if="$t('mine.stake_tips')"
        show-icon
      >
      </el-alert>
      <!-- stake from -->
      <el-form
        :model="stakeFrom"
        status-icon
        :rules="stakeCheck"
        ref="stakeFrom"
        label-width="150px"
        class="dash-from"
      >
        <el-form-item :label="$t('ecosystem.balance')" class="warp-form-item">
          <span class="warp-form-item-text">
            {{ objStakeModal.balance }}
          </span>
          <span class="dash-first-box-text">
            {{ util.formatUnit(1, true) }}</span
          >
        </el-form-item>
        <el-form-item :label="$t('mine.capacity')" class="warp-form-item">
          <span class="warp-form-item-text">
            {{ objStakeModal.mine_capacity }}
          </span>
          <span class="dash-first-box-text">T</span>
        </el-form-item>
        <el-form-item :label="$t('mine.number')" class="warp-form-item">
          <span class="warp-form-item-text">
            {{ objStakeModal.mine_number }}
          </span>
        </el-form-item>
        <el-form-item :label="$t('mine.address')" class="warp-form-item">
          <span class="warp-form-item-text">
            {{ util.formatKeyId(objStakeModal.devid) }}
          </span>
        </el-form-item>
        <el-form-item :label="$t('mine.stake_count')" prop="Amount">
          <el-input
            type="number"
            v-model="stakeFrom.Amount"
            :placeholder="$t('transfer.enter_gasfee')"
            clearable
            autocomplete="off"
          ></el-input>
          <span class="dash-first-box-text">{{
            util.formatUnit(1, true)
          }}</span>
        </el-form-item>
        <el-form-item :label="$t('mine.stake_cycle')" prop="Cycle">
          <el-input
            type="number"
            v-model="stakeFrom.Cycle"
            :placeholder="$t('transfer.day')"
            clearable
            autocomplete="off"
          ></el-input>
          <span class="dash-first-box-text">{{ $t('mine.day') }}</span>
        </el-form-item>
        <el-form-item :label="$t('will_stake_total')" class="warp-form-item">
          <span class="warp-form-item-text">
            {{ stakeFrom.total }}
          </span>
        </el-form-item>
        <el-form-item :label="$t('transfer.gasfee')" prop="urgent">
          <el-input
            type="number"
            v-model="stakeFrom.urgent"
            :placeholder="$t('transfer.enter_gasfee')"
            clearable
            autocomplete="off"
          ></el-input>
          <span class="dash-first-box-text">{{
            util.formatUnit(1, true)
          }}</span>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleStakeCancel('stakeFrom')">{{
        $t('cancel')
      }}</el-button>
      <el-button type="primary" @click="handleStakeConfirm('stakeFrom')">{{
        $t('confirm')
      }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    objStakeShow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    var checkAmount = (rule, value, callback) => {
      console.log(value);
      const max =
        this.objStakeModal.tokent * Number(this.objStakeModal.mine_capacity);
      const min = this.objStakeModal.minStake_count;
      value = Number(value);
      const regInt = /^[1-9]\d*$/;
      if (!value) {
        return callback(new Error('The input cannot be empty!'));
      } else if (!regInt.test(value)) {
        return callback(new Error('Only integers can be entered!'));
      } else if (value < min || value > max) {
        return callback(new Error(`The input range is:${min}~${max}!`));
      } else {
        callback();
      }
    };
    var checkCycle = (rule, value, callback) => {
      value = Number(value);
      const maxTime = this.objStakeModal.maxTime;
      const currentTime = parseInt(new Date().getTime() / 1000);
      const max = parseInt((maxTime - currentTime) / (24 * 3600));
      const min = 1;
      const regInt = /^[1-9]\d*$/;
      if (!value) {
        return callback(new Error('The input cannot be empty!'));
      } else if (!regInt.test(value)) {
        return callback(new Error('Only integers can be entered!'));
      } else if (value < min || value > max) {
        return callback(new Error(`The input range is:${min}~${max}!`));
      } else {
        this.stakeFrom.total =
          Number(this.stakeFrom.Cycle) * Number(this.objStakeModal.ptunit) +
          Number(this.objStakeModal.mine_capacity) *
            Number(this.objStakeModal.capacity) +
          Number(this.stakeFrom.Amount) * Number(this.objStakeModal.punit);
        callback();
      }
    };
    var checkUrgent = (rule, value, callback) => {
      console.log(value);
      if (value) {
        if (value.length > 30) {
          this.stakeFrom.urgent = 0;
          return this.$message({
            message: 'Input number length exceeds 32!',
            type: 'warning'
          });
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      stakeFrom: {
        Amount: 0,
        Cycle: 0,
        total: 0,
        urgent: 0
      },
      stakeMinerLoading: false,
      stakeCheck: {
        Amount: [{ validator: checkAmount, trigger: 'blur', required: true }],
        Cycle: [{ validator: checkCycle, trigger: 'blur', required: true }],
        urgent: [{ validator: checkUrgent, trigger: 'blur', required: false }]
      },
      objStakeModal: {
        balance: 0
      }
    };
  },
  computed: {},
  watch: {
    'objStakeShow.dialogStake': {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
        this.handleGetStakeData();
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$parent.objStakeShow.dialogStake = false;
      // this.$refs['transferForm'].resetFields();
    },
    async handleGetStakeData() {
      const { devid, mine_capacity, mine_number } = this.objStakeShow;
      /* this.objStakeModal = {
        devid,
        mine_capacity,
        mine_number
      }; */
      this.objStakeModal.mine_capacity = mine_capacity;
      this.objStakeModal.mine_number = mine_number;
      this.objStakeModal.devid = devid;
      const res = await this.$http.get(
        'mint/keys/1',
        {},
        { interType: 'mainserver' }
      );
      if (res.code === 0) {
        this.objStakeModal.balance = this.util.formatAmount(res.data.amount);
        console.log(this.objStakeModal.balance);
      }
      const ret = await this.$http.get(
        'mint/stakerulerelease',
        {},
        { interType: 'mainserver' }
      );
      if (ret.code === 0) {
        console.log(res);
        var data = ret.data;
        this.objStakeModal.capacity = data.capacity;
        this.objStakeModal.punit = data.punit;
        this.objStakeModal.ptunit = data.ptunit;
        this.objStakeModal.tokent = Number(data.tokent) / Math.pow(10, 12);
        this.objStakeModal.minStake_count =
          Number(data.threshold) / Math.pow(10, 12);
        console.log(this.objStakeModal.minStake_count);
      }
      const id = this.$route.params.id;
      const rel = await this.$http.get(
        `mineetime/${id}`,
        {},
        { interType: 'mainserver' }
      );
      if (rel.code === 0) {
        console.log(JSON.stringify(rel));
        this.objStakeModal.maxTime = rel.data;
        console.log(this.objStakeModal);
        this.dialogStake = true;
      }
    },
    handleStakeConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const DevAddr = this.util.formatKeyId(this.objStakeModal.devid);
          const { Cycle, Amount, urgent } = this.stakeFrom;
          this.auth.checkTradepass(() => {
            // open loading
            this.stakeMinerLoading = true;
            this.auth.callContract(
              'NewMineStake',
              {
                DevAddr,
                Cycle,
                Amount
              },
              {
                Expedite: urgent //
              },
              (res, status) => {
                if (status === 'error') {
                  this.$message.error(res.errmsg.error);
                } else if (status === 'loading') {
                  this.$message.success(this.$t('table.chain'));
                } else if (status === 'success') {
                  this.$message.success(this.$t('contract.tx_batch'));
                }
                this.$parent.handleStakecountsummaryrefresh();
                // this.$emit('eventaddminestake');
                this.$parent.objStakeShow.dialogStake = false;
                this.stakeMinerLoading = false;
                this.$refs[formName].resetFields();
              }
            );
          });
        } else {
          return false;
        }
      });
    },
    handleStakeCancel(formName) {
      // this.$parent.dialogStake = false;
      this.$parent.objStakeShow.dialogStake = false;
      this.$refs[formName].resetFields();
    }
  }
};
</script>
