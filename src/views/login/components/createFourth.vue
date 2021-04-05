<!--
 * @Author: abc
 * @Date: 2021-02-03 15:55:42
 * @LastEditors: abc
 * @LastEditTime: 2021-02-03 18:45:37
 * @Description: 
-->
<template>
  <div class="login-fourth">
    <h3 class="third-level-title__bold login-center">
      {{ $t('wallet.backupwords') }}
    </h3>
    <div class="login-account">{{ $t('wallet.keywords') }}</div>
    <div class="login-third-words">
      <span
        @click="$parent.removeWord(n - 1)"
        v-for="(n, index) in 15"
        :key="index"
        :class="{ hand: checkWords.selected[n - 1].value }"
        ><em>{{
          checkWords.selected[n - 1] ? checkWords.selected[n - 1].value : ''
        }}</em></span
      >
    </div>
    <div class="login-third-words">
      <span
        @click="$parent.pickWord(n - 1)"
        v-for="(n, index) in 15"
        :key="index"
        :class="{ hand: checkWords.random[n - 1] }"
        ><em>{{ checkWords.random[n - 1] }}</em></span
      >
    </div>
    <div class="login-btn-two">
      <el-button
        type="primary"
        @click="$parent.wallet_create_step(3)"
        class="login-btn-item-two"
        >{{ $t('prestep') }}
      </el-button>
      <el-button
        type="primary"
        @click="$parent.wallet_create_step(5)"
        class="login-btn-item-two"
        >{{ $t('confirm') }}
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    logining: {
      type: Boolean,
      default: () => false
    },
    checkWords: {
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
  methods: {}
};
</script>
