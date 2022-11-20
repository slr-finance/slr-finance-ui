<template>
  <ui-button
    :href="walletInfo.link"
    :size="48"
  >
    <wallet-icon
      class="w-18 h-18"
      :wallet-name="walletInfo.walletName"
    />
    {{ wallet }}
  </ui-button>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { UiButton } from '@slr-finance/uikit'
  import { WalletName } from '@/hooks/dapp/useWallet'
  import WalletIcon from '../WalletIcon'

  const walletDeepLinkInfo = {
    [WalletName.metamask]: {
      prefix: 'https://metamask.app.link/wc?uri=',
      walletName: WalletName.metamask,
    },
    [WalletName.trustwallet]: {
      prefix: 'https://link.trustwallet.com/wc?uri=',
      walletName: WalletName.trustwallet,
    },
  }

  export default defineComponent({
    name: 'walletconnect-mobile-deep-link',
    props: {
      wallet: {
        type: String as PropType<keyof typeof walletDeepLinkInfo>,
        required: true,
      },
      uri: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const walletInfo = computed(() => ({
        link: `${walletDeepLinkInfo[props.wallet].prefix}${props.uri}`,
        walletName: walletDeepLinkInfo[props.wallet].walletName,
      }))

      return {
        walletInfo,
      }
    },
    components: {
      WalletIcon,
      UiButton,
    },
  })
</script>
