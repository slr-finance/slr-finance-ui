<template>
  <div v-if="isFetchedPresaleSlrBalance">
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
  import { useBalance } from '@/store/hooks/useBalance'
  import contractsAddresses from '@/config/constants/contractsAddresses'
  import { FetchingStatus } from '@/entities/common'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'

  export default defineComponent({
    components: { SendTxButton, UiGalaxyLoader },
    name: 'deposit-presale-token-form',
    setup() {
      const [handleDeposit, depositPresaleTokenTxState] = useBurnPresaleToken()
      const [presaleTokenInfo, handleFetchPresaleBalance] = useBalance(contractsAddresses.PresaleService)
      const [, handleFetchSlrBalance] = useBalance(contractsAddresses.SolarToken)
      const isDisabled = computed(
        () => presaleTokenInfo.value.balance.lte(0) || presaleTokenInfo.value.fetchStatus !== FetchingStatus.FETCHED,
      )

      const presaleSlrAmount = computed(() => presaleTokenInfo.value.balance)
      const isFetchedPresaleSlrBalance = computed(() => presaleTokenInfo.value.fetchStatus == FetchingStatus.FETCHED)
      const presaleSlrAmountStr = useTokenAmountFormat(presaleSlrAmount, 'PresaleSLR')

      watch(depositPresaleTokenTxState, () => {
        if (depositPresaleTokenTxState.value.isSuccess) {
          handleFetchSlrBalance()
          handleFetchPresaleBalance()
        }
      })

      return {
        handleDeposit,
        depositPresaleTokenTxState,
        isDisabled,
        isFetchedPresaleSlrBalance,
        presaleSlrAmountStr,
      }
    },
  })
</script>
