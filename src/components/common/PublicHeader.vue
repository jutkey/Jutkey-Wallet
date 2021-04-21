<!--
 * @Author: abc
 * @Date: 2021-01-30 10:59:44
 * @LastEditors: abc
 * @LastEditTime: 2021-04-12 15:32:05
 * @Description: header
-->
<template>
  <div class="header">
    <i
      :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="toggleCollapse"
    ></i>
    <div class="header-time">
      <p class="time">{{ time }} (UTC)</p>
      <p class="date">{{ date }}</p>
    </div>
    <i
      class="iconfont el-ui-Group20"
      @click="handleToggleTheme(0)"
      :class="{ themeSelect: parseInt(index) === 0 }"
    ></i>
    <i
      class="iconfont el-ui-moon"
      @click="handleToggleTheme(1)"
      :class="{ themeSelect: parseInt(index) === 1 }"
    ></i>
    <div class="header-user">
      <div class="header-user-notice">
        <el-popover
          placement="bottom-end"
          class="header-popover"
          width="350"
          v-model="popoverVisible"
        >
          <div class="header-user-massage">
            <li
              v-for="item in newnotice"
              @click="handleViewDetailPoll(item)"
              :key="item.id"
              class="header-user-massage-item"
            >
              <p class="header-user-massage-item-block">
                {{ item.header }}
              </p>
              <el-tooltip
                :content="item.date_created | formatTimeUtc"
                placement="top"
              >
                <span class="header-user-massage-item-time">
                  {{ item.date_created | formatTime }}</span
                >
              </el-tooltip>
              <div class="header-user-massage-item-line"></div>
            </li>
            <li
              class="header-user-massage-item-bottom"
              @click="popoverVisible = false"
            >
              <router-link :to="{ path: '/notice' }">
                {{ $t('seeAllNotice') }}
              </router-link>
            </li>
          </div>
          <el-badge slot="reference">
            <i class="iconfont el-ui-ic_notification"></i>
          </el-badge>
        </el-popover>
      </div>
      <div class="header-user-info">
        <router-link :to="{ path: '/user' }" class="header-user-info-a">
          <img
            :src="$store.state.userInfo.avatar"
            alt="head"
            v-if="$store.state.userInfo.avatar"
            class="header-user-info-head"
          />
          <img
            src="@/assets/image/profile.png"
            alt="head"
            v-else
            class="header-user-info-head"
          />
        </router-link>
        <span
          class="header-user-info-nickname"
          v-if="$store.state.userInfo.member_name"
          >{{ $store.state.userInfo.member_name }}</span
        >
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="handleLogout">
                <i class="el-icon-switch-button"></i>
                <span>{{ $t('logout') }}</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      index: 0,
      timer: null,
      time: '',
      date: '',
      nickname: '',
      newnotice: [],
      popoverVisible: false,
      dropdown: {
        profile: false,
        notice: false
      }
    };
  },
  computed: {
    isCollapse() {
      return this.$store.getters.booCollapse;
    }
  },
  watch: {},
  inject: ['reload'],
  created() {},
  mounted() {
    const token = window.localStorage.getItem('nodeTokens');
    if (token) {
      this.handleNewnotice();
      this.timer = setInterval(this.updateTime, 1000);
      this.$store.dispatch('handleActionEcology');
    }
    this.index = window.localStorage.getItem('theme');
  },
  methods: {
    updateTime() {
      var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      var cd = new Date();
      this.time =
        this.zeroPadding(cd.getUTCHours(), 2) +
        ':' +
        this.zeroPadding(cd.getUTCMinutes(), 2) +
        ':' +
        this.zeroPadding(cd.getUTCSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getUTCFullYear(), 4) +
        '-' +
        this.zeroPadding(cd.getUTCMonth() + 1, 2) +
        '-' +
        this.zeroPadding(cd.getUTCDate(), 2) +
        ' ' +
        week[cd.getUTCDay()];
    },
    zeroPadding(num, digit) {
      var zero = '';
      for (var i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    },
    async handleNewnotice() {
      const res = await this.$http.post(
        '/minernotifications',
        { limit: 5, page: 1, order: 'id desc', where: {} },
        { interType: 'poolserver' }
      );
      if (res.code === 0 && res.data) {
        this.newnotice = res.data.rets;
      }
      console.log(res);
    },
    handleLogout() {
      this.$store.commit('logout');
      this.$axios.defaults.headers.common['Authorization'] = '';
      this.$router.replace('/login');
      // this.reload();
    },
    toggleCollapse() {
      this.$store.commit('handleCollapse', !this.isCollapse);
    },
    handleViewDetailPoll(row) {
      console.log(row);
      this.popoverVisible = false;
      this.$router.push({
        name: 'chainDetails',
        params: {
          id: row.id
        }
      });
    },
    handleToggleTheme(index) {
      this.index = index;
      const elementTheme = document.getElementById('elementTheme');
      // console.log(elementTheme.getAttribute('href'));
      // index is 0, theme is light
      // index is 1, theme is dark
      let theme = index === 1 ? 'dark' : 'light';
      this.$store.dispatch('handleActionTheme', index);
      elementTheme.setAttribute(
        'href',
        `${this.publicPath}theme/${theme}/theme/index.css`
      );
      window.localStorage.setItem('theme', index);
      window.document.documentElement.setAttribute('data-theme', theme);
      this.reload();
    }
  },
  deactivated() {
    clearInterval(this.timer);
    this.timer = null;
    this.handleNewnotice = null;
  }
};
</script>
