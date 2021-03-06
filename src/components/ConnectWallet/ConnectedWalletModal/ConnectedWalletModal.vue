<template>
  <ui-modal
    v-model="isOpen"
    label="Your Wallet"
  >
    <div class="bg-gray-800 bg-opacity-60 rounded-8 pt-12 pl-16 pb-16">
      <div class="flex items-center justify-between">
        <span class="text-12 text-gray">Connected to {{ walletName }}</span>
        <div class="bg-black rounded-full w-32 h-32 flex justify-center items-center mr-12">
          <ui-icon
            prefix="ui-icon-wallets"
            :name="walletIconName"
            size="16"
          />
        </div>
      </div>
      <div class="mt-2 text-[17px] text-white mr-16">{{ trimedAddress }}</div>
      <div class="flex pb-12 border-b border-gray-800 mt-6 mr-16 375:flex-row flex-col 375:space-x-16 space-x-0">
        <button
          type="button"
          class="text-violet text-14 mb-8"
          @click="handleCopy"
        >
          <div class="flex items-end">
            <div>Copy Address</div>
            <ui-icon
              class="text-violet text-opacity-50 ml-6"
              name="copy-hollow"
              size="18"
            />
          </div>
        </button>
        <a
          class="text-violet text-14 block mb-8"
          :href="bscScanAddress"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="flex items-end">
            <div>View on BscScan</div>
            <ui-icon
              class="text-violet text-opacity-50 ml-6"
              name="external"
              size="18"
            />
          </div>
        </a>
      </div>
      <div class="flex justify-between pt-4 mr-16">
        <span class="text-gray text-12">BNB Balance</span>
        <span class="text-12">{{ bnbBalanceStr }}</span>
      </div>
      <div class="flex justify-between mt-6 mr-16">
        <span class="text-gray text-12">SLR Balance</span>
        <span class="text-12">{{ slrBalanceStr }}</span>
      </div>
    </div>
    <ui-button
      variant="gray"
      size="40"
      class="w-full mt-16"
      @click="handleDisconnect"
    >
      Log out
    </ui-button>
  </ui-modal>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue'
  import { useConnectedWalletModal } from '../hooks/useConnectedWalletModal'
  import UiModal from '@/components/ui/UiModal.vue'
  import UiIcon from '@/components/ui/UiIcon'
  import UiButton from '@/components/ui/UiButton.vue'
  import { shortenAddress } from '@/utils/address/shortenAddress'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { useSlrBalance } from '@/store/hooks/useBalance'
  import { useWallet } from '@/hooks/dapp/useWallet'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import { useClipboard } from '@vueuse/core'
  import { useSingleToast } from '@/hooks/useSingleToast'
  import { useBscScanAddress } from '@/hooks/useBscScanAddress'

  export default defineComponent({
    name: 'connected-wallet-modal',
    setup() {
      const { isOpen, close } = useConnectedWalletModal()
      const { address, balance: bnbBalance } = useEthers()
      const trimedAddress = computed(() => shortenAddress(address.value, 4))
      const [slrInfo] = useSlrBalance()
      const slrBalance = computed(() => slrInfo.value.balance)
      const { disconnect, walletName, walletIconName } = useWallet()
      const slrBalanceStr = useTokenAmountFormat(slrBalance)
      const bnbBalanceStr = useTokenAmountFormat(bnbBalance)
      const bscScanAddress = useBscScanAddress(address)

      const { copy } = useClipboard()
      const { success, error } = useSingleToast()

      const handleCopy = () => {
        try {
          copy(unref(address))
          success('Address has been copied')
        } catch (e) {
          error(`Address has not been copied: ${e}`)
        }
      }

      const handleDisconnect = () => {
        close()
        disconnect()
      }

      return {
        isOpen,
        trimedAddress,
        slrBalanceStr,
        bnbBalanceStr,
        walletName,
        walletIconName,
        bscScanAddress,
        handleCopy,
        handleDisconnect,
      }
    },
    components: {
      UiIcon,
      UiModal,
      UiButton,
    },
  })
</script>
