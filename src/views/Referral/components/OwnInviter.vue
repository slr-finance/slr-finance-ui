<template>
  <div class="flex flex-col items-start">
    <span class="text-11 text-gray uppercase">My inviter</span>
    <ui-text-placeholder
      class="text-14 min-w-104"
      :text="shortenInviterAddress"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useOwnInviter } from '@/hooks/useOwnInviter'
  import { shortenAddress } from '@/utils/address/shortenAddress'
  import UiTextPlaceholder from '@/components/ui/UiTextPlaceholder.vue'

  export default defineComponent({
    name: 'own-inviter',
    setup() {
      const { inviterAddress } = useOwnInviter()
      const shortenInviterAddress = computed(() => shortenAddress(inviterAddress.value))

      return {
        shortenInviterAddress,
      }
    },
    components: { UiTextPlaceholder },
  })
</script>
