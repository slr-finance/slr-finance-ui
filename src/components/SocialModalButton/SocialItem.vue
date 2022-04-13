<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    class="flex bg-white bg-opacity-10 rounded-12 px-16 py-20 hover:bg-opacity-[0.12] transition-colors duration-150"
  >
    <div class="w-36 h-36 bg-black rounded-full mr-12 flex justify-center items-center">
      <ui-icon
        prefix="icon-social"
        size="18"
        :name="iconName"
      />
    </div>
    <div>
      <div class="leading-none mt-2 mb-4 text-14 text-white">{{ label }}</div>
      <div class="leading-140 text-12 text-white text-opacity-60">{{ description }}</div>
    </div>
  </a>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiIcon from '@/components/ui/UiIcon.vue'

  export default defineComponent({
    name: 'social-item',
    props: {
      link: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      iconName: {
        type: String,
        required: true,
      },
    },
    components: { UiIcon },
  })
</script>
