<template>
  <div>
    <slr-balance-input
      v-model:value="amount"
      class="mb-16"
    />

    <timelock-input
      :pool-id="poolId"
      v-model:value="days"
      class="mb-24"
    />

    <staking-profit
      :pool-id="poolId"
      :days="days"
      :amount="amount"
    />

    <connect-wallet-plug text="Connect wallet to start earn">
      <approve-token-plug
        text="Enable"
        :minAllowance="amount"
        :tokenAddress="stakedTokenAddress"
        :spenderAddress="poolAddress"
      >
        <insufficient-balance-plug
          token-symbol="SLR"
          :amount="amount"
          :balance="slrBalance"
        >
          <send-tx-button
            @click="handleStake"
            :txState="stakeTxState"
            :disabled="false"
            class="w-full"
            :size="48"
            variant="violet"
          >
            Stake on {{ daysStr }}
          </send-tx-button>
        </insufficient-balance-plug>
      </approve-token-plug>
    </connect-wallet-plug>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, Ref, ref, toRef, watch } from 'vue'
  import { UiButton } from '@slr-finance/uikit'
  import SlrBalanceInput from './SlrBalanceInput.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import ApproveTokenPlug from '@/components/ApproveToken/ApproveTokenPlug.vue'
  import InsufficientBalancePlug from '@/components/ApproveToken/InsufficientBalancePlug.vue'
  import { useSlrBalance } from '@/hooks/dapp/useSlrBalance'
  import StakingProfit from './StakingProfit.vue'
  import { usePoolState } from '../hooks/usePoolState'
  import { useStakeTx } from '../hooks/useStakeTx'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import BigNumber from 'bignumber.js'
  import TimelockInput from './TimelockInput.vue'
  import contractsAddresses from '@/config/constants/contractsAddresses'
  import { useStakerState } from '../hooks/useStakerState'
import { usePoolsState } from '../hooks/usePoolsState'

  export default defineComponent({
    name: 'stake-form',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const [poolState] = usePoolState(toRef(props, 'poolId'))
      const { refetchStaker } = useStakerState()
      const { refetchPools } = usePoolsState()

      const { balance: slrBalance, refetchBalance } = useSlrBalance()
      const poolId = computed(() => poolState.value.id)
      const amount = ref(new BigNumber(0)) as Ref<BigNumber>

      const days = ref(poolState.value.maxDays)
      const daysStr = computed(() => {
        const daysValue = days.value

        return `${daysValue} days`
      })

      const refetchBalanceAndStakerState = () => Promise.all([refetchStaker(), refetchBalance(), refetchPools()])
      const [handleStake, stakeTxState] = useStakeTx({ poolId, amount, days })
      watch(stakeTxState, ({ isSuccess }) => isSuccess && refetchBalanceAndStakerState())

      return {
        amount,
        days,
        handleStake,
        stakeTxState,
        stakedTokenAddress: contractsAddresses.SolarToken,
        poolAddress: contractsAddresses.StakingService,
        daysStr,
        slrBalance,
      }
    },
    components: {
      UiButton,
      SlrBalanceInput,
      TimelockInput,
      ConnectWalletPlug,
      SendTxButton,
      StakingProfit,
      ApproveTokenPlug,
      InsufficientBalancePlug,
    },
  })
</script>
