import CryptoJS from 'crypto-js';
import md5 from 'crypto-js/md5';
import Decimal from 'decimal.js';
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';
import { nextTick, ref, Ref } from 'vue';
import axios from 'axios';
import qs from 'qs';
import clipBorad from 'vue-clipboard3';
import keyring from './keyring';
// import store from '@/store/';
import { handleI18n } from './i18n';
import { handleGetObjUrl, handleSetCookies } from './common';

// eslint-disable-next-line no-unused-vars
const securitydiscword = ref() as Ref<HTMLElement>;
// eslint-disable-next-line no-unused-vars
const entertradepassCheckbox = ref() as Ref<HTMLElement>;
// eslint-disable-next-line no-unused-vars
const entertradepassInput = ref() as Ref<HTMLElement>;
const { toClipboard } = clipBorad();
interface currentType {
  id?: number;
  privateKey: string;
  publicKey: string;
  account: string;
  keyId: string;
  status: boolean;
  name: string;
  type: boolean;
  networkId: number;
  index?: number;
}
export default {
  loadingInstance: '' as any,
  setCache(name: string, data: any) {
    const md5Name = md5(name).toString();
    const type = typeof data;
    const info = { type, data };
    const string = encodeURIComponent(JSON.stringify(info));
    localStorage.setItem(md5Name, this.encryptAES(string, md5Name));
  },
  getCache(name: string) {
    // console.log(name);
    const md5Name = md5(name).toString();
    const strCache = localStorage.getItem(md5Name);
    if (strCache) {
      const strData = this.decryptAES(strCache, md5Name);
      try {
        const data = JSON.parse(decodeURIComponent(strData));
        // console.log(data);
        return data ? data.data : null;
      } catch (e) {
        console.log(e);
      }
    }
  },
  removeCache(name: string) {
    const md5Name = md5(name).toString();
    localStorage.removeItem(md5Name);
  },
  encryptAES: (data: any, password: string) => {
    const key = CryptoJS.enc.Utf8.parse(password);
    const srcs = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },
  decryptAES: (data: any, password: string) => {
    const key = CryptoJS.enc.Utf8.parse(password);
    const decrypt = CryptoJS.AES.decrypt(data, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
    /*  const decrypted = CryptoJS.AES.decrypt(data, key).toString(
      CryptoJS.enc.Hex
    );
    console.log(decrypted);
    let result = '';
    for (let i = 0; i < decrypted.length; i += 2) {
      const byte = parseInt(decrypted.substring(i, 2), 16);
      result += String.fromCharCode(byte);
    }
    console.log(result);
    return result; */
  },
  searchArr(arr: [], field: string, value: string) {
    try {
      const d = arr.filter((f) => f[field] === value);
      return d[0];
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
  getChainUrl() {
    const obj = handleGetObjUrl() as any;
    let url = obj.ip;
    const networkIp = this.getCache('networkIp');
    if (networkIp) {
      url = networkIp.ip;
    }
    console.log(url);
    return url;
  },
  handleReduce(arr: any, key: string = 'id') {
    const obj: { [key: string]: boolean } = {};
    const arrResult = arr.reduce(
      (item: any[], next: { [x: string]: string | number }) => {
        if (!obj[next[key]]) {
          item.push(next);
          obj[next[key]] = true;
        }
        return item;
      },
      []
    );
    return arrResult;
  },
  formatKeyId(str: string): string {
    if (str === '0') {
      return 'system';
    }
    if (str) {
      return keyring.addressString(str);
    }
    return str;
  },
  export(filename: string, text: string) {
    const dom = document.createElement('a');
    dom.setAttribute(
      'href',
      `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
    );
    dom.setAttribute('download', filename);
    dom.click();
  },
  getRandomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  shuffle(arr: Array<string>) {
    const newArr = arr.slice();
    for (let i = 0; i < newArr.length; i += 1) {
      const j = this.getRandomNum(0, i);
      const temp = newArr[i];
      newArr[i] = newArr[j];
      newArr[j] = temp;
    }
    return newArr;
  },
  transformArrayBufferToBase64(buffer: any) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let len = bytes.byteLength, i = 0; i < len; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  },
  transfile(file: File, field: string, callback: Function) {
    console.log(field);
    console.log(file);
    const reader = new FileReader();
    // Convert binary stream, asynchronous method
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // complete this.result Is a binary stream
      const data = {
        field,
        name: file.name,
        type: file.type,
        value: reader.result
      };
      console.log(reader.result);
      callback(data);
    };
  },
  showLoading() {
    this.loadingInstance = ElLoading.service({
      lock: true,
      text: 'Loading',
      fullscreen: true,
      background: 'rgba(0, 0, 0, 0.8)'
    });
  },
  closeLoading() {
    if (this.loadingInstance) {
      nextTick(() => {
        // Loading should be closed asynchronously
        this.loadingInstance.close();
      });
    }
  },
  cutZero(str: string) {
    let newstr = str.toString();
    //  console.log(num.indexOf('.') - 1);
    const leng = newstr.length - newstr.indexOf('.') - 1;
    if (newstr.indexOf('.') > -1) {
      for (let i = leng; i > 0; i -= 1) {
        if (
          newstr.lastIndexOf('0') > -1 &&
          newstr.substring(newstr.length - 1) === String(0)
        ) {
          const k = newstr.lastIndexOf('0');

          if (newstr.charAt(k - 1) === '.') {
            return newstr.substring(0, k - 1);
          }
          newstr = newstr.substring(0, k);
        } else {
          return newstr;
        }
      }
    }
    return str;
  },
  format(num: string | number = '0') {
    const arr = String(num).split('.');
    const str =
      (arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') +
      (arr[1] ? `.${arr[1]}` : '');
    return this.cutZero(str);
  },
  formatFixed(money: string | number = '0', fixed = 12, format = 1) {
    try {
      let balance: any = Number(money);
      if (balance > 0) {
        balance = new Decimal(balance).div(new Decimal(1000000000000));
        if (fixed !== undefined) {
          balance = balance.toFixed(fixed);
        }
        return format ? this.format(balance) : balance;
      }
      return 0;
    } catch (e) {
      // console.log(e);
    }
  },
  formatUnits(money: any, fixed = 12) {
    try {
      if (money > 0) {
        money = new Decimal(money).div(new Decimal(1000000000000));
        if (fixed !== undefined) {
          money = money.toFixed(fixed);
        }
        return this.cutZero(money);
      }
      return 0;
    } catch (e) {
      // console.log(e);
    }
  },
  compare(password: string) {
    const getPasswords = this.getCache('words').password;
    if (password === getPasswords) {
      return true;
    }
    return false;
  },
  checkTradepass(callback: Function) {
    ElMessageBox.prompt(
      '',
      handleI18n('user.authorization') as any,
      {
        closeOnClickModal: false,
        customClass: 'form-box bg-basic-box   border-basic-box',
        confirmButtonClass: 'bg-btn text-white border-btn',
        cancelButtonClass:
          'el-button text-center text-sm rounded text-light-blue border border-light-blue mx-3 hover:bg-side hover:border-light-blue focus:bg-side focus:border-light-blue',
        confirmButtonText: handleI18n('login.confirm'),
        cancelButtonText: handleI18n('login.cancel'),
        inputAutocomplete: 'off',
        inputType: 'password',
        inputPlaceholder: handleI18n('login.inputPassword'),
        inputValidator: (value: any) => {
          if (!value) {
            return handleI18n('login.inputPassword');
          }
          if (!this.compare(value)) {
            return handleI18n('login.errorpass');
          }
          return true;
        },
        inputErrorMessage: ''
      } as any
    )
      .then(({ action }) => {
        if (action === 'confirm') {
          callback();
        }
      })
      .catch(() => {});
  },
  isProperty(params: object, attr: string) {
    return Object.prototype.hasOwnProperty.call(params, attr);
  },
  async loginSubmit(index: number = 0) {
    this.showLoading();
    const { words } = this.getCache('words');
    const ecosystem = 1;
    const nodeserver = this.getChainUrl();
    axios.defaults.headers.common.Authorization = '';
    const res = await axios.get(`${nodeserver}/api/v2/getuid`);
    const resNode = res.data;
    const networkId = resNode.network_id;
    const { uid, hasher } = resNode;
    const privateKey = keyring.generatePriavte(words, index);
    console.log(privateKey);
    const getKeyring = keyring.getKeyring(hasher);
    const publicKey = getKeyring.generatePublicKey(privateKey);
    console.log(publicKey);
    axios.defaults.headers.common.Authorization = `Bearer ${resNode.token}`;
    //  console.log(JSON.stringify(user));
    console.log(uid);
    const nodeSign = getKeyring.sign(
      `LOGIN${parseInt(networkId, 10)}${uid}`,
      privateKey
    );
    const nodeLogin = await axios.post(
      `${nodeserver}/api/v2/login`,
      qs.stringify({
        signature: nodeSign,
        // eslint-disable-next-line no-undef
        pubkey: publicKey,
        ecosystem
      })
    );
    console.log(JSON.stringify(nodeLogin.data));
    const loginData = nodeLogin.data;
    const { token, account } = loginData;
    const keyId = loginData.key_id;
    const current: currentType = {
      privateKey,
      publicKey,
      account,
      keyId,
      networkId: Number(networkId),
      status: true,
      name: 'default',
      type: false,
      index
    };
    const accountList: Array<currentType> = [];
    const arr = this.getCache('accountWords');
    if (!arr) {
      accountList.push(current);
      this.setCache('accountWords', accountList);
    }
    handleSetCookies('token', token);
    // localStorage.setItem('token', token);
    this.setCache('keyId', keyId);
    this.setCache('current', current);
    // Generate according to auxiliary words
    this.setCache('hasher', hasher);
    this.setCache('keyId', keyId);
    /* store.dispatch('handleActToken', token);
    store.dispatch('handleActCurrent', current);
    store.dispatch('handleActAccount', accountList); */
    this.closeLoading();
    return true;
  },
  async loginSubmitOther(params: currentType) {
    this.showLoading();
    const { privateKey, publicKey, type, name } = params;
    console.log(privateKey, publicKey);
    const ecosystem = 1;
    const nodeserver = this.getChainUrl();
    axios.defaults.headers.common.Authorization = '';
    const res = await axios.get(`${nodeserver}/api/v2/getuid`);
    const resNode = res.data;
    const networkId = resNode.network_id;
    const { uid, hasher } = resNode;
    const getKeyring = keyring.getKeyring(hasher);
    axios.defaults.headers.common.Authorization = `Bearer ${resNode.token}`;
    //  console.log(JSON.stringify(user));
    console.log(uid);
    const nodeSign = getKeyring.sign(
      `LOGIN${parseInt(networkId, 10)}${uid}`,
      privateKey
    );
    const nodeLogin = await axios.post(
      `${nodeserver}/api/v2/login`,
      qs.stringify({
        signature: nodeSign,
        // eslint-disable-next-line no-undef
        pubkey: publicKey,
        ecosystem
      })
    );
    console.log(JSON.stringify(nodeLogin.data));
    const loginData = nodeLogin.data;
    const { token, account } = loginData;
    const keyId = loginData.key_id;
    const current: currentType = {
      privateKey,
      publicKey,
      account,
      keyId,
      networkId: Number(networkId),
      status: true,
      name,
      type
    };
    if (this.isProperty(params, 'index')) {
      const accountWords = this.getCache('accountWords');
      const newAccountWords = accountWords.map((item: currentType) => {
        if (item.index === params.index) {
          item.status = true;
        } else {
          item.status = false;
        }
        return item;
      });
      this.setCache('accountWords', newAccountWords);
      const accountImport = this.getCache('accountImport');
      if (accountImport) {
        const newAccountImport = accountImport.map((item: currentType) => {
          item.status = false;
          return item;
        });
        this.setCache('accountImport', newAccountImport);
      }
    }
    if (this.isProperty(params, 'id')) {
      const accountWords = this.getCache('accountWords');
      const newAccountWords = accountWords.map((item: currentType) => {
        item.status = false;
        return item;
      });
      this.setCache('accountWords', newAccountWords);
      const accountImport = this.getCache('accountImport');
      const newAccountImport = accountImport.map((item: currentType) => {
        if (item.id === params.id) {
          item.status = true;
        } else {
          item.status = false;
        }
        return item;
      });
      this.setCache('accountImport', newAccountImport);
    }
    handleSetCookies('token', token);
    // localStorage.setItem('token', token);
    this.setCache('current', current);
    this.setCache('hasher', hasher);
    this.setCache('keyId', keyId);
    /*  store.dispatch('handleActToken', token);
    store.dispatch('handleActCurrent', current); */
    this.closeLoading();
    return true;
  },
  async copyText(str: string) {
    try {
      await toClipboard(str);
      ElMessage({
        showClose: true,
        message: handleI18n('user.success'),
        type: 'success'
      });
    } catch (e) {
      console.error(e);
      ElMessage({
        showClose: true,
        message: handleI18n('user.error'),
        type: 'error'
      });
    }
  },
  time(date?: Date) {
    const dateinit = date ? new Date(date) : new Date();
    return Math.round(dateinit.getTime() / 1000).toString();
  }
};
