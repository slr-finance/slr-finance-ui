<template>
  <div
    class="ui-toast fixed z-toast top-0 select-none"
    ref="toastRef"
  >
    <transition
      mode="out-in"
      name="fade"
    >
      <div
        :key="state.id"
        v-if="isShown"
      >
        <div :style="styleList">
          TOAST
          <ui-icon
            v-if="state.icon"
            v-bind="state.icon"
          />
          {{ state.content }}
          <ui-button @click="hide">
            <ui-icon name="close" />
          </ui-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, watch } from 'vue'
  import { useUiToast } from './hooks/useUiToast'
  import UiIcon from '../UiIcon'
  import { templateRef, useDraggable } from '@vueuse/core'
  import { UiButton } from '@slr-finance/uikit'

  export default defineComponent({
    setup() {
      const toastRef = templateRef('toastRef')
      const { hide, state, isShown } = useUiToast()
      const { position, isDragging } = useDraggable(toastRef)
      let isForceHidden = false

      watch(
        state,
        () => {
          position.value = { x: 0, y: 0 }
          isForceHidden = false
        },
        { immediate: true },
      )

      const styleList = computed(() => {
        const {
          value: { x },
        } = position
        const { value: isDraggingVal } = isDragging
        const claimedX = isDraggingVal ? Math.min(Math.max(-100, x), 100) : 0

        if (Math.abs(claimedX) === 100) {
          isForceHidden = true
        }

        return {
          transform: `translateX(${claimedX}px)`,
          opacity: isForceHidden ? 0 : 1 - claimedX / 100,
          transition: isDraggingVal ? '' : 'transform 0.4s',
        }
      })

      return { hide, state, styleList, isShown }
    },
    components: {
      UiIcon,
      UiButton,
    },
  })
</script>
