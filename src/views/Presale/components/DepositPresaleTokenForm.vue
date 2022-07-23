<template>
  <div v-if="!isFetchingPresaleSlrBalance">
    <div>You have {{ presaleSlrAmountStr }}</div>

    <send-tx-button
      @click="handleDeposit"
      :txState="depositPresaleTokenTxState"
      :disabled="isDisabled"
      size="48"
    >
      Get SOLAR tokens
    </send-tx-button>
  </div>
  <ui-galaxy-loader v-else />
</template>

<script lang="ts">
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import { useBurnPresaleToken } from '../hooks/useBurnPresaleToken'
  import { computed, defineComponent, watch } from 'vue'
  import { useBalance } from '@/hooks/dapp/useBalance'
  import { useSlrBalance } from '@/hooks/dapp/useSlrBalance'
  import contractsAddresses from '@/config/constants/contractsAddresses'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'

  export default defineComponent({
    components: { SendTxButton, UiGalaxyLoader },
    name: 'deposit-presale-token-form',
    setup() {
      const [handleDeposit, depositPresaleTokenTxState] = useBurnPresaleToken()
      const {
        isFetching: isFetchingPresaleSlrBalance,
        refetchBalance: refetchPresaleBalance,
        balance: presaleTokenBalance,
      } = useBalance(contractsAddresses.PresaleService)
      const { refetchBalance: refetchSlrBalance } = useSlrBalance()
      const isDisabled = computed(() => presaleTokenBalance.value.lte(0) || isFetchingPresaleSlrBalance.value)

      const presaleSlrAmountStr = useTokenAmountFormat(presaleTokenBalance, 'PresaleSLR')

      watch(depositPresaleTokenTxState, () => {
        if (depositPresaleTokenTxState.value.isSuccess) {
          refetchSlrBalance()
          refetchPresaleBalance()
        }
      })

      return {
        handleDeposit,
        depositPresaleTokenTxState,
        isDisabled,
        isFetchingPresaleSlrBalance,
        presaleSlrAmountStr,
      }
    },
  })
</script>
