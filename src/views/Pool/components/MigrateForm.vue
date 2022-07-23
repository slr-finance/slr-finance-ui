<template>
  <div>
    <div class="relative border border-white px-16 py-18 rounded-24 mb-18">
      <ui-poligon
        class="absolute top-2 right-0 transform-cpu 600:translate-x-1/2 translate-x-ui-page-spacing -translate-y-1/2 z-10"
        variant="green-original"
        animated
      >
        Opened
      </ui-poligon>

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

      <div class="text-12 text-white mb-12">Add to staking</div>
      <slr-balance-input
        v-model:value="amount"
        class="mb-8"
      />
      <ui-alert class="text-violet"> The amount cannot be greater than the size of the migration amount </ui-alert>
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
        <insufficient-balance-plug
          allow-zero
          token-symbol="SLR"
          :amount="amount"
          :balance="slrBalance"
        >
          <send-tx-button
            @click="handleMigrate"
            class="w-full"
            size="48"
            variant="violet"
            :tx-state="migrateTxState"
            :disabled="buttonData.isDisabled"
          >
            {{ buttonData.text }}
          </send-tx-button>
        </insufficient-balance-plug>
      </approve-token-plug>
    </connect-wallet-plug>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef, watch, ref, Ref } from 'vue'
  import BigNumber from 'bignumber.js'
  import contractsAddresses from '@/config/constants/contractsAddresses'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon'
  import UiPoligon from '@/components/ui/UiPoligon.vue'
  import UiAlert from '@/components/ui/UiAlert.vue'
  import ApproveTokenPlug from '@/components/ApproveToken/ApproveTokenPlug.vue'
  import InsufficientBalancePlug from '@/components/ApproveToken/InsufficientBalancePlug.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import { useSlrBalance } from '@/hooks/dapp/useSlrBalance'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { tokenAmountFormat } from '@/utils/strFormat/tokenAmountFormat'
  import StakingProfit from './StakingProfit.vue'
  import TimelockInput from './TimelockInput.vue'
  import SlrBalanceInput from './SlrBalanceInput.vue'
  import { useStakerState } from '../hooks/useStakerState'
  import { usePoolInfo } from '../hooks/usePoolInfo'
  import { useMigrateTx } from '../hooks/useMigrateTx'

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
      const { stakerState, refetchStaker } = useStakerState()
      const { balance: slrBalance, refetchBalance: refetchSlrBalance } = useSlrBalance()

      const reinvestAmount = computed(() => {
        const { amount, reward } = stakerState.value

        return amount.plus(reward)
      })
      const reinvestAmountStr = useTokenAmountFormat(reinvestAmount, 'SLR')

      const poolId = toRef(props, 'poolId')
      const poolInfo = usePoolInfo(poolId)

      const [handleMigrate, migrateTxState] = useMigrateTx({ poolId, amount, days })
      const refetchStakerAndBalance = () => Promise.all([refetchStaker(), refetchSlrBalance()])
      const buttonData = computed(() => {
        const reinvestAmountVal = reinvestAmount.value
        const isIncorrectAmount = reinvestAmountVal.lte(amount.value)

        return {
          isDisabled: isIncorrectAmount,
          text: isIncorrectAmount
            ? `Quantity must not exceed ${tokenAmountFormat(reinvestAmountVal, 'SLR')}`
            : `Migrate to ${poolInfo.value.name} pool without fee`,
        }
      })

      watch(migrateTxState, ({ isSuccess }) => isSuccess && refetchStakerAndBalance())

      return {
        amount,
        slrBalance,
        reinvestAmountStr,

        days,
        totalAmount,

        handleMigrate,
        migrateTxState,
        buttonData,

        stakedTokenAddress: contractsAddresses.SolarToken,
        poolAddress: contractsAddresses.StakingService,
      }
    },
    components: {
      SendTxButton,
      StakingProfit,
      TimelockInput,
      SlrBalanceInput,
      ApproveTokenPlug,
      ConnectWalletPlug,
      InsufficientBalancePlug,

      UiButton,
      UiIcon,
      UiPoligon,
      UiAlert,
    },
  })
</script>
