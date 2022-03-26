<template>
  <header
    class="app-header z-50 pt-32 h-[92px]"
    :style="{ transform: styleList.transform }"
  >
    <div
      class="backdrop-blur-8 absolute top-0 left-0 w-full h-full z-0 bg-black bg-opacity-40"
      :style="{ opacity: styleList.opacity }"
    ></div>
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
  import { computed, defineComponent } from 'vue'
  import ConnectMetamask from './ConnectWallet/ConnectMetamask.vue'
  import { POOLS_INFO } from '../config/constants/Pools'
  import { useWindowScroll } from '@vueuse/core'

  type LinkType = {
    text: string
    to: LocationAsRelativeRaw
    isDone: boolean
  }

  const poolsLinks: LinkType[] = POOLS_INFO.map((pool) => {
    return {
      text: pool.name,
      isDone: true,
      to: { name: pool.routeName },
    }
  })

  export default defineComponent({
    setup() {
      const { y: scrollY } = useWindowScroll()

      const styleList = computed(() => {
        const scrollFactor = Math.min(scrollY.value, 100) / 100

        return {
          opacity: scrollFactor.toFixed(2),
          transform: `translateY(-${scrollFactor * 32}px)`,
        }
      })

      return { poolsLinks, styleList }
    },
    components: {
      ConnectMetamask,
    },
  })
</script>

<style lang="postcss">
  .app-header {
    @apply flex fixed top-0 left-0 w-full h-64 px-[40px] items-center;
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
