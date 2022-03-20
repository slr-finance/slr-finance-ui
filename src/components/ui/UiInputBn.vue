<template>
  <ui-input v-model:value="valueStr">
    <template #postfix><slot name="postfix" /></template>
  </ui-input>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, watch } from 'vue'
  import { useVModel } from '@vueuse/core'
  import BigNumber from 'bignumber.js'
  import UiInput from './UiInput.vue'

  export default defineComponent({
    name: 'ui-input-bn',
    props: {
      value: {
        type: Object as PropType<BigNumber>,
        default: new BigNumber(0),
      },
    },
    emits: ['update:value'],
    setup(props, { emit }) {
      const valueBn = useVModel(props, 'value', emit, { passive: true })
      const valueStr = ref(valueBn.value.toString())

      watch(valueBn, (value) => (valueStr.value = value.toString()))
      watch(valueStr, (str) => (valueBn.value = new BigNumber(str)))

      return {
        valueStr,
      }
    },
    components: {
      UiInput,
    },
  })
</script>
