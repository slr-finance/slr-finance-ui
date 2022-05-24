<template>
  <component
    :is="componentName"
    v-bind="componentProps"
    class="ui-button"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import { RouteLocationRaw } from 'vue-router'

  type ButtonProps = {
    to?: RouteLocationRaw
    type?: string
    href?: string
    disabled?: boolean
    class: Record<string, boolean>
  }

  export default defineComponent({
    name: 'ui-button',
    props: {
      type: {
        type: String as PropType<'button' | 'submit' | 'reset'>,
        default: 'button',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      size: {
        type: [Number, String],
        default: 64,
      },
      to: {
        type: Object as PropType<RouteLocationRaw>,
      },
      href: {
        type: String,
      },
      variant: {
        validator: (value: string) => ['green-atomic', 'white', 'default', 'violet', 'gray', 'red'].includes(value),
        default: 'default',
      },
    },
    setup(props) {
      const componentProps = computed(() => {
        const buttonProps: ButtonProps = {
          class: {
            '-disabled': props.disabled,
            [`-size-${props.size}`]: true,
            [`-${props.variant}`]: true,
          },
        }

        if (props.to) {
          buttonProps.to = props.to
        } else if (props.href) {
          buttonProps.href = props.href
        } else {
          buttonProps.type = props.type
          buttonProps.disabled = props.disabled
        }

        return buttonProps
      })

      const componentName = computed(() => {
        return props.to ? 'router-link' : props.href ? 'a' : 'button'
      })

      const handleClick = (event: Event) => {
        if (props.disabled) {
          event.preventDefault()
          event.stopPropagation()
        }
      }

      return {
        componentProps,
        componentName,
        handleClick,
      }
    },
  })
</script>

<style lang="postcss">
  .ui-button {
    @apply block uppercase select-none transition-colors;
  }

  .ui-button.-size-64 {
    @apply h-64 min-w-64;

    padding: 0 14px 0 14px;
  }

  .ui-button.-size-40 {
    @apply h-40 min-w-40 rounded-10 text-12;

    padding: 0 8px 0 8px;
  }

  .ui-button.-size-48 {
    @apply h-48 min-w-48 rounded-10 text-12;

    padding: 0 8px 0 8px;
  }

  .ui-button.-size-36 {
    @apply h-36 min-w-48 rounded-10 text-12;

    padding: 0 8px 0 8px;
  }

  .ui-button.-disabled {
    @apply border-none cursor-not-allowed bg-gray bg-opacity-30 text-gray;
  }

  .ui-button:not(.-disabled) {
    @apply cursor-pointer;
  }

  .ui-button:not(.-disabled):hover {
    @apply opacity-100;
  }

  .ui-button {
    @apply inline-flex justify-center items-center transition duration-150;
  }

  .ui-button:not(.-disabled).-white {
    @apply bg-white-lazurit-gradient hover:opacity-[0.85] active:opacity-[0.65] text-black border-none;
  }

  .ui-button:not(.-disabled).-green-atomic {
    @apply bg-green-atomic text-black border-none;
  }

  .ui-button:not(.-disabled).-violet {
    @apply bg-violet text-white border-none hover:bg-violet-400 active:bg-violet-600;
  }

  .ui-button:not(.-disabled).-gray {
    @apply bg-gray bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-10 text-white border-none;
  }

  .ui-button:not(.-disabled).-red {
    @apply bg-red text-white border-none hover:bg-red-400 active:bg-red-600;
  }
</style>
