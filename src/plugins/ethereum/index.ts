import Web3 from 'web3';
import '@ethersproject/shims';
// eslint-disable-next-line no-unused-vars
import { ethers, BigNumber, utils, Contract, Wallet, providers } from 'ethers';
import axios from 'axios';
import qs from 'qs';
import { ElMessage } from 'element-plus';
import { handleI18n } from '../i18n';
// import util from '@/plugins/util';

const defaultBrower = 'https://etherscan.io';
// eslint-disable-next-line no-unused-vars
const mainUrl = 'https://mainnet.infura.io/v3/864b6f681de34c9a8ef2270575ad4592';
// console.log(Web3);
class ObjectETH {
  private web3Provider;

  private privateKey: string;

  private gasLimit: string = '0x100000';

  // rinkeby or homestead
  private networks = 'rinkeby';

  private wallet;

  private connectWallet;

  public address: string;

  public apikey = '5XX1YUUC5AHJ4S9VYNNWV2GY2U67EX189A';

  public api = 'https://api.etherscan.io/api';

  public brower = 'https://etherscan.io';

  chainId = 1;

  constructor(
    privateKey: string,
    rpcUrl: string,
    api: string,
    apikey: string,
    brower: string = defaultBrower
  ) {
    this.privateKey = privateKey;
    const initWeb3 = new Web3.providers.HttpProvider(rpcUrl) as any;
    /*  this.web3Provider = new providers.InfuraProvider(
      'homestead',
      '5XX1YUUC5AHJ4S9VYNNWV2GY2U67EX189A'
    ); */
    /*  console.log(networks);
    this.networks = networks;
    this.web3Provider = ethers.getDefaultProvider(networks, {
      infura: '864b6f681de34c9a8ef2270575ad4592',
     //  infura: {
      //  projectId: '864b6f681de34c9a8ef2270575ad4592',
     //   projectSecret: '39a02dcfc7714195aa13ec0062b694ed'
     // },
      etherscan: '5XX1YUUC5AHJ4S9VYNNWV2GY2U67EX189A'
    }); */
    /*  this.web3Provider = new providers.InfuraProvider('rinkeby', {
      projectId: '864b6f681de34c9a8ef2270575ad4592',
      projectSecret: '39a02dcfc7714195aa13ec0062b694ed'
    }); */
    this.web3Provider = new ethers.providers.Web3Provider(initWeb3);
    // this.chainId = this.web3Provider.network.chainId;
    this.wallet = new Wallet(this.privateKey);
    this.address = this.wallet.address;
    this.connectWallet = this.wallet.connect(this.web3Provider);
    this.api = api;
    this.apikey = apikey;
    this.brower = brower;
  }

  async getGasPrice() {
    const weiGasPrice = await this.web3Provider.getGasPrice();
    const gasPrice = Web3.utils.fromWei(`${weiGasPrice}`, 'Gwei');
    return gasPrice;
  }

  async getNetWork() {
    const res = await this.web3Provider.getNetwork();
    console.log(res);
    return res;
  }

  /*   async getBalance() {
    const res = await this.connectWallet.getBalance();
    console.log(res);
    const str = res.toString();
    console.log(Number(utils.formatEther(BigNumber.from(str))));
    const num = Number(utils.formatEther(BigNumber.from(str)));
    return num ? utils.formatEther(BigNumber.from(str)) : '0';
  } */
  async getBalance(address: string, apikey: string) {
    const paramsBalance = {
      module: 'account',
      action: 'balance',
      address,
      tag: 'latest',
      apikey
    };
    try {
      const res = await axios.get(`${this.api}`, { params: paramsBalance });
      console.log(res);
      const { data } = res;
      if (data.status === '1') {
        const str = data.result;
        const num = Number(utils.formatEther(str));
        console.log(num);
        return num ? utils.formatEther(str) : '0';
      }
      ElMessage.error('Failed to get balance');
    } catch (error) {
      console.log(error);
      // util.closeLoading();
      ElMessage.error('Failed to get balance');
    }
  }

  async ethTranfer(
    sendAddress: string,
    toAddress: string,
    amount: string,
    gasLimit: string,
    gasPrice: string,
    callback: Function
  ) {
    const weiPrice = Web3.utils.toWei(gasPrice, 'Gwei');
    const gasFee = (parseFloat(gasLimit) * parseFloat(weiPrice)).toString();
    const ethFee = Web3.utils.fromWei(gasFee, 'ether');
    const ethGas = parseFloat(amount) + parseFloat(ethFee);
    const balance = (await this.getBalance(this.address, this.apikey)) || '0';
    if (parseFloat(balance!) < ethGas) {
      callback('notEnough');
      return;
    }
    const tx = {
      from: sendAddress,
      to: toAddress,
      value: ethers.utils.parseEther(amount),
      nonce: this.web3Provider.getTransactionCount(sendAddress, 'latest'),
      gasLimit: Web3.utils.toHex(gasLimit),
      gasPrice: Web3.utils.toHex(weiPrice)
    };
    try {
      const res = await this.connectWallet.sendTransaction(tx);
      callback(res);
    } catch (error) {
      callback('error');
    }
  }

