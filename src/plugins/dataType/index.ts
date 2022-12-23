import { Int64BE } from 'int64-buffer';
import { ISchema } from '../lib/field/schema';

export interface websocketParams {
  url: string;
  token: string;
}
export interface networkLogin {
  id: number;
  name: string;
  ip: string;
  uid: string;
  networkId: number;
  isAdd: boolean;
  speed: string;
  status: boolean;
  onLine: boolean;
}
export interface arrNetwork {
  list: networkLogin[];
}
export interface IUIDResponse {
  uid: string;
  token: string;
  networkID: number;
}
export interface IContractParam {
  type: string;
  value: object;
}
export interface ecosystemParam {
  wallet: string;
  page: number;
  limit: number;
  search?: string;
}
export interface paramsType {
  Header: {
    ID: number;
    Time: number;
    EcosystemID: number;
    KeyID: number;
    NetworkID: number;
    PublicKey: ArrayBuffer;
  };
  Params: any;
  Expedite?: string;
  Lang: string;
}
export interface IContractContext {
  id: number;
  schema: ISchema;
  ecosystem: number;
  networkId: number;
  Expedite?: string;
  fields: {
    [name: string]: IContractParam;
  };
}
export interface UTXOContext {
  Amount: string;
  toAddress?: string;
  Comment?: string;
  ecosystem: number;
  networkId?: number;
  type?: string;
  Expedite?: string;
}
export interface UTXOParams {
  Amount: string;
  toAddress?: string;
  Comment?: string;
  ecosystem: number;
  type?: string;
  networkId?: number;
  Expedite?: string;
}
export type THashInput =
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | Uint8ClampedArray
  | Float32Array
  | Float64Array
  | DataView
  | ArrayBuffer
  | Float64Array
  | null;
export interface headerType {
  Header: {
    ID: number;
    Time: number;
    EcosystemID: number;
    KeyID: Int64BE;
    NetworkID: number;
    PublicKey: ArrayBuffer;
  };
  UTXO?: {
    Value: string;
    ToID: Int64BE;
    Expedite?: string;
    Comment?: string;
  };
  TransferSelf?: {
    Value: string;
    Source: string;
    Target: string;
  };
  Lang: string;
  Expedite?: string;
}
export interface tradeParams {
  Amount: string;
  Recipient: string;
  Comment: string;
  ecosystem: number;
  type?: string;
  Expedite?: string;
}
export interface arrayTradeParams {
  list: tradeParams[];
}
export interface ILoginRequest {
  publicKey: string;
  signature: string;
  expire?: number;
  ecosystem?: string;
  role?: number;
}

export interface ILoginResponse {
  token: string;
  refresh: string;
  notify_key: string;
  timestamp: string;
  key_id: string;
  ecosystem_id: string;
  account: string;
  expiry: number;
  isnode: boolean;
  isowner: boolean;
  roles: {
    role_id: number;
    role_name: string;
  }[];
}
export interface IRoleInfo {
  id: string;
  name: string;
}
export interface txType {
  [name: string]: {
    type: string;
    value: object;
  };
}
export interface hashType {
  [name: string]: Blob;
}
export interface IEcosystemInfo {
  ecosystem: string;
  name: string;
  roles: IRoleInfo[];
  notifications: {
    role_id: string;
    count: string;
  }[];
}
export interface axiosType {
  get: Function;
  post: Function;
  request?: Function;
}
export interface balanceType {
  amount: string;
  wallet: string;
  utxo: string;
  total: string;
}
export interface tradeType {
  account?: string;
  amount: number;
  urgent: number;
  comment: string;
  MemberName?: string;
}
export interface inputType {
  wallet: string;
  search: number[];
}
export interface nftParams {
  wallet: string;
}
export interface nftLocation {
  continent: string;
  nation: string;
  latitude: string;
  longitude: string;
}
export interface getEcosystem {
  wallet: string;
  page: number;
  limit: number;
  where?: {
    [propName: string]: number | string;
  };
  order: string;
}
export interface historyParams {
  ecosystem: number;
  opt: string;
  order?: string;
  wallet: string;
  page: number;
  limit: number;
}
export interface getResponse {}
export type getListResponse = {
  pageNum: {
    total: number;
    page: number;
    limit: number;
  };
  list: any[];
  data?: {} | any;
};
export interface currentType {
  id?: number;
  privateKey: string;
  publicKey: string;
  account: string;
  keyId: string;
  status: boolean;
  name: string;
  type: boolean;
  networkId?: number;
  index?: number;
}
export interface networkType {
  chainId: number;
  logoURI?: string;
  name: string;
  symbol: string;
  rpcUrl: string;
  brower: string;
  api: string;
  isSelect?: boolean;
  apikey: string;
  default: boolean;
}
export interface currencyType {
  id: number;
  chainId: number;
  name: string;
  symbol: string;
  type: string;
  address: string;
  logoURI?: string;
  decimals: string;
  disabled?: boolean;
}
export type currencyListType = {
  [key: string]: currencyType[];
};
export interface recordType {
  address: string;
  contractaddress?: string;
  module: string;
  action: string;
  startblock: number;
  endblock: number;
  page: number;
  offset: number;
  sort: string;
  apikey: string;
}
export interface recordPage {
  address: string;
  contractaddress?: string;
  module: string;
  action: string;
  startblock: number;
  endblock: number;
  page: string;
  offset: string;
  sort: string;
  apikey: string;
}
export interface honorType {
  page: number;
  limit: number;
  order: string;
}
export interface honorDeatils {
  wallet: string;
  search: number;
}
export interface balanceParams {
  wallet: string;
  ecosystem: number;
}
export interface balanceData {
  amount: string;
  money: string;
  total: string;
  utxo: string;
}

export interface honorOther {
  wallet: string;
  page: number;
  limit: number;
  search: number;
}
export interface nftlist {
  wallet: string;
  page: number;
  limit: number;
  search: string | number;
  order?: 'id desc';
}
export interface nftReward {
  page: number;
  limit: number;
  search: string | number;
  order?: string;
  wallet: string;
}
export interface nftRewardList {
  page: number;
  limit: number;
  search: string | number;
  order?: string;
}
export interface transferParams {
  amount: string;
  ecosystem: number;
  type: string;
}
export interface ethTrade {
  toAddress: string;
  amount: number;
  gasLimit: number;
  gasPrice: number | string;
}
