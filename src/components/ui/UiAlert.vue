<template>
  <div class="flex items-start cursor-default">
    <slot name="icon">
      <ui-icon-info-circle class="mt-2 w-10 h-10"/>
    </slot>

    <div class="flex-1 ml-4 text-10 leading-140">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { UiIconInfoCircle } from '@slr-finance/uikit'

  export default defineComponent({
    name: 'ui-alert',
    props: {
      icon: {
        type: String,
        default: 'info-circle',
      },
    },
    components: {
      UiIconInfoCircle,
    },
  })
</script>
