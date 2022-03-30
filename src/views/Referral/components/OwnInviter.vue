<template>
  <div class="flex flex-col">
    <span class="text-11 text-gray uppercase">my inviter</span>
    <span>{{ shortenInviterAddress }}</span>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useOwnInviter } from '@/hooks/useOwnInviter'
  import { shortenAddress } from '@/utils/address/shortenAddress'

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
