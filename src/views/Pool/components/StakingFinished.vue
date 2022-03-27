<template>
  <div class="relative pt-32">
    <ui-poligon
      class="absolute top-32 right-0 transform-gpu translate-x-1/2 -translate-y-1/2 z-20"
      variant="primary"
    >
      End
    </ui-poligon>

    <div
      v-if="poolId === stakerState.poolId"
      class="ui-box-corners"
    >
      <staker-info
        :poolId="poolId"
        class="pt-18 pb-16"
      />
      <ui-button
        :to="i18nRouteHelper({ name: nextPool.routeName })"
        class="mb-12 w-full"
        variant="accent"
        size="48"
      >
        Migrate to {{ nextPool.name }} pool without fee
      </ui-button>

      <send-tx-button
        @click="handleUnstake"
        :tx-state="unstakeTxState"
        class="mb-12 w-full"
        variant="accent"
        size="48"
      >
        Withdrawal to wallet
      </send-tx-button>

      <ui-alert class="text-red">
        When withdrawing, farming is possible only from the first pool without the ability to return to the end point
      </ui-alert>
    </div>
  </div>
</template>

<script lang="ts">
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import { useStaker } from '@/store/hooks/useStaker'
  import { computed, defineComponent, toRef, watch } from 'vue'
  import { usePoolInfo } from '../hooks/usePoolInfo'
  import { useUnstake } from '../hooks/useUnstake'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import { usePool } from '@/store/hooks/usePool'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import StakerInfo from './StakerInfo.vue'
  import UiPoligon from '@/components/ui/UiPoligon.vue'
  import UiAlert from '@/components/ui/UiAlert.vue'

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
    components: { SendTxButton, UiButton, StakerInfo, UiPoligon, UiAlert },
  })
</script>
