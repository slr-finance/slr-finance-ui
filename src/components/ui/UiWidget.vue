<template>
  <div class="rounded-12 border border-white py-20 px-16">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'referrals-link-block'
  })
</script>
