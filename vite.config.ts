import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import { visualizer } from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'

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
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [
        inject({ Buffer: ['buffer', 'Buffer'] }),
        visualizer((opts) => {
          return { filename: path.join(opts.dir, 'stats.html') }
        }),
        terser({ toplevel: true, compress: { passes: 3, side_effects: true, toplevel: true } }),
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
