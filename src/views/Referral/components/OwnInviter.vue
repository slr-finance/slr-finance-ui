<template>
  <div>My inviter: {{ shortenInviterAddress }}</div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useOwnInviter } from '@/hooks/useOwnInviter'
  import { shortenAddress } from 'vue-dapp'

  export default defineComponent({
    setup() {
      const { inviterAddress } = useOwnInviter()
      const shortenInviterAddress = computed(() => shortenAddress(inviterAddress.value))

      return {
        shortenInviterAddress,
      }
    },
  })
</script>
