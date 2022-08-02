<template>
  <Teleport :to="targetElement">
    <slot/>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppFloatButtons } from './hooks/useAppFloatButtons'

export default defineComponent({
  setup() {
    const { targetElement } = useAppFloatButtons()

    return { targetElement }
  },
})
</script>
