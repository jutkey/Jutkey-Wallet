import Web3 from 'web3';
const Tx = require('ethereumjs-tx');
import USDTJSON from './abi/TetherToken.json';
import { get } from '@/plugins/http';
// Main network node (official node)
const ENDPOINT =
  'https://mainnet.infura.io/v3/2dcfc8fe43a04681acf1acbfefdb1787';
// instantiation web3
const web3 = new Web3(ENDPOINT);
const TokenContract = new web3.eth.Contract( // instantiation USDT contract
  USDTJSON.abi,
  USDTJSON.contractAddress
);
import app from '@/main.js';
import util from '@/plugins/util.js';
import auth from '@/plugins/auth.js';
const md5 = require('md5');
class APP {
  state = {
    decimals: 0, // usdt Decimal length
    histories: [], // Transaction history
    encPrivateKey: null, // Encrypted private key object
    decPrivateKey: null, // Decrypted private key object
    password: '123456' // Encryption and decryption password
  };
  _getAccount = () => {
    return util.getCache('usdt-erc20-' + auth.getUser('key_id'));
  };
  _setAccount = (wallet) => {
    util.setCache('usdt-erc20-' + auth.getUser('key_id'), wallet);
  };
  _account = async () => {
    var wallet = this._getAccount();
    if (wallet && wallet.address) {
      let balance = await this._getUSDTBalance(wallet.address);
      let decimals = await this._getDecimals();
      wallet.balance = balance / Math.pow(10, decimals);
      return wallet;
    } else {
      return false;
    }
  };
  _exportPrivatekey = () => {
    var wallet = this._getAccount();
    app.auth.checkTradepass(() => {
      if (wallet.privateKey) {
        app.util.export('privateKey-usdt.txt', wallet.privateKey);
      } else {
        app.$message.error(app.$t('dofail'));
      }
    });
  };
  _deleteAccount = (callback) => {
    app.auth.checkTradepass(() => {
      this._setAccount('');
      app.$message.success(app.$t('usdt_delete_success'));
      typeof callback == 'function' && callback();
    });
  };
  _createAccount = (callback) => {
    var account = this._handleToUsdtPrivateKey();
    //const account = web3.eth.accounts.create();
    //account.privateKey = this._cutOut0x(account.privateKey);
    //account.balance=0;
    //util.setCache('usdt-erc20',account);
    app.$message.success(app.$t('usdt_create_success'));
    typeof callback == 'function' && callback(account);
  };
  _importPrivateKey = (privateKey) => {
    if (privateKey.length !== 64) {
      app.$message.error(app.$t('usdt_privatekey_error'));
      return;
    }
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    account.privateKey = this._cutOut0x(account.privateKey);
    account.balance = 0;
    this._setAccount(account);
    return account;
  };
  _handleToUsdtPrivateKey = () => {
    let prikey = auth.getAccount('privateKey').split('').reverse().join('');
    let newkey = md5(prikey).substring(0, 12) + prikey.substring(12);
    const account = web3.eth.accounts.privateKeyToAccount('0x' + newkey);
    account.privateKey = this._cutOut0x(account.privateKey);
    account.balance = 0;
    this._setAccount(account);
    return account;
  };
  _cutOut0x = (privateKey) => {
    return privateKey.indexOf('0x') === 0
      ? privateKey.replace('0x', '')
      : privateKey;
  };
  _getUSDTBalance = (address) => {
    return new Promise((resolve, reject) => {
      //const { accounts } = this.state;
      // const address = accounts[0].address;

      TokenContract.methods
        .balanceOf(address)
        .call({ from: address }, (err, balance) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(balance);
        });
    });
  };
  _getDecimals = () => {
    return new Promise((resolve, reject) => {
      TokenContract.methods.decimals().call({}, (err, length) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(length);
      });
    });
  };
  _handleTransferUSDT = async (from, to, privateKey, money, callback) => {
    if (!web3.utils.isAddress(from)) {
      app.$message.error(app.$t('usdt_error_address'));
      typeof callback == 'function' && callback(false);
      return;
    }
    if (!web3.utils.isAddress(to)) {
      app.$message.error(app.$t('usdt_error_address'));
      typeof callback == 'function' && callback(false);
      return;
    }
    if (privateKey.length !== 64) {
      app.$message.error(app.$t('usdt_privatekey_error'));
      typeof callback == 'function' && callback(false);
      return;
    }
    const balance = await this._getUSDTBalance(from);
    const decimals = await this._getDecimals();
    const amount = money * Math.pow(10, decimals); // usdt => wei
    if (amount > balance) {
      app.$message.error(app.$t('usdt_notenough_balance'));
      typeof callback == 'function' && callback(false);
      return;
    }

    const value = await web3.utils.toHex(amount);
    const contractAddress = USDTJSON.contractAddress;
    const gasPrice = await web3.eth.getGasPrice();
    const count = await web3.eth.getTransactionCount(from);
    var privKey = new Buffer.from(privateKey, 'hex');
    const contract = new web3.eth.Contract(USDTJSON.abi, contractAddress);

    var rawTransaction = {
      from: from,
      nonce: web3.utils.toHex(count),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(500000),
      to: contractAddress,
      data: contract.methods.transfer(to, value).encodeABI()
    };

    var tx = new Tx(rawTransaction);
    tx.sign(privKey);
    var serializedTx = tx.serialize();

    try {
      await web3.eth
        .sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('receipt', () => {
          app.$message.success(app.$t('usdt_trade_success'));
          typeof callback == 'function' && callback(true);
        });
    } catch (error) {
      console.log('Error : ', error);
      app.$message.error(app.$t('usdt_trade_fail'));
      typeof callback == 'function' && callback(false);
    }
  };
  _handleEncPrivateKey = () => {
    const { accounts, password } = this.state;
    const privateKey = accounts[0].privateKey;

    const encPrivateKey = web3.eth.accounts.encrypt(
      '0x' + privateKey,
      password
    );
    this.setState({ encPrivateKey });
    app.$message.success(
      `After encrypting the private key:${JSON.stringify(encPrivateKey)}`
    );
  };
  _handleDecPrivateKey = () => {
    const { encPrivateKey, password } = this.state;
    if (encPrivateKey) {
      const decPrivateKey = web3.eth.accounts.decrypt(encPrivateKey, password);
      decPrivateKey.privateKey = this._cutOut0x(decPrivateKey.privateKey);
      this.setState({ decPrivateKey });
      app.$message.success(
        `After decrypting the private key:${JSON.stringify(decPrivateKey)}`
      );
    }
  };
  _getHistories = (callback) => {
    let wallet = this._getAccount();
    console.log(wallet);
    /* if (wallet === undefined || wallet === '' || isNaN(wallet)) {
      return;
    } */
    if (wallet === undefined || wallet === '') {
      return;
    }
    get(`/usdthistory/${wallet.address}`, {}, { interType: 'mainserver' }).then(
      (res) => {
        console.log(JSON.stringify(res));
        // console.log('+++');
        if (res.status > 0) {
          const data = res.result;
          const result = [];
          data.forEach((item) => {
            const { from, to } = item;
            if (from === to) {
              result.unshift({ ...item, type: 'income' });
              result.unshift({ ...item, type: 'outcome' });
            } else {
              result.unshift({ ...item, type: 'income' });
            }
          });
          typeof callback == 'function' && callback(result);
        } else {
          typeof callback == 'function' && callback([]);
        }
      }
    );
    /*  app.http.authFetch({
      method: 'get',
      url: `${app.manifest.mainserver}/api/v2/usdthistory/${wallet.address}`,
      success: (res) => {
        if (res.status > 0) {
          const data = res.result;
          const result = [];
          data.forEach((item) => {
            const { from, to } = item;
            if (from === to) {
              result.unshift({ ...item, type: 'income' });
              result.unshift({ ...item, type: 'outcome' });
            } else {
              result.unshift({ ...item, type: 'income' });
            }
          });
          typeof callback == 'function' && callback(result);
        } else {
          typeof callback == 'function' && callback([]);
        }
      }
    }); */
  };
  _getMonthRecord = (callback) => {
    this._getHistories((res) => {
      console.log(JSON.stringify(res));
      let list = {};
      for (var i = 0; i < 3; i++) {
        list[util.getMonth(i)] = {
          totalinfo: { inamount: 0, outamount: 0 },
          list: []
        };
      }
      console.log(JSON.stringify(list));
      console.log('++++');
      res.forEach((item) => {
        console.log(item);
        const date = util.formatTime(item.timeStamp, 'y-m');
        console.log(date);
        item.value = (item.value / Math.pow(10, item.tokenDecimal)) * 1e12;
        if (list[date]) {
          list[date].list.push(item);
          list[date].totalinfo[
            item.type == 'income' ? 'inamount' : 'outamount'
          ] += item.value;
        }
      });

      typeof callback == 'function' && callback(list);
    });
  };
}
let usdt = new APP();
export default usdt;
