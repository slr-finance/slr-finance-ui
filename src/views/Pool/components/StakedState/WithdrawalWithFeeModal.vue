<template>
  <div>
    <div class="bg-red bg-opacity-10 px-20 py-12 rounded-10 mb-20">
      <ui-placeholder
        title="Please, attend!"
        description="Early withdrawal from staking is subject to commission, wait until the end of the pool and receive funds without commission"
        variant="red"
      />
    </div>

    <div class="item mb-20">
      <div class="label">Staked and earned</div>
      <div>{{ stakedAndEarnedStr }}</div>
    </div>

    <div class="item mb-20">
      <div class="label">Withdrawal fee</div>
      <div class="text-red">
        {{ withdrawalFeeStr }}
        <span class="text-red text-opacity-50">({{ withdrawalFeeAmountStr }})</span>
      </div>
    </div>

    <div class="item mb-20">
      <div class="label">You’ll receive</div>
      <div>{{ willBeReceivedStr }}</div>
    </div>

    <send-tx-button
      @click="handleUnstakeWithFee"
      :txState="unstakeWithFeeTxState"
      size="48"
      variant="red"
      class="w-full"
    >
      Withdrawal to wallet with {{ withdrawalFeeStr }} fee
    </send-tx-button>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, watch } from 'vue'
  import { useUnstakeWithFee } from '../../hooks/useUnstakeWithFee'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import { usePool } from '@/store/hooks/usePool'
  import { useStaker } from '@/store/hooks/useStaker'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { BIG_ONE } from '@/utils/bigNumber'
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'

  export default defineComponent({
    name: 'withdrawal-with-fee-modal',
    setup(props) {
      const [stakerState, refetchStaker] = useStaker()
      const [, refetchBalance] = useSlrBalance()
      const poolId = computed(() => stakerState.value.poolId)
      const poolState = usePool(poolId)
      const stakedAndEarned = computed(() => {
        const { amount, reward } = stakerState.value

        return amount.plus(reward)
      })
      const withdrawalFee = computed(() => poolState.value.withdrawalFee)
      const withdrawalFeeAmount = computed(() => withdrawalFee.value.times(stakedAndEarned.value))
      const willBeReceived = computed(() => stakedAndEarned.value.minus(withdrawalFeeAmount.value))

      const stakedAndEarnedStr = useTokenAmountFormat(stakedAndEarned, 'SLR')
      const withdrawalFeeStr = usePercentFormat(withdrawalFee)
      const withdrawalFeeAmountStr = useTokenAmountFormat(withdrawalFeeAmount, 'SLR')
      const willBeReceivedStr = useTokenAmountFormat(willBeReceived, 'SLR')

      const [handleUnstakeWithFee, unstakeWithFeeTxState] = useUnstakeWithFee(poolId)
      const refetchBalanceAndStakerState = () => Promise.all([refetchStaker(), refetchBalance()])
      watch(unstakeWithFeeTxState, ({ isSuccess }) => isSuccess && refetchBalanceAndStakerState())

      return {
        unstakeWithFeeTxState,
        handleUnstakeWithFee,
        withdrawalFeeStr,
        withdrawalFeeAmountStr,
        willBeReceivedStr,
        stakedAndEarnedStr,
      }
    },
    components: {
      SendTxButton,
      UiPlaceholder,
    },
  })
</script>

<style lang="postcss" scoped>
.item {
  @apply flex justify-between items-center text-14 text-white;
}

.item > .label {
  @apply text-gray-500;
}
</style>