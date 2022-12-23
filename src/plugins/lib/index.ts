import axios from './axios';
import util from '../util';
import defaultSchema from './defaultSchema';
import Contract from './contract';
import UTXO from './utxo';
import { txType, hashType, UTXOParams, transferParams } from '../dataType';
import keyring from '../keyring';

const { privateKey, account, networkId } = util.getCache('current');
let num = 4;
let timer: any = null;
export default {
  privateKey,
  ecosystem: 1,
  async tokensSend(params: any, callback: Function) {
    console.log(params.ecosystem);
    if (params.ecosystem) {
      this.ecosystem = params.ecosystem;
    }
    console.log(this.ecosystem);
    const res = await axios.get(`contract/${params.contractName}`);
    try {
      if (res) {
        this.generateBinary(res, params, callback);
      }
    } catch (error) {
      if (typeof callback === 'function') {
        callback(error, 'error');
      }
    }
  },
  async getBalance(ecosystem: number) {
    console.log(util.getCache('current'));
    const params = {
      wallet: account,
      ecosystem
    };
    const res = await axios.get(`/balance/${account}`, params);
    return res;
  },
  accountTransfer(params: transferParams, callback: Function) {
    const objHash: hashType = {};
    const objutxo = new UTXO({
      Amount: params.amount,
      ecosystem: params.ecosystem,
      networkId,
      type: params.type
    });
    const hashData = objutxo.sign(privateKey);
    objHash[hashData.hash] = new Blob([hashData.data]);
    this.sendTx(objHash, callback);
  },
  async generateBinary(data: any, params: any, callback: Function) {
    const txParams: txType = {};
    const objHash: hashType = {};
    console.log(JSON.stringify(data));
    const { Expedite } = params;
    const { ecosystem } = this;
    const Amount = params[params.attribute];
    const balance = await this.getBalance(ecosystem);
    const { utxo, amount, total } = balance;
    console.log(Number(util.formatUnits(total)));
    console.log(Amount);
    if (Number(Amount) >= Number(util.formatUnits(total))) {
      return callback('Sorry, your credit is running low', 'balance');
    }
    console.log(util.formatUnits(amount));
    console.log(util.formatUnits(utxo));
    const boo =
      Number(amount) === 0 ||
      Number(Amount) >= Number(util.formatUnits(amount));
    if (boo) {
      const objutxo = new UTXO({
        Amount: utxo,
        ecosystem,
        networkId,
        type: 'toContract'
      });
      const hashData = objutxo.sign(privateKey);
      objHash[hashData.hash] = new Blob([hashData.data]);
    }
    data.fields.forEach((field: any) => {
      (txParams as any)[field.name] = {
        type: field.type,
        value: params[field.name]
      };
    });
    console.log(JSON.stringify(params));
    console.log(this.ecosystem);
    console.log(ecosystem);
    const contract = new Contract({
      id: data.id,
      networkId,
      schema: defaultSchema,
      ecosystem: ecosystem || 1,
      fields: txParams,
      Expedite
    });
    const hashData = contract.sign(privateKey);
    const contractData = {
      ...hashData,
      name: data.name,
      params: txParams
    };
    console.log(contractData.data);
    objHash[contractData.hash] = new Blob([contractData.data]);
    this.sendTx(objHash, callback);
  },
  blobSize(params: any) {
    const contract = new UTXO(params);
    const hashData = contract.sign(privateKey);
    const blob = new Blob([hashData.data]);
    console.log(blob);
    return blob;
  },
  async sendUTXO(sendParams: UTXOParams, callback: Function) {
    console.log(JSON.stringify(sendParams));
    const objHash: hashType = {};
    const { ecosystem, Amount } = sendParams;
    const balance = await this.getBalance(ecosystem);
    const { utxo, amount } = balance;
    console.log(util.formatUnits(amount));
    console.log(keyring.formatUnits(amount));
    console.log(util.formatUnits(utxo));
    if (Number(Amount) >= Number(util.formatUnits(utxo))) {
      const dataUtxo = new UTXO({
        Amount: amount,
        networkId,
        ecosystem,
        type: 'toUtxo'
      });
      const hashData = dataUtxo.sign(privateKey);
      objHash[hashData.hash] = new Blob([hashData.data]);
    }
    sendParams.networkId = networkId;
    const contract = new UTXO(sendParams);
    const hashData = contract.sign(privateKey);
    objHash[hashData.hash] = new Blob([hashData.data]);
    this.sendTx(objHash, callback);
  },
  sendMoreUTXO(sendParams: any, callback: Function) {
    const objHash: hashType = {};
    const self = this;
    console.log(sendParams);
    sendParams.forEach((item: any) => {
      const contract = new UTXO(item);
      const hashData = contract.sign(privateKey);
      objHash[hashData.hash] = new Blob([hashData.data]);
    });
    setTimeout(() => {
      self.sendTx(objHash, callback);
    }, 1000);
  },
  async sendTx(objHash: any, callback: Function) {
    const params = new FormData();
    console.log(objHash);
    const arrKey = Object.keys(objHash);
    arrKey.forEach((k: string) => {
      params.append([k] as any, objHash[k]);
    });
    const res = await axios.post(`sendTx`, params);
    try {
      if (res) {
        this.txstatus(objHash, callback);
      }
    } catch (error) {
      if (typeof callback === 'function') {
        callback(error, 'error');
      }
    }
  },
  async txstatus(objHash: any, callback: Function) {
    const self = this;
    const [params, hashes] = [new FormData(), [] as string[]];
    const arrKey = Object.keys(objHash);
    arrKey.forEach((k: string) => {
      hashes.push(k);
    });
    params.append('data', JSON.stringify({ hashes }));
    const res = await axios.post(`txstatus`, params);
    try {
      if (res) {
        const keyArr = Object.keys(res.results);
        const result = res.results[keyArr[0]] as any;
        console.log(num);
        if (num <= 0) {
          clearTimeout(timer);
          num = 4;
          return callback(0, 'loading');
        }
        if (result.errmsg) {
          clearTimeout(timer);
          num = 4;
          return callback(result, 'error');
        }
        if (!result.blockid) {
          timer = setTimeout(() => {
            self.txstatus(objHash, callback);
            num -= 1;
          }, 5000);
        } else {
          clearTimeout(timer);
          num = 4;
          console.log(result);
          if (result.blockid) {
            const [item] = keyArr;
            result.txHash = item;
          }
          return callback(result, 'success');
        }
      }
    } catch (error) {
      if (typeof callback === 'function') {
        callback(error, 'error');
      }
    }
  }
};
