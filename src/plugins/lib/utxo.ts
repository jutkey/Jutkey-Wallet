import msgpack from 'msgpack-lite';
import { Int64BE } from 'int64-buffer';
import util from '../util';
import keyring from '../keyring';
import { UTXOContext, headerType } from '../dataType';
import {
  encodeLengthPlusData,
  concatBuffer,
  toArrayBuffer
} from '../keyring/convert';

const hasher = util.getCache('hasher');
const objKeyring = keyring.getKeyring(hasher);
console.log(objKeyring);

class UTXO {
  private context: UTXOContext;

  private expedite = '';

  private time = 0;

  private publicKey!: ArrayBuffer;

  private keyID!: Int64BE;

  private ToID?: Int64BE;

  private type?: string = '';

  private Comment?: string = '';

  private Amount: string;

  private ecosystem: number = 1;

  private networkId: number = 1;

  constructor(context: UTXOContext) {
    this.context = context;
    console.log(context);
    this.networkId = context.networkId!;
    this.expedite = context.Expedite || '';
    this.time = Math.floor(new Date().getTime() / 1000);
    if (context.toAddress) {
      const toKeyID = keyring.addressToID(context.toAddress);
      this.ToID = new Int64BE(toKeyID);
    } else {
      this.ToID = new Int64BE(0);
    }
    this.type = context.type;
    this.Amount = context.Amount;
    this.ecosystem = context.ecosystem;
    this.Comment = context.Comment;
  }

  public sign(privateKey: string) {
    const publicKey = objKeyring.generatePublicKey(privateKey);
    this.publicKey = toArrayBuffer(publicKey) as any;
    this.keyID = new Int64BE(objKeyring.publicToID(publicKey));
    const data = this.serialize();
    const hexHash = objKeyring.hexHash(data);
    const sigHex = objKeyring.signContract(hexHash, privateKey);
    console.log(sigHex);
    const signature = toArrayBuffer(sigHex) as any;
    const hashData = {
      hash: hexHash,
      data: concatBuffer(
        new Uint8Array([0x80]),
        concatBuffer(
          encodeLengthPlusData(data),
          encodeLengthPlusData(signature)
        )
      )
    };
    return hashData;
  }

  private serialize() {
    let lang = 'en';
    if (util.getCache('lang')) {
      lang = util.getCache('lang').substring(0, 2);
    } else {
      lang = 'en';
    }
    const Expedite = this.expedite.toString() || '';
    const codec = msgpack.createCodec({
      binarraybuffer: true,
      preset: true
    });
    const { Amount, ecosystem, Comment, networkId } = this;
    console.log(Comment);
    console.log(Amount);
    const objParams: headerType = {
      Header: {
        ID: 0,
        Time: this.time,
        EcosystemID: ecosystem,
        KeyID: this.keyID,
        NetworkID: networkId || 1,
        PublicKey: this.publicKey
      },
      Lang: lang || 'en'
    };
    // from contract account => to UTXO account
    if (this.type === 'toUtxo') {
      console.log(Amount);
      objParams.TransferSelf = {
        Value: Amount,
        Source: 'Account',
        Target: 'UTXO'
      };
      // from UTXO account  => to contract account
    } else if (this.type === 'toContract') {
      console.log(Amount);
      objParams.TransferSelf = {
        Value: Amount,
        Source: 'UTXO',
        Target: 'Account'
      };
    } else {
      objParams.UTXO = {
        Value: keyring.toMoney(Amount)!,
        ToID: this.ToID! // Payee(recipient) address ID
      };
      if (Comment) {
        objParams.UTXO.Comment = Comment;
      }
    }
    if (Expedite) {
      objParams.Expedite = Expedite;
    }
    const txBuffer = msgpack.encode(objParams, {
      codec
    });
    return txBuffer;
  }
}
export default UTXO;
