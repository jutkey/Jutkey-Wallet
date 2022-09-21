import elliptic from 'elliptic';
// eslint-disable-next-line camelcase
import { sha3_256 } from 'js-sha3';
import CryptoJS, { SHA512 } from 'crypto-js';
import Long from 'long';
import crc64 from './crc64';
import keyring from './index';
import * as convert from './convert';

const ec = new elliptic.ec('p256');
const addressLength = 20;
export default {
  generatePublicKey(privateKey: string) {
    const keyPair = ec.keyFromPrivate(privateKey);
    const pubKey = keyPair.getPublic();
    const publicHex = pubKey.encode('hex', false);
    console.log(publicHex);
    return publicHex;
  },
  sign: (privateKey: any, data: any) => {
    const hash = sha3_256(data);
    const signature = ec.sign(hash, privateKey, 'hex', { canonical: true });
    console.log(signature);
    const sigHex = signature.r.toString(16, 32) + signature.s.toString(16, 32);
    return sigHex;
  },
  publicToID(publicKey: string): string {
    if (publicKey.startsWith('04')) {
      //  const keyDigest = SHA256(CryptoJS.enc.Hex.parse(publicKey.slice(2)));
      const keyDigest = CryptoJS.enc.Hex.parse(
        sha3_256(convert.toArrayBuffer(publicKey.slice(2)) as any)
      );
      const hashDigest = SHA512(keyDigest as any).toString();
      const bytes = [];
      for (let i = 0; i < hashDigest.length; i += 2) {
        bytes.push(parseInt(hashDigest[i] + hashDigest[i + 1], 16));
      }
      const crc = crc64(bytes);
      const value = '0'.repeat(addressLength - crc.length) + crc;
      const crcDigits = value.split('').map((l) => parseInt(l, 10));
      const addrChecksum = keyring.checksum(crcDigits.slice(0, -1));
      const crcLong = Long.fromString(crc);
      const address = crcLong
        .sub(keyring.remainder(crc, 10))
        .add(addrChecksum)
        .toString();
      return address;
    }
    throw new Error('Unsupported public key format');
  },
  hexHash(data: any): string {
    // eslint-disable-next-line camelcase
    const txHash = sha3_256.arrayBuffer(data);
    const hexHash = sha3_256(txHash);
    return hexHash;
  },
  signContract(data: any, privateKey: any) {
    const hash = sha3_256(convert.toArrayBuffer(data) as any);
    const signature = ec.sign(hash, privateKey, 'hex', { canonical: true });
    console.log(signature);
    const sigHex = signature.r.toString(16, 32) + signature.s.toString(16, 32);
    return sigHex;
  },
  verify(privateKey: any, msg: any) {
    const hash = sha3_256(msg);
    const signature = ec.sign(hash, privateKey, 'hex', { canonical: true });
    const hexToDecimal = ec
      .keyFromPrivate(msg, 'hex')
      .getPrivate()
      .toString(10);
    const pubKeyRecovered = ec.recoverPubKey(
      hexToDecimal,
      signature,
      signature.recoveryParam as any,
      'hex'
    );
    const validSig = ec.verify(msg, signature, pubKeyRecovered);
    return validSig;
  }
};
