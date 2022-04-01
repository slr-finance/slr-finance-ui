<template>
  <a
    :class="{ '-mobile': isMobile }"
    class="app-header-logo flex items-center relative z-10 leading-none"
    href="https://slr.finance"
  >
    <ui-icon
      name="slr-logo"
      class="logo"
    />
    <div class="title flex items-center justify-start">
      SLR
      <div class="dot rounded-full"></div>
      FINANCE
    </div>
  </a>
</template>

<script lang="ts">
  import { watch, defineComponent } from 'vue'
  import UiIcon from '@/components/ui/UiIcon.vue'

  export default defineComponent({
    name: 'app-header-logo',
    props: {
      isMobile: {
        type: Boolean,
        default: true,
      },
    },
    components: {
      UiIcon,
    },
  })
</script>

<style>
  .app-header-logo:not(.-mobile) {
    min-width: 300px;
  }
  .app-header-logo:not(.-mobile) > .logo {
    @apply w-50 h-50 mr-32;
  }

  .app-header-logo:not(.-mobile) > .title {
    @apply text-18;
  }

  .app-header-logo.-mobile > .logo {
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
