<template>
  <div>
    <div>isFetching: {{ isFetching }}</div>
    <div>Pending rewards: {{ pendingRewardStr }}</div>
    <div>Withdrawn Rewards: {{ rewardedStr }}</div>
    <send-tx-button
      @click="handleClaim"
      :txState="claimTxState"
      :loading="isFetching"
      :disabled="isNotEnoughReward"
    >
      Claim rewards
    </send-tx-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch } from 'vue'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useReferrerRewards } from '../hooks/useReferrerRewards'
  import { useReferrerClaim } from '../hooks/useReferrerClaim'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import { useSlrBalance } from '@/store/hooks/useBalance'

  export default defineComponent({
    name: 'referrer-rewads',
    setup() {
      const [handleClaim, claimTxState] = useReferrerClaim()
      const [, refetchSlrBalance] = useSlrBalance()
      const { reward, rewarded, isFetching, refetchRewards } = useReferrerRewards()
      const pendingReward = computed(() => reward.value.minus(rewarded.value))
      const isNotEnoughReward = computed(() => pendingReward.value.lte(0))
      const pendingRewardStr = useTokenAmountFormat(pendingReward, 'SOLAR>FINANCE')
      const rewardedStr = useTokenAmountFormat(rewarded, 'SOLAR>FINANCE')

      const refetchRewardsAndSlrBalance = () => Promise.all([refetchRewards(), refetchSlrBalance()])

      watch(claimTxState, ({ isSuccess }) => isSuccess && refetchRewardsAndSlrBalance())

      return {
        isNotEnoughReward,
        pendingRewardStr,
        rewardedStr,
        isFetching,
        handleClaim,
        claimTxState,
      }
    },
    components: { SendTxButton },
  })
</script>
