<template>
  <div class="pool-page-description min-h-40 text-12 text-white/60 mb-8 py-2 flex items-start cursor-default">
    <div class="w-20 h-20 border border-white rounded-full mr-8 flex-grow-0 flex-shrink-0" />
    {{ poolInfo.page.description }}
  </div>
</template>

<script lang="ts">
import type { PoolType } from '@/config/constants/Pools'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'pool-page-description',
  props: {
    poolInfo: {
      type: Object as PropType<PoolType>,
      required: true,
    },
  },
})
</script>
