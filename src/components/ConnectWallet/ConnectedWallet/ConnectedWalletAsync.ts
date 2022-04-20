import { defineAsyncComponent } from 'vue'
import ConnectedWalletMobile from './ConnectedWalletMobile.vue'

export default defineAsyncComponent({
  loader: () => import('./ConnectedWallet.vue'),
  errorComponent: ConnectedWalletMobile,
})
