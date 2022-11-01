<template>
  <div class="px-16">
    Remuneration:
    <ul>
      <li>+ 10 000 SLR</li>
      <li>+ 1 to multiplier</li>
    </ul>
    <div>Requirements:</div>
    <ul>
      <li>Get all achievement for this group</li>
    </ul>
    <ui-button
      variant="violet"
      :size="40"
    >
      Claim rewarded
    </ui-button>
  </div>
</template>

<script lang="ts">
import { UiButton } from '@slr-finance/uikit'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { UiButton },
  name: 'achievements-list-actions',
  setup() {
      
  },
})
</script>
