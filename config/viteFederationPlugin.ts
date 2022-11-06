import federation from '@originjs/vite-plugin-federation'

const MF_CONTAINER_NAME = 'slr-common'
export const viteFederationPlugin = federation({
  name: 'host-app',
  filename: 'slr-app',
  remoteType: 'module',
  remotes: {
    'slr-common': {
      /**
       * Container locations from which modules should be resolved and loaded at runtime.
       */
      external: `http://localhost:4000/remoteEntry.js`,
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
    // 'vue': {
    //   singleton: true
    // }
  }
})