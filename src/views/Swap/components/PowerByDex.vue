<template>
  <link-to-dex class="flex justify-center items-start leading-none ui-link">
    Power by
    <img
      src="/images/swap/pancake-full-white.svg"
      class="h-20 ml-4"
    />
  </link-to-dex>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LinkToDex from './LinkToDex.vue'

  export default defineComponent({
    name: 'power-by-dex',
    components: {
      LinkToDex,
    },
  })
</script>
