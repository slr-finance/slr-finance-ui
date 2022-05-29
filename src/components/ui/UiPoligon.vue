<template>
  <component
    :is="tag"
    class="ui-poligon select-none uppercase text-center"
    :class="classList"
  >
    <div class="wrapper inline-block relative aspect-1 font-title overflow-hidden">
      <svg
        class="svg w-full h-full"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          :d="d"
          fill="currentColor"
        />
      </svg>
      <div class="content absolute inset-0 z-0 flex justify-center items-center">
        <slot />
      </div>
    </div>
  </component>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    inheritAttrs: true,
    props: {
      tag: {
        type: String,
        default: 'div',
      },
      size: {
        type: String,
        default: '50',
        validator: (val: string) => ['50', '64'].includes(val),
      },
      corners: {
        type: [Number, String],
        default: 12,
        validator: (val: number) => ['12', '6'].includes(val.toString()),
      },
      variant: {
        validator: (value: string) =>
          ['white', 'default', 'violet', 'green-original', 'green-atomic', 'yellow', 'red', 'orange'].includes(value),
        default: 'default',
      },
      opacity: {
        type: Boolean,
        default: false,
      },
      animated: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const d = computed(() => {
        return props.corners == 6
          ? 'M32 0L59.7128 16V48L32 64L4.28719 48V16L32 0Z'
          : 'M32 0L48 4.28719L59.7128 16L64 32L59.7128 48L48 59.7128L32 64L16 59.7128L4.28719 48L0 32L4.28719 16L16 4.28719L32 0Z'
      })
      const classList = computed(() => {
        return {
          '-animated': props.animated,
          '-opacity': props.opacity,
          [`-size-${props.size}`]: true,
          'cursor-default': props.tag === 'div',
          [`-${props.variant}`]: true,
        }
      })

      return { classList, d }
    },
  })
</script>

<style lang="postcss">
  .ui-poligon.-opacity > .wrapper > .svg {
    @apply opacity-30;
  }

  .ui-poligon.-animated > .wrapper > .svg {
    animation: ui-poligon-spin 30s linear infinite;
  }

  .ui-poligon.-size-50 > .wrapper {
    @apply w-50 h-50 text-12;
  }

  .ui-poligon.-size-64 > .wrapper {
    @apply w-64 h-64 text-12;
  }

  .ui-poligon.-default > .wrapper > .content {
    @apply text-black;
  }

  .ui-poligon.-green-atomic > .wrapper {
    @apply text-green-atomic;
  }
  .ui-poligon.-green-atomic > .wrapper > .content {
    @apply text-black;
  }

  .ui-poligon.-violet > .wrapper {
    @apply text-violet;
  }
  .ui-poligon.-violet > .wrapper > .content {
    @apply text-white;
  }

  .ui-poligon.-white > .wrapper {
    @apply text-white;
  }
  .ui-poligon.-white > .wrapper > .content {
    @apply text-black;
  }

  .ui-poligon.-green-original > .wrapper {
    @apply text-green-original;
  }
  .ui-poligon.-green-original > .wrapper > .content {
    @apply text-black;
  }

  .ui-poligon.-yellow > .wrapper {
    @apply text-yellow;
  }
  .ui-poligon.-yellow > .wrapper > .content {
    @apply text-black;
  }

  .ui-poligon.-red > .wrapper {
    @apply text-red;
  }
  .ui-poligon.-red > .wrapper > .content {
    @apply text-white;
  }

  .ui-poligon.-orange > .wrapper {
    @apply text-orange;
  }
  .ui-poligon.-orange > .wrapper > .content {
    @apply text-white;
  }

  @keyframes ui-poligon-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
