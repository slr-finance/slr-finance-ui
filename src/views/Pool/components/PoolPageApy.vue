<template>
  <p class="text-ui-page-description text-white/40 leading-140 mb-20 cursor-default flex items-center">
    <span class="mr-6">Fixed APY:</span>
    <ui-text-placeholder
      :text="apyStr"
      class="text-yellow text-opacity-80 min-w-64"
    />
  </p>
</template>

<script lang="ts">
import { UiTextPlaceholder } from '@slr-finance/uikit'
import { computed, defineComponent, toRef } from 'vue'
import { percentFormat } from '@/utils/strFormat/percentFormat'
import { usePoolState } from '../hooks/usePoolState'
import { useTransition } from '@vueuse/core'

export default defineComponent({
  name: 'pool-page-apy',
  props: {
    poolId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const [poolState, isPoolFetching] = usePoolState(toRef(props, 'poolId'))
    const apy = computed(() => poolState.value.apy.toNumber())
    const apyAnimated = useTransition(apy, { duration: 500 })

    const apyStr = computed(() => {
      return !isPoolFetching.value ? percentFormat(apyAnimated.value) : null
    })

    return {
      poolState,
      apyStr,
    }
  },
  components: { UiTextPlaceholder },
})
</script>
