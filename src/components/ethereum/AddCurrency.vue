<script setup lang="ts">
import { ref, reactive, Ref, toRefs } from 'vue';
import { Search } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { currencyType, currencyListType } from '@/plugins/dataType';
import util from '@/plugins/util';
import { handleI18n } from '@/plugins/i18n';
import {
  handleGetToken,
  handleCheckToken,
  handleGetTokenList
} from '@/plugins/ethereum/ethers';
import ETH from '@/plugins/ethereum/';

const showEthNetwork = util.getCache('showEthNetwork');
const { privateKey } = util.getCache('current');
const { api, rpcUrl, apikey } = showEthNetwork;
const eth = new ETH(privateKey, rpcUrl, api, apikey);
console.log(eth);
console.log(showEthNetwork);
const isAddDialog = ref(false);
const currencyForm = ref<FormInstance>();
const { chainId } = showEthNetwork;
const currencyData = reactive({
  address: '',
  symbol: '',
  decimals: ''
});
const validateAddress = (rule: any, value: any, callback: any) => {
  console.log(value);
  const boo = handleCheckToken(chainId, value);
  console.log(boo);
  if (value === '') {
    callback(new Error(handleI18n('eth.tokeninput')));
  } else if (boo) {
    callback(new Error(handleI18n('eth.tokensave')));
  } else {
    setTimeout(async () => {
      const res = (await eth.getTokenInfo(value)) as any;
      console.log(res);
      console.log(res.name);
      if (!res.decimals) {
        callback(new Error(handleI18n('eth.tpkeninvalid')));
      } else {
        const { symbol, decimals } = res;
        currencyData.symbol = symbol;
        currencyData.decimals = decimals;
        callback();
      }
    }, 1000);
  }
};
const currencyRules = reactive({
  address: [
    {
      required: true,
      validator: validateAddress,
      trigger: 'blur'
    }
  ],
  symbol: [
    {
      required: true,
      message: handleI18n('eth.symbolinput'),
      trigger: 'blur'
    }
  ],
  decimals: [
    {
      required: true,
      message: handleI18n('eth.decimalsinput'),
      trigger: 'blur'
    }
  ]
});
const props = defineProps({
  address: {
    type: String,
    default: () => ''
  }
});
const { address } = toRefs(props);
console.log(address.value);
console.log(chainId);
const currencyAll = handleGetToken(chainId, address.value);
const isAllDisabled = ref(false) as Ref<boolean>;
const currencyList: currencyType[] = JSON.parse(JSON.stringify(currencyAll));
const arrCurrencyList: currencyListType = reactive({ list: currencyList });
const checkAll = ref(false);
const isIndeterminate = ref(false);
const currencyNanme = ref('') as Ref<string>;
const checkedList = ref([]) as Ref<string[]>;
const arrCurrency = util.getCache(`${address.value}-${chainId}`)
  ? util.getCache(`${address.value}-${chainId}`)
  : [];
