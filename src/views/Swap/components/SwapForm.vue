<template>
  <form class="swap-form">
    <ui-balance-input
      label="From"
      :value="amountIn"
      :currencySymbol="swapParams.tokenInSymbol"
      :balance="tokensBalances.in"
      :iconName="tokenInIconName"
      @input="handleTypeInput"
    />

    <div class="relative h-8">
      <swap-side-button
        @click="swapSide"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>

    <ui-balance-input
      label="To"
      class="mb-20"
      :value="amountOut"
      :currencySymbol="swapParams.tokenOutSymbol"
      :balance="tokensBalances.out"
      :iconName="tokenOutIconName"
      @input="handleTypeOutput"
    />

    <trade-price
      :swap-params="swapParams"
      class="mb-12"
      v-if="!isZeroAmount && !isInsufficientLiquidity"
    />
    <div class="mb-20">
      <connect-wallet-plug text="Connect wallet to trade">
        <approve-token-plug
          :text="`Enable ${swapParams.tokenInSymbol}`"
          :minAllowance="amountIn"
          :tokenAddress="swapParams.tokenIn"
          :spenderAddress="routerAddress"
        >
          <send-tx-button
            @click="handleSwap"
            :txState="swapTxState"
            :disabled="isDissableSwapButton"
            class="w-full"
            size="48"
            variant="violet"
          >
            {{ swapButtonText }}
          </send-tx-button>
        </approve-token-plug>
      </connect-wallet-plug>
    </div>

    <div
      class="text-12"
      v-if="!isZeroAmount && !isInsufficientLiquidity"
    >
      <div class="flex justify-between items-center mb-12">
        <div class="text-white text-opacity-60">Swap Fee</div>
        {{ swapFeeStr }}
      </div>
      <trade-info
        :swap-params="swapParams"
        class="mb-12"
      />
      <price-impact
        :price-impact="priceImpact"
        class="mb-12"
      />
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent, watch, watchEffect, ref } from 'vue'
  import contractsAddresses from '@/config/constants/contractsAddresses'

  import UiBalanceInput from '@/components/ui/UiBalanceInput.vue'
  import UiButton from '@/components/ui/UiButton.vue'

  import ApproveTokenPlug from '@/components/ApproveToken/ApproveTokenPlug.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'

  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'

  import { useSwapTx } from '../hooks/useSwapTx'
  import { useSwap } from '../hooks/useSwap'
  import { useSwapTokensBalance } from '../hooks/useSwapTokensBalance'
  import PriceImpact from './PriceImpact.vue'
  import TradeInfo from './TradeInfo.vue'
  import TradePrice from './TradePrice.vue'
  import SwapSideButton from './SwapSideButton.vue'

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
        isInsufficientLiquidity,
        isZeroAmount,
        tokenInIconName,
        tokenOutIconName,
        amountIn,
        amountOut,
        priceImpact,
        slippage,
        swapFee,
        isInitalStateFetched,
      } = useSwap()

      const [tokensBalances, refetchBalances] = useSwapTokensBalance(swapParams)
      const [handleSwap, swapTxState] = useSwapTx(swapParams)

      // Refetch balance and pair state after swap [BEGIN]
      const refetchBalanceAndPairState = () => Promise.all([fetchPairState(), refetchBalances()])

      watch(swapTxState, ({ isSuccess }) => isSuccess && refetchBalanceAndPairState())
      // Refetch balance and pair state after swap [END]

      // Swap button [BEGIN]
      const swapButtonText = ref('')
      const isDissableSwapButton = ref(true)

      watchEffect(() => {
        const {
          value: { in: tokenInBalance },
        } = tokensBalances
        const {
          value: { tokenInSymbol, tokenOutSymbol },
        } = swapParams
        let text = ''
        let disabled = true

        if (!isInitalStateFetched.value) {
          text = `Fetching blockchain data`
        } else if (tokenInBalance.lt(amountIn.value)) {
          text = `Insufficient ${tokenInSymbol} balance`
        } else if (isZeroAmount.value) {
          text = 'Enter an amount'
        } else if (isInsufficientLiquidity.value) {
          text = 'Insufficient liquidity for this trade'
        } else {
          text = `Swap ${tokenInSymbol} to ${tokenOutSymbol}`
          disabled = false
        }

        swapButtonText.value = text
        isDissableSwapButton.value = disabled
      })
      // Swap button [END]

      const swapFeeStr = usePercentFormat(swapFee)

      return {
        swapSide,
        handleTypeInput,
        handleTypeOutput,
        routerAddress,
        tokenInIconName,
        tokenOutIconName,
        swapParams,
        isInsufficientLiquidity,
        isZeroAmount,
        amountIn,
        amountOut,
        priceImpact,
        swapFeeStr,
        handleSwap,
        swapTxState,
        tokensBalances,
        swapButtonText,
        isDissableSwapButton,
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
      TradePrice,
      SwapSideButton,
    },
  })
</script>
