<template>
  <svg
    :width="size"
    :height="size"
    aria-hidden="true"
  >
    <use
      :xlink:href="symbolId"
      :style="styleList"
      class="origin-center"
    />
  </svg>
</template>

<script lang="ts">
  import type { UiIconProps } from './types'
  import { defineComponent, computed, PropType } from 'vue'

  export default defineComponent({
    name: 'UiIcon',
    props: {
      name: {
        type: String as PropType<UiIconProps['name']>,
        required: true,
      },
      prefix: {
        type: String as PropType<UiIconProps['prefix']>,
        default: 'ui-icon',
      },
      size: {
        type: [Number, String] as PropType<UiIconProps['size']>,
        default: 32,
      },
      rotate: {
        type: [Number, String] as PropType<UiIconProps['rotate']>,
        default: 0,
      },
    },
    setup(props) {
      const styleList = computed(() => ({ transform: `rotate(${props.rotate}deg)` }))
      const symbolId = computed(() => `#${props.prefix}-${props.name}`)

      return { symbolId, styleList }
    },
  })
</script>
