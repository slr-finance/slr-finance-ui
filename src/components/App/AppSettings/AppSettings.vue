<template>
  <ui-button
    rounded
    variant="gray"
    :size="50"
  >
    <ui-icon-screw class="w-18 h-18"/>
  </ui-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UiButton, UiIconScrew } from '@slr-finance/uikit'

export default defineComponent({
  components: {
    UiButton,
    UiIconScrew,
  },
  setup() {
      
  },
})
</script>
