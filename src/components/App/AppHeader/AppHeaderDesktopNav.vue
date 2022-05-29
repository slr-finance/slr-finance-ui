<template>
  <ul class="flex space-x-32 h-full">
    <li
      class="h-full"
      v-for="link in links"
    >
      <ui-link
        class="text-14 flex flex-col justify-center items-center leading-none h-full"
        :to="link.route"
      >
        {{ link.label }}
      </ui-link>
    </li>
    <li class="h-full flex flex-1 justify-end">
      <ui-link
        class="text-14 flex flex-col justify-center items-center leading-none h-full"
        href="https://docs.slr.finance"
        rel="noopener noreferrer"
      >
        <div>Knowledge base</div>
      </ui-link>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { linksList } from './linksList'
  import UiLink from '@/components/ui/UiLink.vue'

  export default defineComponent({
    components: { UiLink },
    setup() {
      return { links: linksList }
    },
  })
</script>
