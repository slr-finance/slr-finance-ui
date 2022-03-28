<template>
  <header class="app-header z-50 pt-32">
    <div class="app-header-bg backdrop-blur-8 absolute top-0 left-0 w-full h-full z-0 bg-black bg-opacity-40"></div>
    <a
      class="flex items-center"
      href="https://slr.finance"
    >
      <div class="relative z-10 h-50 w-50 rounded-full bg-bnb"></div>
      <div class="relative z-10 text-18 mr-[92px] ml-32">SLR FINANCE</div>
    </a>

    <ul class="links flex-1 relative z-10">
      <li class="item h-full">
        <router-link
          class="link h-full"
          :to="i18nRouteHelper({ name: 'swap' })"
        >
          <div>Swap</div>
        </router-link>
      </li>
      <li class="item h-full">
        <router-link
          class="link h-full"
          :to="i18nRouteHelper({ name: 'presale' })"
        >
          <div>Presale</div>
        </router-link>
      </li>
      <li class="item h-full">
        <router-link
          class="link h-full"
          :to="i18nRouteHelper({ name: 'pool' })"
        >
          <div>Farming</div>
        </router-link>
      </li>
      <li class="item h-full">
        <router-link
          class="link h-full"
          :to="i18nRouteHelper({ name: 'referral' })"
        >
          <div>Refferal</div>
        </router-link>
      </li>
    </ul>

    <ul class="links relative z-10 space-x-24">
      <li class="item h-full">
        <a
          class="link h-full"
          href="https://docs.slr.finance"
        >
          <div>Knowledge base</div>
        </a>
      </li>
      <li class="item h-full">
        <connect-metamask />
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
  import type { LocationAsRelativeRaw } from 'vue-router'
  import { watch, defineComponent } from 'vue'
  import ConnectMetamask from './ConnectWallet/ConnectMetamask.vue'
  import { useWindowScroll, useStyleTag } from '@vueuse/core'

  const getScrollFactorStyle = (scrollY:number) => {
    const scrollFactor = Math.min(scrollY, 97) / 100

    return `:root { --app-ui-header-scroll-factor: ${scrollFactor}`
  }

  export default defineComponent({
    setup() {
      // Handle scroll [BEGIN]
      const { y: scrollY } = useWindowScroll()
      const { css } = useStyleTag(getScrollFactorStyle(scrollY.value))

      watch(
        scrollY,
        () => { css.value = getScrollFactorStyle(scrollY.value) },
      )
      // Handle scroll [END]
    },
    components: {
      ConnectMetamask,
    },
  })
</script>

<style lang="postcss">
  :root {
    --app-ui-header-base-height: 64px;
    --app-ui-header-scroll-padding: 32px;
  }

  .app-header {
    @apply flex fixed top-0 left-0 w-full px-[40px] items-center;
    transform: translateY(calc(var(--app-ui-header-scroll-factor) * -32px));
    height: calc(var(--app-ui-header-base-height) + var(--app-ui-header-scroll-padding));
    padding-top: var(--app-ui-header-scroll-padding);
  }

  .app-header > .app-header-bg {
    opacity: var(--app-ui-header-scroll-factor);
  }

  .app-header > .links {
    @apply flex space-x-32 h-full;
  }

  .app-header > .links > .item {
    @apply h-full;
  }

  .app-header > .links > .item > .link {
    @apply text-14 flex flex-col justify-center items-center leading-none transition duration-300 ease-out hover:ease-in h-full;
  }

  .app-header > .links > .item > .link > .status {
    @apply text-16;
  }

  .app-header > .links > .item:hover > .link {
    color: var(--page-active-color);
  }

  .app-header > .links > .item > .link.router-link-exact-active {
    outline: none;
    color: var(--page-active-color);
    box-shadow: 0 2px 0 var(--page-active-color);
  }
</style>
