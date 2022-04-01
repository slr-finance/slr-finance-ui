<template>
  <div class="flex flex-col justify-center items-center">
    <ui-poligon
      corners="6"
      size="50"
      class="mb-16"
      opacity
    >
      <ui-icon
        :name="icon"
        class="text-white text-opacity-60"
        size="18"
      />
    </ui-poligon>
    <div class="font-title text-12 text-white uppercase leading-none mb-16">{{ title }}</div>
    <div class="font-body text-12 text-white text-opacity-60 leading-none mb-16">{{ description }}</div>
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import UiPoligon from './UiPoligon.vue'
  import UiIcon from './UiIcon.vue'

  export default defineComponent({
    name: 'ui-placeholder',
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        default: 'info-circle',
      },
    },
    components: {
      UiPoligon,
      UiIcon,
    },
  })
</script>
