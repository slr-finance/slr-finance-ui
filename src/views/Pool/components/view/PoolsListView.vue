<template>
  <pools-list/>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import PoolsList from '../PoolsList.vue'

  export default defineComponent({
    name: 'pools-list-view',
    components: { PoolsList },
  })
</script>
