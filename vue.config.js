/*
 * @Author: abc
 * @Date: 2020-10-24 16:13:49
 * @LastEditors: abc
 * @LastEditTime: 2021-03-22 15:42:31
 * @Description:vue-cil config
 */
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
let pattern = false;
if (process.env.NODE_ENV !== 'production') {
  pattern = true;
} else {
  pattern = false;
}
module.exports = {
  //publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  productionSourceMap: pattern,
  css: {
    sourceMap: pattern,
    extract: !pattern
  },
  runtimeCompiler: true,
  // lintOnSave: false,
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',
    port: 8080
  },
  chainWebpack: (config) => {
    // ============ Compressed picture start============
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end();
    // ============ Compressed picture end============
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.jutkey.wallet',
        asar: true,
        productName: 'Jutkey Wallet',
        afterPack: './public/afterPack.js',
        copyright: 'This is an Jutkey Wallet project',
        directories: {
          buildResources: 'public',
          output: 'build'
        },
        win: {
          icon: './public/img/icons/favicon.ico',
          target: [
            {
              target: 'nsis',
              arch: ['x64', 'ia32']
            }
          ]
        },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            }
          ]
        },
        mac: {
          icon: './public/img/icons/512.icns'
        },
        publish: [
          {
            provider: 'generic',
            url: 'http://127.0.0.1:5501/download/'
          }
        ],
        nsis: {
          oneClick: false,
          perMachine: false,
          allowElevation: true,
          allowToChangeInstallationDirectory: true,
          installerIcon: './public/img/icons/favicon.ico',
          uninstallerIcon: './public/img/icons/favicon.ico',
          installerHeaderIcon: './public/img/icons/favicon.ico',
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: 'Jutkey Wallet'
        }
      }
    }
  }
};
