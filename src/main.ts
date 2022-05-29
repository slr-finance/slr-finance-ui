import 'virtual:svg-icons-register'
import '@/index.postcss'
import '@/components/ui/index.postcss'
import { createApp, nextTick } from 'vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { isAddress } from 'ethers/lib/utils'
import { router } from '@/router'
import App from '@/App.vue'
import { store } from '@/store/store'
import { REFERRER_QUERY_PARAM, REFERRER_STORAGE_NAME } from '@/config/constants/referrals'

// Referral [BEGIN]
let referrer: string | null = localStorage.getItem(REFERRER_STORAGE_NAME)
const url = new URL(window.location.href)
const searchParams = new URLSearchParams(url.search)

if (!referrer || !isAddress(referrer)) {
  referrer = searchParams.get(REFERRER_QUERY_PARAM)

  if (referrer && isAddress(referrer)) {
    localStorage.setItem(REFERRER_STORAGE_NAME, referrer)
  } else {
    referrer = null
  }
}

searchParams.delete(REFERRER_QUERY_PARAM)
url.search = searchParams.toString()

window.history.replaceState({}, '', `${url.pathname.toString()}${url.search}`)
// Referral [END]

// Mount app [BEGIN]
const app = createApp(App).use(router).use(Toast, { position: POSITION.TOP_LEFT })

app.mount('#app')
// Mount app [END]

const fetchPools = async () => {
  const { stakingModule } = await import('@/store/modules/stakingModule')

  // If the module is already registered, then just call the action.
  // If not, add a registered listener and register the module
  if (stakingModule.hasModule()) {
    stakingModule.actions.fetchAll()
  } else {
    stakingModule.once('registered', stakingModule.actions.fetchAll)
    stakingModule.register(store)
  }
}

const fetchSlrPrice = async () => {
  const { slrModule } = await import('@/store/modules/slrModule')

  // If the module is already registered, then just call the action.
  // If not, add a registered listener and register the module
  if (slrModule.hasModule()) {
    slrModule.actions.fetchPrice()
  } else {
    slrModule.once('registered', slrModule.actions.fetchPrice)
    slrModule.register(store)
  }
}

nextTick(() => {
  // Fetch pools and slr price [BEGIN]
  fetchPools()
  fetchSlrPrice()
  // Fetch pools and slr price [END]

  // Cache video [BEGIN]
  setTimeout(() => {
    import('@/utils/video/prefetchPoolsVideo').then(({ prefetchPoolsVideo }) => prefetchPoolsVideo())
  }, 1000)
  // Cache video [END]
})
