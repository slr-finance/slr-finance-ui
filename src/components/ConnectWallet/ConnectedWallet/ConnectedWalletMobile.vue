<template>
  <div
    class="text-12 bg-black text-white/60 rounded-10 h-36 px-8 flex justify-center items-center"
    @click="open"
  >
    {{ trimedAddress }}

    <ui-icon
      class="text-white ml-4"
      name="arrow-pixel"
      size="8"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { shortenAddress } from '@/utils/address/shortenAddress'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import { FetchingStatus } from '@/entities/common'
  import { useConnectedWalletModal } from '../hooks/useConnectedWalletModal'

  export default defineComponent({
    name: 'connected-wallet-mobile',
    setup(props) {
      const { address } = useEthers()
      const trimedAddress = computed(() => shortenAddress(address.value, 2))
      const [slrInfo] = useSlrBalance()
      const balance = computed(() => slrInfo.value.balance)
      const isBalanceLoaded = computed(() => slrInfo.value.fetchStatus === FetchingStatus.FETCHED)
      const balanceStr = useTokenAmountFormat(balance, 'SLR')
      const { open } = useConnectedWalletModal()

      return {
        trimedAddress,
        open,
        balanceStr,
        isBalanceLoaded,
      }
    },
    components: { UiIcon },
  })
</script>
