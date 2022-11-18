<template>
  <nav
    ref="root"
    class="pools-list"
    :class="classList"
  >
    <div
      ref="nav"
      class="nav"
    >
      <ul class="list">
        <li
          v-for="link in poolsLinks"
          :key="link.to.name"
        >
          <router-link
            :to="link.to"
            class="p-6 block pools-list-link-icon"
            active-class="-active"
          >
            <pool-icon :pool-id="link.id"/>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue'
  import { POOLS_INFO } from '@/config/constants/Pools'
  import { computedEager, templateRef, useElementSize, useWindowSize } from '@vueuse/core'
  import { useUiHeader } from '@slr-finance/uikit'
  import { useMobileBottomNavigation } from '@/components/App/AppMobileBottomNavigation/hooks/useMobileBottomNavigation'
  import { useAppBreakpoints } from '@/hooks/useAppBreakpoints'
  import PoolIcon from './PoolIcon.vue'

  const poolsLinks = POOLS_INFO.map((pool) => {
    return {
      to: { name: pool.routeName },
      name: pool.name,
      id: pool.id,
    }
  })

  export default defineComponent({
    name: 'pools-list',
    setup() {
      const { w641: isDesktopLayout } = useAppBreakpoints()
      const { size: headerSize } = useUiHeader()
      const { size: bottomNavSize } = useMobileBottomNavigation()
      const navElement = templateRef('nav')
      const { height } = useWindowSize()
      const { height: navHeight } = useElementSize(navElement, { width: 0, height: 0 }, { box: 'border-box' })
      const classList = computedEager(() => {
        const { value: bottomNavSizeVal } = bottomNavSize
        const { value: headerSizeVal } = headerSize
        const isFixed =
          height.value -
            headerSizeVal.height -
            headerSizeVal.offset -
            bottomNavSizeVal.height -
            bottomNavSizeVal.offset >
          navHeight.value

        return `${isFixed ? '-fixed' : ''} ${!isDesktopLayout.value ? '-mobile' : ''}`
      })

      const iconSize = computedEager(() => (!isDesktopLayout.value ? 22 : 28))

      watch(
        navHeight,
        (navHeightVal) => {
          const { value: navElementVal } = navElement

          if (navElementVal) {
            navElementVal.style.setProperty('--nav-height', `${navHeightVal}px`)
          }
        },
        { immediate: true },
      )

      return { poolsLinks, classList, iconSize }
    },
    components: { PoolIcon },
  })
</script>

<style>
  .pools-list > .nav {
    @apply bg-white bg-opacity-[0.082];
  }

  .pools-list:not(.-mobile) {
    @apply w-72;
  }

  .pools-list.-mobile {
    width: 52px;
  }

  .pools-list:not(.-mobile) > .nav {
    @apply rounded-24;
  }

  .pools-list.-mobile > .nav {
    @apply rounded-r-12;
  }

  .pools-list:not(.-mobile) > .nav > .list {
    @apply space-y-16 px-16 py-32;
  }

  .pools-list.-mobile > .nav > .list {
    @apply space-y-12 py-16;

    padding-left: 9px;
    padding-right: 9px;
  }

  .pools-list.-fixed {
    position: sticky;
    top: max(
      calc(
        (
            100% - var(--app-ui-header-height) - var(--app-ui-header-offset) - var(--nav-height, 550px) -
              var(--app-ui-bottom-nav-height, 0px) + var(--app-ui-bottom-nav-offset, 0px)
          ) / 2 + var(--app-ui-header-height)
      ),
      calc(var(--app-ui-header-height) + var(--app-ui-header-offset))
    );
    transform: translateY(calc(var(--app-ui-header-scroll-padding) * var(--app-ui-header-scroll-factor, 0) * -0.5));
  }

  .pools-list-link-icon {
    @apply text-gray rounded-12 transition-colors duration-200 aspect-1;
  }

  .pools-list-link-icon:hover {
    @apply text-[#748088];
  }

  .pools-list-link-icon.-active {
    @apply text-white bg-violet;
  }
</style>
