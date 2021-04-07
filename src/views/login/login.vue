<!--
 * @Author: abc
 * @Date: 2021-01-30 14:47:03
 * @LastEditors: abc
 * @LastEditTime: 2021-04-06 17:58:32
 * @Description: login page
-->
<template>
  <div class="login">
    <div class="login-left"></div>
    <div class="login-right">
      <div class="login-right-top">
        <div class="login-right-top-back" v-if="create_step > 0">
          <el-page-header
            style="margin: 15px"
            @back="createstep()"
            :title="$t('back')"
            :content="
              $t('wallet.' + (createType == 'create' ? 'create' : 'import'))
            "
          ></el-page-header>
        </div>
        <div class="login-right-top-status">
          <a
            class="login-right-top-status-network"
            @click="networks.visible = true"
            ><span
              :class="`login-right-top-status-network__${networks.status}`"
            ></span>
            <em style="color: #242f57">{{
              $t('network.' + networks.status)
            }}</em>
          </a>
          <!-- i18n change -->
          <el-dropdown @command="handleCommand" style="display: none">
            <span class="el-dropdown-link">
              {{ strLang }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in arrLang"
                :key="item.lang"
                :command="item.lang"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- login content -->
      <div class="login-content">
        <div class="login-content-box">
          <!-- nickname password -->
          <template v-if="create_step == 0">
            <h1 class="first-level-title">{{ $t('login.welcome') }}</h1>
            <h3 class="third-level-title">{{ $t('login.world') }}</h3>
            <div class="login-account">{{ $t('account') }}</div>
            <el-select
              v-model="formData.username"
              :placeholder="$t('selectplease')"
              style="width: 100%"
            >
              <el-option
                v-for="(item, keyid) in account_list"
                :key="item.value"
                :label="item.nickname"
                :value="keyid"
              >
                <div class="login-content-box-option">
                  <span>{{ item.nickname }} </span>
                  <i
                    class="el-icon-close"
                    v-on:click.stop="handleDeleteAccount(keyid)"
                  ></i>
                </div>
              </el-option>
            </el-select>
            <div class="login-account">{{ $t('password') }}</div>
            <el-input
              ref="securitydiscword"
              type="password"
              :show-password="isPassword"
              autocomplete="off"
              v-model="formData.password"
              :placeholder="$t('wallet.inputpassword')"
              clearable
            />
            <div class="login-btn">
              <el-button
                @click="handleSubmit"
                type="primary"
                :disabled="logining"
                class="login-btn-item"
              >
                {{ logining ? $t('logging') : $t('login') }}
              </el-button>
            </div>
            <div class="login-create">
              <a class="login-create-link">
                <span @click="handleImport">{{ $t('import') }} </span>
              </a>
              <a class="login-create-link">
                <span @click="handleGetDoc('locale')">{{ $t('create') }} </span>
              </a>
            </div>
          </template>
          <!--  transaction password -->
          <template v-if="create_step == 1">
            <h3 class="third-level-title__bold">{{ $t('wallet.setpass') }}</h3>
            <div class="login-account">{{ $t('password') }}</div>
            <el-input
              :placeholder="$t('wallet.pleasesetpass')"
              v-model="createData.lockpass"
              autocomplete="off"
              show-password
            ></el-input>
            <div class="login-btn">
              <el-button
                type="primary"
                class="login-btn-item"
                :disabled="!createData.lockpass"
                @click="wallet_create_step(2)"
              >
                {{ $t('nextstep') }}
              </el-button>
            </div>
          </template>
          <!--  transaction password -->
          <template v-if="create_step == 2">
            <create-second
              :createType="createType"
              :accountList="account_list"
              @createdata="handleCreateData"
            ></create-second>
          </template>
          <template v-if="create_step == 3">
            <create-third
              :createData="createData"
              @createstep="handleCreateStep"
            ></create-third>
          </template>
          <template v-if="create_step == 4">
            <create-fourth :checkWords="checkWords"></create-fourth>
          </template>
        </div>
      </div>
    </div>
    <!-- add network -->
    <add-network
      :networks="networks"
      @closenetwork="handleCloseNetwork"
      @changenetworks="handleChangenetworks"
      @splicenetworks="handleSplicenetworks"
      @initstatus="handleInitstatus"
      @changestatus="handleChangeStatus"
      @changecheck="handleChangeCheck"
    ></add-network>
    <show-agree
      :objShowAgree="objShowAgree"
      @closeagree="handleCloseAgree"
      @agree="handleAgree"
    ></show-agree>
    <import-file
      :isImport="isImport"
      @addaccount="handleAddaccount"
    ></import-file>
  </div>
</template>
<script>
import qs from 'qs';
import keyring from '@/plugins/keyring.js';
import AddNetwork from './components/AddNetwork.vue';
import CreateSecond from './components/createSecond.vue';
import ShowAgree from './components/showAgree.vue';
import CreateThird from './components/createThird.vue';
import CreateFourth from './components/createFourth.vue';
import ImportFile from './components/importFile.vue';
export default {
  components: {
    AddNetwork,
    ShowAgree,
    CreateSecond,
    CreateThird,
    CreateFourth,
    ImportFile
  },
  name: 'Login',
  props: {},
  data() {
    return {
      logining: false,
      objShowAgree: {
        isShowAgree: false,
        strAgree: ''
      },
      formData: {
        username: '',
        password: ''
      },
      isPassword: false,
      strLang: 'English',
      value: new Date(),
      arrLang: [
        {
          label: 'English',
          lang: 'en-US'
        },
        {
          label: 'English',
          lang: 'zh-CN'
        },
        {
          label: 'English',
          lang: 'zh-TW'
        },
        {
          label: 'English',
          lang: 'ja-JP'
        }
      ],
      account_list: {},
      create_step: 0,
      ecosystem: 0,
      createType: 'create',
      isImport: false,
      createData: {
        lockpass: '',
        tradepass: '',
        nickname: '',
        confirm_tradepass: '',
        publicKey: '',
        privateKey: '',
        words: []
      },
      checkWords: {
        random: {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
          13: '',
          14: ''
        },
        selected: {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
          13: '',
          14: ''
        }
      },
      networks: {
        visible: false,
        status: 'offline',
        list: [
          {
            id: 1,
            node: 1,
            name: 'Default',
            ip: this.baseUrl.nodeserver,
            uuid: 'default',
            status: ''
          }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  inject: ['reload'],
  created() {
    // get user
    this.account_list = this.auth.getWallets();
    if (!this.util.getCache('network_uuid')) {
      this.util.setCache('network_uuid', 'default');
    }
    // console.log(this.util.getCache('networks'));
    this.networks.list = this.networks.list.concat(
      this.util.getCache('networks') || []
    );
    console.log(this.networks);
    console.log(this.networks.list);
    for (let i in this.networks.list) {
      if (this.util.getCache('network_uuid') == this.networks.list[i].uuid) {
        this.networks.list[i].status = 'connect';
      } else {
        this.networks.list[i].status = '';
      }
    }
  },
  mounted() {
    this.checkNetwork();
  },
  methods: {
    handleAddaccount(obj) {
      this.account_list = { ...obj };
    },
    handleCreateData(obj) {
      const { nickname, tradepass, confirm_tradepass } = obj;
      this.createData.confirm_tradepass = confirm_tradepass;
      this.createData.tradepass = tradepass;
      this.createData.nickname = nickname;
      this.wallet_create_step(3);
    },
    handleAgree(step) {
      this.objShowAgree.isShowAgree = false;
      this.wallet_create_step(step);
    },

    handleCloseAgree(boo) {
      this.objShowAgree.isShowAgree = boo;
    },
    wallet_create_step(step) {
      console.log(step);
      if (step == 1) {
        this.createData = {};
      } else if (
        step == 2 &&
        /^(.{0,7}|.{51,})$|^[^\d]*$|^[^a-zA-Z]*$|\s/.test(
          this.createData.lockpass
        )
      ) {
        return this.$message.error({
          dangerouslyUseHTMLString: true,
          message: `<span class="info-error">${this.$t('wallet.passregexp1', {
            num: '8-50'
          })}</span>`
        });
      } else if (step == 3) {
        if (this.createData.privateKey && this.createType == 'create') {
          return (this.create_step = step);
        }
        this.createWallet();
        if (this.createType != 'create') {
          this.create_step = 0;
          this.formData.password = this.createData.lockpass;
          this.handleSubmit();
          return this.$message.success(this.$t('wallet.importsuccess'));
        }
      } else if (step == 5) {
        let selectdwords = [];
        for (var index in this.checkWords.selected) {
          selectdwords.push(this.checkWords.selected[index].value);
        }
        if (this.createData.words != selectdwords.join(' ')) {
          return this.$message.error(this.$t('wallet.checkfail'));
        }
        var user = this.createData;
        for (var j in this.account_list) {
          if (this.account_list[j].publicKey == user.publicKey) {
            this.formData.username = j;
            this.formData.password = user.lockpass;
          }
        }
        return this.handleSubmit();
      }
      this.create_step = step;
    },
    createWallet() {
      if (!this.createData.privateKey || !this.createData.publicKey) {
        console.log(JSON.stringify(this.createData.words));
        this.createData.words = this.createData.words
          ? this.createData.words
          : keyring.generateSeed();
        console.log(JSON.stringify(this.createData.words));
        const keys = keyring.generateKeyPair(this.createData.words);
        const encKey = keyring.encryptAES(
          keys.private,
          this.createData.lockpass
        );
        this.createData.privateKey = keyring.decryptAES(
          encKey,
          this.createData.lockpass
        );
        if (!keyring.validatePrivateKey(this.createData.privateKey)) {
          return alert('E_INVALID_PASSWORD');
        }
        this.createData.publicKey = keyring.generatePublicKey(
          this.createData.privateKey
        );
        let randomwords = this.util.shuffle(this.createData.words.split(' '));
        for (var i in randomwords) {
          this.checkWords.random[i] = randomwords[i];
        }
      }
      console.log(this.createData.privateKey);
      console.log(this.createData.publicKey);
      this.auth.addWallet(this.createData);
      this.account_list = this.auth.getWallets();
      let keys = Object.keys(this.account_list);
      console.log(11);
      this.formData.username = keys[keys.length - 1];
      console.log(this.formData);
      console.log(this.formData.username);
    },
    // get agree document
    async handleGetDoc() {
      /*  console.log(this.$i18n.locale);
      const res = await this.$http.get(
        '/doc/' + (this.$i18n.locale == 'zh-CN' ? 'zh' : 'en') + '.html',
        {},
        { interType: str }
      ); */
      // this.objShowAgree.isShowAgree = true;
      // this.objShowAgree.strAgree = res;
      this.wallet_create_step(1);
    },
    // import  document
    handleImport() {
      this.isImport = true;
    },
    // delete account
    handleDeleteAccount(keyid) {
      const that = this;
      this.$confirm(this.$t('wallet.confirmremove'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        delete this.account_list[keyid];
        this.auth.setWallet(this.account_list);
        this.account_list = that.auth.getWallets();
        if (keyid == this.formData.username) {
          this.formData.username = '';
        }
        this.$message({
          type: 'success',
          message: this.$t('deletesuccess')
        });
      });
    },
    handleCreateStep(num) {
      this.create_step = num;
    },
    pickWord(index) {
      var word = this.checkWords.random[index];
      if (word) {
        for (var i in this.checkWords.selected) {
          if (
            !this.checkWords.selected[i] ||
            !this.checkWords.selected[i].value
          ) {
            this.checkWords.selected[i] = {
              index: index,
              value: word
            };
            break;
          }
        }
      }
      this.checkWords.random[index] = '';
    },
    removeWord(index) {
      console.log(index);
      if (
        this.checkWords.selected[index] &&
        this.checkWords.selected[index].value
      ) {
        var current = this.checkWords.selected[index];
        this.checkWords.random[current.index] = current.value;
        this.checkWords.selected[index] = {};
      }
    },
    async checkNetwork() {
      var item = this.util.searchArr(
        this.networks.list,
        'uuid',
        this.util.getCache('network_uuid')
      );
      console.log(this.util.getCache('network_uuid'));
      this.networks.status = 'connecting';
      const res = await this.$http.get(item.ip + '/api/v2/getuid');
      console.log(res);
      if (res && res.network_id) {
        this.networks.status = 'online';
      } else {
        this.networks.status = 'offline';
      }
    },
    handleChangeCheck() {
      this.checkNetwork();
    },
    createstep() {
      this.create_step = 0;
      setTimeout(() => {
        if (this.create_step == 0 && this.$i18n.locale == 'en-US') {
          // this.$refs.securitydiscword.style.fontFamily = 'auto';
        }
      }, 300);
    },
    handleCloseNetwork(boo) {
      this.networks.visible = boo;
    },
    handleChangenetworks(data) {
      const list = this.networks.list;
      list.push(data);
      this.networks.list = list;
      console.log(this.networks);
    },
    handleSplicenetworks(index) {
      this.networks.list.splice(index, 1);
    },
    handleInitstatus(i) {
      this.networks.list[i].status = '';
    },
    handleChangeStatus({ index, loading }) {
      this.networks.list[index].status = loading;
      const list = this.networks.list;
      this.networks.list = [...list];
    },
    handleCommand(val) {
      console.log(val);
      this.$store.commit('handleChangeLang', val);
      this.$i18n.locale = val;
    },
    // login submit
    async handleSubmit(ecosystem = 1) {
      const uuid = this.formData.username;
      const password = this.formData.password;
      const user = this.auth.getWallets(uuid);
      if (!user || !uuid) {
        return this.$message.error(this.$t('wallet.emptywallet'));
      }
      if (!password) {
        return this.$message.error(this.$t('wallet.inputpassword'));
      }
      if (password != user.lockpass) {
        return this.$message.error(this.$t('wallet.errorpass'));
      }
      const nodeserver = this.auth.getChainUrl();
      // open loading
      this.handleOpenLoading();
      // login mian node
      this.$axios.defaults.headers.common['Authorization'] = '';
      const resNode = await this.$axios.get(nodeserver + '/api/v2/getuid');
      this.$axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${resNode.token}`;
      let nodeId = resNode.network_id;
      let nodeUid = resNode.uid;
      let nodeSign = keyring.sign(
        `LOGIN${parseInt(nodeId, 10)}${nodeUid}`,
        user.privateKey
      );
      const nodeLogin = await this.$axios.post(
        nodeserver + '/api/v2/login',
        qs.stringify({
          signature: nodeSign,
          pubkey: user.publicKey,
          ecosystem: ecosystem
        })
      );
      console.log(JSON.stringify(nodeLogin));

      if (nodeLogin.isowner) {
        this.$store.commit('handlePower', 'isowner');
        localStorage.setItem('isowner', nodeLogin.isowner);
      }
      let { token, key_id } = nodeLogin;
      if (token) {
        this.util.setCache('uuid', uuid);
        this.$store.commit('login', nodeLogin);
        localStorage.setItem('keyid', key_id);
        localStorage.setItem('nodeTokens', nodeLogin.token);
        let obj = {
          type: 'nodeTokens',
          token: nodeLogin.token
        };
        this.$store.commit('handleChangeToken', obj);
        //  get pool url
        const getpoolUrl = this.auth.getpoolUrl();
        //  login pool
        this.$axios.defaults.headers.common['Authorization'] = '';
        const resPool = await this.$axios.get(getpoolUrl + '/api/v2/getuid');
        this.$axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${resPool.token}`;
        var poolId = resPool.network_id;
        var poolUid = resPool.uid;
        let poolSign = keyring.sign(
          `LOGIN${parseInt(poolId, 10)}${poolUid}`,
          user.privateKey
        );
        const poolLogin = await this.$axios.post(
          getpoolUrl + '/api/v2/login',
          qs.stringify({
            signature: poolSign,
            pubkey: user.publicKey,
            ecosystem: ecosystem
          })
        );
        console.log(JSON.stringify(poolLogin));
        let { token, account } = poolLogin;
        if (token) {
          localStorage.setItem('pool_keyid', account);
          localStorage.setItem('poolTokens', poolLogin.token);
          let obj = {
            type: 'poolTokens',
            token: poolLogin.token
          };
          this.$store.commit('handleChangeToken', obj);
          //get back-stage management url
          const { mainserver } = this.baseUrl;
          // login back-stage management
          this.$axios.defaults.headers.common['Authorization'] = '';
          const resBack = await this.$axios.get(mainserver + '/api/v2/getuid');

          this.$axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${resBack.token}`;
          var backId = resBack.network_id;
          var backUid = resBack.uid;
          let backSign = keyring.sign(
            `LOGIN${parseInt(backId, 10)}${backUid}`,
            user.privateKey
          );
          // let publicKey = keyring.generatePublicKey(user.privateKey);
          const backLogin = await this.$axios.post(
            mainserver + '/api/v2/login',
            qs.stringify({
              signature: backSign,
              pubkey: user.publicKey,
              ecosystem: ecosystem,
              expire: 7776000
            })
          );
          console.log(JSON.stringify(backLogin));
          let { token } = backLogin;
          if (token) {
            localStorage.setItem('mainTokens', backLogin.token);
            let obj = {
              type: 'mainTokens',
              token: backLogin.token
            };
            this.$store.commit('handleChangeToken', obj);
            const res = await this.$http.get(
              '/userminepoolid',
              {},
              { interType: 'poolserver' }
            );
            //  console.log(res);
            this.$router.replace('/');
            // close loading
            this.handleCloseLoading();
            if (res.code === 0) {
              const data = res.data;
              if (data.poolid) {
                console.log(data.poolid);
                this.$store.commit('handlePower', 'poolId');
                localStorage.setItem('poolid', data.poolid);
              }
            }
            location.reload();
          }
        }
      }
    }
  }
};
</script>
