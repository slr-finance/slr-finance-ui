<template>
  <div class="flex justify-start items-center">
    <ui-icon
      name="menu"
      class="ui-link"
      size="18"
      @click="toggle"
    />
    <teleport
      to="#ui-mobile-header-menu-place"
      v-if="isOpen"
    >
      <nav class="fixed top-0 left-0 z-mobile-menu w-full h-full bg-black ui-mobile-header-menu-content">
        <ul class="flex flex-col space-y-32">
          <li
            class="h-full"
            :key="index"
            v-for="(link, index) in links"
          >
            <ui-link
              class="text-14 flex flex-col justify-center items-center leading-none h-full"
              v-bind="link"
            />
          </li>
          <li class="h-full">
            <ui-link
              class="text-14 flex flex-col justify-center items-center leading-none h-full"
              href="https://docs.slr.finance"
              rel="noopener noreferrer"
            >
              <div>Knowledge base</div>
            </ui-link>
          </li>
        </ul>
      </nav>
    </teleport>
  </div>
</template>

<script lang="ts">
  import type { UiLinkProps } from '../UiLink.vue'
  import { defineComponent, PropType, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useToggle } from '@vueuse/shared'
  import UiIcon from '../UiIcon'
  import UiLink from '../UiLink.vue'

  export default defineComponent({
    name: 'ui-mobile-header-menu',
    props: {
      links: {
        type: Array as PropType<UiLinkProps[]>,
        required: true,
      },
    },
    setup() {
      const [isOpen, toggle] = useToggle()
      const route = useRoute()

      watch(route, () => {
        isOpen.value = false
      })

      return {
        isOpen,
        toggle: () => toggle(),
      }
    },
    components: {
      UiIcon,
      UiLink,
    },
  })
</script>

<style>
  .ui-mobile-header-menu-content {
    padding-top: calc(var(--app-ui-header-height) + var(--app-ui-header-offset));
  }
</style>
