import msgpack from 'msgpack-lite';
import { Int64BE } from 'int64-buffer';
import keyring from '../keyring';
import IField from './field/field';
import util from '../util';
import {
  encodeLengthPlusData,
  concatBuffer,
  toArrayBuffer
} from '../keyring/convert';
import { IContractContext, paramsType } from '../dataType';

const hasher = util.getCache('hasher');
const objKeyring = keyring.getKeyring(hasher);
class Contract {
  private _fields: {
    [name: string]: IField;
  } = {};

  private _context: IContractContext;

  private _expedite = '';

  private _time = 0;

  private _publicKey!: ArrayBuffer;

  private _keyID!: any;

  constructor(context: IContractContext) {
    console.log(context);
    this._context = context;
    console.log(context);
    this._expedite = context.Expedite || '';
    this._time = Math.floor(new Date().getTime() / 1000);
    Object.keys(context.fields).forEach((name) => {
      const param = context.fields[name];
      const Field = this._context.schema.fields[param.type];
      const field = new Field();
      field.set(param.value);
      this._fields[name] = field;
    });
    console.log(this._fields);
  }

  public sign(privateKey: string) {
    console.log(privateKey);
    const publicKey = objKeyring.generatePublicKey(privateKey);
    this._publicKey = toArrayBuffer(publicKey) as any;
    this._keyID = new Int64BE(objKeyring.publicToID(publicKey));
    const data = this.serialize();
    const hexHash = objKeyring.hexHash(data);
    const sigHex = objKeyring.signContract(hexHash, privateKey);
    const signature = toArrayBuffer(sigHex) as any;
    console.log(this._context);
    const hashData = {
      hash: hexHash,
      data: concatBuffer(
        this._context.schema.header,
        concatBuffer(
          encodeLengthPlusData(data),
          encodeLengthPlusData(signature)
        )
      )
    };
    console.log(hashData);
    return hashData;
  }

  private serialize() {
    const params: any = {};
    let lang = 'en';
    if (util.getCache('lang')) {
      lang = util.getCache('lang').substring(0, 2);
    } else {
      lang = 'en';
    }
    const Expedite = this._expedite.toString() || '';
    const codec = msgpack.createCodec({
      binarraybuffer: true,
      preset: true
    });

    Object.keys(this._fields).forEach((name) => {
      params[name] = this._fields[name].get();
    });
    console.log(params);
    const objParams: paramsType = {
      Header: {
        ID: this._context.id,
        Time: this._time,
        EcosystemID: this._context.ecosystem || 1,
        KeyID: this._keyID,
        NetworkID: this._context.networkId || 1,
        PublicKey: this._publicKey
      },
      Params: params,
      Lang: lang || 'en'
    };
    if (Expedite) {
      objParams.Expedite = Expedite;
    }
    const txBuffer = msgpack.encode(objParams, {
      codec
    });
    return txBuffer;
  }
}
export default Contract;
