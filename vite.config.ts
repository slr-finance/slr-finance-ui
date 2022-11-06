import path from 'path'
import poolsConfig from './config/poolsConfig.json'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import generateSitemap from 'vite-ssg-sitemap'
import federation from '@originjs/vite-plugin-federation'

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
        path.resolve(process.cwd(), 'src/assets/icons'),
      ],
      inject: 'body-last',
      symbolId: 'ui-icon-[dir]-[name]',
    }),
    federation({
      name: 'host-app',
      remotes: {
        'slr-common': {
          /**
           * Container locations from which modules should be resolved and loaded at runtime.
           */
          external: 'http://localhost:3000/remoteEntry.js',
          externalType: 'url',
          /**
           * The name of the share scope shared with this remote.
           */
          shareScope: 'mf-slr-share-cope',
          /**
           * the remote format
           */
          // format: 'systemjs',
          /**
           * from
           */
          from: 'webpack',
        }
      },
      shared: {
        vue: {
          import: true,
        },
      }
    })
  ],
  build: {
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
    target: 'esnext',
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
  // @ts-ignore
  ssgOptions: {
    format: 'esm',
    dirStyle: 'flat',
    rootContainerId: 'app',
    concurrency: 20,
    script: 'async',
    formatting: 'minify',
    includedRoutes(paths, routes) {
      // use original route records
      return routes.flatMap((route) => {
        switch (route.name) {
          case 'pool':
            const paths = poolsConfig.pools.map(({ name }) => `/pool/${name.toLocaleLowerCase()}`)

            paths.push('/pool')

            return paths
          case '404': 
            return '/404'

          default:
            return route.path
        }
      })
    },
    onFinished() {
      generateSitemap({
        hostname: 'https://app.slr.finance/',
        dynamicRoutes: poolsConfig.pools.map(({ name }) => `/pool/${name.toLocaleLowerCase()}`),
      })
    },
  },
})
