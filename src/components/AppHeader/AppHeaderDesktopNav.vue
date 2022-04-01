<template>
  <ul class="flex space-x-32 h-full">
    <li
      class="h-full"
      v-for="link in links"
    >
      <router-link
        class="ui-link text-14 flex flex-col justify-center items-center leading-none h-full"
        :to="link.route"
      >
        {{ link.label }}
      </router-link>
    </li>
    <li class="h-full flex flex-1 justify-end">
      <a
        class="ui-link text-14 flex flex-col justify-center items-center leading-none h-full"
        href="https://docs.slr.finance"
      >
        <div>Knowledge base</div>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { i18nRouteHelper } from '@/i18n'

  const links = [
    {
      label: 'Swap',
      route: i18nRouteHelper({ name: 'swap' }),
    },
    {
      label: 'Presale',
      route: i18nRouteHelper({ name: 'presale' }),
    },
    {
      label: 'Staking',
      route: i18nRouteHelper({ name: 'pool' }),
    },
    {
      label: 'Refferal',
      route: i18nRouteHelper({ name: 'referral' }),
    },
  ]

  export default defineComponent({
    setup() {
      return { links }
    },
  })
</script>
