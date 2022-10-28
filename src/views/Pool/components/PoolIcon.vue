<template>
  <component :is="iconComponent"/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { UiIconPoolsEarth, UiIconPoolsSaturn, UiIconPoolsJupiter, UiIconPoolsMars, UiIconPoolsMercury, UiIconPoolsNeptune, UiIconPoolsSun, UiIconPoolsUranus, UiIconPoolsVenus } from '@slr-finance/uikit'
import { POOLS_INFO } from '@/config/constants/Pools'

const poolIconsMap = new Map(POOLS_INFO.map(({id, page: { iconComponent }}) => [id, iconComponent]))

export default defineComponent({
  name: 'pool-icon',
  props: {
    poolId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const iconComponent = computed(() => poolIconsMap.get(props.poolId))

    return { iconComponent }
  },
  components: {
    UiIconPoolsEarth,
    UiIconPoolsSaturn,
    UiIconPoolsJupiter,
    UiIconPoolsMars,
    UiIconPoolsMercury,
    UiIconPoolsNeptune,
    UiIconPoolsSun,
    UiIconPoolsUranus,
    UiIconPoolsVenus
  }
})
</script>
