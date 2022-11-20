import { ViteSSG } from 'vite-ssg'
import 'virtual:svg-icons-register'
import '@/index.postcss'
import '@slr-finance/uikit/styles'
import '@/components/ui/index.postcss'
import { routerOptions } from '@/router'
import App from '@/App.vue'

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  routerOptions,
  // function to have custom setups
  ({ app }) => {
    // install plugins etc.

    // Vite-SSG already provided @vueuse/head
    //
    // import { createHead } from '@vueuse/head'
    // const head = createHead()
    // app.use(head)
  },
  {
    rootContainer: '#slr-app',
  }
)
