<template>
  <a
    :class="{ '-mobile': isMobile }"
    class="app-header-logo flex items-center"
    href="https://slr.finance"
  >
    <div class="logo relative z-10 rounded-full bg-bnb"></div>
    <div class="title relative z-10">SLR FINANCE</div>
  </a>
</template>

<script lang="ts">
  import { watch, defineComponent } from 'vue'

  export default defineComponent({
    name: 'app-header-logo',
    props: {
      isMobile: {
        type: Boolean,
        default: true,
      },
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
</style>
