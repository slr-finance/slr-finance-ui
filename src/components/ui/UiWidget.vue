<template>
  <section
    class="ui-widget transition-colors duration-150 rounded-12 border py-20 bg-black flex flex-col relative"
    :class="classList.root"
  >
    <div
      v-if="$slots.bage"
      class="absolute right-0 top-0 transform translate-x-4 600:translate-x-8 875:translate-x-16 -translate-y-1/2"
    >
      <slot name="bage" />
    </div>
    <div
      class="flex-1"
      :class="classList.content"
    >
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'ui-widget',
    props: {
      scroll: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: 'white',
        validator: (val: string) => ['green-original', 'white'].includes(val),
      },
    },
    setup(props) {
      const classList = computed(() => {
        const classes: Record<string, string[]> = {
          content: [],
          root: [`-${props.color}`],
        }

        if (props.scroll) {
          classes.content.push('pr-4 pl-16 ui-scrollbar')
          classes.root.push('pr-4')
        } else {
          classes.content.push('px-16')
        }

        return classes
      })

      return { classList }
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .-white {
    @apply border-white;
  }
  .-green-original {
    @apply border-green-original;
  }
</style>
