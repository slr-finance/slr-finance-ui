<template>
  <ui-desktop-header
    v-if="isDesktop"
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
  import { defineAsyncComponent, defineComponent, PropType, watch } from 'vue'
  import { useBreakpoints } from '@vueuse/core'
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
      const { isDesktop } = useBreakpoints({ isDesktop: 750 })
      const { setHeaderType } = useHeader()

      watch(
        isDesktop,
        (isDesktopVal) => setHeaderType(isDesktopVal ? HeaderType.DEFAULT_DESKTOP : HeaderType.DEFAULT_MOBILE),
        { immediate: true },
      )

      return { isDesktop }
    },
    components: {
      UiDesktopHeader: defineAsyncComponent({
        loader: () => import('./UiDesktopHeader.vue'),
      }),
      UiMobileHeader,
    },
  })
</script>
