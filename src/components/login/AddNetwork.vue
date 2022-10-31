<script lang="ts" setup>
import { toRefs } from 'vue';
import { CirclePlusFilled } from '@element-plus/icons-vue';

const emit = defineEmits(['close', 'open', 'detele', 'connact']);
const props = defineProps({
  networkList: {
    type: Array,
    default: () => []
  }
});
const { networkList } = toRefs(props);
console.log(JSON.stringify(networkList.value));
const handleConnect = (row: any) => {
  console.log(row);
  emit('connact', row);
};
const handleInnerVisible = () => {
  emit('open');
};
const handleDetele = (obj: any) => {
  emit('detele', obj);
};
</script>

<template>
  <div class="network-content">
    <el-table stripe :data="networkList" style="width: 100%">
      <!--  <el-table-column prop="id" :label="$t('login.order')" /> -->
      <el-table-column prop="name" :label="$t('login.netName')" />
      <el-table-column prop="networkId" :label="$t('login.nodeNum')" />
      <el-table-column prop="speed" :label="$t('login.speed')" />
      <el-table-column :label="$t('login.operate')">
        <template #default="scope">
          <span
            v-if="!scope.row.status"
            class="bg-btn text-white text-xs cursor-pointer rounded-md py-1 px-2 inline-block mr-2"
            @click="handleConnect(scope.row)"
          >
            {{ $t('login.connect') }}
          </span>
          <span
            v-if="scope.row.status === 'loading'"
            class="bg-yellow-400 text-white text-xs cursor-pointer rounded-md py-1 px-2 inline-block mr-2"
          >
            {{ $t('login.connecting') }}
          </span>
          <span
            v-if="scope.row.isAdd && !scope.row.status"
            class="bg-error text-white text-xs cursor-pointer rounded-md py-1 px-2 inline-block mr-2"
            @click="handleDetele(scope.row)"
          >
            {{ $t('login.detele') }}
          </span>
          <span
            v-if="scope.row.status"
            class="bg-success text-white text-xs cursor-pointer rounded-md py-1 px-2 inline-block"
          >
            {{ $t('login.current') }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div
      class="flex items-center h-8 cursor-pointer"
      @click="handleInnerVisible"
    >
      <el-icon color="#3961F5" :size="15">
        <CirclePlusFilled />
      </el-icon>
      <span class="ml-1">{{ $t('login.addNet') }}</span>
    </div>
  </div>
</template>
