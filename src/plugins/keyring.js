// MIT License
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import CryptoJS from 'crypto-js';
import KJUR from 'jsrsasign';
import WORD_LIST from './lib/wordKey.js';
const { Random } = require('random-js');
// https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md

const randomEngine = new Random();
const signAlg = 'SHA256withECDSA';
const curveName = 'secp256r1';

const keyring = {
  MAX_KEY_SIZE: 1024 * 10, // 10 KiB
  KEY_LENGTH: 64,

  validatePrivateKey: (privateKey) => {
    console.log(privateKey.length);
    console.log(keyring.KEY_LENGTH);
    if (!privateKey || keyring.KEY_LENGTH !== privateKey.length) {
      console.log(111);
      return false;
    } else {
      return /[a-f0-9]/i.test(privateKey);
    }
  },

  validateSeed: (seed) => {
    if (!seed) {
      return false;
    }
    let seedArr = seed.split(' ');

    if (seedArr.length != 15) {
      return false;
    }

    for (var i in seedArr) {
      if (WORD_LIST.indexOf(seedArr[i]) < 0) {
        return false;
      }
    }
    return true;
  },

  generateSeed: (count = 15) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      const value = randomEngine.pick(WORD_LIST);
      result.push(value);
    }
    return result.join(' ');
  },

  generateKeyPair: (seed) => {
    const seedLower = seed.toLowerCase();
    let seedHex = '';
    for (let i = 0; i < seedLower.length; i++) {
      const char = seedLower[i];
      if (('0' <= char && '9' >= char) || ('a' <= char && 'f' >= char)) {
        seedHex += char;
      }
      if (64 === seedHex.length) {
        break;
      }
    }
    if (64 > seedHex.length) {
      const hash = CryptoJS.SHA256(seed);
      seedHex = hash.toString();
    }

    const curveParams = KJUR.crypto.ECParameterDB.getByName(curveName);
    const curveG = curveParams.G;
    const privateBig = new KJUR.BigInteger(seedHex, 16);
    const publicBig = curveG.multiply(privateBig);
    const valueX = publicBig.getX().toBigInteger();
    const valueY = publicBig.getY().toBigInteger();
    const charLen = curveParams.keylen / 4;

    const privateHex = ('0000000000' + privateBig.toString(16)).slice(-charLen);
    const xHex = ('0000000000' + valueX.toString(16)).slice(-charLen);
    const yHex = ('0000000000' + valueY.toString(16)).slice(-charLen);
    const publicHex = '04' + xHex + yHex;

    return {
      private: privateHex,
      public: publicHex
    };
  },

  generatePublicKey(privateKey) {
    const curveParams = KJUR.crypto.ECParameterDB.getByName(curveName);
    const curveG = curveParams.G;
    const charLen = curveParams.keylen / 4;
    const privateBig = new KJUR.BigInteger(privateKey, 16);
    const publicBig = curveG.multiply(privateBig);
    const valueX = publicBig.getX().toBigInteger();
    const valueY = publicBig.getY().toBigInteger();
    const xHex = ('0000000000' + valueX.toString(16)).slice(-charLen);
    const yHex = ('0000000000' + valueY.toString(16)).slice(-charLen);
    return '04' + xHex + yHex;
  },

  encryptAES: (data, password) => {
    return CryptoJS.AES.encrypt(data, password).toString();
  },
  decryptAES: (data, password) => {
    const decrypted = CryptoJS.AES.decrypt(data, password).toString(
      CryptoJS.enc.Hex
    );
    // console.log(decrypted);
    let result = '';
    for (let i = 0; i < decrypted.length; i += 2) {
      const byte = parseInt(decrypted.substr(i, 2), 16);
      result += String.fromCharCode(byte);
    }
    // console.log(result);
    return result;
  },

  verify: (privateKey, publicKey, data = 'default') => {
    const encryptedData = keyring.sign(data, privateKey);
    const signature = new KJUR.crypto.Signature({
      alg: signAlg,
      prov: 'cryptojs/jsrsa'
    });
    signature.init({ xy: publicKey, curve: curveName });
    signature.updateString(data);
    return signature.verify(encryptedData);
  },

  sign: (data, privateKey) => {
    const signature = new KJUR.crypto.Signature({ alg: signAlg });
    signature.init({ d: privateKey, curve: curveName });
    signature.updateString(data);
    return signature.sign();
  },
  signstring: (data, privateKey) => {
    const signature = new KJUR.crypto.Signature({ alg: signAlg });
    signature.init({ d: privateKey, curve: curveName });
    signature.updateHex(data);
    let signs = signature.sign();
    return signs;
  },

  hashData(data) {
    return CryptoJS.SHA256(data).toString();
  }
};

export default keyring;
