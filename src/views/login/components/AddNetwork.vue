<!--
 * @Author: abc
 * @Date: 2021-02-01 15:09:11
 * @LastEditors: abc
 * @LastEditTime: 2021-04-06 16:26:38
 * @Description: add Network
-->
<template>
  <!-- outer  dialog-->
  <el-dialog
    :title="$t('network.list')"
    :visible.sync="networks.visible"
    :before-close="handleCloseOuter"
  >
    <div class="network-content">
      <el-table
        :data="networks.list"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          :label="$t('network.number')"
          type="index"
          show-overflow-tooltip
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column
          property="name"
          :label="$t('network.name')"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          property="node"
          :label="$t('network.nodenum')"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column :label="$t('network.operate')" align="center">
          <template slot-scope="scope">
            <a
              @click="connect(scope.row, scope.$index)"
              v-if="!scope.row.status"
              class="network-primary network-text__white"
              >{{ $t('network.connect') }}</a
            >
            <span
              class="network-warning network-text__white"
              v-if="scope.row.status == 'loading'"
              >{{ $t('network.connecting') }}</span
            >
            <span
              class="network-success network-text__white"
              v-if="scope.row.status == 'connect'"
              >{{ $t('network.current') }}</span
            >
            <a
              @click="deleteNetwork(scope.$index, scope.row.name)"
              v-if="
                scope.$index > 0 &&
                scope.row.status != 'connect' &&
                scope.row.status != 'loading'
              "
              class="network-danger network-text__white"
              >{{ $t('delete') }}</a
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="network-pagination" v-if="isPage">
        <el-pagination background layout="prev, pager, next" :total="0" small>
        </el-pagination>
      </div>
      <a @click="handleAddNetwork" href="javascript:;" class="network-add"
        ><i class="el-icon-circle-plus"></i>
        <span>{{ $t('network.add') }}</span>
      </a>
    </div>
    <!-- inner dialog -->
    <el-dialog
      width="30%"
      :title="$t('network.add')"
      :visible.sync="innerVisible"
      @close="handleCancelInner('newworkForm')"
      append-to-body
    >
      <div class="network-content">
        <el-form
          :model="newworkForm"
          :rules="rules"
          ref="newworkForm"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item :label="$t('network.name')" prop="name">
            <el-input v-model="newworkForm.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('network.nodeip')" prop="ip">
            <el-input
              v-model="newworkForm.ip"
              placeholder="https://"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelInner('newworkForm')">{{
          $t('cancel')
        }}</el-button>
        <el-button
          type="primary"
          @click="handleSubmitForm('newworkForm')"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          v-loading.fullscreen.lock="addNetworkLoading"
          >{{ $t('confirm') }}</el-button
        >
      </div>
    </el-dialog>
  </el-dialog>
</template>
<script>
import qs from 'qs';
import keyring from '@/plugins/keyring.js';
var md5 = require('md5');
export default {
  props: {
    networks: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      addNetworkLoading: false,
      newworkForm: {
        name: '',
        ip: ''
      },
      isPage: false,
      rules: {
        name: [
          { required: true, message: this.$t('networkName'), trigger: 'change' }
        ],
        ip: [
          {
            required: true,
            message: this.$t('nodeAddress'),
            trigger: 'change'
          },
          {
            type: 'url',
            message: 'Incorrect format of domain name',
            trigger: 'change'
          }
        ]
      },
      innerVisible: false
    };
  },
  computed: {},
  watch: {},
  created() {
    this.isPage = this.networks.list.length >= 5;
  },
  mounted() {},
  methods: {
    async handleSubmitForm(newworkForm) {
      this.$refs[newworkForm].validate((valid) => {
        console.log(this.newworkForm);
        if (valid) {
          let data = {
            name: this.newworkForm.name,
            ip: this.newworkForm.ip,
            uuid: md5(this.newworkForm.ip),
            nodes: [],
            node: 1,
            status: ''
          };
          if (this.util.searchArr(this.networksList, 'uuid', data.uuid)) {
            return this.$message.error(this.$t('network.alreadyexist'));
          }
          this.addNetworkLoading = true;
          this.handleNetworkData(newworkForm, data);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async handleNetworkData(newworkForm, data) {
      this.$axios.defaults.headers.common['Authorization'] = '';
      const res = await this.$axios.get(data.ip + '/api/v2/getuid');
      console.log(res);
      var network_id = res.network_id;
      var uid = res.uid;
      let privateKey =
        '4a178ad7c10f4ffee4bbf85e59ee822ac27987e6c0aeb21ab4354c2a144610c2';
      let publicKey = keyring.generatePublicKey(privateKey);
      let sign = keyring.sign(
        `LOGIN${parseInt(network_id, 10)}${uid}`,
        privateKey
      );
      console.log(sign);
      this.$axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.token}`;
      const res1 = await this.$axios.post(
        data.ip + '/api/v2/' + 'login',
        qs.stringify({
          signature: sign,
          pubkey: publicKey,
          ecosystem: 1
        })
      );
      this.$axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res1.token}`;
      const res2 = await this.$axios.get(
        data.ip + '/api/v2/systemparams?names=honor_nodes'
      );
      console.log(res2);
      this.addNetworkLoading = false;
      if (res2.list[0].value === '') {
        this.$message.error(this.$t('network.offline'));
      } else {
        let nodelist = JSON.parse(res2.list[0].value);
        if (nodelist.length > 0) {
          for (var i in nodelist) {
            data.nodes.push(nodelist[i].api_address);
          }
        } else {
          data.nodes.push(data.ip);
        }
        data.node = data.nodes.length;
        this.$emit('changenetworks', data);
        this.util.setCache(
          'networks',
          (this.util.getCache('networks') || []).concat(data)
        );
        this.$refs[newworkForm].resetFields();
        this.innerVisible = false;
      }
    },
    deleteNetwork(index, name) {
      this.$confirm(
        this.$t('network.confirmdelete', {
          name: name
        }),
        this.$t('tips'),
        {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        }
      ).then(() => {
        this.$emit('splicenetworks', index);
        //this.networks.list.splice(index, 1);
        let list = this.util.getCache('networks');
        list.splice(index - 1, 1);
        this.util.setCache('networks', list);
      });
    },
    async connect(item, index) {
      for (var i in this.networks.list) {
        this.$emit('initstatus', i);
      }
      let loading = 'loading';
      this.$emit('changestatus', { index, loading });
      console.log(item, index);
      const res = await this.$http.get(item.ip + '/api/v2/getuid');
      loading = '';
      this.$emit('changestatus', { index, loading });
      if (res && res.network_id) {
        loading = 'connect';
        this.$emit('changestatus', { index, loading });
        //console.log(JSON.stringify(this.networks.list));
        //  console.log(this.networks.list[index].uuid);
        //  this.networks.list[index].status = 'connect';
        this.util.setCache('network_uuid', this.networks.list[index].uuid);
        this.$emit('changecheck');
      } else {
        this.$message.error(this.$t('network.offline'));
      }
    },
    handleAddNetwork() {
      this.innerVisible = true;
    },
    handleCloseOuter() {
      this.$emit('closenetwork', false);
    },
    handleCancelInner(newworkForm) {
      this.$refs[newworkForm].resetFields();
      this.innerVisible = false;
    }
  }
};
</script>

<style scoped lang="scss"></style>
