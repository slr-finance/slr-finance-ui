import { ViteSSG } from 'vite-ssg'
import { createHead } from '@vueuse/head'
import 'virtual:svg-icons-register'
import '@/index.postcss'
import '@slr-finance/uikit/dist/style.css'
import '@/components/ui/index.postcss'
import { nextTick } from 'vue'
import { initReferral } from '@slr-finance/ui-share'
import { routerOptions } from '@/router'
import App from '@/App.vue'

// Referral [BEGIN]
if (!import.meta.env.SSR) {
  initReferral()
}
// Referral [END]

// Mount app [BEGIN]
export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  routerOptions,
  // function to have custom setups
  ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
    const head = createHead()

    app.use(head)
  },
  )
// Mount app [END]

if (!import.meta.env.SSR) {
  nextTick(() => {
    // Cache video [BEGIN]
    setTimeout(() => {
      import('@/utils/video/prefetchPoolsVideo').then(({ prefetchPoolsVideo }) => prefetchPoolsVideo())
    }, 1000)
    // Cache video [END]
  })
}
