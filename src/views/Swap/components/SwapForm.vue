<template>
  <form class="swap-form">
    <ui-balance-input
      label="From"
      :value="amountIn"
      :currencySymbol="tokenInSymbol"
      :balance="tokensBalances.in"
      :iconName="tokenInIconName"
      @input="handleTypeInput"
    />
    <ui-button @click="swapSide">swapSide</ui-button>
    <ui-balance-input
      label="To"
      class="mb-48"
      :value="amountOut"
      :currencySymbol="tokenOutSymbol"
      :balance="tokensBalances.out"
      :iconName="tokenOutIconName"
      @input="handleTypeOutput"
    />

    <div v-if="insufficientLiquidity">Insufficient liquidity for this trade</div>

    <template v-else>
      <connect-wallet-plug text="Connect wallet to trade">
        <approve-token-plug
          text="Enable"
          :minAllowance="amountIn"
          :tokenAddress="swapParams.tokenIn"
          :spenderAddress="routerAddress"
        >
          <send-tx-button
            @click="handleSwap"
            :txState="swapTxState"
            :disabled="false"
            class="w-full"
            size="48"
            variant="accent"
          >
            Swap {{ tokenInSymbol }} to {{ tokenOutSymbol }}
          </send-tx-button>
        </approve-token-plug>
      </connect-wallet-plug>

      <div>
        <div>swapFeeStr: {{ swapFeeStr }}</div>
        <trade-info :swap-params="swapParams" />
        <price-impact :price-impact="priceImpact" />
      </div>
    </template>
    <div>{{ JSON.stringify(swapParams, null, 2) }}</div>
  </form>
</template>

<script lang="ts">
  import { defineComponent, computed, watch } from 'vue'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import { useEthers } from '@/hooks/dapp/useEthers'

  import UiBalanceInput from '@/components/ui/UiBalanceInput.vue'
  import UiButton from '@/components/ui/UiButton.vue'

  import ApproveTokenPlug from '@/components/ApproveToken/ApproveTokenPlug.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'

  import { BIG_ONE, parseWei } from '@/utils/bigNumber'

  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'

  import { useSlrBalance } from '@/store/hooks/useBalance'
  import { useSwapTx } from '../hooks/useSwapTx'
  import { useSwap, TradeType } from '../hooks/useSwap'
  import PriceImpact from './PriceImpact.vue'
  import TradeInfo from './TradeInfo.vue'

  import BigNumber from 'bignumber.js'

  export default defineComponent({
    name: 'swap-form',
    setup() {
      const routerAddress = contractsAddresses.SwapRouter
      const {
        swapSide,
        handleTypeInput,
        handleTypeOutput,
        fetchPairState,
        swapParams,
        insufficientLiquidity,
        tokenInSymbol,
        tokenOutSymbol,
        tokenInIconName,
        tokenOutIconName,
        amountIn,
        amountOut,
        priceImpact,
        slippage,
        swapFee,
      } = useSwap()

      const [handleSwap, swapTxState] = useSwapTx(swapParams)

      const swapFeeStr = usePercentFormat(swapFee)
      const [slrTokenInfo, fetchBalance] = useSlrBalance()

      // Refetch balance and pair state after swap [BEGIN]
      const refetchBalanceAndPairState = () => Promise.all([fetchPairState(), fetchBalance()])

      watch(swapTxState, ({ isSuccess }) => isSuccess && refetchBalanceAndPairState())
      // Refetch balance and pair state after swap [END]

      const { balance: bnbBalance } = useEthers()

      const tokensBalances = computed(() =>
        swapParams.value.tokenIn === contractsAddresses.SolarToken
          ? { in: slrTokenInfo.value.balance, out: bnbBalance.value }
          : { out: slrTokenInfo.value.balance, in: bnbBalance.value },
      )

      return {
        swapSide,
        handleTypeInput,
        handleTypeOutput,
        routerAddress,
        tokenInSymbol,
        tokenOutSymbol,
        tokenInIconName,
        tokenOutIconName,
        swapParams,
        insufficientLiquidity,
        amountIn,
        amountOut,
        priceImpact,
        swapFeeStr,
        handleSwap,
        swapTxState,
        tokensBalances,
      }
    },
    components: {
      UiButton,
      UiBalanceInput,
      ApproveTokenPlug,
      ConnectWalletPlug,
      SendTxButton,
      PriceImpact,
      TradeInfo,
    },
  })
</script>
