<template>
  <div>
    Will be received: {{ willBeReceivedStr }}

    <send-tx-button
      @click="handleUnstakeWithFee"
      :txState="unstakeWithFeeTxState"
      size="48"
      variant="green-atomic"
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

  export default defineComponent({
    name: 'withdrawal-with-fee-modal',
    setup(props) {
      const [stakerState, refetchStaker] = useStaker()
      const [, refetchBalance] = useSlrBalance()
      const poolId = computed(() => stakerState.value.poolId)
      const poolState = usePool(poolId)
      const [handleUnstakeWithFee, unstakeWithFeeTxState] = useUnstakeWithFee(poolId)
      const withdrawalFee = computed(() => poolState.value.withdrawalFee)
      const withdrawalFeeStr = usePercentFormat(withdrawalFee)
      const refetchBalanceAndStakerState = () => Promise.all([refetchStaker(), refetchBalance()])

      const willBeReceived = computed(() => {
        const { amount, reward } = stakerState.value

        return BIG_ONE.minus(withdrawalFee.value).times(amount.plus(reward))
      })
      const willBeReceivedStr = useTokenAmountFormat(willBeReceived, 'SLR')

      watch(unstakeWithFeeTxState, ({ isSuccess }) => isSuccess && refetchBalanceAndStakerState())

      return {
        unstakeWithFeeTxState,
        handleUnstakeWithFee,
        withdrawalFeeStr,
        willBeReceivedStr,
      }
    },
    components: {
      SendTxButton,
    },
  })
</script>
