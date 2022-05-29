<template>
  <component
    :is="componentName"
    v-bind="componentProps"
    class="ui-link"
  >
    {{ text }} <slot />
  </component>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import { RouteLocationRaw } from 'vue-router'

  export type UiLinkProps = {
    text?: string
    to?: RouteLocationRaw
    href?: string
  }

  export default defineComponent({
    name: 'ui-link',
    props: {
      text: {
        type: String,
      },
      to: {
        type: Object as PropType<RouteLocationRaw>,
      },
      href: {
        type: String,
      },
    },
    setup(props) {
      const componentProps = computed(() => {
        const linkProps: Omit<UiLinkProps, 'text'> = {}

        if (props.to) {
          linkProps.to = props.to
        } else if (props.href) {
          linkProps.href = props.href
        }

        return linkProps
      })

      const componentName = computed(() => {
        return props.to ? 'router-link' : props.href ? 'a' : 'button'
      })

      return {
        componentProps,
        componentName,
      }
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .ui-link {
    @apply outline-none text-white text-opacity-60 transition-colors duration-300 ease-out hover:ease-in;
  }

  .ui-link.router-link-exact-active,
  .ui-link.router-link-active,
  .ui-link:hover {
    @apply text-opacity-100;
  }
</style>
