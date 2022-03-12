<template>
  <div class="staking-info-item">
    <div>{{ label }}</div>
    <div class="text-page-active text-opacity-70">{{ value }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'staking-info-item',
    props: {
      label: String,
      value: String,
    },
  })
</script>

<style lang="postcss">
  .staking-info-item {
    @apply border-t relative pt-32;
  }

  .staking-info-item::after {
    content: '+';
    @apply block absolute -top-16 -left-32;
  }
</style>
