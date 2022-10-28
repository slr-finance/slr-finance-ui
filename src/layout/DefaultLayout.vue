<template>
  <div class="flex relative px-ui-page-spacing min-h-full">
    <app-aside v-if="isShownAside" class="pr-ui-page-spacing">
      <template #top>
        <router-view name="left-top-sidebar" v-slot="{Component}">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </template>
      <template #bottom><app-settings/></template>
    </app-aside>
    
    <div class="min-h-full w-full">
      <default-layout-video-bg :content-height="contentHeight">
        <router-view name="bg-video" v-slot="{Component}">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </default-layout-video-bg>

      <div
        class="flex flex-1 flex-col min-h-full"
        :style="contentWrapperStyleList"
        ref="content"
      >
        <div class="pt-ui-page-header-spacing pb-ui-page-bottom-spacing relative z-ui-page-content flex flex-1 flex-col">
          <router-view/>
        </div>
      </div>

      <app-footer v-if="isShownFooter && !withoutDesktopFooter" class="pb-ui-page-spacing"/>
      <app-mobile-bottom-navigation v-if="!isShownFooter" />
    </div>

    <app-aside v-if="isShownAside" class="pl-ui-page-spacing">
      <template #top><router-view name="right-top-sidebar"/></template>
      <template #bottom>
        <router-view name="right-bottom-sidebar"/>
        <social-modal-button />
      </template>
    </app-aside>
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue'
import { AppAside } from '@/components/App/AppAside';
import AppMobileBottomNavigation from '@/components/App/AppMobileBottomNavigation/AppMobileBottomNavigation.vue'
import { AppSettings } from '@/components/App/AppSettings'
import { templateRef, useResizeObserver, useWindowSize } from '@vueuse/core'
import DefaultLayoutVideoBg from '@/components/Layout/DefaultLayoutVideoBg.vue'
import { useAppBreakpoints } from '@/hooks/useAppBreakpoints';

export default defineComponent({
  props: {
    withoutDesktopFooter: {
      type: Boolean,
    },
  },
  components: {
    DefaultLayoutVideoBg,
    AppAside,
    AppSettings,
    AppMobileBottomNavigation,
    SocialModalButton: defineAsyncComponent({
      loader: () => import('@/components/SocialModalButton'),
    }),
    AppFooter: defineAsyncComponent({
      loader: () => import('@/components/App/AppFooter'),
    }),
  },
  setup() {
    const contentRef = templateRef('content')
    const { w580: isShownFooter, w641: isShownAside } = useAppBreakpoints()

    const contentHeight = ref(0)
    const { height } = useWindowSize()

    const contentWrapperStyleList = computed(() => {
      return {
        minHeight: `${height.value}px`
      }
    })

    useResizeObserver(contentRef, ([{ contentRect: { height } }]) => {
      contentHeight.value = height
    }, { box: 'content-box' })

    return { isShownFooter, isShownAside, contentHeight, contentWrapperStyleList }
  },
})
</script>
