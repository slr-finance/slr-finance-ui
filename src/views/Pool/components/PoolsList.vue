<template>
  <nav>
    <ul class="space-y-16 rounded-24 bg-white bg-opacity-[0.082] p-16">
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
  </nav>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue'
  import { POOLS_INFO } from '@/config/constants/Pools'
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
      return { poolsLinks }
    },
    components: { UiIcon },
  })
</script>

<style lang="postcss">
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
