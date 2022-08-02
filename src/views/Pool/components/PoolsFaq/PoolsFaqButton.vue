<template>
  <app-float-button>
    <ui-button
      variant="gray"
      :size="48"
      @click="handleOpenFaq"
    >
      <ui-icon
        name="help-octagon"
        :size="18"
      />
    </ui-button>
  </app-float-button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import AppFloatButton from '@/components/App/AppFloatButton/AppFloatButton.vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon/UiIcon.vue'
  import { usePoolsFaqModal } from './hooks/usePoolsFaqModal'

  export default defineComponent({
    name: 'pools-faq-button',
    setup() {
      const [, toggle] = usePoolsFaqModal()
      const handleOpenFaq = () => toggle(true)

      return { handleOpenFaq }
    },
    components: {
      AppFloatButton,
      UiButton,
      UiIcon,
    },
  })
</script>
