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
            size="48"
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
  import UiButton from '@/components/ui/UiButton.vue'
  import SlrBalanceInput from './SlrBalanceInput.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import ApproveTokenPlug from '@/components/ApproveToken/ApproveTokenPlug.vue'
  import InsufficientBalancePlug from '@/components/ApproveToken/InsufficientBalancePlug.vue'
  import StakingProfit from './StakingProfit.vue'
  import { usePool } from '@/store/hooks/usePool'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import { useStake } from '../hooks/useStake'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import BigNumber from 'bignumber.js'
  import TimelockInput from './TimelockInput.vue'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import { useStaker } from '@/store/hooks/useStaker'

  export default defineComponent({
    name: 'stake-form',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const poolState = usePool(toRef(props, 'poolId'))
      const [, refetchStaker] = useStaker()

      const [slrBalanceInfo, refetchBalance] = useSlrBalance()
      const slrBalance = computed(() => slrBalanceInfo.value.balance)
      const poolId = computed(() => poolState.value.id)
      const amount = ref(new BigNumber(0)) as Ref<BigNumber>

      const days = ref(poolState.value.maxDays)
      const daysStr = computed(() => {
        const daysValue = days.value

        return `${daysValue} days`
      })

      const refetchBalanceAndStakerState = () => Promise.all([refetchStaker(), refetchBalance()])
      const [handleStake, stakeTxState] = useStake({ poolId, amount, days })
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
