<template>
  <div
    class="achievement-card shrink-0 bg-gray-600 bg-opacity-20 rounded-12 p-12"
  >
    <div class="caption">achievement name</div>
    <img
      class="nft max-h-full"
      src="https://cdn3d.iconscout.com/3d/premium/thumb/armor-nft-4976763-4151896.png"
    />
    <div class="action">
      <div>
        + 10 Scores
      </div>
      <div>
        Requirements:
      </div>
      <ui-button
        variant="violet"
        size="40"
      >
        Mint Achive
      </ui-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'

export default defineComponent({
  name: 'achievement-card',
  setup() {
    
  },
  components: { UiButton },
})
</script>

<style scoped>
.achievement-card {
  @apply grid;
  grid-template-areas: 
    'nft caption'
    'nft action'
  ;
  grid-template-rows: 1fr min-content;
  width: 400px;
  height: 200px;
}

.achievement-card > .caption {
  grid-area: caption;
}

.achievement-card > .nft {
  grid-area: nft;
}

.achievement-card > .action {
  grid-area: action;
}
</style>