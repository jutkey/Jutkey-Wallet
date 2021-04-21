<!--
 * @Author: abc
 * @Date: 2021-02-04 17:59:16
 * @LastEditors: abc
 * @LastEditTime: 2021-04-09 14:16:45
 * @Description: help center
-->
<template>
  <div class="warp pool">
    <h2 class="warp-title pool-flex">
      <span>{{ $t('navbar.help') }}</span>
    </h2>
    <div class="help">
      <div class="warp-box help-left">
        <h3 class="help-title">
          <span class="help-title-text">{{ $t('table.normalquestion') }}</span>
          <div class="header-user-massage-item-line"></div>
        </h3>
        <div class="help-left-menu">
          <el-scrollbar style="height: 100%">
            <el-menu
              :default-active="strDouble"
              class="el-menu-vertical-demo"
              @select="handleSelect"
            >
              <el-menu-item
                :index="String(item.id)"
                v-for="(item, index) in arrHelpList"
                :key="item.id"
              >
                <div
                  slot="title"
                  class="help-menu-title"
                  @click="handleManageHelpDetails(item.id)"
                >
                  <el-tooltip :content="item.title" placement="bottom">
                    <span>{{ index + 1 }}、{{ item.title }}</span>
                  </el-tooltip>
                </div>
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </div>
        <h3 class="help-title">
          <span class="help-title-text">{{ $t('table.allqusetion') }}</span>
          <div class="header-user-massage-item-line"></div>
        </h3>
        <div class="help-left-menu">
          <el-scrollbar style="height: 100%">
            <el-menu
              :default-active="strDouble"
              class="el-menu-vertical-demo"
              @select="handleSelect"
            >
              <el-submenu
                :index="String(item.id)"
                v-for="item in arrHelpAll"
                :key="item.id"
              >
                <template slot="title">
                  <span>{{ item.title }}</span>
                </template>

                <el-menu-item
                  :index="String(ele.id)"
                  v-for="(ele, index) in item.Children"
                  :key="ele.id"
                >
                  <div
                    slot="title"
                    class="help-menu-title"
                    @click="handleManageHelpDetails(ele.id)"
                  >
                    <el-tooltip :content="ele.title" placement="bottom">
                      <span>{{ index + 1 }}、{{ ele.title }}</span>
                    </el-tooltip>
                  </div>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-scrollbar>
        </div>
      </div>
      <div class="help-right">
        <el-scrollbar style="height: 100%">
          <div class="miner-noData" v-if="!objNotice.title">
            <img src="@/assets/image/miner-1.png" alt="noData" />
            <div>
              {{ $t('emptyData') }}
            </div>
          </div>
          <div class="help-right-box" v-else>
            <h3 class="notice-title">{{ objNotice.title }}</h3>
            <p class="notice-warp">
              <el-tooltip
                :content="objNotice.date_created | formatTimeUtc"
                placement="bottom"
              >
                <span>
                  {{ objNotice.date_created | formatTime }}
                </span>
              </el-tooltip>
            </p>
            <div class="notice-line"></div>
            <div class="notice-content" v-html="objNotice.info"></div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import { Base64 } from 'js-base64';
export default {
  props: {},
  data() {
    return {
      arrHelpList: [],
      arrHelpAll: [],
      strSign: '',
      strDouble: '',
      objNotice: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.handleManageNoticerelease();
  },
  mounted() {},
  methods: {
    async handleManageNoticerelease() {
      let where = {
        status: true
      };
      const res = await this.$http.post(
        `/managehelprelease`,
        {
          limit: 2000,
          page: 1,
          order: 'date_created asc',
          where: where
        },
        { interType: 'mainserver' }
      );
      if (res.code === 0 && res.data.rets) {
        const data = res.data.rets;
        this.arrHelpList = this.handleData(data, 1);
        this.strSign = String(this.arrHelpList[0].id);
        this.handleManageHelpDetails(this.strSign);
        this.arrHelpAll = this.handleData(data, 0);
        console.log(JSON.stringify(this.arrHelpAll));
        if (this.arrHelpAll[0].Children) {
          this.strDouble = String(this.arrHelpAll[0].Children[0].id);
        }
      }
    },
    handleData(data, index) {
      console.log(index);
      const arr = [];
      if (parseInt(index) === 1) {
        console.log(JSON.stringify(data));
        data.forEach((item) => {
          if (item.Children) {
            item.Children.forEach((item1) => {
              arr.push(item1);
            });
          }
        });
        const res = new Map();
        const arr1 = arr.filter(
          (item) => !res.has(item.id) && res.set(item.id, 1)
        );
        return arr1 || [];
      } else {
        // console.log(JSON.stringify(data));
        return data || [];
      }
    },
    async handleManageHelpDetails(id) {
      const res = await this.$http.get(
        `/managehelprelease/${id}`,
        {},
        { interType: 'mainserver' }
      );
      if (res.code === 0) {
        console.log(JSON.stringify(res));
        res.data.info = res.data.info == 'NULL' ? '' : res.data.info;
        if (res.data.info) {
          res.data.info = Base64.decode(res.data.info);
        }
        this.objNotice = res.data;
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.strDouble = String(key);
    }
  }
};
</script>
