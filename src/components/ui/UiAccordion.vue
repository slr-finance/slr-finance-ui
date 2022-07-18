<template>
  <section
    class="ui-accordion ui-box-corners p-0 overflow-hidden transition-all duration-500 rounded-10"
    :class="{ '-open': isOpen }"
  >
    <div
      @click="toggle"
      class="header px-18 flex items-center justify-between cursor-pointer text-ui-page-description"
    >
      <span>{{ title }}</span>
      <ui-icon
        name="arrow-pixel"
        class="arrow flex-shrink-0 transition-transform duration-150 ml-12"
        size="12"
      />
    </div>
    <div class="px-18 pt-12 pb-32 text-white text-opacity-50">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useToggle } from '@vueuse/core'
  import UiIcon from './UiIcon'

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

<style scoped>
  .ui-accordion:not(.-open) {
    max-height: 88px;
    overflow-anchor: none;
  }

  .ui-accordion.-open {
    @apply bg-white bg-opacity-5;

    max-height: 1000px;
    height: auto;
  }

  .ui-accordion > .header {
    height: 88px;
  }

  .ui-accordion.-open > .header > .arrow {
    transform: scale(-100%);
  }
</style>
