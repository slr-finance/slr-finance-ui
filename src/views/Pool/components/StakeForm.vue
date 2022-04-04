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
        <send-tx-button
          @click="handleStake"
          :txState="stakeTxState"
          :disabled="false"
          class="w-full"
          size="48"
          variant="accent"
        >
          Stake on {{ daysStr }}
        </send-tx-button>
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
  import StakingProfit from './StakingProfit.vue'
  import { usePool } from '@/store/hooks/usePool'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import { useStake } from '../hooks/useStake'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import { FetchingStatus } from '@/entities/common'
  import BigNumber from 'bignumber.js'
  import TimelockInput from './TimelockInput.vue'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import { useI18n } from 'vue-i18n'
  import { useStaker } from '@/store/hooks/useStaker'
  import { useUnstakeWithFee } from '../hooks/useUnstakeWithFee'

  export default defineComponent({
    name: 'stake-form',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const { t } = useI18n()
      const poolState = usePool(toRef(props, 'poolId'))
      const [stakerState, refetchStaker] = useStaker()

      const [, refetchBalance] = useSlrBalance()
      const poolId = computed(() => poolState.value.id)
      const amount = ref(new BigNumber(0)) as Ref<BigNumber>
      const isChanged = ref(false)

      const days = ref(poolState.value.maxDays)
      const daysStr = computed(() => {
        const daysValue = days.value

        return t('common.days', [daysValue], daysValue)
      })

      const refetchBalanceAndStakerState = () => Promise.all([refetchStaker(), refetchBalance()])
      const [handleStake, stakeTxState] = useStake({ poolId, amount, days })
      watch(stakeTxState, ({ isSuccess }) => isSuccess && refetchBalanceAndStakerState())

      return {
        t,
        amount,
        days,
        handleStake,
        stakeTxState,
        stakedTokenAddress: contractsAddresses.SolarToken,
        poolAddress: contractsAddresses.StakingService,
        daysStr,
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
    },
  })
</script>
