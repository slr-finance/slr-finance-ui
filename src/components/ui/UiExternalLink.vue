<template>
  <ui-link
    class="inline-flex"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </ui-link>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiLink from './UiLink.vue'

  export default defineComponent({
    inheritAttrs: true,
    name: 'ui-external-link',
    components: { UiLink },
  })
</script>
