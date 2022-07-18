<template>
  <div>
    <h3 class="text-white text-ui-page-label mb-24 uppercase font-title">Any other questions?</h3>
    <p>
      Want to learn more:
      <ui-external-link :href="docLink"> Documentation </ui-external-link>
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiExternalLink from './ui/UiExternalLink.vue'

  export default defineComponent({
    components: { UiExternalLink },
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
