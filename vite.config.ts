import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
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
      ],
      inject: 'body-last',
      symbolId: 'ui-icon-[dir]-[name]',
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      ecma: 2020,
      safari10: true,
      ie8: false,
      module: false,
      toplevel: true,
      compress: {
        ecma: 2020,
        passes: 4,
      },
    },
    rollupOptions: {
      plugins: [
        visualizer((opts) => {
          return { filename: path.join(opts.dir, 'stats.html') }
        }),
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
