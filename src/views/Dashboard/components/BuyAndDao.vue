<template>
    <div class=" relative border border-gray-800 rounded-12 p-24 overflow-hidden" style="height:300px; width:600px">
      <div class="relative z-1 w-2/3">
        <div class="text-26 font-title leading-140">
          <span class="text-yellow">DEFI 3.0</span> financial protocol operating in BSC
        </div>

        <ui-button
          variant="violet"
          size="40"
          @mouseenter="handleBuyMouseEnter"
          @mouseleave="handleBuyMouseLeave"
        >
          Buy SLR
        </ui-button>

        <ui-button
          variant="violet"
          size="40"
          @mouseenter="handleDaoMouseEnter"
          @mouseleave="handleDaoMouseLeave"
        >
          Buy SLR
        </ui-button>
      </div>

      <UiBlob
        class="aspect-1 absolute right-0 top-0 h-full"
        :strength="strength"
        :density="density"
        :x="7"
        :size="7"
      />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UiBlob from '@/components/ui/UiBlob/UiBlob.vue'
import UiButton from '@/components/ui/UiButton.vue'

export default defineComponent({
  name: 'buy-and-dao',
  setup() {
    const strength = ref(0.2)
    const density = ref(3)
    const handleBuyMouseEnter = () => density.value = 4
    const handleBuyMouseLeave = () => density.value = 3
    const handleDaoMouseEnter = () => {
      density.value = 4.1
      strength.value = 0.3
    }
    const handleDaoMouseLeave = () => {
      density.value = 3
      strength.value = 0.2
    }

    return {
      strength,
      density,
      handleBuyMouseEnter,
      handleBuyMouseLeave,
      handleDaoMouseEnter,
      handleDaoMouseLeave
    }
  },
  components: {
    UiBlob,
    UiButton,
  }
})
</script>
