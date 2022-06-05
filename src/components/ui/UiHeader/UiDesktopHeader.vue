<template>
  <header
    class="app-header fixed z-header top-0 left-0 w-full px-ui-page-spacing pt-32 selection:bg-green-atomic selection:text-black"
    :class="{ '-mobile': !isDesktop }"
  >
    <div class="app-header-bg backdrop-blur-8 absolute top-0 left-0 w-full h-full z-0 bg-black bg-opacity-30" />
    <div class="flex items-center relative z-10 w-full h-full">
      <ui-header-logo
        :is-mobile="!isDesktop"
        :logo-link="logoLink"
      />

      <ul class="ml-18 flex-1 flex space-x-32 h-full">
        <li
          class="h-full"
          :key="index"
          v-for="(link, index) in links"
        >
          <ui-link
            class="ui-link text-14 flex flex-col justify-center items-center leading-none h-full"
            v-bind="link"
          />
        </li>
        <li class="h-full flex flex-1 justify-end">
          <ui-link
            class="text-14 flex flex-col justify-center items-center leading-none h-full"
            href="https://docs.slr.finance"
            rel="noopener noreferrer"
            target="_blank"
          >
            Knowledge base
          </ui-link>
        </li>
      </ul>

      <div class="ml-16">
        <slot name="action"/>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import type { RouteLocationRaw } from 'vue-router'
  import { defineComponent, onUnmounted, PropType } from 'vue'
  import { useStyleTag, useBreakpoints, useEventListener } from '@vueuse/core'
  import UiLink, { UiLinkProps } from '../UiLink.vue'
  import UiHeaderLogo from './UiHeaderLogo.vue'

  const checkWindow = (ifExist = () => {}, ifNotExist = () => {}) => {
    if (typeof window !== 'undefined') {
      ifExist()
    } else {
      ifNotExist()
    }
  }

  const getScrollFactorStyle = (scrollY: number) => {
    const scrollFactor = Math.min(scrollY, 97) / 100

    return `:root { --app-ui-header-scroll-factor: ${scrollFactor}`
  }

  export default defineComponent({
    name: 'app-header-desktop',
    props: {
      logoLink: {
        type: [String, Object] as PropType<RouteLocationRaw>,
      },
      links: {
        type: Array as PropType<UiLinkProps[]>
      },
    },
    setup() {
      // Handle scroll [BEGIN]
      let ticking = false

      const handleScroll = () => {
        if (ticking) {
          return
        }

        const currentPos = window.scrollY
        ticking = true

        window.requestAnimationFrame(() => {
          css.value = getScrollFactorStyle(currentPos)
          ticking = false

          if (currentPos !== window.scrollY) {
            handleScroll()
          }
        })
      }

      let scrollY = 0
      checkWindow(() => {
        scrollY = window.scrollY

        useEventListener(window, 'scroll', (event) => {
          handleScroll()
        })
      })
      
      const { css } = useStyleTag(getScrollFactorStyle(scrollY))
      // Handle scroll [END]

      const { isDesktop, isLaptop } = useBreakpoints({ isDesktop: 980, isLaptop: 450 })

      onUnmounted(() => {
        css.value = getScrollFactorStyle(0)
      })

      return {
        isDesktop,
        isLaptop,
      }
    },
    components: {
        UiLink,
        UiHeaderLogo,
    },
  })
</script>

<style lang="postcss">
  :root {
    --app-ui-header-base-height: 64px;
    --app-ui-header-scroll-padding: 32px;
    --app-ui-header-padding: calc(var(--app-ui-header-scroll-padding) + var(--app-ui-header-height));
  }

  .app-header {
    transform: translateY(calc(var(--app-ui-header-scroll-factor) * var(--app-ui-header-scroll-padding) * -1));
    height: calc(var(--app-ui-header-base-height) + var(--app-ui-header-scroll-padding));
    padding-top: var(--app-ui-header-scroll-padding);
  }

  .app-header > .app-header-bg {
    opacity: var(--app-ui-header-scroll-factor);
  }
</style>
