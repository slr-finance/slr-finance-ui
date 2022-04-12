<template>
  <ui-widget>
    <own-inviter class="mb-16" />
    <div class="bg-white bg-opacity-30 rounded-12 h-48 px-16 flex items-center justify-between mb-10">
      <span class="text-gray">Total rewards</span>
      <span class="text-14 font-title">{{ rewardStr }}</span>
    </div>
    <div class="flex items-center bg-green-atomic bg-opacity-10 rounded-12 h-48 pl-18 pr-6 mb-12">
      <div class="flex-1 flex justify-between mr-10">
        <span class="text-green-atomic">Unclaim rewards</span>
        <span class="text-18 font-title">{{ pendingRewardStr }}</span>
      </div>
      <send-tx-button
        @click="handleClaim"
        :txState="claimTxState"
        :loading="isFetching"
        :disabled="!isNotEnoughReward"
        size="36"
      >
        Claim
      </send-tx-button>
    </div>
  </ui-widget>
</template>

<script lang="ts">
  import { defineComponent, computed, watch } from 'vue'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useReferrerRewards } from '../hooks/useReferrerRewards'
  import { useReferrerClaim } from '../hooks/useReferrerClaim'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import UiWidget from '@/components/ui/UiWidget.vue'
  import OwnInviter from './OwnInviter.vue'

  export default defineComponent({
    name: 'referrer-rewards',
    setup() {
      const [handleClaim, claimTxState] = useReferrerClaim()
      const [, refetchSlrBalance] = useSlrBalance()
      const { reward, rewarded, isFetching, refetchRewards } = useReferrerRewards()
      const pendingReward = computed(() => reward.value.minus(rewarded.value))
      const isNotEnoughReward = computed(() => pendingReward.value.gt(0))
      const pendingRewardStr = useTokenAmountFormat(pendingReward, 'SLR')
      const rewardStr = useTokenAmountFormat(reward, 'SLR')

      const refetchRewardsAndSlrBalance = () => Promise.all([refetchRewards(), refetchSlrBalance()])

      watch(claimTxState, ({ isSuccess }) => isSuccess && refetchRewardsAndSlrBalance())

      return {
        isNotEnoughReward,
        pendingRewardStr,
        rewardStr,
        isFetching,
        handleClaim,
        claimTxState,
      }
    },
    components: { SendTxButton, UiWidget, OwnInviter },
  })
</script>
