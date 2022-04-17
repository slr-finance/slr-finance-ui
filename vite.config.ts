import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import viteFonts from 'vite-plugin-fonts'
import { splitVendorChunkPlugin } from 'vite'

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
        path.resolve(process.cwd(), 'src/assets/icons'),
        path.resolve(process.cwd(), 'src/assets/icons/wallets'),
        path.resolve(process.cwd(), 'src/assets/icons/currency'),
        path.resolve(process.cwd(), 'src/assets/icons/card'),
        path.resolve(process.cwd(), 'src/assets/icons/social'),
      ],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    viteFonts({
      custom: {
        families: [
          {
            name: 'Karelia',
            local: 'Karelia',
            src: './src/assets/fonts/Karelia-Outtakes.*',
          },
          {
            name: 'Niketo',
            local: 'Niketo',
            src: './src/assets/fonts/niketo.*',
          },
        ],
        display: 'block',
        preload: true,
      },
    }),
    splitVendorChunkPlugin(),
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
