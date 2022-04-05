<template>
  <form>
    <ui-input-bn
      :value="amountIn"
      @input="handleTypeInput"
    >
      <template #postfix>
        <div>
          {{ tokenInSymbol }}
        </div>
      </template>
    </ui-input-bn>
    <ui-button @click="swapSide">swapSide</ui-button>
    <ui-input-bn
      :value="amountOut"
      @input="handleTypeOutput"
    >
      <template #postfix>
        <div>
          {{ tokenOutSymbol }}
        </div>
      </template>
    </ui-input-bn>

    <div v-if="insufficientLiquidity">Insufficient liquidity for this trade</div>

    <template v-else>
      <connect-wallet-plug text="Connect wallet to trade">
        <approve-token-plug
          text="Enable"
          :minAllowance="amountIn"
          :tokenAddress="tokenOutAddress"
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
  </form>
</template>

<script lang="ts">
  import { defineComponent, computed, watch } from 'vue'

  import UiInputBn from '@/components/ui/UiInputBn.vue'
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

  export default defineComponent({
    name: 'swap-form',
    setup() {
      const routerAddress = ''
      const {
        swapSide,
        handleTypeInput,
        handleTypeOutput,
        fetchPairState,
        swapParams,
        insufficientLiquidity,
        tokenInAddress,
        tokenOutAddress,
        tokenInSymbol,
        tokenOutSymbol,
        path,
        amounts,
        amountIn,
        amountOut,
        priceImpact,
        slippage,
        swapFee,
      } = useSwap()

      const minAmountIn = computed(() => amountOut.value.times(BIG_ONE.minus(slippage.value)))

      const [handleSwap, swapTxState] = useSwapTx(path, amounts)

      const minAmountInStr = useTokenAmountFormat(minAmountIn)
      const swapFeeStr = usePercentFormat(swapFee)

      // Refetch balance and pair state after swap [BEGIN]
      const [, fetchBalance] = useSlrBalance()
      const refetchBalanceAndPairState = () => Promise.all([fetchPairState(), fetchBalance()])

      watch(swapTxState, ({ isSuccess }) => isSuccess && refetchBalanceAndPairState())
      // Refetch balance and pair state after swap [END]

      return {
        swapSide,
        handleTypeInput,
        handleTypeOutput,
        routerAddress,
        tokenInAddress,
        tokenOutAddress,
        tokenInSymbol,
        tokenOutSymbol,
        swapParams,
        insufficientLiquidity,
        amountIn,
        amountOut,
        minAmountInStr,
        priceImpact,
        swapFeeStr,
        handleSwap,
        swapTxState,
      }
    },
    components: {
      UiButton,
      UiInputBn,
      ApproveTokenPlug,
      ConnectWalletPlug,
      SendTxButton,
      PriceImpact,
      TradeInfo,
    },
  })
</script>
