/*
 * @Author: renlei
 * @Date: 2019-06-05 17:18:58
 * @LastEditors: abc
 * @LastEditTime: 2021-03-10 15:18:46
 * @Description globel component
 */
import Vue from 'vue';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const common = require.context('./common', true, /\.vue$/);

/**
 * @name: handle
 * @description:
 * @param {type} :{ type }
 * @return:
 */
function components(params) {
  params.keys().forEach((fileName) => {
    const componentConfig = params(fileName);
    const componentName = capitalizeFirstLetter(
      fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    );
    Vue.component(componentName, componentConfig.default || componentConfig);
  });
}

// common components
components(common);
