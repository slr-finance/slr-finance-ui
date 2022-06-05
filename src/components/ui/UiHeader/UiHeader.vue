<template>
  <ui-desktop-header
    v-if="isDesktop"
    :links="desktopMenu"
  >
    <template #action>
      <slot name="action" />
    </template>
    <template #desktop-logo>
      <slot name="desktop-logo" />
    </template>
    <template #laptop-logo>
      <slot name="laptop-logo" />
    </template>
  </ui-desktop-header>

  <ui-mobile-header
    v-else
    :links="mobileMenu"
  >
    <template #mobile-logo>
      <slot name="mobile-logo" />
    </template>
    <template #mobile-action>
      <slot name="mobile-action" />
    </template>
  </ui-mobile-header>
</template>

<script lang="ts">
  import type { UiLinkProps } from '../UiLink.vue'
  import { defineAsyncComponent, defineComponent, PropType, watch } from 'vue'
  import { useBreakpoints } from '@vueuse/core'
  import UiMobileHeader from './UiMobileHeader.vue'
  import { HeaderType, useHeader } from './hooks/useHeader'

  export default defineComponent({
    props: {
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
