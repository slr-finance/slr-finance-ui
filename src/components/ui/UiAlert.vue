<template>
  <div class="flex items-start cursor-default">
    <ui-icon
      :name="icon"
      size="10"
      class="mt-2"
    />

    <div class="flex-1 ml-4 text-10 leading-140">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiIcon from './UiIcon'

  export default defineComponent({
    name: 'ui-alert',
    props: {
      icon: {
        type: String,
        default: 'info-circle',
      },
    },
    components: {
      UiIcon,
    },
  })
</script>
