<template>
  <div>
    <div>slrTokenAmount: {{ slrTokenAmount.toFixed(4) }}</div>
    <send-tx-button
      @click="handleDeposit"
      :txState="depositPresaleTokenTxState"
      :disabled="isDisabled"
    >
      Get SOLAR tokens
    </send-tx-button>
  </div>
</template>

<script lang="ts">
  import SendTxButton from '@/components/Tx/SendTxButton.vue'
  import { useBurnPresaleToken } from '../hooks/useBurnPresaleToken'
  import { computed, defineComponent, watch } from 'vue'
  import { useBalance } from '@/store/hooks/useBalance'
  import contractsAddresses from '@/config/constants/contractsAddresses.json'
  import { FetchingStatus } from '@/entities/common'

  export default defineComponent({
    components: { SendTxButton },
    name: 'deposit-presale-token-form',
    setup() {
      const [handleDeposit, depositPresaleTokenTxState] = useBurnPresaleToken()
      const [presaleTokenInfo, handleFetchPresaleBalance] = useBalance(contractsAddresses.PresaleService)
      const [slrTokenInfo, handleFetchSlrBalance] = useBalance(contractsAddresses.SolarToken)
      const slrTokenAmount = computed(() => slrTokenInfo.value.balance)
      const isDisabled = computed(
        () => presaleTokenInfo.value.balance.lte(0) || presaleTokenInfo.value.fetchStatus !== FetchingStatus.FETCHED,
      )

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
        slrTokenAmount,
      }
    },
  })
</script>
