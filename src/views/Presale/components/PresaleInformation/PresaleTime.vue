<template>
  <div class="text-gray">{{ label }}</div>
  <div class="uppercase text-whit font-title text-24 mt-6">{{ countdownTimeStr }}</div>
  <div class="text-gray text-12 mt-8">expiration date {{ expirationDateStr }}</div>
</template>

<script lang="ts">
  import { computedEager } from '@vueuse/shared'
  import { computed, defineComponent } from 'vue'
  import { dateFromUnix } from '@/utils/date/dateFromUnix'
  import { useTimeToFormat } from '@/hooks/formatters/useTimeToFormat'
  import { usePresale } from '../../hooks/usePresale'

  export default defineComponent({
    name: 'presale-time',
    setup() {
      const { currentPhase, currentPhaseCountdown, currentPhaseEndTime } = usePresale()

      const countdownTimeStr = useTimeToFormat(0, currentPhaseCountdown)
      const expirationDateStr = computed(() =>
        dateFromUnix(currentPhaseEndTime.value).toLocaleTimeString('en-En', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'UTC',
          timeZoneName: 'short',
        }),
      )

      const label = computedEager(() => {
        const phaseVal = currentPhase.value

        if (phaseVal === 0) {
          return 'Presale starts in'
        } else if (phaseVal === 4) {
          return 'Presale ended'
        } else if (phaseVal === 3) {
          return 'Presale ends in'
        } else {
          return 'Phase ends in'
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
