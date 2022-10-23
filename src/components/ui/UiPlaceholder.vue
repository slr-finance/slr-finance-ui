<template>
  <div class="flex flex-col justify-center items-center text-center leading-192">
    <ui-poligon
      :corners="6"
      :size="50"
      class="mb-12"
      opacity
      :variant="variant"
    >
      <slot name="icon">
        <ui-icon
          :name="icon"
          :prefix="iconPrefix"
          class="text-white opacity-60"
          size="18"
        />
      </slot>
    </ui-poligon>
    <div class="font-title text-12 text-white uppercase leading-192 mb-12">{{ title }}</div>
    <div class="font-body text-12 text-white text-opacity-60 mb-12">
      {{ description }}
      <slot name="description" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { UiPoligon, UiPoligonVariantProp, UI_POLIGON_BUTTON_VARIANTS } from '@slr-finance/uikit'
  import UiIcon from './UiIcon'

  export default defineComponent({
    name: 'ui-placeholder',
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: 'info-circle',
      },
      iconPrefix: {
        type: String,
        default: 'ui-icon',
      },
      variant: {
        type: String as PropType<UiPoligonVariantProp>,
        validator: (val: UiPoligonVariantProp) => UI_POLIGON_BUTTON_VARIANTS.includes(val),
        default: 'white',
      },
    },
    components: {
      UiPoligon,
      UiIcon,
    },
  })
</script>
