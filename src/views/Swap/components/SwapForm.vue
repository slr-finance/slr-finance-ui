<template>
  <form>
    <ui-input-bn v-model:value="amountIn">
      <template #postfix>
        <div>
          {{ tokenOutSymbol }}
        </div>
      </template>
    </ui-input-bn>
    <ui-button @click="swapSide">swapSide</ui-button>
    <ui-input-bn v-model:value="amountOut">
      <template #postfix>
        <div>
          {{ tokenInSymbol }}
        </div>
      </template>
    </ui-input-bn>

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

    <div>swapFeeStr: {{ swapFeeStr }} minAmountInStr: {{ minAmountInStr }}</div>
  </form>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  import UiInputBn from '@/components/ui/UiInputBn.vue'
  import UiButton from '@/components/ui/UiButton.vue'

  import ApproveTokenPlug from '@/components/ApproveToken/ApproveTokenPlug.vue'
  import ConnectWalletPlug from '@/components/ConnectWallet/ConnectWalletPlug.vue'
  import SendTxButton from '@/components/Tx/SendTxButton.vue'

  import { BIG_ONE } from '@/utils/bigNumber'

  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'

  import { useSwapTx } from '../hooks/useSwapTx'
  import { useSwap } from '../hooks/useSwap'

  export default defineComponent({
    name: 'swap-form',
    setup() {
      const routerAddress = ''
      const {
        swapSide,
        tokenInAddress,
        tokenOutAddress,
        tokenInSymbol,
        tokenOutSymbol,
        path,
        amounts,
        amountIn,
        amountOut,
        slippage,
        swapFee,
      } = useSwap()

      const minAmountIn = computed(() => amountOut.value.times(BIG_ONE.minus(slippage.value)))

      const [handleSwap, swapTxState] = useSwapTx(path, amounts)

      const minAmountInStr = useTokenAmountFormat(minAmountIn)
      const swapFeeStr = usePercentFormat(swapFee)

      return {
        routerAddress,
        swapSide,
        tokenInAddress,
        tokenOutAddress,
        tokenInSymbol,
        tokenOutSymbol,
        amountIn,
        amountOut,
        minAmountInStr,
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
    },
  })
</script>
