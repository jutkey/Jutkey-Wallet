/*
 * @Author: abc
 * @Date: 2020-09-04 16:58:04
 * @LastEditors: abc
 * @LastEditTime: 2021-03-03 17:43:50
 * @Description:
 */
import msgpack from 'msgpack-lite';
import * as convert from '../convert';
import { Int64BE } from 'int64-buffer';
import { privateToPublic, address, sign, Sha256 } from '../crypto';
import { encodeLengthPlusData, concatBuffer } from '../convert';
import util from '../../util.js';
//console.log(util.getCache('locale').substring(0, 2));
export default class Contract {
  _fields = {};
  constructor(context) {
    this._context = context;
    // console.log(context);
    this._expedite = context.Expedite || '';
    this._time = Math.floor(new Date().getTime() / 1000);
    Object.keys(context.fields).forEach((name) => {
      const param = context.fields[name];
      const Field = this._context.schema.fields[param.type];
      const field = new Field();
      field.set(param.value);
      this._fields[name] = field;
    });
  }

  async sign(privateKey) {
    const publicKey = privateToPublic(privateKey);
    //   console.log('publicKey => ', publicKey);

    this._publicKey = convert.toArrayBuffer(publicKey);
    //   console.log('_publicKey', this._publicKey);

    this._keyID = new Int64BE(address(publicKey));
    const data = this.serialize();
    const txHash = await Sha256(data);
    const resultHash = await Sha256(txHash);
    const hexHash = await convert.toHex(resultHash);
    const signature = convert.toArrayBuffer(sign(hexHash, privateKey));

    return {
      hash: hexHash,
      data: concatBuffer(
        this._context.schema.header,
        concatBuffer(
          encodeLengthPlusData(data),
          encodeLengthPlusData(signature)
        )
      )
    };
  }

  serialize() {
    const params = {};
    console.log('', this._expedite);
    let lang = 'en';
    if (util.getCache('locale')) {
      lang = util.getCache('locale').substring(0, 2);
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
    //console.log(params);
    //console.log(Expedite);
    let obj = {};
    if (Expedite) {
      obj = {
        Header: {
          ID: this._context.id,
          Time: this._time,
          EcosystemID: this._context.ecosystemID,
          KeyID: this._keyID,
          NetworkID: this._context.schema.network,
          PublicKey: this._publicKey
        },
        Params: params,
        Expedite: Expedite,
        Lang: lang || 'en'
      };
    } else {
      obj = {
        Header: {
          ID: this._context.id,
          Time: this._time,
          EcosystemID: this._context.ecosystemID,
          KeyID: this._keyID,
          NetworkID: this._context.schema.network,
          PublicKey: this._publicKey
        },
        Params: params,
        Lang: lang || 'en'
      };
    }
    const txBuffer = msgpack.encode(obj, {
      codec
    });

    return txBuffer;
  }
}