  async getContract(contractAddress: string) {
    const { apikey } = this;
    //   console.log(contractAddress);
    const objContract = {
      module: 'contract',
      action: 'getabi',
      address: contractAddress,
      apikey
    };
    try {
      const res = await axios.post(`${this.api}`, qs.stringify(objContract));
      console.log(res);
      const { data } = res;
      if (data.status === '1') {
        const contractABI = JSON.parse(data.result);
        console.log(contractABI);
        const contract = new Contract(
          contractAddress,
          contractABI,
          this.connectWallet
        );
        //  util.closeLoading();
        console.log(contract);
        return contract;
      }

      ElMessage.error(handleI18n('eth.contractError'));
    } catch (error) {
      // util.closeLoading();
      ElMessage.error(handleI18n('eth.contractError'));
    }
  }

  /*
  async getTokenBalance(contractAddress: string, address: string) {
    const contract = (await this.getContract(contractAddress)) as any;
    let balance = 0;
    if (contract.balanceOf) {
      const amount = await contract.balanceOf(address);
      const str = amount.toString();
      const decimals = await contract.decimals.call();
      const num = Number(utils.formatUnits(str, decimals).toString());
      balance = num
        ? utils.commify(utils.formatUnits(str, decimals).toString())
        : '0';
    }
    return { balance, contractAddress };
  } */
  // eslint-disable-next-line class-methods-use-this
  async getTokenBalance(
    api: string,
    contractAddress: string,
    address: string,
    apikey: string,
    decimals: number
  ) {
    console.log(contractAddress);
    const paramsBalance = {
      module: 'account',
      action: 'tokenbalance',
      contractaddress: contractAddress,
      address,
      tag: 'latest',
      apikey
    };
    console.log(api);
    try {
      const res = await axios.get(`${api}`, { params: paramsBalance });
      console.log(res);
      const { data } = res;
      if (data.status === '1') {
        const str = data.result;
        const num = Number(utils.formatUnits(str, decimals).toString());
        const balance = num
          ? utils.commify(utils.formatUnits(str, decimals).toString())
          : '0';
        return balance;
      }
      ElMessage.error('Failed to get token balance');
    } catch (error) {
      console.log(error);
      // util.closeLoading();
      ElMessage.error('Failed to get token balance');
    }
    /*  const contract = (await this.getContract(contractAddress)) as any;
    let balance = 0;
    if (contract.balanceOf) {
      const amount = await contract.balanceOf(address);
      const str = amount.toString();
      const num = Number(utils.formatUnits(str, decimals).toString());
      balance = num
        ? utils.commify(utils.formatUnits(str, decimals).toString())
        : '0';
    }
    return { balance, contractAddress }; */
  }

  // eslint-disable-next-line class-methods-use-this
  decimals(amount: string, decimals: string) {
    const num = Number(utils.formatUnits(amount, decimals).toString());
    const balance = num
      ? utils.commify(utils.formatUnits(amount, decimals).toString())
      : '0';
    return balance;
  }

  async getTokenInfo(contractAddress: string) {
    const contract = (await this.getContract(contractAddress)) as any;
    const [decimals, name, symbol] = await Promise.all([
      contract.decimals.call(),
      contract.name.call(),
      contract.symbol.call()
    ]);
    console.log(decimals, name, symbol);
    return { decimals, name, symbol };
  }

  async tokenTransfer(
    contractAddress: string,
    toAddress: string,
    amount: string,
    callback: Function
  ) {
    const contract = (await this.getContract(contractAddress)) as any;
    console.log(contract);
    const balance = await contract.balanceOf(this.address);
    const str = balance.toString();
    const decimals = await contract.decimals.call();
    const num = utils.formatUnits(str, decimals).toString();
    if (parseFloat(amount) > parseFloat(num)) {
      callback('notEnough');
      return;
    }
    try {
      const res = await contract.transfer(
        toAddress,
        utils.parseUnits(amount, decimals)
      );
      // console.log(res);
      callback(res);
    } catch (error) {
      callback('error');
    }
  }
}
export default ObjectETH;
