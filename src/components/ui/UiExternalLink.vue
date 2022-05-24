<template>
  <a
    class="inline-flex ui-link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    inheritAttrs: true,
    name: 'ui-external-link',
  })
</script>
