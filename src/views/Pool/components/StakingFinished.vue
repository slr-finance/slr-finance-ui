<template>
  <div class="relative pt-32">
    <ui-poligon
      class="absolute top-32 right-0 transform-gpu 600:translate-x-1/2 translate-x-ui-page-spacing -translate-y-1/2 z-20"
      variant="yellow"
      animated
    >
      Ended
    </ui-poligon>

    <ui-box-corners
      v-if="poolId === stakerState.poolId"
      class="p-12"
    >
      <staker-info
        :poolId="poolId"
        class="pt-18 pb-16"
      />
      <ui-button
        v-if="nextPoolId > poolId"
        :to="{ name: nextPool.routeName }"
        class="mb-12 w-full"
        variant="violet"
        :size="48"
      >
        Migrate to {{ nextPool.name }} pool without fee
      </ui-button>

      <send-tx-button
        @click="handleUnstake"
        :tx-state="unstakeTxState"
        class="mb-12 w-full"
        variant="violet"
        :size="48"
      >
        Withdrawal to wallet
      </send-tx-button>

      <ui-alert class="text-red">
        When withdrawing, farming is possible only from the first pool without the ability to return to the end point
      </ui-alert>
    </ui-box-corners>
  </div>
</template>

<script lang="ts">
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import { UiButton, UiPoligon, UiBoxCorners } from '@slr-finance/uikit'
  import { useStakerState } from '../hooks/useStakerState'
  import { computed, defineComponent, toRef, watch } from 'vue'
  import { usePoolInfo } from '../hooks/usePoolInfo'
  import { useUnstake } from '../hooks/useUnstake'
  import { useSlrBalance } from '@/hooks/dapp/useSlrBalance'
  import { usePoolState } from '../hooks/usePoolState'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import StakerInfo from './StakerInfo.vue'
  import UiAlert from '@/components/ui/UiAlert.vue'
  import { MAX_POOL_ID } from '@/config/constants/Pools'

  export default defineComponent({
    name: 'staking-finished',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const { stakerState, refetchStaker } = useStakerState()
      const { refetchBalance: refetchSlrBalance } = useSlrBalance()

      const poolId = toRef(props, 'poolId')
      const nextPoolId = computed(() => Math.min(stakerState.value.poolId + 1, MAX_POOL_ID))
      const nextPool = usePoolInfo(nextPoolId)
      const [nextPoolState] = usePoolState(nextPoolId)
      const nextPoolApy = computed(() => nextPoolState.value.apy)
      const nextPoolApyStr = usePercentFormat(nextPoolApy)

      const [handleUnstake, unstakeTxState] = useUnstake(poolId)

      const refetchStakerAndBalance = () => Promise.all([refetchStaker(), refetchSlrBalance()])

      watch(unstakeTxState, ({ isSuccess }) => isSuccess && refetchStakerAndBalance())

      return {
        stakerState,
        nextPoolId,
        nextPool,
        nextPoolApyStr,
        handleUnstake,
        unstakeTxState,
      }
    },
    components: { SendTxButton, UiButton, StakerInfo, UiPoligon, UiAlert, UiBoxCorners },
  })
</script>
