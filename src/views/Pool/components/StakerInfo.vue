<template>
  <div class="space-y-16">
    <div class="staker-info">
      <div class="label">You staked:</div>
      <div class="value">{{ stakedStr }}</div>
    </div>
    <div class="staker-info">
      <div class="label">You earned:</div>
      <div class="value">{{ earnedStr }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useStakerState } from '../hooks/useStakerState'
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'staker-info',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup() {
      const { stakerState } = useStakerState()
      const stakedAmount = computed(() => stakerState.value.amount)
      const earnedAmount = computed(() => stakerState.value.reward)
      const stakedStr = useTokenAmountFormat(stakedAmount, 'SLR')
      const earnedStr = useTokenAmountFormat(earnedAmount, 'SLR')

      return {
        stakedStr,
        earnedStr,
      }
    },
  })
</script>

<style lang="postcss">
  .staker-info {
    @apply flex justify-between items-end;
  }

  .staker-info > .label {
    @apply text-12 text-white text-opacity-60 leading-none;
  }

  .staker-info > .value {
    @apply text-14 text-white font-title leading-none;
  }
</style>