console.log(arrCurrency);
// console.log(arrCurrency.length);
if (arrCurrency.length) {
  arrCurrency.forEach((item: { address: string }) => {
    checkedList.value.push(item.address);
  });
  const checkedCount = arrCurrency.length;
  checkAll.value = checkedCount === arrCurrencyList.list.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < arrCurrencyList.list.length;
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
    const reg = new RegExp(val.toLowerCase());
    const arr = currencyList.filter((item) => {
      const boo =
        reg.test(item.name.toLowerCase()) ||
        reg.test(item.name.toUpperCase()) ||
        reg.test(item.symbol.toLowerCase()) ||
        reg.test(item.symbol.toUpperCase());
      // const boo = item.name.indexOf(val) > -1 || item.name.indexOf(val) > -1;
      return boo;
    });
    arrCurrencyList.list = arr;
  } else {
    arrCurrencyList.list = currencyList;
  }
};
const handleAddOtherCurrency = () => {
  isAddDialog.value = true;
};
const handleClose = () => {
  isAddDialog.value = false;
};
const handleAddCancel = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const handleAddConfirm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      util.showLoading();
      console.log('submit!');
      const arrAddCurrency = util.getCache(`${address.value}-add-${chainId}`);
      const arrCurrency = util.getCache(`${address.value}-${chainId}`);
      console.log(arrAddCurrency);
      const contractAddress = currencyData.address;
      const res = (await eth.getTokenInfo(contractAddress)) as any;
      const { decimals, name, symbol } = res;
      const info: any = await handleGetTokenList(chainId, contractAddress);
      console.log(info);
      console.log(currencyAll.length);
      const obj = {
        id: currencyAll.length + 1,
        chainId,
        type: info.type ? info.type : '',
        address: contractAddress,
        name,
        symbol,
        decimals,
        logoURI: info.iconUrl ? info.iconUrl : ''
      };
      console.log(obj);
      if (arrAddCurrency) {
        arrAddCurrency.unshift(obj);
        util.setCache(`${address.value}-add-${chainId}`, arrAddCurrency);
      } else {
        util.setCache(`${address.value}-add-${chainId}`, [obj]);
      }
      if (arrCurrency) {
        arrCurrency.push(obj);
        util.setCache(`${address.value}-${chainId}`, arrCurrency);
      } else {
        util.setCache(`${address.value}-${chainId}`, [obj]);
      }
      ElMessage({
        message: handleI18n('eth.addSuccess'),
        grouping: true,
        type: 'success',
        onClose: () => {
          util.closeLoading();
          window.location.reload();
        }
      });
    } else {
      console.log('error submit!');
      return false;
    }
  });
};
defineExpose({
  currencyList,
  checkedList
});
</script>
<template>
  <div class="w-full">
    <div class="mb-20px w-2/3 select-box">
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
    <div class="check-box">
      <div v-if="arrCurrencyList.list.length" class="mb-3">
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
        <template v-if="arrCurrencyList.list.length">
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
                  <img
                    v-if="item.logoURI"
                    :src="item.logoURI"
                    class="w-5 mr-2 rounded-full"
                  />
                  <img
                    v-else
                    src="@/assets/image/tokens/other.png"
                    class="w-5 mr-2 rounded-full"
                  />
                  <span class=" ">{{ item.name }} ({{ item.symbol }})</span>
                </div>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </template>
        <div v-else class="w-full bg-basic-box rounded-3xl flex justify-center">
          <img src="@/assets/image/no-data.png" alt="no-data" />
        </div>
      </el-scrollbar>
      <div class="my-3">
        <el-button
          type="primary"
          class="text-xs bg-btn text-white border-btn"
          style="font-size: 12px"
          @click="handleAddOtherCurrency"
        >
          {{ $t('eth.other') }}
        </el-button>
      </div>
    </div>
    <el-dialog
      v-model="isAddDialog"
      class="bg-basic-box"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="30%"
      destroy-on-close
      center
      :append-to-body="true"
      :before-close="handleClose"
    >
      <template #header>
        <h3 class="font-semibold text-first">{{ $t('eth.other') }}</h3>
      </template>
      <div class="form-box" style="width: 85%; margin: auto">
        <el-form
          ref="currencyForm"
          :model="currencyData"
          :rules="currencyRules"
          class="wallet-form"
          label-position="top"
          status-icon
          @submit.prevent
        >
          <el-form-item :label="$t('eth.token')" prop="address">
            <el-input
              v-model="currencyData.address"
              clearable
              :placeholder="$t('eth.tokeninput')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('eth.tokensymbol')" prop="symbol" required>
            <el-input
              v-model="currencyData.symbol"
              clearable
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('eth.tokendecimals')"
            prop="decimals"
            required
          >
            <el-input
              v-model="currencyData.decimals"
              type="number"
              clearable
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="text-center text-sm rounded text-light-blue border border-light-blue mx-3 hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue"
            @click="handleAddCancel(currencyForm)"
          >
            {{ $t('login.cancel') }}
          </el-button>
          <el-button
            type="primary"
            class="text-center text-sm rounded bg-btn text-white border-btn mx-3"
            @click="handleAddConfirm(currencyForm)"
          >
            {{ $t('login.confirm') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
