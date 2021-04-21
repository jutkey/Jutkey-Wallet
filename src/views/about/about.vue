<!--
 * @Author: abc
 * @Date: 2021-03-06 18:57:45
 * @LastEditors: abc
 * @LastEditTime: 2021-04-21 18:02:06
 * @Description: about us
-->
<template>
  <div class="warp">
    <h2 class="warp-title pool-flex">
      <span>{{ $t('navbar.about_us') }}</span>
    </h2>
    <div class="warp-box about">
      <div class="about-img">
        <img src="@/assets/image/logo-256.png" alt="logo" />
      </div>
      <div class="about-world">{{ slogan }}</div>
      <div>{{ $t('public.version') }}：{{ version }}</div>
      <div>
        <div class="about-warp">
          <a
            class="miner-blockexplorer about-warp-link"
            href="javascript:;"
            v-if="isElectron"
            @click="handleCheck"
          >
            {{ $t('public.checkupdate') }}
          </a>
          <a
            class="miner-blockexplorer about-warp-link"
            href="javascript:;"
            @click="handlePrivacy"
            >{{ $t('wallet.privacy') }}</a
          >
          <el-popover
            placement="bottom"
            :title="$t('wallet.us')"
            width="200"
            trigger="hover"
            :content="mail"
            class="about-warp-popover"
          >
            <a
              class="miner-blockexplorer"
              href="javascript:;"
              slot="reference"
              >{{ $t('wallet.us') }}</a
            >
          </el-popover>

          <a
            class="miner-blockexplorer about-warp-link"
            href="javascript:;"
            @click="handleUrlBrower(objAbout.weburl)"
          >
            <el-tooltip :content="$t('public.website')" placement="bottom">
              <span>
                {{ $t('public.website') }}
              </span>
            </el-tooltip>
          </a>
          <a
            class="miner-blockexplorer about-warp-link"
            v-for="(item, index) in arrOther"
            :key="index"
            href="javascript:;"
            @click="handleUrlBrower(item.url)"
          >
            <el-tooltip :content="item.label" placement="bottom">
              <span>
                {{ item.label }}
              </span>
            </el-tooltip>
          </a>
        </div>
      </div>
      <div v-if="!isElectron">
        <div class="about-box">
          <img src="@/assets/image/about.png" alt="about" />
          <div class="about-box-content">
            <h2>Download Client</h2>
            <p>Please use the desktop version to improve security</p>
            <el-button type="primary">{{ $t('download') }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- update  verison -->
    <dialog-updater ref="updater" :isCheck="isCheck"></dialog-updater>
  </div>
</template>
<script>
const version = require('../../../package.json').version;
export default {
  props: {},
  data() {
    return {
      version: version,
      objAbout: {},
      arrOther: [],
      slogan: '',
      mail: '',
      isCheck: true
    };
  },
  computed: {},
  watch: {},
  created() {
    this.version = `BPN-α-v${version}`;
    this.handleGetManageAbout();
  },
  mounted() {},
  methods: {
    handleUrlBrower(url) {
      if (this.isElectron) {
        window.ipcRenderer.send('open-url', url);
      } else {
        window.open(url);
      }
    },
    async handleGetManageAbout() {
      const res = await this.$http.get(
        `/getmanageabout`,
        {},
        { interType: 'mainserver' }
      );
      if (res.code === 0) {
        console.log(JSON.stringify(res));
        this.objAbout = res.data || {};
        if (res.data && res.data.otherurl) {
          const { otherurl } = res.data;
          this.slogan = res.data.slogan;
          this.path = res.data.path;
          this.mail = res.data.mail;
          console.log(otherurl);
          for (const key in otherurl) {
            this.arrOther.push({
              url: otherurl[key],
              label: key
            });
          }
          console.log(this.arrOther);
        } else {
          this.arrOther = [];
        }
      }
    },
    handlePrivacy() {
      const a = document.createElement('a');
      a.href = `${this.baseUrl.mainserver}/api/v2/getmanagefile/${this.path}`;
      a.download = this.path;
      a.click();
    },
    handleCheck() {
      if (this.isElectron) {
        window.ipcRenderer.send('checkForUpdates');
        window.ipcRenderer.once('update-not-available', (event, info) => {
          this.verison = info.verison;
          this.$message.success(`It's the latest version:v${info.version}`);
        });
      }
    }
  }
};
</script>
