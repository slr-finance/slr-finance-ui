<template>
  <header
    class="absolute w-full h-72 px-ui-page-spacing z-header top-0 flex justify-between items-center space-x-8 bg-black bg-opacity-60"
  >
    <div class="flex space-x-8">
      <ui-icon
        size="36"
        name="slr-logo"
      />
      <app-header-mobile-menu class="flex-1 relative z-10 ml-8" />
    </div>

    <div class="flex space-x-8">
      <app-header-mobile-token-price />
      <connect-wallet :is-mobile="true" />
    </div>
  </header>
  <div id="header-mobile-menu-place"></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import ConnectWallet from '@/components/ConnectWallet/ConnectWallet.vue'
  import AppHeaderMobileMenu from './AppHeaderMobileMenu.vue'
  import AppHeaderMobileTokenPrice from './AppHeaderMobileTokenPrice.vue'

  export default defineComponent({
    components: {
      UiIcon,
      ConnectWallet,
      AppHeaderMobileMenu,
      AppHeaderMobileTokenPrice,
    },
  })
</script>

<style lang="postcss">
  :root {
    --app-ui-header-scroll-padding: 0px;
    --app-ui-header-padding: 16px;
  }
</style>
