<template>
  <stake-form :pool-id="poolId" />
</template>

<script lang="ts">
  import { computed, defineComponent, watch } from 'vue'
  import StakeForm from '../StakeForm.vue'

  export default defineComponent({
    name: 'stake-more-modal',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {},
    components: {
      StakeForm,
    },
  })
</script>
