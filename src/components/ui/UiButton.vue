<template>
  <component
    :is="componentName"
    v-bind="componentProps"
    class="ui-button"
  >
    <slot />
  </component>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'

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
        type: Object,
      },
      href: {
        type: String,
      },
      variant: {
        validator: (value: string) => ['primary', 'contrast', 'default', 'accent', 'pale'].includes(value),
        default: 'default',
      },
    },
    setup(props) {
      const componentProps = computed(() => {
        return {
          to: props.to ? props.to : undefined,
          href: props.href ? props.href : undefined,
          type: props.to || props.href ? undefined : props.type,
          disabled: props.disabled,
          class: {
            '-disabled': props.disabled,
            [`-size-${props.size}`]: true,
            [`-${props.variant}`]: true,
          },
        }
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

<style lang="postcss">
  .ui-button {
    @apply block uppercase select-none;
  }

  .ui-button.-size-64 {
    @apply h-64 min-w-64 opacity-80;

    padding: 0 14px 0 14px;
  }

  .ui-button.-size-40 {
    @apply h-40 min-w-40 rounded-10 border-2 opacity-80 text-12;

    padding: 0 8px 0 8px;
  }

  .ui-button.-size-48 {
    @apply h-48 min-w-48 rounded-10 border-2 opacity-80 text-12;

    padding: 0 8px 0 8px;
  }

  .ui-button.-size-36 {
    @apply h-36 min-w-48 rounded-10 border-2 opacity-80 text-12;

    padding: 0 8px 0 8px;
  }

  .ui-button.-disabled {
    @apply border-dashed cursor-not-allowed opacity-40;
  }

  .ui-button:not(.-disabled) {
    @apply cursor-pointer;
  }

  .ui-button:not(.-disabled):hover {
    @apply opacity-100;
  }

  .ui-button {
    @apply inline-flex justify-center items-center transition duration-150;

    color: var(--page-active-color, #fff);
    border-color: var(--page-active-color, #fff);
  }

  .ui-button.-contrast {
    @apply bg-white text-black border-none;
  }

  .ui-button.-primary {
    @apply bg-aqua text-black border-none;
  }

  .ui-button.-accent {
    @apply bg-purple text-white border-none;
  }

  .ui-button.-pale {
    @apply bg-white bg-opacity-10 text-white border-none;
  }
</style>
