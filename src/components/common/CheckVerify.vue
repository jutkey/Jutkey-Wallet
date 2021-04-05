<!--
 * @Author: abc
 * @Date: 2021-03-11 16:01:02
 * @LastEditors: abc
 * @LastEditTime: 2021-03-11 16:48:23
 * @Description: 
-->
<template>
  <div class="verify-slider" :class="{ finished: verifyCode == 100 }">
    <div class="verify-slider-wrap">
      <el-slider
        @input="verifyResult"
        :disableds="verifyCode == 100"
        v-model="verifyCode"
        :show-tooltip="false"
      ></el-slider>
    </div>
    <div class="verify-cover">
      {{ verifyCode == 100 ? passText : dragText }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      verifyCode: 0
    };
  },
  props: {
    dragText: {
      type: String,
      default: 'Drag the slider to authenticate'
    },
    passText: {
      type: String,
      default: 'Verified'
    }
  },
  model: {
    event: 'change'
  },
  name: 'verify',
  methods: {
    verifyResult() {
      if (this.verifyCode < 100) {
        this.verifyCode = 0;
      }
      this.$emit('checkchange', this.verifyCode == 100 ? false : true);
    }
  }
};
</script>
<style>
.verify-slider {
  position: relative;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
}
.verify-slider-wrap {
  margin: 0 20px;
  background: #cfe9dd;
  position: relative;
  height: 40px;
}
.el-slider__runway,
.el-slider__bar {
  background: #04b764;
}
.verify-slider-wrap:before,
.verify-slider-wrap:after {
  content: '';
  background: #04b764;
  position: absolute;
  width: 20px;
  left: -20px;
  height: 100%;
  border-radius: 10px 0 0 10px;
}
.verify-slider-wrap:after {
  left: auto;
  right: -20px;
  background: #cfe9dd;
  border-radius: 0 10px 10px 0;
}
.verify-slider.finished {
  position: relative;
}
.verify-slider .verify-cover {
  color: #04b764;
  line-height: 40px;
  position: absolute;
  content: '';
  width: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  text-align: center;
}
.verify-slider.finished .verify-cover {
  z-index: 1002;
  color: #fff;
}
.verify-slider .el-slider__runway {
  height: 0;
  margin: 0;
  position: inherit;
}
.verify-slider .el-slider__bar {
  height: 100%;
  border-radius: 0;
}
.verify-slider .el-slider__button-wrapper {
  top: 0;
  height: 40px;
  width: 40px;
}
.verify-slider .el-slider__button {
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(~@/assets/image/right-arrow.png);
  background-size: 100% 100%;
  border: 1px solid #ddd;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.verify-slider.finished .el-slider__button {
  border-radius: 0 10px 10px 0;
}
</style>
