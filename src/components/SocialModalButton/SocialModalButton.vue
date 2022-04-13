<template>
  <ui-modal
    v-model="isOpen"
    label="telegrams chats and channels"
  >
    <div class="flex justify-center items-center">
      <transition
        name="fade"
        mode="out-in"
      >
        <social-modal-content @click-to-link="close" />
      </transition>
    </div>
  </ui-modal>

  <button
    type="button"
    class="social-modal-button flex justify-center items-center relative h-50 w-50 before:block before:content-[''] before:w-8 before:h-8 before:rounded-full before:bg-violet before:absolute before:right-0 before:top-0 after:block after:content-[''] after:w-full after:h-full after:rounded-12 after:absolute after:right-0 after:top-0 after:-z-1 after:transition-opacity duration-200"
    @click="open"
  >
    <ui-icon
      name="telegram-flat"
      size="18"
    />
  </button>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'
  import { useToggle } from '@vueuse/shared'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import UiModal from '@/components/ui/UiModal.vue'
  import NoInternetConnection from '@/components/NoInternetConnection.vue'

  export default defineComponent({
    name: 'social-modal-button',
    setup() {
      const [isOpen, handleToggle] = useToggle()

      return {
        isOpen,
        open: () => handleToggle(true),
        close: () => handleToggle(false),
      }
    },
    components: {
      SocialModalContent: defineAsyncComponent({
        loader: () => import('./SocialModalContent.vue'),
        loadingComponent: UiGalaxyLoader,
        errorComponent: NoInternetConnection,
        delay: 200,
      }),
      UiIcon,
      UiModal,
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .social-modal-button::after {
    opacity: 0.5;
    background-image: radial-gradient(
      circle at calc(100% - 4px) 4px,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 9px,
      rgb(255, 255, 255, 0.2) 9px
    );
  }

  .social-modal-button:hover::after {
    opacity: 1;
  }
</style>
