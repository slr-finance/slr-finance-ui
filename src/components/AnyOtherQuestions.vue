<template>
  <div>
    <h3 class="text-white text-ui-page-label mb-24 uppercase font-title">Any other questions?</h3>
    <p>
      Want to learn more:
      <ui-link-external :href="docLink"> Documentation </ui-link-external>
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { UiLinkExternal } from '@slr-finance/uikit'

  export default defineComponent({
    components: { UiLinkExternal },
    name: 'any-other-questions',
    props: {
      docLink: {
        type: String,
        required: true,
      },
    },
    setup() {},
  })
</script>
