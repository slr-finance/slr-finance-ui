<template>
  <router-link
    :class="{ '-mobile': isMobile }"
    class="app-header-logo flex items-center relative z-10 leading-none"
    :to="{ name: 'dashboard' }"
  >
    <div class="logo-wrapper">
      <ui-icon
        size="50"
        name="slr-logo"
        class="logo"
      />
    </div>
    <div
      class="title flex items-center justify-start uppercase"
      v-if="!isMobile"
    >
      SLR
      <div class="dot rounded-full"></div>
      FINANCE
    </div>
  </router-link>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UiIcon from '@/components/ui/UiIcon.vue'

  export default defineComponent({
    name: 'app-header-logo',
    props: {
      isMobile: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      UiIcon,
    },
  })
</script>

<style lang="postcss">
  .app-header-logo:not(.-mobile) {
    min-width: 300px;
  }
  .app-header-logo:not(.-mobile) > .logo-wrapper {
    @apply w-72 flex justify-center items-center mr-ui-page-spacing;
  }
  .app-header-logo:not(.-mobile) > .logo-wrapper > .logo {
    @apply w-50 h-50;
  }

  .app-header-logo:not(.-mobile) > .title {
    @apply text-18;
  }

  .app-header-logo.-mobile > .logo-wrapper > .logo {
    @apply w-36 h-36 mr-16;
  }

  .app-header-logo.-mobile > .title {
    @apply text-14;
  }

  .app-header-logo > .title > .dot {
    background: radial-gradient(173% 173% at 181% 176%, #6071ff 66.96%, #27fdff 83%);
    width: 5px;
    height: 5px;
    margin: 2px 3px 0 3px;
  }
</style>
