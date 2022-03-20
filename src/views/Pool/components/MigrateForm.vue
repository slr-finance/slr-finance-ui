<template>
  <div>
    <slr-balance-input v-model:value="amount" />
    <reinvest-amount-input v-model:value="reinvestAmount" />
    <staking-profit
      :pool-id="poolId"
      :days="days"
      :amount="totalAmount"
    />

    <timelock-input
      :pool-id="poolId"
      v-model:value="days"
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
  import ReinvestAmountInput from './ReinvestAmountInput.vue'

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
      const reinvestAmount = ref(new BigNumber(0)) as Ref<BigNumber>
      const [, refetchStaker] = useStaker()
      const [, refetchSlrBalance] = useSlrBalance()

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
        reinvestAmount,

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
      ReinvestAmountInput,
    },
  })
</script>
