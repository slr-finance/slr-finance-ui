<template>
  <div class="text-ui-page-label flex items-center uppercase relative w-max font-title">
    {{ title }}
    <div
      class="w-max bg-yellow text-black flex items-center rounded-16 h-32 px-10 text-14 ml-16"
      v-if="counter > 0"
    >
      {{ counter }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'referral-widget-title',
  props: {
    title: {
      type: String,
      required: true,
    },
    counter: {
      type: Number,
      default: 0,
    }
  },
})
</script>
