import type { ViteSSGOptions } from 'vite-ssg'
import generateSitemap from 'vite-ssg-sitemap'
import poolsConfig from './poolsConfig.json'

export const viteSsgOptions: ViteSSGOptions = {
  mode: 'development',
  format: 'esm',
  // mock: true,
  dirStyle: 'flat',
  rootContainerId: 'slr-app',
  concurrency: 20,
  script: 'async',
  formatting: 'none',
  includeAllRoutes: false,
  includedRoutes(paths, routes) {
    // use original route records
    return routes.flatMap((route) => {
      switch (route.name) {
        case 'pool':
          const insertPaths = poolsConfig.pools.map(({ name }) => `/pool/${name.toLocaleLowerCase()}`)

          insertPaths.push('/pool')

          return insertPaths
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
}
