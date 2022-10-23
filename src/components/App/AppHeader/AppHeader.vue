<template>
  <ui-header
    :desktop-menu="links"
    :mobile-menu="links"
  >
    <template #action>
      <connect-wallet />
    </template>

    <template #mobile-action>
      <div class="flex space-x-8">
        <app-header-mobile-token-price />
        <connect-wallet is-mobile />
      </div>
    </template>
  </ui-header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { UiLinkProps } from '@slr-finance/uikit'
  import { UiButton, UiHeader } from '@slr-finance/uikit'
  import ConnectWallet from '@/components/ConnectWallet/ConnectWallet.vue'
  import AppHeaderMobileTokenPrice from './AppHeaderMobileTokenPrice.vue'

  const links: UiLinkProps[] = [
    // {
    //   text: 'Swap',
    //   to: { name: 'swap' },
    // },
    {
      text: 'Presale',
      to: { name: 'presale' },
    },
    {
      text: 'Staking',
      to: { name: 'pool' },
    },
    {
      text: 'Referral',
      to: { name: 'referral' },
    },
    {
      text: 'Achievements',
      to: { name: 'achievements' },
    }
  ]

  export default defineComponent({
    name: 'app-header',
    setup() {
      return { links }
    },
    components: {
      UiHeader,
      UiButton,
      ConnectWallet,
      AppHeaderMobileTokenPrice,
    },
  })
</script>
