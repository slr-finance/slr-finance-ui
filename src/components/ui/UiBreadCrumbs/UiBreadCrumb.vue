<template>
  <button
    class="button"
    :class="classList"
    @click="handleClick"
  >
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { RouteLocationRaw, RouteRecord, useRoute, useRouter } from 'vue-router'

  export type TProps = {
    to: Partial<RouteRecord>
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
        type: [String, Object] as PropType<TProps['to']>,
        require: true,
      },
    },
    setup(props) {
      const to = props.to as RouteRecord

      const router = useRouter()
      const route = useRoute()

      const classList = computed(() => ({
        '-active': route.name === to.name,
      }))

      const handleClick = () => router.push(to as RouteLocationRaw)

      return {
        classList,
        handleClick,
      }
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
