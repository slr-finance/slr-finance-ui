<template>
  <label class="ui-input -size-50 flex items-stretch">
    <input
      class="input flex-1"
      v-model="value"
    />
    <div class="flex justify-center items-center">
      <slot name="postfix"></slot>
    </div>
  </label>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useVModel } from '@vueuse/core'

  export default defineComponent({
    props: {
      value: [String, Number],
    },
    emits: ['update:value'],
    setup(props, { emit }) {
      const value = useVModel(props, 'value', emit, { passive: true })

      return {
        value,
      }
    },
  })
</script>

<style lang="postcss">
  .ui-input.-size-50 {
    @apply h-50 min-w-50 rounded-12 border border-white border-opacity-60 px-24;
  }

  .ui-input {
    @apply bg-transparent backdrop-blur-4;

    color: var(--page-active-color, #fff);
    border-color: var(--page-active-color, #fff);
  }

  .ui-input > .input {
    @apply bg-transparent outline-none border-0;
  }
</style>
