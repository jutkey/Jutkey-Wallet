<script setup lang="ts">
import { ref, reactive, Ref, toRefs } from 'vue';
import { Search } from '@element-plus/icons-vue';
// import currencyAll from '@/plugins/ethereum/abi/rinkeby-currency';
import currencyAll from '@/plugins/ethereum/abi/tokenlist';
import { currencyType, currencyListType } from '@/plugins/dataType';
import util from '@/plugins/util';

const props = defineProps({
  address: {
    type: String,
    default: () => ''
  }
});
const { address } = toRefs(props);
console.log(address.value);
const isAllDisabled = ref(false) as Ref<boolean>;
const currencyList: currencyType[] = JSON.parse(JSON.stringify(currencyAll));
const arrCurrencyList: currencyListType = reactive({ list: currencyList });
const checkAll = ref(false);
const isIndeterminate = ref(false);
const currencyNanme = ref('') as Ref<string>;
const checkedList = ref([]) as Ref<string[]>;
const arrCurrency = util.getCache(address.value)
  ? util.getCache(address.value)
  : [];
// console.log(arrCurrency.length);
if (arrCurrency.length) {
  const arrAddress = arrCurrency.map((item: currencyType) => item.address);
  console.log(arrAddress);
  if (arrAddress.length === arrCurrencyList.list.length) {
    isAllDisabled.value = true;
  } else {
    isAllDisabled.value = false;
  }
  arrCurrencyList.list.forEach((item: currencyType) => {
    if (arrAddress.includes(item.address)) {
      item.disabled = true;
    } else {
      item.disabled = false;
    }
  });
}

const handleCheckAllChange = (val: boolean) => {
  console.log(val);
  const checked = arrCurrencyList.list
    .map((item: currencyType) => {
      if (!item.disabled) {
        return item.address;
      }
      return '';
    })
    .filter((ele) => ele !== '');
  checkedList.value = val ? checked : [];
  console.log(checkedList.value);
  isIndeterminate.value = false;
};
const handleCheckedChange = (value: any) => {
  const checkedCount = value.length;
  console.log(value);
  checkAll.value = checkedCount === arrCurrencyList.list.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < arrCurrencyList.list.length;
};
const handleSearchCurrency = (val: string) => {
  console.log(val);
  if (val) {
    const reg = new RegExp(val);
    const arr = currencyList.filter((item) => {
      const boo = reg.test(item.name) || reg.test(item.symbol);
      return boo;
    });
    arrCurrencyList.list = arr;
  } else {
    arrCurrencyList.list = currencyList;
  }
};
defineExpose({
  currencyList,
  checkedList
});
</script>
<template>
  <div class="w-full">
    <div class="mb-20px w-2/3">
      <el-input
        v-model="currencyNanme"
        type="text"
        :placeholder="$t('eth.search')"
        clearable
        @input="handleSearchCurrency"
      >
        <template #suffix>
          <el-icon
            class="el-input__icon cursor-pointer"
            @click="handleSearchCurrency"
          >
            <search />
          </el-icon>
        </template>
      </el-input>
    </div>
    <div class="mb-3">
      <el-checkbox
        v-model="checkAll"
        :disabled="isAllDisabled"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
      >
        <span class=" ">{{ $t('eth.checkAll') }}</span>
      </el-checkbox>
    </div>
    <el-scrollbar style="height: 200px">
      <el-checkbox-group
        v-model="checkedList"
        text-color="#3961F5"
        fill="#3961F5"
        @change="handleCheckedChange"
      >
        <div
          v-for="item in arrCurrencyList.list"
          :key="item.address"
          class="mb-2"
        >
          <el-checkbox :label="item.address" :disabled="item.disabled">
            <div class="flex items-center">
              <img :src="item.logoURI" class="w-5 mr-2" />
              <span class=" ">{{ item.name }} ({{ item.symbol }})</span>
            </div>
          </el-checkbox>
        </div>
      </el-checkbox-group>
    </el-scrollbar>
  </div>
</template>
