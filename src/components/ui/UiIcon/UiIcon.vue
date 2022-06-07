<template>
  <svg
    aria-hidden="true"
    :width="size"
    :height="size"
  >
    <use
      :xlink:href="symbolId"
      :style="styleList"
      class="origin-center"
    />
  </svg>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'UiIcon',
    props: {
      prefix: {
        type: String,
        default: 'ui-icon',
      },
      name: {
        type: String,
        required: true,
      },
      size: {
        type: [Number, String],
        default: 32,
      },
      rotate: {
        type: [Number, String],
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
