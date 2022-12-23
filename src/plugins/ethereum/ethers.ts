/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { ethers } from 'ethers';
import axios from 'axios';
import bscToken from '@/plugins/ethereum/data/bsc-token';
import ethToekn from '@/plugins/ethereum/data/eth-token';
import currencyGoerli from '@/plugins/ethereum/data/goerli-currency';
import util from '@/plugins/util';

const TOKEN_LIST = 'https://token-api.metaswap.codefi.network/tokens';
export const handleIsContact = async (rpcUrl: string) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const res = await provider.getNetwork();
    return res;
  } catch (error) {
    return error;
  }
};
export const handleProvider = async (rpcUrl: string, apikey: string) => {
  try {
    const res: any = await handleIsContact(rpcUrl);
    const provider = new ethers.providers.EtherscanProvider(res, apikey);
    return provider;
  } catch (error) {
    return error;
  }
};

export const handleIsapi = async (url: string, address: string) => {
  const paramsBalance = {
    module: 'account',
    action: 'balance',
    address,
    tag: 'latest'
  };
  try {
    const res = await axios.get(`${url}/api`, { params: paramsBalance });
    console.log(res);
    const { data } = res;
    return data;
  } catch (error) {
    return error;
  }
};
export const handleGetToken = (chainId: number, address: string) => {
  let currency = [];
  const arrAddCurrency = util.getCache(`${address}-add-${chainId}`)
    ? util.getCache(`${address}-add-${chainId}`)
    : [];
  console.log(arrAddCurrency);
  switch (chainId) {
    case 1:
      currency = util.handleReduce([...arrAddCurrency, ...ethToekn], 'address');
      break;
    /*  case 5:
      currency = util.handleReduce(
        [...arrAddCurrency, ...currencyGoerli],
        'address'
      );
      break; */
    case 56:
      currency = util.handleReduce([...arrAddCurrency, ...bscToken], 'address');
      break;
    default:
      currency = arrAddCurrency;
      break;
  }
  return currency;
};
export const handleCheckToken = (chainId: number, address: string) => {
  const token = handleGetToken(chainId, address);
  console.log(token);
  if (token.length) {
    return token.some((item: any) => {
      return item.address.toLowerCase() === address.toLowerCase();
    });
  }
  return false;
};
export const handleGetTokenList = async (chainId: number, address: string) => {
  try {
    console.log(address);
    const list = await axios.get(`${TOKEN_LIST}/${chainId}`);
    console.log(list);
    const { data } = list;
    const obj = data.find((item: any) => {
      return item.address === address;
    });
    return obj;
  } catch (error) {
    return {};
  }
};
