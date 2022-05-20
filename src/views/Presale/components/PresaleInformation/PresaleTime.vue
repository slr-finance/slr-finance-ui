<template>
  <div class="text-gray">{{ label }}</div>
  <div class="uppercase text-whit font-title text-24 mt-6">{{ countdownTimeStr }}</div>
  <div class="text-gray text-12 mt-8">expiration date {{ expirationDateStr }}</div>
</template>

<script lang="ts">
  import { computedEager, useInterval } from '@vueuse/shared'
  import { defineComponent, watch } from 'vue'
  import dayjs from 'dayjs'
  import { useTimeToFormat } from '@/hooks/formatters/useTimeToFormat'
  import { useBlockInfo } from '@/hooks/useBlockInfo'
  import { usePresale } from '../../hooks/usePresale'

  export default defineComponent({
    name: 'presale-time',
    setup() {
      const { currentPhase, phasesTime } = usePresale()
      const { blockTimestamp } = useBlockInfo()

      const lifeTimestamp = useInterval(1000)
      watch(blockTimestamp, () => (lifeTimestamp.value = 0))

      const currentPhasesTime = computedEager(() => {
        const currentPhaseVal = currentPhase.value

        if (currentPhaseVal === 4) {
          return 0
        }

        return phasesTime.value[currentPhaseVal]
      })
      const countdownTime = computedEager(() => {
        return Math.max(0, currentPhasesTime.value - blockTimestamp.value - lifeTimestamp.value)
      })
      const countdownTimeStr = useTimeToFormat(0, countdownTime)
      const expirationDateStr = computedEager(() => dayjs.unix(currentPhasesTime.value).format('MMMM D, YYYY h:mm A'))

      const label = computedEager(() => {
        const phaseVal = currentPhase.value

        if (phaseVal === 0) {
          return 'Presale starts in'
        } else if (phaseVal === 4) {
          return 'Presale ended'
        } else {
          return 'Presale information'
        }
      })

      return {
        label,
        countdownTimeStr,
        expirationDateStr,
      }
    },
  })
</script>
