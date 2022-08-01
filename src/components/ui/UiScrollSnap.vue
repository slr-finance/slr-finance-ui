<template>
  <div
    class="ui-scroll-snap ui-scrollbar overflow-x-scroll"
    :class="classList"
  >
    <slot/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'ui-scroll-snap',
  props: {
    variant: {
      type: String,
      default: 'black',
      validator: (val:string) => ['black', 'gray-800'].includes(val)
    }
  },
  setup(props) {
    const classList = computed(() => {
      return `-${props.variant}`
    })

    return { classList }
  },
})
</script>

<style scoped>
.ui-scroll-snap {
  --achievement-list-item-spacing: 24px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.ui-scroll-snap::after, .ui-scroll-snap::before {
  @apply block h-full sticky top-0 shrink-0 bg-gradient-to-r transition-opacity duration-200;
  content: '';
  width: var(--achievement-list-item-spacing);
}

.ui-scroll-snap::before {
  @apply left-0 to-transparent;
}

.ui-scroll-snap::after {
  @apply right-0 from-transparent;
}

.ui-scroll-snap.-black::before {
  @apply from-black;
}

.ui-scroll-snap.-black::after {
  @apply to-black;
}

.ui-scroll-snap.-gray-800::before {
  @apply from-gray-800;
}

.ui-scroll-snap.-gray-800::after {
  @apply to-gray-800;
}

</style>
