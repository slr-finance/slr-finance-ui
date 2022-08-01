<template>
  <div class="px-16">
    Remuneration:
    <ui>
      <li>+ 10 000 SLR</li>
      <li>+ 1 to multiplier</li>
    </ui>
    <div>Requirements:</div>
    <ui>
      <li>Get all achievement for this group</li>
    </ui>
    <ui-button
      variant="violet"
      size="40"
    >
      Claim rewarded
    </ui-button>
  </div>
</template>

<script lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { UiButton },
  name: 'achievements-list-actions',
  setup() {
      
  },
})
</script>
