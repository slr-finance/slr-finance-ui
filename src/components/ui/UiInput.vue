<template>
  <label class="ui-input -size-50 flex items-stretch">
    <input
      class="input flex-1"
      v-model="value"
      @input="handleInput"
      :placeholder="placeholder"
      :inputmode="inputmode"
    />
    <div
      class="flex flex-grow-0 justify-center items-center relative pl-12 before:content-[' '] before:block before:absolute before:h-full before:w-24 before:bg-gradient-to-r before:from-transparent before:to-black before:right-full before:top-0 before:pointer-events-none"
    >
      <slot name="postfix"></slot>
    </div>
  </label>
</template>

<script lang="ts">
  import { defineComponent, HTMLAttributes, PropType } from 'vue'
  import { useVModel } from '@vueuse/core'
  import { get } from 'lodash'

  export default defineComponent({
    props: {
      value: [String, Number],
      placeholder: {
        type: String,
        default: '',
      },
      inputmode: {
        type: String as PropType<HTMLAttributes['inputmode']>,
        default: 'text',
      },
    },
    emits: ['update:value', 'input'],
    setup(props, { emit }) {
      const value = useVModel(props, 'value', emit, { passive: true })
      const handleInput = (event: Event) => {
        emit('input', get(event, ['target', 'value'], ''))
      }

      return {
        value,
        handleInput,
      }
    },
  })
</script>

<style lang="postcss">
  .ui-input.-size-50 {
    @apply h-50 min-w-50 rounded-12 px-18 text-14;
  }

  .ui-input {
    @apply bg-black text-white border border-white border-opacity-20;
  }

  .ui-input > .input {
    @apply bg-transparent outline-none border-0 placeholder-white placeholder-opacity-60;
  }
</style>
