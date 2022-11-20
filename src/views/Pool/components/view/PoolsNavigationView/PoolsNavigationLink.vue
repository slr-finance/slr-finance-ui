<template>
  <router-link
    class="pools-navigation-link"
    :class="classList"
    v-if="poolData"
    :to="poolData.to"
  >
    <div class="flex-1 mr-4 flex justify-center">
      {{ poolData.name }}
      <ui-text-placeholder
        class="flex-1 ml-4"
        :text="apyStr"
        :is-loading="isFetching"
      />
    </div>
    <ui-async-icon-pixel-arrow-to class="pools-navigation-link--icon"/>
  </router-link>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from 'vue'
import { UiTextPlaceholder, UiAsyncIconPixelArrowTo } from '@slr-finance/uikit'
import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
import { POOLS_INFO } from '@/config/constants/Pools'

const poolsMap = new Map(POOLS_INFO.map(({id, name, routeName}, ) => [ id, { name, to: { name: routeName } } ]))

export default defineComponent({
  name: 'pools-navigation-link',
  props: {
    isFetching: {
      type: Boolean
    },
    up: {
      type: Boolean,
    },
    apy: {
      type: Number,
      required: true,
    },
    poolId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const apyStr = usePercentFormat(toRef(props, 'apy'))
    const poolData = computed(() => poolsMap.get(props.poolId))
    const classList = computed(() => props.up ? '-up' : '')

    return {
      poolData,
      classList,
      apyStr
    }
  },
  components: {
    UiAsyncIconPixelArrowTo,
    UiTextPlaceholder,
  }
})
</script>

<style scoped>
.pools-navigation-link {
  @apply h-40 flex justify-between items-center;
}
.pools-navigation-link > .pools-navigation-link--icon {
  @apply mr-8 w-16 h-16;
}

.pools-navigation-link.-up > .pools-navigation-link--icon {
  @apply transform rotate-180;
}
</style>
