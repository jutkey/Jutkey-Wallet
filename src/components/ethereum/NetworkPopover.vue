<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, reactive, toRefs, inject } from 'vue';
import { Check, Delete, Plus } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { networkType } from '@/plugins/dataType';
import util from '@/plugins/util';
import DialogDefault from '@/components/DialogDefault.vue';
import { handleI18n } from '@/plugins/i18n';
import { handleIsContact, handleIsapi } from '@/plugins/ethereum/ethers';

const ethNetwork = util.getCache('ethNetwork');
const newworkRef = ref<FormInstance>();
const props = defineProps<{
  address: string;
  networkList: Array<networkType>;
}>();
const { networkList, address } = toRefs(props);
console.log(networkList);
const isAddNetwork = ref(false);
const handleChangeNetwork = (obj: networkType) => {
  console.log(obj);
  util.setCache('showEthNetwork', obj);
  window.location.reload();
};
const reload = inject('reload') as Function;
const handleDeteleNetwork = (obj: networkType) => {
  ElMessageBox.confirm(
    `<span class=" ">${handleI18n('eth.detelename', {
      name: obj.name
    })}</span>`,
    handleI18n('eth.detele'),
    {
      closeOnClickModal: false,
      customClass: 'form-box bg-basic-box   border-basic-box',
      dangerouslyUseHTMLString: true,
      confirmButtonClass:
        'text-center text-sm rounded bg-btn text-white border-btn mx-3',
      cancelButtonClass:
        'text-center text-sm rounded text-light-blue border border-light-blue mx-3 hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue',
      confirmButtonText: handleI18n('login.confirm'),
      cancelButtonText: handleI18n('login.cancel'),
      type: 'warning',
      showCancelButton: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = 'Loading...';
          // eslint-disable-next-line no-unused-vars
          const accountWords = util.getCache('accountWords');
          // eslint-disable-next-line no-unused-vars
          const accountImport = util.getCache('accountImport');
          console.log(accountImport);
          setTimeout(() => {
            done();
            setTimeout(() => {
              instance.confirmButtonLoading = false;
            }, 300);
            console.log(obj);
            const ethNetwork = util.getCache('ethNetwork');
            const i = ethNetwork.findIndex(
              (item: networkType) => item.chainId === obj.chainId
            );
            console.log(i);
            ethNetwork.splice(i, 1);
            console.log(ethNetwork);
            if (ethNetwork.length) {
              util.setCache('ethNetwork', ethNetwork);
            } else {
              util.removeCache('ethNetwork');
            }
            const arrCurrency = util.getCache(
              `${address.value}-${obj.chainId}`
            );
            if (arrCurrency.length) {
              util.removeCache(`${address.value}-${obj.chainId}`);
              reload();
            }
          }, 1000);
        } else {
          done();
        }
      }
    }
  ).then(() => {
    ElMessage({
      type: 'success',
      message: `${handleI18n('eth.deleted')}`
    });
  });
};
const handleCheck = (key: string, value: string | number) => {
  return networkList.value.some((item: any) => {
    return item[key] === value;
  });
};

