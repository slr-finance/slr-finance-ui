import { defineComponent, h, PropType } from 'vue'
import { WalletName } from '@/hooks/dapp/useWallet'
import { UiAsyncIconWalletMetamask, UiAsyncIconWalletTrustwallet, UiAsyncIconWalletWalletconnect, UiTextPlaceholder } from '@slr-finance/uikit'

const icons = {
  [WalletName.metamask]: UiAsyncIconWalletMetamask,
  [WalletName.walletconnect]: UiAsyncIconWalletWalletconnect,
  [WalletName.trustwallet]: UiAsyncIconWalletTrustwallet,
  [WalletName.none]: UiTextPlaceholder,
}

export default defineComponent({
  name: 'wallet-icon',
  props: {
    walletName: {
      type: String as PropType<WalletName>,
      default: WalletName.none,
    }
  },
  render() {
    const walletIconComponent = icons[this.walletName]

    return h(walletIconComponent)
  },
})
