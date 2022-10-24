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
  id: number;
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
  logoURI: string;
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
/* export interface IKeyInfo {
  account: string;
  ecosystems: IEcosystemInfo[];
}

export interface IAccount {
  id: string;
  address: string;
  encKey: string;
  publicKey: string;
  access: IEcosystemInfo[];
}

export interface ISystemParamsRequest {
  names: string[];
}

export interface ISystemParamsResponse {
  list: {
    name: string;
    value: string;
    conditions: string;
  }[];
}

export type TConfigRequest = 'centrifugo';

export interface IContractRequest {
  name: string;
}

export type TContractFieldType =
  | 'bool'
  | 'int'
  | 'float'
  | 'money'
  | 'string'
  | 'file'
  | 'array';

export interface IContractResponse {
  id: number;
  name: string;
  active: boolean;
  tableid: number;
  fields: {
    name: string;
    type: TContractFieldType;
    optional: boolean;
  }[];
}

export interface IContractsResponse {
  count: number;
  list: {
    id: string;
    name: string;
    value: string;
    wallet_id: string;
    address: string;
    conditions: string;
    token_id: string;
    active: string;
  }[];
}

export interface IParamRequest {
  name: string;
}

export interface IParamResponse {
  id: string;
  name: string;
  value: string;
  conditions: string;
}

export interface IParamsRequest {
  names?: string[];
}

export interface IParamsResponse {
  list: IParamResponse[];
}

export interface IRowRequest {
  id: string;
  table: string;
  columns?: string[];
}

export interface IRowResponse {
  id: string;
  value: {
    [key: string]: any;
  };
}

export interface ITableRequest {
  name: string;
}

export interface ITemplateRequest {
  name: string;
}

export interface ITemplateResponse {
  id: number;
  name: string;
  value: string;
  conditions: string;
}

export interface IPageResponse extends ITemplateResponse {
  menu: string;
}

export interface IBlockResponse extends ITemplateResponse {}

export interface IMenuResponse extends ITemplateResponse {}

export type TContentType = 'page' | 'block' | 'menu';

export interface IContentRequest {
  type: TContentType;
  name: string;
  locale: string;
  params: {
    [key: string]: any;
  };
}

export interface IContentTestRequest {
  template: string;
  locale: string;
  params: {
    [key: string]: any;
  };
}

export interface IContentJsonRequest {
  template: string;
  locale: string;
  source?: boolean;
}

export interface IContentHashRequest {
  name: string;
  ecosystem: string;
  walletID: string;
  role: number;
  locale: string;
  params: {
    [key: string]: any;
  };
}

export interface IContentHashResponse {
  hash: string;
}
export interface ISegmentRequest {
  offset?: number;
  limit?: number;
}

export interface ITableResponse {
  name: string;
  insert: string;
  new_column: string;
  update: string;
  conditions: string;
  read?: string;
  filter?: string;
  columns: {
    name: string;
    type: string;
    perm: string;
    index: string;
  }[];
}

export interface ITablesResponse {
  count: string;
  list: {
    name: string;
    count: string;
  }[];
}

export interface IDataRequest extends ISegmentRequest {
  name: string;
  columns?: string[];
}

export interface IDataResponse {
  count: string;
  list: {
    id: string;
    [key: string]: string;
  }[];
}

export interface ISectionsRequest {
  locale: string;
}

export interface ISectionResponse {
  id: string;
  ecosystem: string;
  page: string;
  roles_access: string;
  status: string;
  title: string;
  urlname: string;
}

export interface ISectionsResponse {
  count: string;
  list: ISectionResponse[];
}

export interface IHistoryRequest extends ISegmentRequest {
  id: string;
  table: string;
}

export interface IHistoryResponse {
  list: {
    [key: string]: string;
  }[];
}

export type TTxParams = {
  [key: string]: any;
};

export type TTxCallRequest<T> = {
  // eslint-disable-next-line no-unused-vars
  [K in keyof T]: Blob;
};

export type TTxCallResponse<T> = {
  hashes: {
    // eslint-disable-next-line no-unused-vars
    [K in keyof T]: string;
  };
};

export interface ITxStatus {
  penalty: number;
  blockid: string;
  result: string;
  errmsg?: {
    id?: string;

    type: string;
    error: string;
  };
}

export type TTxStatusRequest<T> = Array<keyof T>;

export type TTxStatusResponse<T> = {
  // eslint-disable-next-line no-unused-vars
  [K in keyof T]: ITxStatus;
};
 */
