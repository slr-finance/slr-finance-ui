<template>
  <div>
    <div>multiplier: 1x</div>
    <div class="flex space-x-16 items-center">
      <achievement-score class="flex-1"/>
      <ui-button
        variant="violet"
        :size="48"
      >
        Claim Reward
      </ui-button>
    </div>
  </div>
</template>

<script lang="ts">
import { UiButton } from '@slr-finance/uikit'
import { defineComponent } from 'vue'
import AchievementScore from './AchievementScore.vue'

export default defineComponent({
  setup() {
    
  },
  components: { AchievementScore, UiButton },
})
</script>
