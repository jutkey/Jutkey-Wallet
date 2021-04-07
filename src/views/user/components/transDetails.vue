<!--
 * @Author: abc
 * @Date: 2021-03-08 17:58:50
 * @LastEditors: abc
 * @LastEditTime: 2021-04-06 16:57:25
 * @Description: transaction details
-->
<template>
  <el-dialog
    :visible.sync="dialogTrans"
    width="50%"
    :before-close="handleClose"
  >
    <h3 slot="title">{{ $t('contract.tradeinfo') }}</h3>
    <div class="dialog-body">
      <h4 v-if="objTransDetails.block_id">
        <!-- {{ is_income(objTransDetails) ? "+" : "-" }} -->
        {{
          objTransDetails.sender_id == objTransDetails.recipient_id
            ? '+-'
            : objTransDetails.recipient_id == auth.getUser('key_id')
            ? '+'
            : objTransDetails.sender_id == auth.getUser('key_id')
            ? '-'
            : ''
        }}
        {{ util.formatAmountData(objTransDetails.amount) }}
        {{ util.formatUnit(objTransDetails.ecosystem, true) }}
      </h4>
      <ul class="dialog-body-warp">
        <li>
          <span>{{ $t('contract.sender') }}</span>
          <el-tooltip
            :content="util.formatKeyId(objTransDetails.sender_id)"
            placement="bottom"
          >
            <span>{{ util.formatKeyId(objTransDetails.sender_id) }}</span>
          </el-tooltip>
        </li>
        <li>
          <span>{{ $t('contract.recipient') }}</span>
          <el-tooltip
            :content="util.formatKeyId(objTransDetails.recipient_id)"
            placement="bottom"
          >
            <span>{{ util.formatKeyId(objTransDetails.recipient_id) }}</span>
          </el-tooltip>
        </li>
        <li>
          <span>{{ $t('contract.remark') }}</span>
          <span>{{ objTransDetails.comment }}</span>
        </li>
        <li>
          <span>{{ $t('contract.block_id') }}</span>
          <span>{{ objTransDetails.block_id }}</span>
        </li>

        <li>
          <span>{{ $t('contract.tradetime') }}</span>
          <el-tooltip
            :content="objTransDetails.created_at | formatTimeUtc"
            placement="bottom"
          >
            <span>
              {{ objTransDetails.created_at | formatTime }}
            </span>
          </el-tooltip>
        </li>
        <li>
          <span>{{ $t('contract.tradeno') }}</span>
          <span>{{ objTransDetails.id }}</span>
        </li>
        <li>
          <span>{{ $t('contract.hash') }}</span>
          <el-tooltip :content="objTransDetails.txhash" placement="bottom">
            <span>{{ objTransDetails.txhash }} </span>
          </el-tooltip>
        </li>
        <li>
          <a
            class="warp-ecology-item-content-right-text"
            target="_blank"
            style="display: inline-block"
            :href="`${baseUrl.blockexplorer}/transaction/${objTransDetails.txhash}?lang=${$i18n.locale}`"
            >{{ $t('contract.hashexplorer') }}</a
          >
        </li>
      </ul>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTrans: {
      type: Boolean,
      default: () => false
    },
    objTransDetails: {
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
      this.$parent.dialogTrans = false;
    }
  }
};
</script>
