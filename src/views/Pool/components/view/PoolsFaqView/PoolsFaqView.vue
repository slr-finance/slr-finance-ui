<template>
  <ui-button
    variant="gray"
    :size="50"
    @click="handleOpenFaq"
  >
    <ui-icon-help-octagon class="w-18 h-18"/>
    <pools-faq-modal/>
  </ui-button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { UiButton, UiIconHelpOctagon } from '@slr-finance/uikit'
  import PoolsFaqModal from './PoolsFaqModal.vue'
  import { usePoolsFaqModal } from './hooks/usePoolsFaqModal'

  export default defineComponent({
    name: 'pools-faq-view',
    setup() {
      const [, toggle] = usePoolsFaqModal()
      const handleOpenFaq = () => toggle(true)

      return { handleOpenFaq }
    },
    components: {
      PoolsFaqModal,
      UiButton,
      UiIconHelpOctagon,
    },
  })
</script>
