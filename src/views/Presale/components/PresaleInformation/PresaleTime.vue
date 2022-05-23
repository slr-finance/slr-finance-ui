<template>
  <div class="text-gray">{{ label }}</div>
  <div class="uppercase text-whit font-title text-24 mt-6">{{ countdownTimeStr }}</div>
  <div class="text-gray text-12 mt-8">expiration date {{ expirationDateStr }}</div>
</template>

<script lang="ts">
  import { computedEager } from '@vueuse/shared'
  import { computed, defineComponent } from 'vue'
  import dayjs from 'dayjs'
  import { useTimeToFormat } from '@/hooks/formatters/useTimeToFormat'
  import { usePresale } from '../../hooks/usePresale'

  export default defineComponent({
    name: 'presale-time',
    setup() {
      const { currentPhase, currentPhaseCountdown, currentPhaseEndTime } = usePresale()

      const countdownTimeStr = useTimeToFormat(0, currentPhaseCountdown)
      const timeZoneOffset = new Date().getTimezoneOffset() * 60
      const expirationDateStr = computed(() => dayjs.unix(currentPhaseEndTime.value + timeZoneOffset).format('MMMM D, YYYY HH:mm UTC'))

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
