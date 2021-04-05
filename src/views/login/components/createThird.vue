<!--
 * @Author: abc
 * @Date: 2021-02-03 12:09:32
 * @LastEditors: abc
 * @LastEditTime: 2021-02-03 16:18:19
 * @Description: create third step
-->
<template>
  <div class="login-third">
    <h3 class="third-level-title__bold login-center">
      {{ $t('wallet.info') }}
    </h3>
    <div class="login-third-label">
      <span class="login-account">{{ $t('wallet.privatekey') }}</span>
      <a class="login-create-link" @click="exportData('privateKey')">{{
        $t('export')
      }}</a>
    </div>
    <div
      class="login-third-content"
      @click="copyText(createData.privateKey)"
      v-html="createData.privateKey"
      readonly
    ></div>
    <div class="login-third-label">
      <span class="login-account">{{ $t('wallet.keywords') }}</span>
      <a class="login-create-link" @click="exportData('words')">{{
        $t('export')
      }}</a>
    </div>
    <div class="login-third-words">
      <span
        @click="copyText(item)"
        v-for="(item, index) in createData.words.split(' ')"
        :key="index"
        ><em>{{ item }}</em></span
      >
    </div>
    <div class="login-btn">
      <el-button type="primary" @click="backup()" class="login-btn-item"
        >{{ $t('wallet.backupnext') }}
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    createType: {
      type: String,
      default: () => ''
    },
    createData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    exportData(field) {
      this.util.export(field + '.txt', this.createData[field]);
    },
    copyText(text) {
      this.util.copyText(text);
    },
    backup() {
      if (this.createType == 'words') {
        this.$emit('createstep', 0);
        // this.create_step = 0;
        return false;
      }
      for (let i = 0; i < 15; i++) {
        this.$parent.removeWord(i);
      }
      this.$parent.wallet_create_step(4);
      // this.wallet_create_step(4);
    }
  }
};
</script>
