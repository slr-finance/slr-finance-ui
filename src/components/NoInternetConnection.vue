<template>
  <ui-placeholder
    icon="finish"
    title="No Internet Connection"
    description="Make sure wifi or cellular data is turned on and then refresh the page"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiPlaceholder from '@/components/ui/UiPlaceholder.vue'

  export default defineComponent({
    name: 'no-internet-connection',
    components: {
      UiPlaceholder,
    },
  })
</script>
