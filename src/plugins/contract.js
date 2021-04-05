import Axios from 'axios';
import Contract from './lib/contract';
import defaultSchema from './lib/schema/defaultSchema';
let num = 4;
export default {
  Axios: Axios,
  config: {
    token: '',
    api_address: '',
    privateKey: '',
    ecosystem_id: ''
  },
  set(options) {
    this.config = options;
    return this;
  },
  request(options, callback) {
    this.Axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    let config = {
      method: (options.type || 'POST').toUpperCase(),
      url: this.config.api_address + '/api/v2/' + options.url,
      headers: {
        Authorization: `Bearer ${this.config.token}`,
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;'
      }
    };
    if (options.dataType == 'data') {
      config.data = options.data;
    } else {
      config.params = options.data;
    }
    this.Axios(config)
      .then((res) => {
        typeof options.success == 'function' && options.success(res.data);
        typeof callback == 'function' && callback(res.data);
      })
      .catch((error) => {
        typeof options.error == 'function' && options.error(error);
      });
  },
  call(contractName, params, expedite, callback, errorback) {
    var self = this;
    // start contract request
    self.request({
      url: `contract/${contractName}`,
      type: 'get',
      success(res) {
        generateBinary(res, params, expedite);
      },
      error: () => {
        typeof errorback == 'function' && errorback(params);
      }
    });
    // expedite
    function generateBinary(data, contractParams, expedite) {
      let [proto, txParams, request, jobs, privateKey, ecosystem] = [
        null,
        {},
        {},
        [],
        self.config.privateKey,
        self.config.ecosystem_id
      ];
      console.log(JSON.stringify(data));
      proto = data;
      proto.fields.forEach((field) => {
        txParams[field.name] = {
          type: field.type,
          value: contractParams[field.name]
        };
      });
      console.log(JSON.stringify(contractParams));
      //console.log(txParams, "====");
      new Contract({
        id: proto.id,
        schema: defaultSchema,
        ecosystemID: parseInt(ecosystem || '1', 10),
        fields: txParams,
        Expedite: expedite.Expedite
      })
        .sign(privateKey)
        .then((res) => {
          console.log(JSON.stringify(res), '123');
          let contract = {
            ...res,
            name: proto.name,
            params: txParams
          };
          request[contract.hash] = new Blob([contract.data]);
          jobs.push({
            name: contract.name,
            hash: contract.hash,
            params: contract.params
          });
          console.log(jobs);
          sendTx(request);
        });
    }
    // start sendTx request
    function sendTx(request) {
      let params = new FormData();
      for (let k in request) {
        params.append([k], request[k]);
      }

      self.request({
        url: 'sendTx',
        dataType: 'data',
        data: params,
        success(res) {
          if (res) {
            txstatus(request);
          }
        },
        error(error) {
          typeof (callback == 'function') && callback(error, 'error');
        }
      });
    }
    // start txstatus
    function txstatus(request) {
      let [params, hashes] = [new FormData(), []];
      for (let k in request) {
        hashes.push(k);
      }
      params.append(
        'data',
        JSON.stringify({
          hashes: hashes
        })
      );
      self.request({
        url: 'txstatus',
        dataType: 'data',
        data: params,
        success(res) {
          console.log(JSON.stringify(res));
          var keyArr = Object.keys(res.results);
          var result = res.results[keyArr[0]];
          if (result.errmsg) {
            return typeof (callback == 'function') && callback(result, 'error');
          }
          console.log(num);
          if (num === 0) {
            num = 5;
            return typeof (callback == 'function') && callback(0, 'loading');
          }
          if (!result.blockid) {
            setTimeout(() => {
              txstatus(request);
              --num;
            }, 5000);
          } else {
            typeof (callback == 'function') && callback(result, 'success');
          }
        },
        error: (error) => {
          typeof (callback == 'function') && callback(error, 'error');
          //txstatus(request)
        }
      });
    }
  },
  call2(contractName, params, expedite, callback, errorback) {
    console.log(params);
    var self = this;
    // start contract request
    self.request({
      url: `contract/${contractName}`,
      type: 'get',
      success(res) {
        generateBinary(res, params, expedite);
      },
      error: () => {
        typeof errorback == 'function' && errorback(params);
      }
    });
    function generateBinary(data, contractParams, expedite) {
      let [proto, txParams, request, jobs, privateKey, ecosystem] = [
        null,
        {},
        {},
        [],
        self.config.privateKey,
        self.config.ecosystem_id
      ];
      proto = data;
      console.log(contractParams.list);
      for (let i = 0; i < contractParams.list.length; i++) {
        proto.fields.forEach((field) => {
          txParams[field.name] = {
            type: field.type,
            value: contractParams.list[i][field.name]
          };
        });
        new Contract({
          id: proto.id,
          schema: defaultSchema,
          ecosystemID: parseInt(ecosystem || '1', 10),
          fields: txParams,
          Expedite: expedite.Expedite
        })
          .sign(privateKey)
          .then((res) => {
            let contract = {
              ...res,
              name: proto.name,
              params: txParams
            };
            request[contract.hash] = new Blob([contract.data]);
            jobs.push({
              name: contract.name,
              hash: contract.hash,
              params: contract.params
            });
            console.log(jobs);
          });
      }
      setTimeout(() => {
        sendTx(request);
      }, 1000);
    }
    // start sendTx request
    function sendTx(request) {
      let params = new FormData();
      for (let k in request) {
        params.append([k], request[k]);
      }

      self.request({
        url: 'sendTx',
        dataType: 'data',
        data: params,
        success(res) {
          if (res) {
            txstatus(request);
          }
        },
        error(error) {
          typeof (callback == 'function') && callback(error, 'error');
        }
      });
    }
    // start txstatus
    function txstatus(request) {
      let [params, hashes] = [new FormData(), []];
      for (let k in request) {
        hashes.push(k);
      }
      params.append(
        'data',
        JSON.stringify({
          hashes: hashes
        })
      );
      self.request({
        url: 'txstatus',
        dataType: 'data',
        data: params,
        success(res) {
          var keyArr = Object.keys(res.results);
          var result = res.results[keyArr[0]];
          console.log(num);
          if (num === 0) {
            return typeof (callback == 'function') && callback(0, 'loading');
          }
          if (result.errmsg) {
            return typeof (callback == 'function') && callback(result, 'error');
          }
          if (!result.blockid) {
            setTimeout(() => {
              txstatus(request);
              --num;
            }, 5000);
          } else {
            typeof (callback == 'function') && callback(result, 'success');
          }
        },
        error: (error) => {
          typeof (callback == 'function') && callback(error, 'error');
          //txstatus(request)
        }
      });
    }
  }
};
