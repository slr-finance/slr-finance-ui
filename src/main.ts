import 'virtual:svg-icons-register'
import 'virtual:fonts.css'
import { createApp } from 'vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { isAddress } from 'ethers/lib/utils'
import { router } from './router'
import { stakingModule } from './store/modules/stakingModule'
import App from './App.vue'
import './index.css'
import { store } from './store/store'
import { REFERRER_QUERY_PARAM, REFERRER_STORAGE_NAME } from './config/constants/referrals'
import { slrModule } from './store/modules/slrModule'
import { i18n, i18nRouteHelperPlugin } from './i18n'

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

// Fetch pools and slr price [BEGIN]
stakingModule.once('registered', stakingModule.actions.fetchAll)
slrModule.once('registered', slrModule.actions.fetchPrice)

stakingModule.register(store)
slrModule.register(store)
// Fetch pools and slr price [END]

// Mount app [BEGIN]
const app = createApp(App).use(i18n).use(i18nRouteHelperPlugin).use(router).use(Toast, { position: POSITION.TOP_LEFT })

app.mount('#app')
// Mount app [END]

// Cache video [BEGIN]
import('@/utils/video/prefetchPoolsVideo').then(({ prefetchPoolsVideo }) => prefetchPoolsVideo())
// Cache video [END]
