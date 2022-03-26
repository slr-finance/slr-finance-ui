<template>
  <div>
    <div class="relative border border-white px-16 py-18 rounded-24 mb-18">
      <ui-poligon class="absolute top-2 right-0 transform-cpu translate-x-1/2 -translate-y-1/2 z-10"> Open </ui-poligon>

      <div class="text-white text-opacity-60 text-12 leading-none mb-12">Migrate amount</div>
      <div class="text-white text-14 leading-none font-title mb-12">{{ reinvestAmountStr }}</div>

      <div
        class="mb-8 pointer-events-none relative flex justify-center items-center before:content-[' '] before:block before:absolute before:w-full before:h-1 before:bg-white before:bg-opacity-20 before:left-0 before:top-1/2 before:transform-cpu before:-translate-y-1/2"
      >
        <div
          class="relative z-10 flex justify-center items-center bg-black border border-white border-opacity-20 rounded-full h-24 w-24"
        >
          <ui-icon
            name="plus"
            size="14"
            class="text-white"
          />
        </div>
      </div>

      <div class="text-12 text-white mb-12">Add to farming</div>
      <slr-balance-input v-model:value="amount" />
    </div>

    <timelock-input
      :pool-id="poolId"
      v-model:value="days"
      class="mb-24"
    />

    <staking-profit
      :pool-id="poolId"
      :days="days"
      :amount="totalAmount"
    />

    <connect-wallet-plug text="Connect wallet to start earn">
      <approve-token-plug
        text="Enable"
        :minAllowance="amount"
        :tokenAddress="stakedTokenAddress"
        :spenderAddress="poolAddress"
      >
        <send-tx-button
          @click="handleMigrate"
          :tx-state="migrateTxState"
        >
          Migrate to {{ poolInfo.name }} pool with {{ poolApyStr }} APY and zero performance fee
        </send-tx-button>
      </approve-token-plug>
    </connect-wallet-plug>
  </div>
</template>

<script lang="ts">
  import BigNumber from 'bignumber.js'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import ApproveTokenPlug from '@/components/ApproveToken/ApproveTokenPlug.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import StakingProfit from './StakingProfit.vue'
  import TimelockInput from './TimelockInput.vue'
  import { useStaker } from '@/store/hooks/useStaker'
  import { computed, defineComponent, toRef, watch, ref, Ref, ComputedRef } from 'vue'
  import { usePoolInfo } from '../hooks/usePoolInfo'
  import { useStake } from '../hooks/useStake'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import { usePool } from '@/store/hooks/usePool'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import SlrBalanceInput from './SlrBalanceInput.vue'

  import UiIcon from '@/components/ui/UiIcon.vue'
  import UiPoligon from '@/components/ui/UiPoligon.vue'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'

  export default defineComponent({
    name: 'migrate-form',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const days = ref(0)
      const amount = ref(new BigNumber(0)) as Ref<BigNumber>
      const totalAmount = computed(() => amount.value.plus(reinvestAmount.value))
      const [stakerState, refetchStaker] = useStaker()
      const [, refetchSlrBalance] = useSlrBalance()

      const reinvestAmount = computed(() => {
        const { amount, reward } = stakerState.value

        return amount.plus(reward)
      })
      const reinvestAmountStr = useTokenAmountFormat(reinvestAmount, 'SLR')

      const poolId = toRef(props, 'poolId')
      const poolInfo = usePoolInfo(poolId)

      const poolState = usePool(poolId)
      const poolApy = computed(() => poolState.value.apy)
      const poolApyStr = usePercentFormat(poolApy)

      const [handleMigrate, migrateTxState] = useStake({ poolId, amount, days, reinvestAmount })
      const refetchStakerAndBalance = () => Promise.all([refetchStaker(), refetchSlrBalance()])

      watch(migrateTxState, ({ isSuccess }) => isSuccess && refetchStakerAndBalance())

      return {
        amount,
        reinvestAmountStr,

        days,
        totalAmount,

        poolInfo,
        poolApyStr,
        handleMigrate,
        migrateTxState,

        stakedTokenAddress: contractsAddresses.SolarToken,
        poolAddress: contractsAddresses.StakingService,
      }
    },
    components: {
      SendTxButton,
      UiButton,
      StakingProfit,
      TimelockInput,
      SlrBalanceInput,
      ApproveTokenPlug,
      ConnectWalletPlug,

      UiIcon,
      UiPoligon,
    },
  })
</script>
