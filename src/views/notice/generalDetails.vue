<!--
 * @Author: abc
 * @Date: 2021-03-26 18:54:41
 * @LastEditors: abc
 * @LastEditTime: 2021-04-09 14:17:19
 * @Description: notice General
-->
<template>
  <div class="warp pool">
    <h2 class="warp-title pool-flex">
      <span>{{ $t('notice.details') }}</span>
    </h2>
    <div class="warp-box">
      <div class="miner-noData" v-if="!objNotice.title">
        <img src="@/assets/image/miner-1.png" alt="noData" />
        <div>
          {{ $t('emptyData') }}
        </div>
      </div>
      <div class="notice" v-else>
        <h3 class="notice-title">{{ objNotice.title }}</h3>
        <p class="notice-warp">
          <span v-if="parseInt(objNotice.type) === 1">{{
            $t('maintenance.notice')
          }}</span>
          <span v-if="parseInt(objNotice.type) === 2">
            {{ $t('system.notice') }}</span
          >
          <span v-if="parseInt(objNotice.type) === 3">{{
            $t('important.notice')
          }}</span>

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
    </div>
  </div>
</template>
<script>
import { Base64 } from 'js-base64';
export default {
  props: {},
  data() {
    return {
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
      const id = this.$route.params.id;
      const res = await this.$http.get(
        `/managenoticerelease/${id}`,
        {},
        { interType: 'mainserver' }
      );
      if (res.code === 0) {
        console.log(JSON.stringify(res));
        res.data.info = Base64.decode(res.data.info);
        this.objNotice = res.data;
      }
    }
  }
};
</script>
