<template>
  <div class="flex flex-wrap justify-between items-center text-white text-opacity-60 text-12">
    <div class="flex justify-center items-center mr-8 mt-8">
      <picture v-if="isShownImage">
        <source
          srcset="/images/pools/point/point.webp"
          type="image/webp"
        />
        <img
          src="/images/pools/point/point.jpg"
          class="rounded-8 pointer-events-none select-none mr-20"
          width="30"
          height="30"
        />
      </picture>
      Total pool staked
    </div>
    <div
      class="flex justify-center items-center cursor-default border border-white border-opacity-20 px-12 py-8 mt-8 rounded-8"
    >
      <ui-icon-lock class="mr-6 w-14 h-14"/>
      {{ tvlStr }}
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef } from 'vue'
  import { UiIconLock } from '@slr-finance/uikit'
  import { tokenAmountFormat } from '@/utils/strFormat/tokenAmountFormat'
  import { usePoolState } from '../hooks/usePoolState'
  import { useAppBreakpoints } from '@/hooks/useAppBreakpoints'
  import { useTransition } from '@vueuse/core'

  export default defineComponent({
    name: 'pool-tvl',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const [poolState] = usePoolState(toRef(props, 'poolId'))
      const tvl = computed(() => poolState.value.totalStaked.toNumber())
      const tvlAnimated = useTransition(tvl, { duration: 500 })
      const tvlStr = computed(() => tokenAmountFormat(tvlAnimated.value, 'SLR'))
      const { w380: isShownImage } = useAppBreakpoints()

      return { tvlStr, isShownImage }
    },
    components: { UiIconLock },
  })
</script>
