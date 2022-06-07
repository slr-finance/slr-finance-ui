<template>
  <span v-if="text">{{ text }}</span>
  <span
    v-else
    class="ui-text-placeholder"
    title="Loading"
  >
    &nbsp;
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ui-text-placeholder',
    props: {
      text: {
        type: String,
      },
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .ui-text-placeholder {
    @apply inline-block animate-pulse rounded-4 opacity-10;
    background-color: currentColor;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    50% {
      opacity: 0.15;
    }
  }
</style>
