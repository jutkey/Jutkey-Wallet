<script setup lang="ts">
import { ref, inject, computed, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { handleI18n } from '@/plugins/i18n';
import util from '@/plugins/util';
import contract from '@/plugins/lib';
import store from '@/store';

const reload = inject('reload') as Function;
const ecoId = ref('');
const emit = defineEmits(['select', 'clear']);
const props = defineProps({
  account: {
    type: String,
    default: () => ''
  },
  text: {
    type: String,
    default: () => ''
  }
});
const { account, text } = toRefs(props);
store.dispatch('handleActEcolist', {
  account: account.value,
  order: 'all'
});
const ecoList = computed(() => {
  return store.getters.postEcoList;
});
const handleSelectChange = (id: number) => {
  console.log(id);
  emit('select', id);
};
const handleCheck = (item: any) => {
  const { id } = item;
  emit('select', id);
};
const handleSelectAdd = (item: any) => {
  console.log(item);
  const params = {
    contractName: 'MembershipRequest',
    ecosystemId: 1,
    EcosystemId: Number(item.id)
  };
  util.checkTradepass(() => {
    util.showLoading();
    contract.tokensSend(params, (res: any, status: string) => {
      if (status === 'error') {
        console.log(res);
        ElMessage.error(res.errmsg.error);
      } else if (status === 'loading') {
        ElMessage.success(handleI18n('user.chain'));
      } else if (status === 'success') {
        ElMessage({
          type: 'success',
          message: handleI18n('user.dosuccess')
        });
        reload();
      } else if (status === 'balance') {
        ElMessage.error(handleI18n('user.amountShort'));
      } else {
        ElMessage.error(res.msg);
      }
      util.closeLoading();
    });
  });
};
</script>
<template>
  <el-select
    v-model="ecoId"
    :placeholder="text"
    size="large"
    clearable
    filterable
    @change="handleSelectChange"
  >
    <el-option
      v-for="item in ecoList"
      :key="item.id"
      :label="item.tokenSymbol"
      :value="item.id"
      class="mb-2"
    >
      <div class="flex justify-between text-sm items-center h-full">
        <div class="flex items-center">
          <span>{{ item.name }}</span>
          <span v-if="item.tokenSymbol">({{ item.tokenSymbol }})</span>
        </div>
        <span v-if="item.isJoin" @click="handleCheck(item)">
          {{ $t('user.check') }}
        </span>
        <span
          v-else
          class="block px-2 py-1 text-center text-sm rounded bg-blue text-white border-blue"
          @click.stop="handleSelectAdd(item)"
        >
          {{ $t('user.add') }}
        </span>
      </div>
    </el-option>
  </el-select>
</template>
