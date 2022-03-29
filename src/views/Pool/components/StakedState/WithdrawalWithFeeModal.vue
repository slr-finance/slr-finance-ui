<template>
  <div>
    <send-tx-button
      @click="handleUnstakeWithFee"
      :txState="unstakeWithFeeTxState"
      size="48"
      variant="primary"
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

      watch(unstakeWithFeeTxState, ({ isSuccess }) => isSuccess && refetchBalanceAndStakerState())

      return {
        unstakeWithFeeTxState,
        handleUnstakeWithFee,
        withdrawalFeeStr,
      }
    },
    components: {
      SendTxButton,
    }
  })
</script>
