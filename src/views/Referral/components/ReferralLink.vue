<template>
  <div
    @click="copy(referralLink)"
    v-if="isCorrectAddress"
  >
    Your referal link: {{ referralLink }}

    <span v-if="!copied">Copy</span>
    <span v-else>Copied!</span>
  </div>
  <div>Error: Invalid wallet address</div>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue'
  import { useEthers } from 'vue-dapp'
  import { useClipboard } from '@vueuse/core'
  import { REFERRER_QUERY_PARAM } from '@/config/constants/referrals'
  import { DOMAIN } from '@/config/constants/main'
  import { isAddress } from '@ethersproject/address'

  export default defineComponent({
    name: 'referral-link',
    setup() {
      const { address } = useEthers()
      const isCorrectAddress = computed(() => isAddress(address.value))
      const referralLink = computed(() => `${DOMAIN}?${REFERRER_QUERY_PARAM}=${unref(address)}`)
      const { copy, copied } = useClipboard()

      return { copy, copied, referralLink, isCorrectAddress }
    },
  })
</script>
