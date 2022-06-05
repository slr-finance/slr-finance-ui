<template>
  <header
    class="absolute w-full h-72 px-ui-page-spacing z-header top-0 flex justify-between items-center space-x-8 bg-black bg-opacity-50"
  >
    <div class="flex space-x-8">
      <slot name="mobile-logo"/>
      
      <ui-mobile-header-menu
        class="flex-1"
        :links="links"
      />
    </div>

    <slot name="mobile-action"/>
  </header>
  <div id="ui-mobile-header-menu-place"/>
</template>

<script lang="ts">
  import type { UiLinkProps } from '../UiLink.vue'
  import { defineComponent, PropType } from 'vue'
  import UiMobileHeaderMenu from './UiMobileHeaderMenu.vue'

  export default defineComponent({
    name: 'ui-mobile-header',
    props: {
      links: {
        type: Array as PropType<UiLinkProps[]>,
        required: true,
      },
    },
    components: {
      UiMobileHeaderMenu,
    },
  })
</script>
