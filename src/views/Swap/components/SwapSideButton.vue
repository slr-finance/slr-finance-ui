<template>
  <button
    type="button"
    class="swap-side-button h-36 w-36 rounded-10 bg-gray-700 flex justify-center items-center text-white text-opacity-60 transition-colors duration-200"
  >
    <ui-async-icon-pixel-arrow-both
      name="arrow-pixel-both"
      class="w-14 h-14"
    />
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { UiAsyncIconPixelArrowBoth } from '@slr-finance/uikit'

  export default defineComponent({
    name: 'swap-side-button',
    components: {
      UiAsyncIconPixelArrowBoth,
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .swap-side-button:hover {
    @apply text-opacity-100;
  }

  .swap-side-button:active {
    @apply bg-gray-800 text-opacity-100;
  }
</style>
