<!--
 * @Author: abc
 * @Date: 2021-03-05 15:05:52
 * @LastEditors: abc
 * @LastEditTime: 2021-03-17 12:06:29
 * @Description: mine invite
-->
<template>
  <el-dialog
    :visible.sync="dialogMine"
    width="40%"
    :before-close="handleClose"
    v-loading="minerInitLoading"
    element-loading-text="Loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h3 slot="title">{{ $t('mine.invitecode') }}</h3>
    <div class="dialog-body" v-if="isRload">
      <div class="dialog-body-code">
        <div class="dialog-body-code-box">
          <el-select
            v-model="number"
            :placeholder="$t('mine.select')"
            filterable
            @change="handleGetInviteCode"
          >
            <el-option
              v-for="item in arrMineList"
              :key="item.devid"
              :value="item.devid"
              :label="item.number"
            >
            </el-option>
          </el-select>
          <div class="dialog-body-code-content">
            <p>{{ $t('mine.code') }}</p>
            <p class="dash-first-box-num" @click="util.copyText(strCode)">
              {{ strCode }}
            </p>
          </div>
          <div class="warp-ecology-item-content-right-text" @click="handleRule">
            {{ $t('mine.rule') }}
          </div>
        </div>
      </div>
      <div class="dialog-body-code-invite">
        <span>
          {{ $t('mine.invitelist') }}
        </span>
        <span>{{ $t('mine.totalhashrate') }}：{{ numTotalCount || 0 }}</span>
      </div>
      <el-table
        :data="arrInviteList"
        style="width: 100%"
        class="dash-table"
        :show-header="false"
        v-loading="mineLoading"
      >
        <el-table-column prop="number"> </el-table-column>
        <el-table-column prop="name"> </el-table-column>
        <el-table-column prop="ycount"> </el-table-column>
      </el-table>
      <div class="dash-collapse-pagination">
        <el-pagination
          small
          background
          layout="prev,pager, next"
          :current-page="objPage.page"
          :pager-count="5"
          :page-size="objPage.limit"
          :hide-on-single-page="true"
          @current-change="handleChangePage"
          :total="objPage.total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog width="35%" :visible.sync="innerVisible" append-to-body>
      <h4 slot="title">{{ $t('mine.rule') }}</h4>
      <div class="dialog-body-inner">
        <el-scrollbar style="height: 100%">
          <div v-html="objMinestakerule.info" class="stakerule-info"></div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </el-dialog>
</template>
<script>
import { Base64 } from 'js-base64';
export default {
  props: {
    dialogMine: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      mineLoading: false,
      innerVisible: false,
      isRload: true,
      arrMineList: [],
      arrInviteList: [],
      number: '',
      strCode: '--',
      strId: '',
      objMinestakerule: {},
      numTotalCount: 0,
      minerInitLoading: false,
      objPage: {
        page: 1,
        total: 0,
        limit: 5
      },
      paramDevid: {
        limit: 5,
        page: 1,
        order: 'date_created desc',
        devid: ''
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    this.handleMinekeyinfos();
  },
  mounted() {},
  methods: {
    handleClose() {
      this.$parent.dialogMine = false;
      this.number = '';
    },
    handleRule() {
      this.innerVisible = true;
      this.handleShowRule();
    },
    handleChangePage(page) {
      this.paramDevid.page = page;
      this.paramDevid.devid = this.number;
      this.handleMineInvitehistory(this.paramDevid);
    },
    async handleGetInviteCode(val) {
      // open loading
      this.minerInitLoading = true;
      const res = await this.$http.get(
        `mint/inviteyorn/${val}`,
        {},
        { interType: 'mainserver' }
      );
      console.log(res);
      if (JSON.stringify(res.data) != '{}') {
        console.log(res);
        this.paramDevid.page = 1;
        this.strCode = res.data.invite;
        this.strId = res.data.id;
        this.paramDevid.devid = this.number;
        console.log(this.paramDevid);
        this.handleMineInvitehistory(this.paramDevid);
      } else {
        let Invite = this.util.generateInviteCode();
        const res1 = await this.$http.get(
          `mint/isexistinvite/${Invite}`,
          {},
          {
            interType: 'mainserver'
          }
        );
        if (res1.data.exist == true) {
          this.handleGetInviteCode(val);
        } else {
          this.auth.callContract(
            'NewMineInvite',
            {
              BindAddr: this.util.formatKeyId(this.devid),
              Invite: Invite
            },
            {
              Expedite: '' //
            },
            (res, status) => {
              console.log(res, status);
              if (status === 'error') {
                this.$message.error(res.errmsg.error);
              } else if (status === 'loading') {
                this.$message.success(this.$t('table.chain'));
              } else if (status === 'success') {
                this.handleGetInviteCode(val);
              }
              // close loading
              this.minerInitLoading = false;
            }
          );
        }
      }
    },
    async handleMineInvitehistory(obj) {
      this.mineLoading = 'true';
      const res = await this.$http.post('/mint/mineinvitehistory', obj, {
        interType: 'mainserver'
      });
      if (res.code === 0) {
        console.log(res);
        this.arrInviteList = res.data.rets || [];
        this.numTotalCount = res.data.sum;
        this.objPage.total = res.data.total;
      } else {
        this.arrInviteList = [];
        this.objPage.total = 0;
      }
      this.mineLoading = false;
    },
    async handleMinekeyinfos() {
      const res = await this.$http.get(
        '/mint/minekeyinfos',
        {},
        { interType: 'mainserver' }
      );
      console.log(res);
      if (res.code === 0) {
        this.arrMineList = res.data.rets || [];
      } else {
        this.arrMineList = [];
      }
    },
    async handleShowRule() {
      const res = await this.$http.get(
        '/mint/stakerulerelease',
        {},
        { interType: 'mainserver' }
      );
      if (res.code == 0) {
        this.showloading = false;
        this.objMinestakerule = res.data;
        this.objMinestakerule.info =
          this.objMinestakerule.info == 'NULL'
            ? ''
            : this.objMinestakerule.info;
        if (this.objMinestakerule.info) {
          this.objMinestakerule.info = Base64.decode(
            this.objMinestakerule.info
          );
        }
      }
    }
  }
};
</script>
