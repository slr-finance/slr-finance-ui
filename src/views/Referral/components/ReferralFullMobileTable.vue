<template>
  <div class="flex flex-col min-h-full">
    <div class="flex items-center mb-32">
      <ui-button
        class="mr-12"
        :size="48"
        variant="gray"
        @click="handleClose"
      >
        <ui-icon-pixel-arrow  class="arrow transform rotate-90 w-8 h-8"/>
      </ui-button>

      <slot name="title" />
    </div>

    <slot />
  </div>
</template>

<script lang="ts">
  import { UiButton, UiIconPixelArrow } from '@slr-finance/uikit'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'referral-full-mobile-table',
    setup(props, { emit }) {
      const handleClose = () => emit('close')

      return { handleClose }
    },
    emits: ['close'],
    components: { UiButton, UiIconPixelArrow },
  })
</script>
