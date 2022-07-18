<template>
  <div class="bg-gray-800 bg-opacity-70 rounded-12 px-ui-page-inner-spacing py-24">
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'dashboard-container',
    setup() {},
  })
</script>
