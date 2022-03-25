<template>
  <header class="app-header z-50">
    <div
      class="backdrop-blur-8 absolute top-0 left-0 w-full h-full z-0 bg-black bg-opacity-40"
      :style="{ opacity: opacity }"
    ></div>
    <div class="logo relative z-10">SLR FINANCE</div>

    <ul class="links flex-1 relative z-10">
      <li
        class="item h-full"
        v-for="(link, index) in poolsLinks"
        :key="index"
      >
        <router-link
          class="link h-full"
          :to="i18nRouteHelper(link.to)"
        >
          <div>{{ link.text }}</div>
          <div
            v-if="link.isDone"
            class="status"
          >
            done
          </div>
        </router-link>
      </li>
    </ul>

    <ul class="links relative z-10">
      <li class="item h-full">
        <router-link
          class="link h-full"
          :to="i18nRouteHelper({ name: 'presale' })"
        >
          <div>Presale</div>
        </router-link>
      </li>
      <!-- <li class="item h-full">
        <router-link class="link h-full" :to="i18nRouteHelper({ name: 'dashboard' })">
          <div>Dashboard</div>
        </router-link>
      </li> -->
      <li class="item h-full">
        <router-link
          class="link h-full"
          :to="i18nRouteHelper({ name: 'referral' })"
        >
          <div>Refferal</div>
        </router-link>
      </li>
      <li class="item h-full">
        <a
          class="link h-full"
          :href="`https://pancake.kiemtienonline360.com/#/swap?outputCurrency=${tokenAddress}`"
        >
          <div>Buy/Sell</div>
        </a>
      </li>
    </ul>

    <div class="relative z-10">
      <connect-metamask />
    </div>
  </header>
</template>

<script lang="ts">
  import type { LocationAsRelativeRaw } from 'vue-router'
  import { computed, defineComponent } from 'vue'
  import ConnectMetamask from './ConnectWallet/ConnectMetamask.vue'
  import { POOLS_INFO } from '../config/constants/Pools'
  import { useWindowScroll } from '@vueuse/core'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'

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
      const opacity = computed(() => {
        const opacity = Math.min(scrollY.value, 100) / 100

        return opacity.toFixed(2)
      })

      return { poolsLinks, opacity, tokenAddress: contractsAddresses.SolarToken }
    },
    components: {
      ConnectMetamask,
    },
  })
</script>

<style lang="postcss">
  .app-header {
    @apply flex fixed top-0 left-0 w-full h-64 space-x-24 px-24 items-center;
  }

  .app-header > .logo {
    color: var(--page-active-color);
    @apply flex justify-center items-center transition duration-300 ease-out hover:ease-in;
  }

  .app-header > .links {
    @apply flex space-x-24 h-full;
  }

  .app-header > .links > .item {
    @apply h-full;
  }

  .app-header > .links > .item > .link {
    @apply flex flex-col justify-center items-center leading-none transition duration-300 ease-out hover:ease-in h-full;
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
