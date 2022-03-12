<template>
  <div>
    <div>
      Amount
      <ui-input-bn
        v-model:value="amount"
        @update:value.once="handleChangeOnce"
      >
        <template #postfix>
          <div>
            <button
              type="button"
              @click="handleSetMaxAmount"
            >
              MAX
            </button>
            SLR
          </div>
        </template>
      </ui-input-bn>
    </div>
    <div class="mb-24">
      {{ t('common.time') }}
      <ui-input-range
        :min="poolState.minDays"
        :max="poolState.maxDays"
        :step="1"
        v-model:value="days"
      />
      {{ days }}
    </div>

    <div class="ui-box-corners mb-24 cursor-default">
      <p class="text-14">
        Will be earned: <span class="text-page-active">{{ profitStr }} ({{ profitInDollStr }})</span>
      </p>
      <p class="text-14 text-white/60">{{ withdrawalFeeStr }} unstaking fee if withdraw within {{ daysStr }}</p>
    </div>

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
        >
          Stake on {{ daysStr }}
        </send-tx-button>
      </approve-token-plug>
    </connect-wallet-plug>

    <div v-if="true">
      <send-tx-button
        @click="handleStake"
        :txState="stakeTxState"
        :disabled="false"
      >
        Withdrawal to wallet with {{ withdrawalFeeStr }} fee
      </send-tx-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, Ref, ref, toRef, watch } from 'vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiInputBn from '@/components/ui/UiInputBn.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import { useUsdPrice } from '@/hooks/useUsdPrice'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useUsdFormat } from '@/hooks/formatters/useUsdFormat'
  import { usePool } from '@/store/hooks/usePool'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import { useProfit } from '../hooks/useProfit'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import { useStake } from '../hooks/useStake'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import { FetchingStatus } from '@/entities/common'
  import BigNumber from 'bignumber.js'
  import UiInputRange from '@/components/ui/UiInputRange.vue'
  import ApproveTokenPlug from '@/components/ApproveToken/ApproveTokenPlug.vue'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import { useI18n } from 'vue-i18n'
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
      const { t } = useI18n()
      const poolState = usePool(toRef(props, 'poolId'))

      const [slrBalance, refetchBalance] = useSlrBalance()
      const apr = computed(() => poolState.value.apr)
      const withdrawalFee = computed(() => poolState.value.withdrawalFee)
      const poolId = computed(() => poolState.value.id)
      const amount = ref(new BigNumber(0)) as Ref<BigNumber>
      const isChanged = ref(false)

      watch(
        slrBalance,
        (balanceInfo) => {
          if (balanceInfo.fetchStatus === FetchingStatus.FETCHED && !isChanged.value) {
            amount.value = balanceInfo.balance
          }
        },
        { immediate: true },
      )

      const days = ref(poolState.value.maxDays)
      const daysStr = computed(() => {
        const daysValue = days.value

        return t('common.days', [daysValue], daysValue)
      })

      const profit = useProfit(amount, apr, days)
      const profitStr = useTokenAmountFormat(profit, 'SLN', 2)
      const profitInDollStr = useUsdFormat(useUsdPrice(profit))
      const withdrawalFeeStr = usePercentFormat(withdrawalFee)
      const handleSetMaxAmount = () => {
        amount.value = slrBalance.value.balance
      }

      const handleChangeOnce = () => {
        isChanged.value = true
      }

      const [handleStake, stakeTxState] = useStake({ poolId, amount, days })
      watch(stakeTxState, ({ isSuccess }) => isSuccess && refetchBalance())

      return {
        t,
        amount,
        days,
        profitStr,
        profitInDollStr,
        withdrawalFeeStr,
        poolState,
        stakeTxState,
        stakedTokenAddress: contractsAddresses.SolarToken,
        poolAddress: contractsAddresses.StakingService,
        daysStr,
        handleStake,
        handleSetMaxAmount,
        handleChangeOnce,
      }
    },
    components: {
      UiButton,
      UiInputBn,
      ConnectWalletPlug,
      SendTxButton,
      UiInputRange,
      ApproveTokenPlug,
    },
  })
</script>
