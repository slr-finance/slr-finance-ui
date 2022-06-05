<template>
  <div
    v-if="isCorrectAddress"
    class="rounded-12 border border-white border-opacity-20 h-48 pl-16 pr-6 flex items-center justify-between"
  >
    <span class="truncate mr-32">
      {{ referralLink }}
    </span>

    <button
      class="flex justify-center items-center rounded-10 bg-opacity-20 bg-violet min-w-40 w-40 h-40"
      @click="handleCopy"
    >
      <ui-icon
        class="text-violet"
        size="18"
        name="copy"
      />
    </button>
  </div>
  <div v-else>Error: Invalid wallet address</div>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue'
  import { useEthers } from '@/hooks/dapp/useEthers'
  import { useClipboard } from '@vueuse/core'
  import { REFERRER_QUERY_PARAM } from '@/config/constants/referrals'
  import { DOMAIN } from '@/config/constants/main'
  import { isAddress } from '@ethersproject/address'
  import UiIcon from '@/components/ui/UiIcon'
  import { useSingleToast } from '@/hooks/useSingleToast'

  export default defineComponent({
    name: 'referral-link',
    components: { UiIcon },
    setup() {
      const { address } = useEthers()
      const isCorrectAddress = computed(() => isAddress(address.value))
      const referralLink = computed(() => `${DOMAIN}?${REFERRER_QUERY_PARAM}=${unref(address)}`)
      const { copy } = useClipboard()
      const { success, error } = useSingleToast()

      const handleCopy = () => {
        try {
          copy(unref(referralLink))
          success('Referral link has been copied')
        } catch (e) {
          error(`Referral link has not been copied: ${e}`)
        }
      }

      return { copy, referralLink, isCorrectAddress, handleCopy }
    },
  })
</script>
