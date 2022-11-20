<template>
  <router-link
    class="button"
    active-class="-active"
    :to="to"
  >
    <span>{{ text }}</span>
  </router-link>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { RouteLocationRaw } from 'vue-router'

  export type TProps = {
    to: Partial<RouteLocationRaw>
    text: string
  }

  export default defineComponent({
    name: 'ui-bread-crumbs',
    props: {
      text: {
        type: String as PropType<TProps['text']>,
        required: true,
      },
      to: {
        type: Object as PropType<TProps['to']>,
        required: true,
      },
    },
  })
</script>

<style
  scoped
  lang="postcss"
>
  .button {
    @apply h-40 bg-black transition-colors flex justify-center items-center pl-24 pr-20 relative text-10 border-2 border-gray-400;
  }

  .button.-active {
    @apply bg-gray-300;
  }

  .button::after {
    content: '';
    @apply absolute right-0 w-0 h-0 transform translate-x-full z-1;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    border-left: 15px solid theme('colors.black');
  }

  .button.-active::after {
    border-left: 15px solid theme('colors.gray.300');
  }

  .button::before {
    content: '';
    @apply absolute -right-2 w-0 h-0 transform translate-x-full z-1;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 15px solid theme('colors.gray.400');
  }
</style>
