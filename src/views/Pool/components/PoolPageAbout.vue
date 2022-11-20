<template>
  <div class="text-14 mb-32">{{ poolInfo.page.aboutPool }}</div>
</template>

<script lang="ts">
import type { PoolType } from '@/config/constants/Pools'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'pool-page-about',
  props: {
    poolInfo: {
      type: Object as PropType<PoolType>,
      required: true,
    },
  },
})
</script>
