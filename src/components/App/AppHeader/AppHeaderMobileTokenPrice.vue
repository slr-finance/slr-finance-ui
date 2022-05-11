<template>
  <div class="bg-gray-600 bg-opacity-20 h-36 rounded-10 px-10 flex justify-center items-center text-12">
    <ui-icon
      size="16"
      name="slr-logo"
      class="mr-4"
    />
    {{ priceStr }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useSlrPrice } from '@/store/hooks/useSlrPrice'
  import { useUsdFormat } from '@/hooks/formatters/useUsdFormat'
  import UiIcon from '@/components/ui/UiIcon.vue'

  export default defineComponent({
    setup() {
      const priceStr = useUsdFormat(useSlrPrice())

      return { priceStr }
    },
    components: {
      UiIcon,
    },
  })
</script>
