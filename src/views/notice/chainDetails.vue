<!--
 * @Author: abc
 * @Date: 2021-02-22 16:11:13
 * @LastEditors: abc
 * @LastEditTime: 2021-04-10 16:42:27
 * @Description: 
-->
<template>
  <div class="warp pool">
    <h2 class="warp-title pool-flex">
      <span>{{ $t('notice.details') }}</span>
    </h2>
    <div class="warp-box notice">
      <h3 class="notice-title">{{ objNotice.header }}</h3>
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
      <div class="notice-content-box" v-html="objNotice.body"></div>
      <!-- @1reject_new_pool -->
      <div v-if="objNotice.page_name === '@1reject_new_pool'">
        <p>
          <!-- Please in the system UTC time -->
          Please in system time
          <el-tooltip :content="disbanetime | formatTimeUtc" placement="bottom">
            <span>{{ disbanetime | formatTime }}</span>
          </el-tooltip>
          Settlement and release the stake deposit afterwards.
        </p>
        <el-button
          v-if="name === 'Stake released' && action === true"
          size="small"
          type="primary"
          @click="releasestake"
          >{{ $t('zzClicktoreleasestakeddeposit') }}</el-button
        >
      </div>
      <!-- pool disbanded  -->
      <div v-if="objNotice.page_name === '@1confirm_disband_pool'">
        <div
          v-if="
            objNotice.header.indexOf('pool officially disbanded notice') !== -1
          "
        >
          <p>
            <!-- Please in the system UTC time -->Please in system time
            <el-tooltip
              :content="disbanetime | formatTimeUtc"
              placement="bottom"
            >
              <span>{{ disbanetime | formatTime }}</span>
            </el-tooltip>
            Settlement and release the stake deposit afterwards.
          </p>
          <el-button
            type="primary"
            v-if="name === 'Settlement' && action === true"
            size="small"
            @click="settlementToMinter"
            >{{ $t('zzConfirmsettlementreleasestakeddeposit') }}</el-button
          >
          <el-button
            type="primary"
            v-if="name === 'Stake released' && action === true"
            size="small"
            @click="refishstakeddeposit"
            >{{ $t('zzClicktoreleasestakeddeposit') }}</el-button
          >
        </div>
      </div>
      <div v-if="objNotice.page_name === '@1accept_switch_pool'">
        <p>
          <!-- Please in the system UTC time -->Please in system time
          <el-tooltip :content="disbanetime | formatTimeUtc" placement="bottom">
            <span>{{ disbanetime | formatTime }}</span>
          </el-tooltip>
          Settlement and release the stake deposit afterwards.
        </p>
        <el-button
          size="small"
          v-if="name === 'Settlement' && action == true"
          type="primary"
          @click="settlementToMinter"
          >{{ $t('zzConfirmsettlementreleasestakeddeposit') }}</el-button
        >
        <el-button
          type="primary"
          v-if="name === 'Stake released' && action == true"
          size="small"
          @click="refishstakeddeposit"
          >{{ $t('zzClicktoreleasestakeddeposit') }}</el-button
        >
      </div>
      <!-- pool transfer -->
      <div
        class="notice-content-warp"
        v-if="objNotice.page_name === '@1request_switch_pool'"
      >
        <div v-if="this.action === true">
          <el-button size="small" @click="handlePooltransferRefuse">{{
            $t('zhenziCancellationtransfer')
          }}</el-button>
          <el-button
            size="small"
            type="primary"
            @click="handlePoolTransferAgree"
            >{{ $t('zzAccepttransfer') }}</el-button
          >
        </div>
      </div>
      <!-- Vote to modify -->
      <div
        class="notice-content-warp"
        v-if="objNotice.page_name === '@1voting_view'"
      >
        <h4>{{ $t('zzEcologicalnotice') }}</h4>
        <div class="">{{ $t('zzVotingsubject') }}：</div>
        <div class="notice-content-warp-voting">
          {{ $t('zzAcceptthecontract') }}：{{ contract_accept }}
        </div>
        <div class="notice-content-warp-voting">
          {{ $t('zzparameterss') }}：{
          <div class="notice-content-warp-voting-content">
            <p>Name of ore pool:{{ PoolName }}</p>
            <p>Settlement time:{{ SettleCycle }}</p>
            <p>
              Minimum withdrawal amount:{{ util.formatAmount(SettleMinAmount) }}
              IBXC
            </p>
            <p>Rate:{{ SettleRate }} %</p>
            <p>Template ID:{{ TemplateId }}</p>
            <p>Vote ID:{{ VotingId }}</p>
            <p>URL:{{ WebUrl }}</p>
          </div>
          }
          <div class="pl-4 pb-2">
            {{ $t('zzRejectioncontract') }}：{{ contract_reject }}
          </div>
        </div>
        <div>{{ $t('zzvotess') }}：</div>
        <div class="notice-content-warp-voting">
          {{ $t('table.type') }}：{{
            voting_type === 2 ? 'System voting type' : 'System voting type'
          }}
        </div>
        <div class="notice-content-warp-voting">
          {{ $t('ecosystem.status') }}：
          <span v-if="status === 1">{{ $t('zzinvalidss') }}</span>
          <span v-if="status === 2">{{ $t('zzzWaitingss') }}</span>
          <span v-if="status === 3">{{ $t('zzzzVotingsss') }}</span>
          <span v-if="status === 4">{{ $t('zzzover') }}</span>
        </div>
        <div class="notice-content-warp-voting">
          {{ $t('zzVotingsubjectidentifier') }}：{{
            type_decision === 4 ? 'Operation contract' : 'Operation contract'
          }}
        </div>
        <div class="notice-content-warp-voting">
          {{ $t('zzVotingdescription') }}：{{ description }}
        </div>
        <div class="notice-content-warp-voting">
          {{ $t('zzzVotedrate') }}：{{ percent_voters }} %
        </div>
        <div class="notice-content-warp-voting">
          {{ $t('zzzDatetostartvoting') }}：
          <el-tooltip
            :content="date_started | formatTimeUtc"
            placement="bottom"
          >
            <span style="cursor: pointer">
              {{ date_started | formatTime }}
            </span>
          </el-tooltip>
        </div>
        <div class="notice-content-warp-voting">
          {{ $t('zzEndofvoting') }}：
          <el-tooltip :content="date_ended | formatTimeUtc" placement="bottom">
            <span style="cursor: pointer">{{ date_ended | formatTime }}</span>
          </el-tooltip>
        </div>
        <div class="notice-content-warp-voting">
          {{ $t('zzzQuorum') }}：{{ quorum }} %
        </div>
        <div class="notice-content-warp-voting">
          {{ $t('zzVotepassrate') }}：{{ volume }} %
        </div>
        <div class="notice-content-warp-voting">
          {{ $t('zzzParticipants') }}：{{ number_participants }}
        </div>
        <div class="notice-content-warp-voting">
          {{ $t('zzNumberpeoplevoted') }}：{{ number_voters }}
        </div>
        <div v-if="action === true">
          <el-button size="small" @click="handleRefuse">{{
            $t('zzzRefusetomodify')
          }}</el-button>
          <el-button size="small" type="primary" @click="handleAgree">{{
            $t('zzzzAgreetomodify')
          }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import keyring from '@/plugins/keyring.js';
export default {
  props: {},
  data() {
    return {
      objNotice: {},
      disablelist: true,
      form: {
        resource: ''
      },
      poolid: '',
      header: '',
      date_created: '',
      body: '',
      contract_accept: '',
      contract_accept_params: '',
      contract_reject: '',
      voting_type: '',
      status: '',
      type_decision: '',
      description: '',
      percent_voters: '',
      date_started: '',
      date_ended: '',
      quorum: '',
      volume: '',
      number_participants: '',
      number_voters: '',
      action: '',
      PoolName: '',
      SettleCycle: '',
      SettleMinAmount: '',
      SettleRate: '',
      TemplateId: '',
      VotingId: '',
      WebUrl: '',
      disbanetime: '',
      name: ''
    };
  },
  computed: {},
  watch: {},
  created() {
    const { id } = this.$route.params;
    this.handlePoolnotification(id);
  },
  mounted() {},
  methods: {
    async handlePoolnotification(id) {
      const res = await this.$http.get(
        `/poolnotification/${id}`,
        {},
        { interType: 'poolserver' }
      );
      if (res.code === 0) {
        console.log(JSON.stringify(res));
        this.objNotice = res.data;
        this.handleChainDetails(this.objNotice);
      }
    },
    async handleChainDetails(obj) {
      if (
        obj.page_name === '@1confirm_disband_pool' &&
        obj.header.indexOf('pool officially disbanded notice') !== -1
      ) {
        const res = await this.$http.get(
          `/minepoolremovestake/${obj.id}`,
          {},
          { interType: 'poolserver' }
        );
        if (res.code === 0) {
          console.log(JSON.stringify(res));
          this.handleChangeData(res);
        }
      }
      if (obj.page_name === '@1accept_switch_pool') {
        const res = await this.$http.get(
          `/minepoolremovestake/${obj.id}`,
          {},
          { interType: 'poolserver' }
        );
        console.log(JSON.stringify(res));
        if (res.code === 0) {
          this.handleChangeData(res);
        }
      }
      // Vote to modify
      if (obj.page_name === '@1voting_view') {
        const objVoting = await this.$http.get(
          `/poolvotingdetail/${obj.voting_id}`,
          {},
          { interType: 'poolserver' }
        );
        if (objVoting.code === 0) {
          console.log(JSON.stringify(objVoting));
          this.handlePoolVotingDetail(objVoting);
          const objAcation = await this.$http.get(
            `/minernotificationspage/${obj.page_name}/${obj.voting_id}`,
            {},
            { interType: 'poolserver' }
          );
          if (objAcation.code === 0) {
            console.log(JSON.stringify(objAcation));
            this.action = objAcation.data.action;
          }
        }
      }
      // pool transfer
      if (obj.page_name === '@1request_switch_pool') {
        const res = await this.$http.get(
          `/minernotificationspage/${obj.page_name}/${obj.switch_id}`,
          {},
          { interType: 'poolserver' }
        );
        if (res.code === 0) {
          console.log(JSON.stringify(res));
          this.action = res.data.action;
        }
      }
      if (obj.page_name === '@1reject_new_pool') {
        const res = await this.$http.get(
          `/minepoolremovestake/${obj.id}`,
          {},
          { interType: 'poolserver' }
        );
        if (res.code === 0) {
          console.log(JSON.stringify(res));
          this.handleChangeData(res);
        }
      }
      if (parseInt(obj.closed) === 0) {
        this.handleHaveRead(obj);
      }
    },
    // read
    handleHaveRead(obj) {
      // open loading
      this.handleOpenLoading();
      this.auth.callContract(
        'NotificationsClose',
        {
          NotificId: obj.id
        },
        {
          Expedite: '' //
        },
        (res, status) => {
          //  console.log(res, status);
          if (status === 'error') {
            this.$message.error(res.errmsg.error);
          } else if (status === 'loading') {
            this.$message.success(this.$t('table.chain'));
          } else if (status === 'success') {
            this.$message.success(this.$t('contract.tx_batch'));
          }
          // close loading
          this.handleCloseLoading();
        }
      );
    },
    // Confirmed transfer of ore pool
    handlePoolTransferAgree() {
      this.poolTransferLoading = true;
      const { switch_id } = this.objNotice;
      this.auth.callContract(
        'SwitchPoolDecision',
        {
          SwitchId: Number(switch_id),
          Opt: 1
        },
        {
          Expedite: '' //
        },
        (res, status) => {
          if (status === 'error') {
            this.$message.error(res.errmsg.error);
          } else if (status === 'loading') {
            this.$message.success(this.$t('table.chain'));
          } else if (status === 'success') {
            this.$message.success(this.$t('contract.tx_batch'));
          }
          this.$store.commit('logout');
          this.$axios.defaults.headers.common['Authorization'] = '';
          this.$router.replace('/login');
          this.poolTransferLoading = false;
        }
      );
    },
    // Refusal to transfer
    handlePooltransferRefuse() {
      this.poolTransferLoading = true;
      const { switch_id } = this.objNotice;
      this.auth.callContract(
        'SwitchPoolDecision',
        {
          SwitchId: Number(switch_id),
          Opt: 2
        },
        {
          Expedite: '' //
        },
        (res, status) => {
          if (status === 'error') {
            this.$message.error(res.errmsg.error);
          } else if (status === 'loading') {
            this.$message.success(this.$t('table.chain'));
          } else if (status === 'success') {
            this.$message.success(this.$t('contract.tx_batch'));
          }
          this.$router.replace('/notice');
          this.poolTransferLoading = false;
        }
      );
    },
    handleChangeData(res) {
      this.disbanetime = res.data.time;
      this.action = res.data.flag;
      this.name = res.data.name;
      this.poolid = res.data.poolid;
    },
    handlePoolVotingDetail(res) {
      let paramslist = JSON.parse(res.data[0].contract_accept_params);
      if (paramslist.SettleCycle === 1) {
        paramslist.SettleCycle = '1:00~2:00';
      } else if (paramslist.SettleCycle === 2) {
        paramslist.SettleCycle = '2:00~3:00';
      } else if (paramslist.SettleCycle === 3) {
        paramslist.SettleCycle = '3:00~4:00';
      } else if (paramslist.SettleCycle === 4) {
        paramslist.SettleCycle = '4:00~5:00';
      } else if (paramslist.SettleCycle === 5) {
        paramslist.SettleCycle = '5:00~6:00';
      } else if (paramslist.SettleCycle === 6) {
        paramslist.SettleCycle = '6:00~7:00';
      } else if (paramslist.SettleCycle === 7) {
        paramslist.SettleCycle = '7:00~8:00';
      } else if (paramslist.SettleCycle === 8) {
        paramslist.SettleCycle = '8:00~9:00';
      } else if (paramslist.SettleCycle === 9) {
        paramslist.SettleCycle = '9:00~10:00';
      } else if (paramslist.SettleCycle === 10) {
        paramslist.SettleCycle = '11:00~12:00';
      } else if (paramslist.SettleCycle === 11) {
        paramslist.SettleCycle = '12:00~13:00';
      } else if (paramslist.SettleCycle === 12) {
        paramslist.SettleCycle = '13:00~14:00';
      } else if (paramslist.SettleCycle === 13) {
        paramslist.SettleCycle = '14:00~15:00';
      } else if (paramslist.SettleCycle === 14) {
        paramslist.SettleCycle = '15:00~16:00';
      } else if (paramslist.SettleCycle === 15) {
        paramslist.SettleCycle = '15:00~16:00';
      } else if (paramslist.SettleCycle === 16) {
        paramslist.SettleCycle = '15:00~16:00';
      } else if (paramslist.SettleCycle === 17) {
        paramslist.SettleCycle = '16:00~17:00';
      } else if (paramslist.SettleCycle === 18) {
        paramslist.SettleCycle = '17:00~18:00';
      } else if (paramslist.SettleCycle === 19) {
        paramslist.SettleCycle = '18:00~19:00';
      } else if (paramslist.SettleCycle === 20) {
        paramslist.SettleCycle = '19:00~20:00';
      } else if (paramslist.SettleCycle === 21) {
        paramslist.SettleCycle = '20:00~21:00';
      } else if (paramslist.SettleCycle === 22) {
        paramslist.SettleCycle = '21:00~22:00';
      } else if (paramslist.SettleCycle === 23) {
        paramslist.SettleCycle = '22:00~23:00';
      } else if (paramslist.SettleCycle === 24) {
        paramslist.SettleCycle = '23:00~24:00';
      }
      this.PoolName = paramslist.PoolName;
      this.SettleCycle = paramslist.SettleCycle;
      this.SettleMinAmount = paramslist.SettleMinAmount;
      this.SettleRate = paramslist.SettleRate;
      this.TemplateId = paramslist.TemplateId;
      this.VotingId = paramslist.VotingId;
      this.WebUrl = paramslist.WebUrl;
      this.header = res.data[0].name;
      // this.body=res.data
      this.contract_accept = res.data[0].contract_accept;
      this.contract_accept_params = res.data[0].contract_accept_params;
      this.contract_reject = res.data[0].contract_reject;
      (this.voting_type = res.data[0].voting_type),
        (this.status = res.data[0].status),
        (this.type_decision = res.data[0].type_decision),
        (this.description = res.data[0].description),
        (this.percent_voters = res.data[0].percent_voters),
        (this.date_started = res.data[0].date_started),
        (this.date_ended = res.data[0].date_ended),
        (this.quorum = res.data[0].quorum),
        (this.volume = res.data[0].volume),
        (this.number_participants = res.data[0].number_participants),
        (this.number_voters = res.data[0].number_voters),
        (this.date_created = res.data[0].date_started);
    },
    // agree
    handleAgree() {
      this.handleOpenLoading();
      const { voting_id } = this.objNotice;
      this.auth.callContract(
        '@1VotingDecisionAccept',
        {
          VotingId: Number(voting_id),
          RoleId: 0
        },
        {
          Expedite: '' //
        },
        (res, status) => {
          if (status === 'error') {
            this.$message.error(res.errmsg.error);
          } else if (status === 'loading') {
            this.$message.success(this.$t('table.chain'));
          } else if (status === 'success') {
            this.$message.success(this.$t('contract.tx_batch'));
          }
          this.$router.replace('/notice');
          // close loading
          this.handleCloseLoading();
        }
      );
    },
    // refuse
    handleRefuse() {
      // open loading
      this.handleOpenLoading();
      const { voting_id } = this.objNotice;
      this.auth.callContract(
        '@1VotingDecisionReject',
        {
          VotingId: Number(voting_id),
          RoleId: 0
        },
        {
          Expedite: '' //
        },
        (res, status) => {
          if (status === 'error') {
            this.$message.error(res.errmsg.error);
          } else if (status === 'loading') {
            this.$message.success(this.$t('table.chain'));
          } else if (status === 'success') {
            this.$message.success(this.$t('contract.tx_batch'));
          }
          this.$router.replace('/notice');
          // close loading
          this.handleCloseLoading();
        }
      );
    },
    stakeddeposit() {
      this.settlementToMinter();
    },
    settlementToMinter() {
      this.startbilling();
    },
    // Amount of stake released
    releasestake() {
      this.settlementToMinter();
    },
    //Transfer settlement and release of stake deposit
    refishstakeddeposit() {
      this.settlementToMinter();
    },
    async startbilling() {
      if (this.action === true && this.name === 'Stake released') {
        const { id } = this.objNotice;
        const res = await this.$http.get(
          `/minepoolallowstake/${id}`,
          {},
          { interType: 'poolserver' }
        );
        if (res.data) {
          let hashs = [];
          let uuid = this.util.getCache('uuid');
          let user = this.auth.getWallets(uuid);
          for (var i = 0; i < res.data.length; i++) {
            var json = {};
            json.hash = res.data[i];
            json.sign = keyring.signstring(res.data[i], user.privateKey);
            hashs.push(json);
          }
          const objMiner = await this.$http.post(
            `/minepoolunstake`,
            { id: Number(id), hashs: hashs },
            { interType: 'poolserver' }
          );
          if (!objMiner.data) {
            console.log(123);
            this.startbilling();
          } else {
            this.$router.replace('/notice');
            console.log(456);
          }
        } else {
          this.$message.success(this.$t('zzzSuccessfulReleasestake'));
          this.$router.replace('/notice');
        }
      } else if (this.action === true && this.name === 'Settlement') {
        console.log(123);
        let count = 10;
        console.log(this.poolid);
        const res = await this.$http.get(
          `/minepoolunsettlement/${this.poolid}/${count}`,
          {},
          { interType: 'poolserver' }
        );
        if (res.data) {
          let hashs = [];
          let uuid = this.util.getCache('uuid');
          let user = this.auth.getWallets(uuid);
          for (let i = 0; i < res.data.length; i++) {
            let json = {};
            json.hash = res.data[i];
            json.sign = keyring.signstring(res.data[i], user.privateKey);
            hashs.push(json);
          }
          this.$http
            .post(
              `/minepoolsettlement`,
              { count: 10, poolid: this.poolid, hashs: hashs },
              { interType: 'poolserver' }
            )
            .then(() => {
              this.loading = false;
              this.startbilling();
            });
        } else {
          const resMent = await this.$http.get(
            `/minepoolunsettlement/${this.poolid}/${count}`,
            {},
            { interType: 'poolserver' }
          );
          if (!resMent.data) {
            this.loading = false;
            this.$message.success(this.$t('zzzSettlementSucceeded'));
            this.$router.replace('/notice');
            return (this.disablelist = true);
          }
        }
      }
    }
  }
};
</script>
