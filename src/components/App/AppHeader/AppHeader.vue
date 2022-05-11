<template>
  <app-header-desktop v-if="isDesktop" />
  <app-header-mobile v-else />
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, watch } from 'vue'
  import AppHeaderMobile from './AppHeaderMobile.vue'
  import { HeaderType, useHeader } from './hooks/useHeader'

  export default defineComponent({
    props: {
      isDesktop: {
        type: Boolean,
        required: true,
      },
    },
    setup(props) {
      const { setHeaderType } = useHeader()

      watch(
        () => props.isDesktop,
        (isDesktop) => setHeaderType(isDesktop ? HeaderType.DEFAULT_DESKTOP : HeaderType.DEFAULT_MOBILE),
        { immediate: true },
      )
    },
    components: {
      AppHeaderDesktop: defineAsyncComponent({
        loader: () => import('./AppHeaderDesktop.vue'),
      }),
      AppHeaderMobile,
    },
  })
</script>
