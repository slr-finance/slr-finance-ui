<template>
  <div class="bg-gray-600 bg-opacity-20 h-36 rounded-10 px-10 flex justify-center items-center text-12">
    <ui-icon-slr-logo class="mr-4 w-16 h-16"/>
    {{ priceStr }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useSlrPrice } from '@/hooks/dapp/useSlrPrice'
  import { useUsdFormat } from '@/hooks/formatters/useUsdFormat'
  import { UiIconSlrLogo } from '@slr-finance/uikit'

  export default defineComponent({
    setup() {
      const { slrPrice } = useSlrPrice()
      const priceStr = useUsdFormat(slrPrice)

      return { priceStr }
    },
    components: {
      UiIconSlrLogo,
    },
  })
</script>
