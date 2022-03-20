<template>
  <section class="ui-box-corners p-0">
    <div
      @click="toggle"
      class="py-32 px-18"
    >
      {{ title }}
    </div>
    <div
      v-show="isOpen"
      class="px-18 pb-32"
    >
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useToggle } from '@vueuse/core'

  export default defineComponent({
    name: 'ui-accordion',
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    setup() {
      const [isOpen, toggle] = useToggle()

      return { isOpen, toggle: () => toggle() }
    },
  })
</script>
