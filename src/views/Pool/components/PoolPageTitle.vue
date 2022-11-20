<template>
  <h2 class="pool-page-title title text-ui-page-title uppercase font-title mb-8 leading-140 cursor-default">
    {{ poolInfo.name }} <span class="opacity-60">staking {{ poolInfo.page.objectTypeName }}</span>
  </h2>
</template>

<script lang="ts">
import type { PoolType } from '@/config/constants/Pools'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'pool-page-title',
  props: {
    poolInfo: {
      type: Object as PropType<PoolType>,
      required: true,
    },
  },
})
</script>