const networkForm = reactive({
  name: '',
  rpcUrl: '',
  symbol: '',
  brower: '',
  api: '',
  apikey: ''
});
const validateName = (rule: any, value: any, callback: any) => {
  const boo = handleCheck('name', value);
  if (value === '') {
    callback(new Error(handleI18n('eth.networkinput')));
  } else if (boo) {
    callback(new Error(handleI18n('eth.networksave')));
  } else {
    callback();
  }
};
const validateRpcUrl = (rule: any, value: any, callback: any) => {
  const boo = handleCheck('rpcUrl', value);
  if (value === '') {
    callback(new Error(handleI18n('eth.rpcurl')));
  } else if (boo) {
    callback(new Error(handleI18n('eth.rpcsave')));
  } else {
    setTimeout(async () => {
      const res = (await handleIsContact(value)) as any;
      if (!res.chainId) {
        callback(new Error(handleI18n('eth.invalid')));
      } else {
        callback();
      }
    }, 1000);
  }
};
const validateSymbol = (rule: any, value: any, callback: any) => {
  const boo = handleCheck('symbol', value.toUpperCase());
  if (value === '') {
    callback(new Error(handleI18n('eth.currencyInput')));
  } else if (boo) {
    callback(new Error(handleI18n('eth.currencysave')));
  } else {
    callback();
  }
};
const validateapi = (rule: any, value: any, callback: any) => {
  const boo = handleCheck('api', value);
  if (value === '') {
    callback(new Error(handleI18n('eth.apiinput')));
  } else if (boo) {
    callback(new Error(handleI18n('eth.apisave')));
  } else {
    setTimeout(async () => {
      const res = (await handleIsapi(value, address.value)) as any;
      if (!res.status) {
        callback(new Error(handleI18n('eth.apierror')));
      } else {
        callback();
      }
    }, 1000);
  }
};
const validateBrower = (rule: any, value: any, callback: any) => {
  const boo = handleCheck('brower', value);
  if (value === '') {
    callback(new Error(handleI18n('eth.browerinput')));
  } else if (boo) {
    callback(new Error(handleI18n('eth.browersave')));
  } else {
    callback();
  }
};
/* const validateApikey = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(handleI18n('eth.apikeyinput')));
  } else {
    callback();
  }
}; */
const networkRules = reactive({
  // username: [{ validator: validateUsername, trigger: 'change' }],
  name: [
    {
      required: true,
      validator: validateName,
      trigger: 'blur'
    }
  ],
  rpcUrl: [
    {
      required: true,
      validator: validateRpcUrl,
      trigger: 'blur'
    },
    {
      type: 'url',
      message: handleI18n('eth.rpcerror'),
      trigger: 'blur'
    }
  ],
  symbol: [
    {
      required: true,
      validator: validateSymbol,
      trigger: 'blur'
    }
  ],
  api: [
    {
      required: true,
      validator: validateapi,
      trigger: 'blur'
    },
    {
      type: 'url',
      message: handleI18n('eth.browererror'),
      trigger: 'blur'
    }
  ],
  brower: [
    {
      required: true,
      validator: validateBrower,
      trigger: 'blur'
    },
    {
      type: 'url',
      message: handleI18n('eth.browererror'),
      trigger: 'blur'
    }
  ]
}) as any;
// eslint-disable-next-line no-unused-vars
const handleAddNetwork = () => {
  isAddNetwork.value = true;
};
const handleDialogClose = () => {
  isAddNetwork.value = false;
  if (!newworkRef.value) return;
  newworkRef.value.resetFields();
};
const handleNetworkConfirm = async () => {
  console.log(newworkRef);
  if (!newworkRef.value) return;
  await newworkRef.value.validate(async (valid, fields) => {
    if (valid) {
      util.showLoading();
      const { name, rpcUrl, symbol, brower, apikey, api } = networkForm;
      const network: any = await handleIsContact(rpcUrl);
      console.log(network);
      const obj = {
        chainId: network.chainId,
        name,
        rpcUrl,
        symbol,
        brower,
        api,
        apikey,
        isSelect: false,
        default: false
      };
      console.log(obj, ethNetwork);
      if (ethNetwork) {
        ethNetwork.push(obj);
        util.setCache('ethNetwork', util.handleReduce(ethNetwork, 'chainId'));
      } else {
        util.setCache('ethNetwork', [obj]);
      }
      ElMessage({
        message: handleI18n('eth.addSuccess'),
        grouping: true,
        type: 'success',
        onClose: () => {
          util.closeLoading();
          handleDialogClose();
          isAddNetwork.value = false;
        }
      });
    } else {
      console.log('error submit!', fields);
    }
  });
};
const handleNeworkCancel = () => {
  isAddNetwork.value = false;
  if (!newworkRef.value) return;
  newworkRef.value.resetFields();
};
</script>
<template>
  <el-scrollbar style="height: 200px">
    <div class="py-3 px-2">
      <div
        v-for="item in networkList"
        :key="item.chainId"
        class="flex items-center cursor-pointer mb-2"
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
        <!-- <div v-if="!item.default" class="ml-auto">
          <span
            class="text-small border rounded-xl border-solid border-basic px-2 py-0.5 bg-basic"
          >
            {{ $t('nav.type') }}
          </span>
        </div> -->

        <div
          v-if="!item.default && !item.isSelect"
          class="ml-auto"
          @click.stop="handleDeteleNetwork(item)"
        >
          <el-icon><Delete /></el-icon>
        </div>
      </div>
    </div>
  </el-scrollbar>
  <div class="flex justify-center mb-5">
    <el-button
      class="w-2/3 h-8 rounded-xl hover:bg-btn hover:border-btn hover:text-white focus:bg-btn focus:border-btn focus:text-white"
      @click="handleAddNetwork"
    >
      <el-icon :size="20"><Plus /></el-icon>
      <span class="ml-2">{{ $t('eth.addNetwork') }}</span>
    </el-button>
  </div>
  <!-- create Account -->
  <dialog-default
    :title="$t('eth.addNetwork')"
    :is-dialog="isAddNetwork"
    @close="handleDialogClose"
    @confirm="handleNetworkConfirm"
    @cancel="handleNeworkCancel"
  >
    <template #default>
      <el-scrollbar style="height: 50vh">
        <div class="form-box" style="width: 85%; margin: auto">
          <el-form
            ref="newworkRef"
            :model="networkForm"
            :rules="networkRules"
            class="wallet-form"
            label-position="top"
            status-icon
            @submit.prevent
          >
            <el-form-item :label="$t('eth.networkname')" prop="name">
              <el-input
                v-model="networkForm.name"
                clearable
                :placeholder="$t('nav.networkName')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('eth.rpc')" prop="rpcUrl">
              <el-input
                v-model="networkForm.rpcUrl"
                clearable
                placeholder="https://"
              ></el-input>
            </el-form-item>
            <!--   <el-form-item :label="$t('eth.chainId')" prop="chainId">
            <el-input v-model="networkForm.chainId" type="number"></el-input>
          </el-form-item> -->
            <el-form-item :label="$t('eth.currency')" prop="symbol">
              <el-input
                v-model="networkForm.symbol"
                clearable
                :placeholder="$t('eth.currencyInput')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('eth.api')" prop="api">
              <el-input
                v-model="networkForm.api"
                clearable
                placeholder="https://"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('eth.explorer')" prop="brower">
              <el-input
                v-model="networkForm.brower"
                clearable
                placeholder="https://"
              ></el-input>
            </el-form-item>
            <el-form-item label="API Key" prop="apikey">
              <el-input
                v-model="networkForm.apikey"
                clearable
                :placeholder="$t('eth.apikeyinput')"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </template>
  </dialog-default>
</template>
