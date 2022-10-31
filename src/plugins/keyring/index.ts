import * as bip39 from '@scure/bip39';
import { utils, Wallet } from 'ethers';
import Long from 'long';
import { wordlist } from '@scure/bip39/wordlists/english';
import keccak256 from './keccak256';
import sha256 from './sha256';

const KEY_LENGTH = 64;
const MONEY_POWER = 12;
export default {
  generateSeed: (count: number = 128) => {
    const mnemonic = bip39.generateMnemonic(wordlist, count);
    return mnemonic;
  },
  verifyWords(words: string) {
    return bip39.validateMnemonic(words, wordlist);
  },
  generatePriavte: (seed: string, num: number = 0) => {
    const masterNode = utils.HDNode.fromSeed(utils.mnemonicToSeed(seed));
    // const masterNode = utils.HDNode.fromMnemonic(seed);
    const standardEthereum = masterNode.derivePath(`m/44'/60'/0'/0/${num}`);
    const privateHex = standardEthereum.privateKey.replace('0x', '');
    return privateHex;
  },
  validatePrivateKey: (privateKey: string) => {
    console.log(privateKey.length);
    if (!privateKey || KEY_LENGTH !== privateKey.length) {
      console.log(111);
      return false;
    }
    return /[a-f0-9]/i.test(privateKey);
  },
  isAddress(address: string) {
    return utils.isAddress(address);
  },
  checksum(digits: number[]) {
    let first = 0;
    let second = 0;
    let value = 0;

    for (let i = 0; i < digits.length; i += 1) {
      const digit = digits[i];
      // eslint-disable-next-line no-bitwise
      if (i & 1) {
        first += digit;
      } else {
        second += digit;
      }
    }
    value = (second + 3 * first) % 10;
    if (value > 0) {
      value = 10 - value;
    }
    return value;
  },
  remainder(x: string, y: number) {
    const a = parseInt(x.slice(0, x.length - 10), 10) % y;
    const b = parseInt(x.slice(10), 10) % y;
    return (a * (10 ** 10 % y) + b) % y;
  },
  addressString(keyId: string): string {
    const num = Long.fromString(keyId, true, 10).toString();
    const val = '0'.repeat(20 - num.length) + num;
    let ret = '';
    for (let i = 0; i < 4; i += 1) {
      ret += `${val.slice(i * 4, (i + 1) * 4)}-`;
    }
    ret += val.slice(16);
    return ret;
  },
  stringToAddress(address: string) {
    const AddressLength = 20;
    if (address.length === 0) {
      return 0;
    }
    if (address[0] === '-') {
      address = Long.fromString(address, true, 10).toString();
    }
    if (address.length < AddressLength) {
      address = '0'.repeat(AddressLength - address.length) + address;
    }
    const reg = /-/gi;
    const val = address.replace(reg, '');
    if (val.length !== AddressLength) {
      return 0;
    }
    const num = Long.fromString(val, false, 10).toString();
    const arr = val.slice(0, 19).split('').map(Number);
    if (this.checksum(arr) !== parseInt(val.slice(19, 20), 10)) {
      return 0;
    }
    return num;
  },
  addressToID(address: string): string {
    let addr;
    address = address.trim();
    const isAddess = address.split('-').length - 1 === 4;
    if (address.length < 2) {
      return '0';
    }
    if (address[0] === '-') {
      addr = Long.fromString(address, true, 10).toString();
    } else if (isAddess) {
      addr = this.stringToAddress(address);
    } else {
      addr = Long.fromString(address, false, 10).toString();
    }
    return String(addr);
  },
  parseUnits(value: number | string, decimals: number = MONEY_POWER) {
    value = String(value);
    return utils.parseUnits(value, decimals).toString();
  },
  toMoney(value: number | string) {
    const match = /([\d]+)((\.|,)([\d]+))?/.exec(String(value));
    if (!match) {
      return null;
    }
    const integer = match[1];
    const fraction = match[4] || '';
    let result = integer;
    for (let i = 0; i < MONEY_POWER; i += 1) {
      const val = fraction.length <= i ? '0' : fraction[i];
      result += val;
    }
    if (fraction.length > MONEY_POWER) {
      result += `.${fraction.slice(MONEY_POWER, MONEY_POWER * 2)}`;
    }
    return result;
  },
  commify(amount: string, decimals: string) {
    const num = Number(utils.formatUnits(amount, decimals).toString());
    const balance = num
      ? utils.commify(utils.formatUnits(amount, decimals).toString())
      : '0';
    return balance;
  },
  formatUnits(amount: string, decimals: number = MONEY_POWER) {
    const num = Number(utils.formatUnits(amount, decimals).toString());
    return num;
  },
  async exportWallet(privateKey: string, pwd: string) {
    const wallet = new Wallet(privateKey);
    const { address } = wallet;
    const keyStore = await wallet.encrypt(pwd);
    return { keyStore, address };
  },
  async importWallet(json: any, pwd: string) {
    const wallet = await Wallet.fromEncryptedJson(json, pwd);
    const privateKey = wallet.privateKey.replace('0x', '');
    const { address } = wallet;
    return { address, privateKey };
  },
  getKeyring(value: string) {
    let keyring = keccak256;
    switch (value) {
      case 'SHA256':
        keyring = sha256;
        break;
      case 'KECCAK256':
        keyring = keccak256;
        break;
      default:
        keyring = keccak256;
        break;
    }
    return keyring;
  }
};
