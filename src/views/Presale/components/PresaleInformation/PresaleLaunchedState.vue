<template>
  <div class="flex flex-col justify-between mt-12">
    <p class="text-gray text-14">Today Presale price</p>
    <presale-price
      class="text-white text-14"
      :phase="currentPhase"
    />
  </div>

  <div
    v-if="currentPhase < 3"
    class="flex flex-col justify-between mt-12"
  >
    <p class="text-gray text-14">Tomorow Presale price</p>
    <presale-price
      class="text-red text-14"
      :phase="currentPhase + 1"
    />
  </div>

  <div class="text-gray mt-12">Sold within the phase</div>
  <ui-progress
    v-if="currentPhase < 3"
    class="mt-6"
    :max="soldInfo.max"
    :value="soldInfo.volume"
  >
    <template #content>
      <span class="font-title text-14">{{ soldInfo.volumeStr }}/{{ soldInfo.maxStr }} BNB</span>
    </template>
  </ui-progress>

  <div v-else>unlimit</div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { UiProgress } from '@slr-finance/uikit'
  import PresalePrice from '../PresalePrice.vue'
  import { usePresale } from '../../hooks/usePresale'

  export default defineComponent({
    name: 'presale-launched-state',
    setup() {
      const { phasesMaxAmount, phasesAmount, currentPhase, currentPhasePrice } = usePresale()
      const soldInfo = computed(() => {
        const currentPhaseVal = currentPhase.value
        const currentPhasePriceVal = currentPhasePrice.value
        let volume = 0
        let max = 0

        if (currentPhaseVal > 0 && currentPhaseVal < 3) {
          volume = phasesAmount.value[currentPhaseVal - 1].times(currentPhasePriceVal).toNumber()
          max = phasesMaxAmount.value[currentPhaseVal - 1].times(currentPhasePriceVal).toNumber()
        }

        return {
          volume,
          max,
          volumeStr: volume.toLocaleString('en-En', { style: 'decimal', maximumFractionDigits: 2 }),
          maxStr: max.toLocaleString('en-En', { style: 'decimal', maximumFractionDigits: 0 }),
        }
      })

      return {
        soldInfo,
        currentPhase,
      }
    },
    components: {
      UiProgress,
      PresalePrice,
    },
  })
</script>

<style></style>
