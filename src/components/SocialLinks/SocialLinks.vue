<template>
  <div class="flex items-center space-x-12">
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ui-icon
        name="twitter"
        prefix="ui-icon-social"
        size="20"
      />
    </a>
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ui-icon
        name="facebook"
        prefix="ui-icon-social"
        size="20"
      />
    </a>
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ui-icon
        name="instagram"
        prefix="ui-icon-social"
        size="20"
      />
    </a>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiIcon from '@/components/ui/UiIcon'

  export default defineComponent({
    name: 'social-links',
    components: { UiIcon },
  })
</script>
