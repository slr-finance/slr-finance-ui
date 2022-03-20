<template>
  <div v-if="poolId === stakerState.poolId">
    <ui-button :to="i18nRouteHelper({ name: nextPool.routeName })">
      Migrate to {{ nextPool.name }} pool with {{ nextPoolApyStr }} APY and zero performance fee
      <ui-icon
        name="arrow-right"
        class="ml-8"
      />
    </ui-button>

    <send-tx-button
      @click="handleUnstake"
      :tx-state="unstakeTxState"
    >
      Withdrawal to wallet
    </send-tx-button>
  </div>
</template>

<script lang="ts">
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import { useStaker } from '@/store/hooks/useStaker'
  import { computed, defineComponent, toRef, watch } from 'vue'
  import { usePoolInfo } from '../hooks/usePoolInfo'
  import { useUnstake } from '../hooks/useUnstake'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import { usePool } from '@/store/hooks/usePool'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'

  export default defineComponent({
    name: 'staking-finished',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const [stakerState, refetchStaker] = useStaker()
      const [, refetchSlrBalance] = useSlrBalance()

      const poolId = toRef(props, 'poolId')
      const nextPoolId = computed(() => stakerState.value.poolId + 1)
      const nextPool = usePoolInfo(nextPoolId)
      const nextPoolState = usePool(nextPoolId)
      const nextPoolApy = computed(() => nextPoolState.value.apy)
      const nextPoolApyStr = usePercentFormat(nextPoolApy)

      const [handleUnstake, unstakeTxState] = useUnstake(poolId)

      const refetchStakerAndBalance = () => Promise.all([refetchStaker(), refetchSlrBalance()])

      watch(unstakeTxState, ({ isSuccess }) => isSuccess && refetchStakerAndBalance())

      return {
        stakerState,
        nextPool,
        nextPoolApyStr,
        handleUnstake,
        unstakeTxState,
      }
    },
    components: { SendTxButton, UiButton, UiIcon },
  })
</script>
