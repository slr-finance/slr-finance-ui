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
      <button
        @click="swapSide"
        type="button"
        class="h-36 w-36 rounded-10 bg-[#333333] flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <ui-icon
          name="arrow-pixel-both"
          size="14"
        />
      </button>
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

    <div
      class="h-48 flex justify-center items-center rounded-10 bg-gray bg-opacity-30 text-12 text-white text-opacity-60"
      v-if="insufficientLiquidity"
    >
      Insufficient liquidity for this trade
    </div>

    <template v-else>
      <trade-price
        :swap-params="swapParams"
        class="mb-12"
      />
      <div class="mb-20">
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
              variant="violet"
            >
              Swap {{ swapParams.tokenInSymbol }} to {{ swapParams.tokenOutSymbol }}
            </send-tx-button>
          </approve-token-plug>
        </connect-wallet-plug>
      </div>

      <div class="text-12">
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
    </template>
  </form>
</template>

<script lang="ts">
  import { defineComponent, computed, watch } from 'vue'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import { useEthers } from '@/hooks/dapp/useEthers'

  import UiBalanceInput from '@/components/ui/UiBalanceInput.vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'

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
  import TradePrice from './TradePrice.vue'

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
        tokenInIconName,
        tokenOutIconName,
        amountIn,
        amountOut,
        priceImpact,
        slippage,
        swapFee,
      } = useSwap()

      const { balance: bnbBalance, fetchBalance: fetchBnbBalance } = useEthers()
      const [slrTokenInfo, fetchBalance] = useSlrBalance()

      const [handleSwap, swapTxState] = useSwapTx(swapParams)

      // Refetch balance and pair state after swap [BEGIN]
      const refetchBalanceAndPairState = () => Promise.all([fetchPairState(), fetchBalance(), fetchBnbBalance()])

      watch(swapTxState, ({ isSuccess }) => isSuccess && refetchBalanceAndPairState())
      // Refetch balance and pair state after swap [END]

      const tokensBalances = computed(() =>
        swapParams.value.tokenIn === contractsAddresses.SolarToken
          ? { in: slrTokenInfo.value.balance, out: bnbBalance.value }
          : { out: slrTokenInfo.value.balance, in: bnbBalance.value },
      )

      const swapFeeStr = usePercentFormat(swapFee)

      return {
        swapSide,
        handleTypeInput,
        handleTypeOutput,
        routerAddress,
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
      UiIcon,
      ApproveTokenPlug,
      ConnectWalletPlug,
      SendTxButton,
      PriceImpact,
      TradeInfo,
      TradePrice,
    },
  })
</script>
