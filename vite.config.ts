import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSsgOptions } from './config/viteSsgOptions'
import { viteFederationPlugin } from './config/viteFederationPlugin'
import topLevelAwait from "vite-plugin-top-level-await";
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    viteCommonjs({include: '*'}),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    }),
    viteFederationPlugin,
    vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [
        path.resolve(process.cwd(), 'src/components/ui/UiIcon/icons'),
        path.resolve(process.cwd(), 'src/components/ui/UiIcon/icons/social'),
        path.resolve(process.cwd(), 'src/components/ui/UiIcon/icons/pools'),
        path.resolve(process.cwd(), 'src/components/ui/UiIcon/icons/wallets'),
        path.resolve(process.cwd(), 'src/components/ui/UiIcon/icons/currency'),
        path.resolve(process.cwd(), 'src/components/ui/UiIcon/icons/card'),
        path.resolve(process.cwd(), 'src/components/ui/UiIcon/icons/social'),
        path.resolve(process.cwd(), 'src/assets/icons'),
      ],
      inject: 'body-last',
      symbolId: 'ui-icon-[dir]-[name]',
    }),
  ],
  build: {
    emptyOutDir: true,
    // minify: 'terser',
    // terserOptions: {
    //   ecma: 2020,
    //   safari10: true,
    //   ie8: false,
    //   module: false,
    //   toplevel: true,
    //   compress: {
    //     ecma: 2020,
    //     passes: 4,
    //   },
    // },
    target: 'es2020',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  ssgOptions: viteSsgOptions,
})
