<template>
  <div class="flex items-center">
    <ui-bread-crumb
      class="first:rounded-l-8"
      v-for="(item, i) of items"
      :key="i"
      v-bind="item"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import UiBreadCrumb, { TProps as TItemProp } from './UiBreadCrumb.vue'

  export default defineComponent({
    name: 'ui-bread-crumbs',
    components: {
      UiBreadCrumb,
    },
    props: {
      items: {
        type: Array as PropType<TItemProp[]>,
        require: true,
      },
    },
  })
</script>
