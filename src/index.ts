import 'virtual:svg-icons-register'
import { nextTick } from 'vue'
import '@/index.postcss'
import '@slr-finance/uikit/styles'
import '@/components/ui/index.postcss'
import { initReferral } from '@slr-finance/ui-share'
export * from './createApp'

// Referral [BEGIN]
if (!import.meta.env.SSR) {
  initReferral()
}
// Referral [END]

if (!import.meta.env.SSR) {
  nextTick(() => {
    // Cache video [BEGIN]
    setTimeout(() => {
      import('@/utils/video/prefetchPoolsVideo').then(({ prefetchPoolsVideo }) => prefetchPoolsVideo())
    }, 1000)
    // Cache video [END]
  })
}
