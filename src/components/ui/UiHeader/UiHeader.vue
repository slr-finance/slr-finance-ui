<template>
  <ui-desktop-header
    v-if="type == HeaderType.DEFAULT_DESKTOP"
    :links="desktopMenu"
    :logo-link="logoLink"
  >
    <template #action>
      <slot name="action" />
    </template>
  </ui-desktop-header>

  <ui-mobile-header
    v-else
    :links="mobileMenu"
    :logo-link="logoLink"
  >
    <template #mobile-action>
      <slot name="mobile-action" />
    </template>
  </ui-mobile-header>
</template>

<script lang="ts">
  import type { RouteLocationRaw } from 'vue-router'
  import type { UiLinkProps } from '../UiLink.vue'
  import { defineAsyncComponent, defineComponent, PropType } from 'vue'
  import UiMobileHeader from './UiMobileHeader.vue'
  import { HeaderType, useHeader } from './hooks/useHeader'

  export default defineComponent({
    props: {
      logoLink: {
        type: [String, Object] as PropType<RouteLocationRaw>,
      },
      desktopMenu: {
        type: Array as PropType<UiLinkProps[]>,
        required: true,
      },
      mobileMenu: {
        type: Array as PropType<UiLinkProps[]>,
        required: true,
      }
    },
    setup() {
      const { type } = useHeader()

      return { type, HeaderType }
    },
    components: {
      UiDesktopHeader: defineAsyncComponent({
        loader: () => import('./UiDesktopHeader.vue'),
      }),
      UiMobileHeader,
    },
  })
</script>
