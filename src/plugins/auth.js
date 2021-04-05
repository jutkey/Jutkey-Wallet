/*
 * @Author: abc
 * @Date: 2021-02-02 16:09:32
 * @LastEditors: abc
 * @LastEditTime: 2021-04-01 12:24:51
 * @Description:user file
 */
import util from '@/plugins/util.js';
import keyring from '@/plugins/keyring.js';
import baseUrl from '../baseUrl.js';
import Contract from './contract';
import app from '@/main.js';
export default {
  getUser(key) {
    var user = util.getCache('logined');
    // console.log(user);
    if (user) {
      user.member_name = user.member_name || '';
      user.avatar = user.avatar || '';
      user.isadmin = user.isadmin || 0;
    } else {
      user = {};
    }
    return key ? user[key] : user;
  },
  getAccount(key) {
    var uuid = util.getCache('uuid');
    var user = this.getWallets(uuid);
    return key ? user[key] : user;
  },
  removeUser() {
    util.removeCache('uuid');
    util.removeCache('logined');
  },
  setUser(data) {
    if (!data.account) {
      data.account = util.formatKeyId(data.key_id);
    }
    util.setCache('logined', data);
  },
  getWallets(uid) {
    var list = util.getCache('wallets');
    if (list) {
      list = JSON.parse(keyring.decryptAES(list, 'Aa123456'));
    } else {
      list = {};
    }
    for (var i in list) {
      list[i].nickname = decodeURI(list[i].nickname);
    }

    return uid ? list[uid] : list;
  },
  addWallet(wallet) {
    var list = this.getWallets();
    list[util.guid()] = wallet;
    this.setWallet(list);
  },
  setWallet(list) {
    for (var i in list) {
      list[i].nickname = encodeURI(list[i].nickname);
    }
    util.setCache(
      'wallets',
      keyring.encryptAES(JSON.stringify(list), 'Aa123456')
    );
  },
  updateAccountField(field, value) {
    var wallets = this.getWallets();
    var uuid = util.getCache('uuid');
    wallets[uuid][field] = value;
    this.setWallet(wallets);
  },
  getChainUrl(address) {
    let url = baseUrl.nodeserver;
    if (util.getCache('network_uuid') != 'default') {
      let otherNetwork = util.searchArr(
        util.getCache('networks'),
        'uuid',
        util.getCache('network_uuid')
      );
      if (otherNetwork) {
        url = otherNetwork.ip;
      }
      //this.fullnode.length = otherNetwork.nodes.length;
      //url = otherNetwork.nodes[this.fullnode.index];
    }
    return address ? url : url;
  },
  getpoolUrl(address) {
    var url = baseUrl.poolserver;
    if (util.getCache('network_uuid') != 'default') {
      let otherNetwork = util.searchArr(
        util.getCache('networks'),
        'uuid',
        util.getCache('network_uuid')
      );
      url = otherNetwork.ip;
      //this.fullnode.length = otherNetwork.nodes.length;
      //url = otherNetwork.nodes[this.fullnode.index];
    }
    return address ? url : url;
  },
  handleRouterFilterShow(arr, role) {
    // console.log(role);
    const showList = arr.filter((items) => {
      // console.log(items.meta.show);
      if (role.includes(items.meta.roles) && items.meta.show) {
        if (items.children) {
          const firstItems = items.children.filter((item) => {
            if (role.includes(item.meta.roles) && item.meta.show) {
              if (item.children) {
                const secondItem = item.children.filter((sub) => {
                  if (role.includes(sub.meta.roles) && sub.meta.show) {
                    return role.includes(sub.meta.roles);
                  }
                });
                item.children = secondItem;
                return secondItem;
              }
              return role.includes(item.meta.roles);
            }
          });
          items.children = firstItems;
          return items;
        }
        return role.includes(items.meta.roles);
      }
    });
    return showList;
  },
  handleRouterFilter(arr, role) {
    // console.log(arr);
    const showList = arr.filter((items) => {
      // console.log(items.meta.show);
      if (role.includes(items.meta.roles)) {
        if (items.children) {
          const firstItems = items.children.filter((item) => {
            if (role.includes(item.meta.roles)) {
              if (item.children) {
                const secondItem = item.children.filter((sub) => {
                  if (role.includes(sub.meta.roles)) {
                    if (sub.children) {
                      const thirdItem = item.children.filter((son) => {
                        return role.includes(son.meta.roles);
                      });
                      sub.children = thirdItem;
                      return thirdItem;
                    }
                    return role.includes(sub.meta.roles);
                  }
                });
                item.children = secondItem;
                return secondItem;
              }
              return role.includes(item.meta.roles);
            }
          });
          items.children = firstItems;
          // console.log(JSON.stringify(items));
          return items;
        }
        return role.includes(items.meta.roles);
      }
    });
    // console.log(JSON.stringify(showList));
    // console.log(showList);
    return showList;
  },
  checkTradepass(callback) {
    // if(this.create_step == 0 && this.$i18n.locale =='en-US'){
    // 	this.$refs.securitydiscword.style.fontFamily='auto'
    // }
    console.log(app.$i18n.locale);
    console.log(123);
    // 5-minute face input function
    let nowtime = util.time();
    let iskeepalive = util.getCache(
      'keepTradePassAlive-' + this.getUser('key_id')
    );
    console.log(app.$refs.entertradepass_checkbox);
    if (nowtime - iskeepalive < 300 && iskeepalive) {
      return typeof callback == 'function' && callback();
    }
    const h = app.$createElement;
    if (app.$refs.entertradepass_input) {
      app.$refs.entertradepass_input.value = '';
      if (app.$i18n.locale == 'en-US') {
        app.$refs.entertradepass_input.style.fontFamily = 'auto';
      }
    }
    if (app.$refs.entertradepass_checkbox) {
      app.$refs.entertradepass_checkbox.checked = false;
    }
    app
      .$msgbox({
        title: app.$t('ecosystem.authorization'),
        message: h('p', null, [
          h('form', { attrs: { autocomplete: 'off' } }, [
            h('input', {
              style: 'display:none',
              attrs: {
                type: 'password',
                name: 'password'
              }
            }),
            h('input', {
              attrs: {
                ref: 'securitydiscword',
                name: 'password',
                // placeholder:app.$t('ecosystem.entertradepass'),
                class: 'el-input__inner securitydisc',
                // type: 'text',
                type: 'password',
                autocomplete: 'off'
              },
              ref: 'entertradepass_input'
            }),
            h('div', {
              style:
                'color:#F56C6C;font-size:12px;line-height:18px;padding:5px 0',
              ref: 'entertradepass_error'
            }),
            h(
              'label',
              {
                style: '',
                attrs: { type: 'checkbox' }
              },
              [
                h('input', {
                  ref: 'entertradepass_checkbox',
                  attrs: { type: 'checkbox' }
                }),
                h(
                  'span',
                  {
                    style: 'padding-left:5px;font-size:13px'
                  },
                  app.$t('zzzNoinput5minutes')
                )
              ]
            )
          ])
        ]),
        showCancelButton: true,
        confirmButtonText: app.$t('confirm'),
        cancelButtonText: app.$t('cancel'),
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          // console.log(action)
          // console.log(instance)
          // console.log(done)
          if (action === 'confirm') {
            var password = app.$refs.entertradepass_input.value;
            var keepalive = app.$refs.entertradepass_checkbox.checked;
            if (
              !/^(?=.*[a-zA-Z])(?=.*\d)^[^\s\u4e00-\u9fa5]{8,20}$/.test(
                password
              )
            ) {
              return app.$message.error(
                app.$t('wallet.passregexp', {
                  num: '8-20'
                })
              );
            }
            if (!this.compare(password, 'tradepass')) {
              return app.$message.error(app.$t('wallet.errorpass'));
            }
            if (keepalive) {
              util.setCache(
                'keepTradePassAlive-' + this.getUser('key_id'),
                nowtime
              );
            }
          }
          done();
        }
      })
      .then(
        (action) => {
          if (action == 'confirm') {
            typeof callback == 'function' && callback();
          }
        },
        () => {}
      );
    if (app.$i18n.locale == 'en-US' && app.$refs.securitydiscword) {
      this.$refs.securitydiscword.style.fontFamily = 'auto';
    }
  },
  //Compare passwords
  compare(pass, type = 'tradepass') {
    if (pass != this.getAccount(type)) {
      return false;
    } else {
      return true;
    }
  },
  callContract(contractName, params, expedite, callback) {
    const self = this;
    var contract = {
      name: contractName,
      ecosystem_id: 0
    };
    if (typeof contractName == 'object') {
      contract = contractName;
    }
    Contract.set({
      privateKey: self.getAccount('privateKey'),
      ecosystem_id: contract.ecosystem_id || self.getUser('ecosystem_id'),
      token: self.getUser('token'),
      api_address: self.getChainUrl(true)
    }).call(contract.name, params, expedite, callback);
  },
  callContract2(contractName, params, expedite, callback) {
    const self = this;
    var contract = {
      name: contractName,
      ecosystem_id: 0
    };
    if (typeof contractName == 'object') {
      contract = contractName;
    }
    Contract.set({
      privateKey: self.getAccount('privateKey'),
      ecosystem_id: contract.ecosystem_id || self.getUser('ecosystem_id'),
      token: self.getUser('token'),
      api_address: this.getChainUrl(true)
    }).call2(contract.name, params, expedite, callback);
  }
};
