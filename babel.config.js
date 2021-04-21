/*
 * @Author: abc
 * @Date: 2021-01-29 18:41:50
 * @LastEditors: abc
 * @LastEditTime: 2021-04-19 18:27:08
 * @Description:babel
 */
const plugins = [];
//remove console
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console');
}
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [...plugins, 'equire']
  //plugins: ['equire']
};
