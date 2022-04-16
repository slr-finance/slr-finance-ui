<template>
  <nav
    ref="root"
    class="pools-list flex justify-center items-center"
    :class="classList"
  >
    <div
      ref="nav"
      class="nav rounded-24 bg-white bg-opacity-[0.082]"
    >
      <ul class="space-y-16 p-16 my-16">
        <li v-for="link in poolsLinks">
          <router-link
            :to="link.to"
            class="p-6 block pools-list-link-icon"
          >
            <ui-icon
              :name="link.icon"
              size="28"
            />
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue'
  import { POOLS_INFO } from '@/config/constants/Pools'
  import { templateRef, useElementSize, useWindowSize } from '@vueuse/core'
  import UiIcon from '@/components/ui/UiIcon.vue'

  const poolsLinks = POOLS_INFO.map((pool) => {
    return {
      to: { name: pool.routeName },
      name: pool.name,
      icon: pool.page.icon,
    }
  })

  export default defineComponent({
    name: 'pools-list',
    setup() {
      const { height } = useWindowSize()
      const navEl = templateRef('nav')
      const { height: navHeight } = useElementSize(navEl)
      const classList = computed(() => {
        if (height.value - 140 > navHeight.value) {
          return '-fixed'
        }
      })

      return { poolsLinks, classList }
    },
    components: { UiIcon },
  })
</script>

<style lang="postcss">
  .pools-list {
    width: 72px;
    padding-top: 130px;
  }
  .pools-list.-fixed > .nav {
    position: fixed;
    top: 50%;
    transform: translateY(
      calc(
        -50% + var(--app-ui-header-base-height) - (
            var(--app-ui-header-scroll-padding) + var(--app-ui-header-scroll-factor) *
              var(--app-ui-header-scroll-padding)
          ) / 2
      )
    );
  }

  .pools-list.-sticky {
  }
  .pools-list-link-icon {
    @apply text-[#6C7479] rounded-12 transition-colors duration-200;
  }

  .pools-list-link-icon:hover {
    @apply text-[#748088];
  }

  .pools-list-link-icon.router-link-active {
    @apply text-white;
    background: #6f0dff;
  }
</style>
