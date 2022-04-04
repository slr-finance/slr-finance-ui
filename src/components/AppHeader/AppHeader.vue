<template>
  <header
    class="app-header z-header pt-32"
    :class="{ '-mobile': !isDesktop }"
  >
    <div class="app-header-bg backdrop-blur-8 absolute top-0 left-0 w-full h-full z-0 bg-black bg-opacity-40"></div>
    <app-header-logo :is-mobile="!isDesktop" />

    <app-header-mobile-menu
      v-if="!isDesktop"
      class="flex-1 relative z-10 ml-8"
    />

    <app-header-desktop-nav
      v-if="isDesktop"
      class="flex-1 relative z-10"
    />

    <div class="relative z-10 ml-16">
      <connect-metamask :is-mobile="!isLaptop" />
    </div>
  </header>
  <div id="header-mobile-menu-place"></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import AppHeaderLogo from './AppHeaderLogo.vue'
  import ConnectMetamask from '@/components/ConnectWallet/ConnectMetamask.vue'
  import { useStyleTag, useBreakpoints, useEventListener } from '@vueuse/core'
  import AppHeaderDesktopNav from './AppHeaderDesktopNav.vue'
  import AppHeaderMobileMenu from './AppHeaderMobileMenu.vue'

  const getScrollFactorStyle = (scrollY: number) => {
    const scrollFactor = Math.min(scrollY, 97) / 100

    return `:root { --app-ui-header-scroll-factor: ${scrollFactor}`
  }

  export default defineComponent({
    setup() {
      // Handle scroll [BEGIN]
      let ticking = false

      const handleScroll = () => {
        if (ticking) {
          return
        }

        const currentPos = window.scrollY
        ticking = true

        window.requestAnimationFrame(() => {
          css.value = getScrollFactorStyle(currentPos)
          ticking = false
          if (currentPos !== window.scrollY) {
            handleScroll()
          }
        })
      }

      const { css } = useStyleTag(getScrollFactorStyle(window.scrollY))

      useEventListener(window, 'scroll', (event) => {
        handleScroll()
      })
      // Handle scroll [END]

      const { isDesktop, isLaptop } = useBreakpoints({ isDesktop: 1100, isLaptop: 450 })

      return {
        isDesktop,
        isLaptop,
      }
    },
    components: {
      AppHeaderLogo,
      ConnectMetamask,
      AppHeaderDesktopNav,
      AppHeaderMobileMenu,
    },
  })
</script>

<style lang="postcss">
  :root {
    --app-ui-header-base-height: 64px;
    --app-ui-header-scroll-padding: 32px;
  }

  .app-header.-mobile {
    @apply px-16;
  }

  .app-header:not(.-mobile) {
    @apply px-[40px];
  }

  .app-header {
    @apply flex fixed top-0 left-0 w-full items-center;
    transform: translateY(calc(var(--app-ui-header-scroll-factor) * var(--app-ui-header-scroll-padding) * -1));
    height: calc(var(--app-ui-header-base-height) + var(--app-ui-header-scroll-padding));
    padding-top: var(--app-ui-header-scroll-padding);
  }

  .app-header > .app-header-bg {
    opacity: var(--app-ui-header-scroll-factor);
  }
</style>
