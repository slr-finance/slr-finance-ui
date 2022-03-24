<template>
  <div
    class="ui-box-corners text-14"
    v-if="poolId === stakerPoolId"
  >
    <div>You staked: {{ stakedStr }}</div>
    <div>You earned: {{ earnedStr }}</div>
    <div v-if="!isStakinFinished">Harvest Lockup: {{ leftToWaitStr }}</div>
  </div>
</template>

<script lang="ts">
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useStaker } from '@/store/hooks/useStaker'
  import { useInterval, useTransition } from '@vueuse/core'
  import dayjs from 'dayjs'
  import { computed, defineComponent, watch } from 'vue'
  import relativeTime from 'dayjs/plugin/relativeTime'

  dayjs.extend(relativeTime)

  export default defineComponent({
    name: 'staker-info',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup() {
      const [stakerState] = useStaker()
      const isStakinFinished = computed(() => stakerState.value.isStakinFinished)
      const stakerPoolId = computed(() => stakerState.value.poolId)
      const stakedAmount = computed(() => stakerState.value.amount)
      const earnedAmount = computed(() => stakerState.value.reward.toNumber())
      const earnedAmountAnimated = useTransition(earnedAmount, { duration: 300 })
      const stakedStr = useTokenAmountFormat(stakedAmount, 'SLR', 2)
      const earnedStr = useTokenAmountFormat(earnedAmountAnimated, 'SLR', 9)

      const lifeTimestamp = useInterval(1000)
      const leftToWait = computed(() => {
        const { startStaking, lock } = stakerState.value

        return Math.max(0, startStaking + lock - lifeTimestamp.value)
      })
      const leftToWaitStr = computed(() => dayjs().add(leftToWait.value, 's').toNow(true))
      // Sinc local timestamp with blockchain timestamp
      watch(stakerState, ({ timestamp }) => {
        lifeTimestamp.value = timestamp
      })

      return {
        stakedStr,
        earnedStr,
        stakerPoolId,
        leftToWaitStr,
        isStakinFinished,
      }
    },
  })
</script>
