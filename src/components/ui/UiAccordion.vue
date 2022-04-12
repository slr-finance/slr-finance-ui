<template>
  <section
    class="ui-box-corners p-0"
    :class="{ 'bg-white bg-opacity-5': isOpen }"
  >
    <div
      @click="toggle"
      class="py-32 px-18 flex items-center justify-between"
    >
      <span>{{ title }}</span>
      <ui-icon
        name="arrow-pixel"
        class="min-w-[12px]"
        size="12"
        :class="{ 'rotate-180': isOpen }"
      />
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
  import UiIcon from './UiIcon.vue'

  export default defineComponent({
    name: 'ui-accordion',
    components: {
      UiIcon,
    },
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
