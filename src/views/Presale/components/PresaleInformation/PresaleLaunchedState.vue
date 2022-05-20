<template>
  <div class="flex flex-col 500:flex-row justify-between mt-12">
    <p class="text-gray text-14">Today Presale price</p>
    <presale-price
      class="text-white text-14"
      :phase="currentPhase"
    />
  </div>

  <div
    class="flex flex-col 500:flex-row justify-between mt-12"
    v-if="currentPhase < 3"
  >
    <p class="text-gray text-14">Tomorow Presale price</p>
    <presale-price
      class="text-red text-14"
      :phase="currentPhase + 1"
    />
  </div>

  <div class="text-gray mt-12">Sold within the phase</div>
  <ui-progress
    class="mt-6"
    :max="soldInfo.max"
    :value="soldInfo.volume"
  >
    <template #content>
      <span class="font-title text-14">{{ soldInfo.volumeStr }}/{{ soldInfo.maxStr }} BNB</span>
    </template>
  </ui-progress>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import UiProgress from '@/components/ui/UiProgress.vue'
  import PresalePrice from '../PresalePrice.vue'
  import { usePresale } from '../../hooks/usePresale'

  export default defineComponent({
    name: 'presale-launched-state',
    setup() {
      const { phasesMaxAmount, phasesAmount, currentPhase } = usePresale()
      const soldInfo = computed(() => {
        const currentPhaseVal = currentPhase.value
        const volume = phasesAmount.value[currentPhaseVal].toNumber()
        const max = phasesMaxAmount.value[currentPhaseVal].toNumber()

        return {
          volume,
          max,
          volumeStr: volume.toLocaleString('en-En', { style: 'decimal', maximumFractionDigits: 2 }),
          maxStr: max.toLocaleString('en-En', { style: 'decimal', maximumFractionDigits: 2 }),
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
