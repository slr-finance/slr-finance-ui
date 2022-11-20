<template>
  <nav class="fixed left-0 bottom-0 w-full px-ui-page-spacing pb-ui-page-spacing z-ui-page-content">
    <ul
      class="bg-black bg-opacity-80 py-8 border border-gray-800 rounded-18 flex w-full h-72 divide-x divide-gray-800 backdrop-blur-4"
    >
      <li
        v-for="link in links"
        :key="link.to.name"
        class="flex flex-1"
      >
        <router-link
          class="link"
          :to="link.to"
          active-class="-active"
        >
          <app-mobile-bottom-navigation-icons
            :icon-component="link.icon"
            class="mb-10 w-24 h-24"
          />
          {{ link.label }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
  import { defineComponent, onUnmounted } from 'vue'
  import AppMobileBottomNavigationIcons from './AppMobileBottomNavigationIcons.vue'
  import { useMobileBottomNavigation } from './hooks/useMobileBottomNavigation'

  const links = [
    {
      label: 'Dashboard',
      icon: 'UiIconMobileNavigationDashboard',
      to: { name: 'dashboard' },
    },
    {
      label: 'Presale',
      icon: 'UiIconPixelArrowBoth',
      to: { name: 'presale' },
    },
    {
      label: 'Staking',
      icon: 'UiIconMobileNavigationStaking',
      to: { name: 'pool' },
    },
    {
      label: 'Referral',
      icon: 'UiIconMobileNavigationReferral',
      to: { name: 'referral' },
    },
  ]

  export default defineComponent({
    setup() {
      const { setState } = useMobileBottomNavigation()

      setState(true)
      onUnmounted(() => setState(false))

      return { links }
    },
    components: { AppMobileBottomNavigationIcons },
  })
</script>

<style
  scoped
  lang="postcss"
>
  .link {
    @apply flex-1 flex flex-col justify-center items-center text-gray-500 text-9 uppercase font-title transition-colors duration-200;
  }
  .link.-active {
    @apply text-white;
  }
</style>
