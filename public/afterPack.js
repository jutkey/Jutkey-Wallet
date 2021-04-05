/*
 * @Author: abc
 * @Date: 2020-10-22 16:49:58
 * @LastEditors: abc
 * @LastEditTime: 2021-01-29 18:11:08
 * @Description:
 */
const fs = require('fs');
const path = require('path');
async function afterPack(context) {
  let readmePath = path.join(
    context.appOutDir,
    'resources/app.asar.unpacked/README.md'
  );
  if (fs.existsSync(readmePath)) {
    fs.unlinkSync(readmePath);
  }
}
module.exports = afterPack;
