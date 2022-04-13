<template>
  <ui-poligon
    :tag="tag"
    class="ui-poligon-button"
    :size="size"
    :variant="variant"
    v-bind="componentProps"
  >
    <div class="ui-poligon-button-content"><slot /></div>
  </ui-poligon>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import UiPoligon from './UiPoligon.vue'

  export default defineComponent({
    props: {
      type: {
        type: String as PropType<'button' | 'submit' | 'reset'>,
        default: 'button',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      to: {
        type: Object,
        default: null,
      },
      size: {
        type: String,
        default: '50',
        validator: (val: string) => ['50'].includes(val),
      },
      variant: {
        validator: (value: string) =>
          ['white', 'default', 'violet', 'green-original', 'green-atomic', 'yellow', 'red'].includes(value),
        default: 'green-atomic',
      },
    },
    setup(props) {
      const componentProps = computed(() => {
        return {
          to: props.to ? props.to : undefined,
          type: props.to ? undefined : props.type,
          disabled: props.disabled,
          class: {
            '-disabled': props.disabled,
            [`-size-${props.size}`]: true,
          },
        }
      })

      const tag = computed(() => {
        return props.to ? 'router-link' : 'button'
      })

      return {
        componentProps,
        tag,
      }
    },
    components: {
      UiPoligon,
    },
  })
</script>
