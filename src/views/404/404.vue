<template>
  <div class="flex-1 pt-ui-page-header-spacing pb-ui-page-bottom-spacing px-ui-page-spacing flex flex-col justify-center items-center">
    <h1 class="text-white font-title mb-16 text-ui-page-title">
      <span class="text-white text-opacity-60">404</span>
      Page not found :(
    </h1>

    <ui-button
      :to="{name: 'dashboard'}"
      size="48"
      variant="violet"
    >
      Go to Dashboard
    </ui-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useHead } from '@vueuse/head'
  import UiButton from '@/components/ui/UiButton.vue'

  export default defineComponent({
    setup() {
      useHead({
        title: 'SLR.Finance | Page not found :(',
      })
    },
    components: {
      UiButton
    },
  })
</script>

<style
  lang="postcss"
  scoped
></style>
