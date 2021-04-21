<!--
 * @Author: abc
 * @Date: 2021-03-12 17:56:15
 * @LastEditors: abc
 * @LastEditTime: 2021-04-09 14:54:56
 * @Description: dialog record
-->
<template>
  <el-dialog
    :visible.sync="dialogRecord"
    width="50%"
    :before-close="handleClose"
  >
    <h3 slot="title">{{ $t('mine.stake_info') }}</h3>
    <div class="dialog-body">
      <div class="dialog-body-align">
        <template v-if="objRecordDetails.status == 0">
          <span
            v-if="objRecordDetails.expired == 0"
            class="dialog-body-align-check"
          >
            {{ $t('mine.expired.no') }}
          </span>
          <span v-else class="dialog-body-align-with">
            {{ $t('mine.expired.yes') }}
          </span>
        </template>
        <span class="dialog-body-align-has" v-if="objRecordDetails.status == 1">
          {{ $t('mine.haswithdraw') }}
        </span>
        <span
          class="dialog-body-align-check"
          v-if="objRecordDetails.status == 2"
        >
          {{ $t('mine.checking') }}
        </span>
      </div>
      <ul class="dialog-body-ul">
        <li>
          <label>{{ $t('mine.number') }}：</label> {{ objRecordDetails.number }}
        </li>
        <li>
          <label>{{ $t('mine.address') }}：</label> {{ objRecordDetails.devid }}
        </li>
        <li>
          <label>{{ $t('mine.amount') }}：</label>
          {{ objRecordDetails.amount }}&nbsp;IBXC
        </li>
        <li>
          <label>{{ $t('mine.cycle') }}：</label> {{ objRecordDetails.cycle }}
          {{ $t('mine.day') }}
        </li>
        <li>
          <label>{{ $t('mine.stake_date') }}：</label>
          <el-tooltip
            :content="objRecordDetails.stime | formatTimeUtc"
            placement="top"
          >
            <span>{{ util.formatTime(objRecordDetails.stime) }}</span>
          </el-tooltip>
          <!-- {{objRecordDetails.stime}} -->
        </li>
        <li class="col-md-7" v-if="objRecordDetails.date_transfer_out">
          <label>{{ $t('mine.stake_out_date') }}：</label>
          <el-tooltip
            :content="objRecordDetails.date_transfer_out | formatTimeUtc"
            placement="top"
          >
            <span>
              {{ util.formatTime(objRecordDetails.date_transfer_out) }}</span
            >
          </el-tooltip>
        </li>
      </ul>
      <!-- 100 IBXC -->
      <el-alert
        :closable="false"
        style="margin-bottom: 15px"
        :title="objRecordDetails.mark"
        type="warning"
        v-if="objRecordDetails.expired == 0 && objRecordDetails.is_transfer_out"
        show-icon
      >
      </el-alert>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleRecordConfirm">{{
        $t('confirm')
      }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogRecord: {
      type: Boolean,
      default: () => false
    },
    objRecordDetails: {
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
  methods: {
    handleClose() {
      this.$parent.dialogRecord = false;
    },
    handleRecordConfirm() {
      this.$parent.dialogRecord = false;
    }
  }
};
</script>
