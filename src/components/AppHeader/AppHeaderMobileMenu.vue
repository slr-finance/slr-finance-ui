<template>
  <div class="flex justify-start items-center">
    <ui-icon
      name="menu"
      class="ui-link"
      size="18"
      @click="toggle"
    />
    <teleport
      to="#header-mobile-menu-place"
      v-if="isOpen"
    >
      <nav class="fixed z-mobile-menu w-full h-full bg-black app-header-mobile-menu-content">
        <ul class="flex flex-col space-y-32">
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
          <li class="h-full">
            <a
              class="ui-link text-14 flex flex-col justify-center items-center leading-none h-full"
              href="https://docs.slr.finance"
            >
              <div>Knowledge base</div>
            </a>
          </li>
        </ul>
      </nav>
    </teleport>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useToggle } from '@vueuse/shared'
  import { linksList } from './linksList'
  import UiIcon from '@/components/ui/UiIcon.vue'

  export default defineComponent({
    name: 'app-header-mobile-menu',
    components: {
      UiIcon,
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
        links: linksList,
      }
    },
  })
</script>

<style>
  .app-header-mobile-menu-content {
    padding-top: calc(var(--app-ui-header-base-height) + var(--app-ui-header-scroll-padding));
  }
</style>
