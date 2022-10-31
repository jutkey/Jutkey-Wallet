import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import fs from 'fs';
import removeConsole from 'vite-plugin-remove-console';

// import OptimizationPersist from 'vite-plugin-optimize-persist';
// import PkgConfig from 'vite-plugin-package-config';
// console.log(PkgConfig);
const optimizeDepsElementPlusIncludes = ['element-plus/es'];
fs.readdirSync('node_modules/element-plus/es/components').forEach((dirname) => {
  fs.access(
    `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
    (err) => {
      if (!err) {
        optimizeDepsElementPlusIncludes.push(
          `element-plus/es/components/${dirname}/style/css`
        );
      }
    }
  );
});
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  console.log(mode, command);
  const boo = mode === 'dev';
  console.log(boo);
  console.log(process.env.TAURI_DEBUG);
  const alias = {
    '@': path.resolve(__dirname, './src'),
    pages: path.resolve(__dirname, './src/pages'),
    assets: path.resolve(__dirname, './src/assets'),
    images: path.resolve(__dirname, './src/assets/image'),
    store: path.resolve(__dirname, './src/store'),
    plugins: path.resolve(__dirname, './src/plugins'),
    components: path.resolve(__dirname, './src/components'),
    'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    web3: 'web3/dist/web3.min.js'
    // process: 'process/browser',
    // stream: 'stream-browserify'
  };
  return defineConfig({
    optimizeDeps: {
      include: optimizeDepsElementPlusIncludes
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      removeConsole()
    ],
    resolve: {
      alias
    },
    css: {
      devSourcemap: boo
    },
    // Vite optons tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    // prevent vite from obscuring rust errors
    clearScreen: false,
    // tauri expects a fixed port, fail if that port is not available
    server: {
      host: '0.0.0.0',
      port: 86,
      strictPort: true
    },
    // to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ['VITE_', 'TAURI_'],
    build: {
      // Tauri supports es2021
      target: ['es2021', 'chrome100', 'safari13'],
      // don't minify for debug builds
      minify: !boo ? 'esbuild' : false,
      // produce sourcemaps for debug builds
      sourcemap: boo,
      assetsDir: 'static',
      chunkSizeWarningLimit: 1500,
      esbuild: {
        drop: ['console', 'debugger']
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/')
              : [];
            const fileName =
              facadeModuleId[facadeModuleId.length - 2] || '[name]';
            return `js/${fileName}/[name].[hash].js`;
          }
        }
      }
    }
  });
};
