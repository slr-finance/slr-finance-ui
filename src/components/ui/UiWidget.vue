<template>
  <section
    class="rounded-12 border border-white py-20 bg-black flex flex-col relative"
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
    name: 'referrals-link-block',
    props: {
      scroll: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const classList = computed(() => ({
        content: {
          'pr-4 pl-16 ui-scrollbar': props.scroll,
          'px-16': !props.scroll,
        },
        root: {
          'pr-4': props.scroll,
        },
      }))

      return { classList }
    },
  })
</script>
