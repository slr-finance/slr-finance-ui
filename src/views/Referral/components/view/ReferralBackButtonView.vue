<template>
  <ui-button
    :size="50"
    variant="gray"
    :to="{ name: 'dashboard' }"
  >
    <ui-icon-pixel-arrow class="rotate-90 w-14 h-14"/>
  </ui-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UiButton, UiIconPixelArrow } from '@slr-finance/uikit'

export default defineComponent({
  name: 'referral-back-button-view',
  components: {
    UiButton,
    UiIconPixelArrow,
  },
})
</script>
