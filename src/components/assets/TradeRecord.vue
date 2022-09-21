<script setup lang="ts">
import {
  handleBlockexplorer,
  handleEventNumber,
  handleTransColor
} from '@/plugins/common';
import util from '@/plugins/util';
import { handleSecondUTC, handleSecond } from '@/plugins/day';

defineProps({
  address: {
    type: String,
    default: () => ''
  },
  list: {
    type: Array,
    default: () => []
  },
  active: {
    type: String,
    default: () => ''
  }
});
const url = handleBlockexplorer();
</script>
<template>
  <div class="table-box">
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column :label="$t('user.blockId')" width="100">
        <template #default="scope">
          <a
            :href="`${url}/blockchain/block/${scope.row.block_id}`"
            target="_blank"
            class="hover:text-blue"
          >
            {{ scope.row.block_id }}
          </a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.address')" show-overflow-tooltip>
        <template #default="scope">
          <a
            :href="`${url}/blockchain/block/${scope.row.address}`"
            target="_blank"
            class="hover:text-blue"
          >
            {{ scope.row.address }}
          </a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.date')" show-overflow-tooltip>
        <template #default="scope">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="`${handleSecond(scope.row.created_at)}`"
            placement="bottom"
          >
            <span>{{ handleSecondUTC(scope.row.created_at) }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.type')" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ $t(handleEventNumber(scope.row.type)) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.contract')" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ scope.row.contract }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.amount')" show-overflow-tooltip>
        <template #default="scope">
          <template v-if="active === 'all'">
            <div
              v-if="scope.row.sender"
              :style="{
              color: handleTransColor(
                address,
                scope.row.sender,
                scope.row.recipient
              )!.color
            }"
            >
              <span>
                {{
                  handleTransColor(
                    address,
                    scope.row.sender,
                    scope.row.recipient
                  )!.symbol
                }}
              </span>
              <span class="ml-1">{{ util.formatFixed(scope.row.amount) }}</span>
              <span class="ml-1 text-xs">{{ scope.row.token_symbol }}</span>
            </div>
          </template>
          <template v-if="active === 'send'">
            <div style="color: #ee2e6b">
              <span>-</span>
              <span class="ml-1">{{ util.formatFixed(scope.row.amount) }}</span>
              <span class="ml-1 text-xs">{{ scope.row.token_symbol }}</span>
            </div>
          </template>
          <template v-else-if="active === 'recipient'">
            <div style="color: #04b78a">
              <span>+</span>
              <span class="ml-1">{{ util.formatFixed(scope.row.amount) }}</span>
              <span class="ml-1 text-xs">{{ scope.row.token_symbol }}</span>
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
