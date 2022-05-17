<template>
  <div class="progress-wrapper" :class="classList" role="progressbar">
    <div class="progress" :style="progressStyleList"/>
    <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" role="presentation">
      <slot name="content"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue'

  export default defineComponent({
    name: 'ui-progress',
    props: {
      value: {
        type: Number,
        default: 0,
      },
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER,
      },
      size: {
        default: '24',
        validator: (value: string) => ['24'].includes(value),
      },
      variant: {
        default: 'default',
        validator: (value: string) => ['default'].includes(value),
      },
    },
    setup(props) {
      const percent = computed(() => (props.value / props.max) * 100)

      const progressStyleList = computed(() => ({
        width: `${unref(percent)}%`,
      }))

      const classList = computed(() => ({
        [`-${props.variant}`]: true,
        [`-size-${props.size}`]: true,
      }))

      return {
        classList,
        progressStyleList,
      }
    },
  })
</script>

<style lang="postcss">
.progress-wrapper {
  @apply rounded-[35px] bg-black relative overflow-hidden;
}

.progress-wrapper.-size-24 {
  @apply h-24;
}

.progress-wrapper.-default .progress {
  @apply bg-green-original h-full;
}
</style>
