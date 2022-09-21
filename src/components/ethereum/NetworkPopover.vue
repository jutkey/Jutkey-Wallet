<script setup lang="ts">
// import { ref, reactive } from 'vue';
// eslint-disable-next-line no-unused-vars
import { Check, Delete, Plus } from '@element-plus/icons-vue';
import { networkType } from '@/plugins/dataType';
import util from '@/plugins/util';

defineProps<{
  networkList: Array<networkType>;
}>();
const handleChangeNetwork = (obj: networkType) => {
  console.log(obj);
  util.setCache('showEthNetwork', obj);
  window.location.reload();
};
const handleDeteleNetwork = (obj: networkType) => {
  console.log(obj);
};
// eslint-disable-next-line no-unused-vars
const handleAddNetwork = () => {};
</script>
<template>
  <el-scrollbar style="height: 200px">
    <div class="py-3 px-2">
      <div
        v-for="item in networkList"
        :key="item.id"
        class="h-8 flex items-center cursor-pointer mb-2"
        @click.stop="handleChangeNetwork(item)"
      >
        <div class="flex-shrink-0 flex items-center w-9/12">
          <div class="w-8">
            <el-icon v-if="item.isSelect" :size="20" color="#04b78a">
              <Check />
            </el-icon>
          </div>
          <span class="truncate w-full text-xs" :title="item.name">
            {{ item.name }}
          </span>
        </div>
        <div v-if="!item.default" class="ml-auto">
          <span
            class="text-small border rounded-xl border-solid border-basic px-2 py-0.5 bg-basic"
          >
            {{ $t('nav.type') }}
          </span>
        </div>

        <div
          v-if="!item.default"
          class="ml-auto"
          @click.stop="handleDeteleNetwork(item)"
        >
          <el-icon><Delete /></el-icon>
        </div>
      </div>
    </div>
  </el-scrollbar>
  <!-- <div class="flex justify-center mb-5">
    <el-button
      class="w-2/3 h-8 text-basic rounded-xl hover:bg-blue hover:border-blue hover:text-white focus:bg-blue focus:border-blue focus:text-white"
      @click="handleAddNetwork"
    >
      <el-icon :size="20"><Plus /></el-icon>
      <span class="ml-2">{{ $t('eth.addNetwork') }}</span>
    </el-button>
  </div> -->
</template>
