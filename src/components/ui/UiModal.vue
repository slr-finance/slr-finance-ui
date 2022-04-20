<template>
  <teleport to="body">
    <transition name="ui-modal">
      <div
        v-if="isOpen"
        class="ui-modal fixed z-modal inset-0 flex overflow-auto px-ui-page-spacing"
        tabindex="-1"
        role="dialog"
      >
        <div class="ui-modal-backdrop bg-black bg-opacity-70 backdrop-blur-8 fixed z-0 inset-0"></div>

        <div
          class="ui-modal-box overflow-hidden m-auto flex-grow-0 w-full relative z-10 bg-black 375:py-32 py-24 border border-white rounded-20"
          :style="styleList"
          ref="root"
          tabindex="1"
        >
          <div
            v-if="label"
            class="375:pl-24 pl-16 font-title text-ui-page-label leading-140 pr-64 h-36 box-content flex items-center justify-start"
          >
            {{ label }}
          </div>
          <button
            @click="handleClose"
            :disabled="!closable"
            class="absolute 375:top-32 top-24 375:right-24 right-16 h-36 w-36 p-0 m-0 border border-white rounded-full flex justify-center items-center border-opacity-50 hover:border-opacity-100 transition-colors duration-150 disabled:text-white disabled:text-opacity-30 disabled:hover:border-opacity-50"
          >
            <ui-icon
              name="close"
              size="10"
            />
          </button>
          <div class="relative overflow-hidden 375pt-32 pt-24 375:px-24 px-16">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, computed, onBeforeUnmount } from 'vue'
  import { useVModel, useEventListener, useScrollLock } from '@vueuse/core'
  import UiIcon from './UiIcon.vue'

  export default defineComponent({
    name: 'ui-modal',
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
      maxWidth: {
        type: String,
        default: '450px',
      },
      label: {
        type: String,
        default: '',
      },
      closable: {
        type: Boolean,
        default: true,
      },
    },
    setup(props, { emit }) {
      let prevActiveElement = null as null | HTMLElement
      const isOpen = useVModel(props, 'modelValue', emit)
      const isLocked = useScrollLock(document.body)
      const styleList = computed(() => ({ maxWidth: props.maxWidth }))
      const handleClose = () => {
        if (props.closable) {
          isOpen.value = false
        }
      }
      useEventListener(document, 'keyup', ({ key }) => {
        key === 'Escape' && handleClose()
      })
      watch(isOpen, (isOpenVal) => {
        isLocked.value = isOpenVal
        if (isOpenVal && document.activeElement && (document.activeElement as HTMLElement).blur) {
          prevActiveElement = document.activeElement as HTMLElement
          ;(document.activeElement as HTMLElement).blur()
        } else {
          if (prevActiveElement && document.body.contains(prevActiveElement)) {
            prevActiveElement.focus()
          }
          prevActiveElement = null
        }
      })

      onBeforeUnmount(() => {
        isLocked.value = false
      })

      return { isOpen, handleClose, styleList }
    },
    components: { UiIcon },
  })
</script>

<style lang="postcss">
  .ui-modal-enter-active,
  .ui-modal-leave-active {
    transition: all 0.6s;
  }

  .ui-modal-enter-from,
  .ui-modal-leave-to {
    opacity: 1;
  }

  .ui-modal-enter-active > .ui-modal-backdrop {
    transition: all 0.3s ease-out;
  }

  .ui-modal-leave-active > .ui-modal-backdrop {
    transition: all 0.3s 0.3s ease-out;
  }

  .ui-modal-enter-from > .ui-modal-backdrop,
  .ui-modal-leave-to > .ui-modal-backdrop {
    opacity: 0;
  }

  .ui-modal-enter-active > .ui-modal-box {
    transition: all 0.3s 0.3s ease-out;
  }

  .ui-modal-leave-active > .ui-modal-box {
    transition: all 0.3s ease-out;
  }

  .ui-modal-enter-from > .ui-modal-box,
  .ui-modal-leave-to > .ui-modal-box {
    opacity: 0;
  }
</style>
