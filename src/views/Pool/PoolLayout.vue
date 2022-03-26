<template>
  <router-view v-slot="{ Component }">
    <transition
      name="slide-fade"
      mode="out-in"
    >
      <component
        :is="Component"
        :key="$route.name"
      />
    </transition>
  </router-view>
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue'
  import { stakingModule } from '@/store/modules/stakingModule'
  import { useRoute, useRouter } from 'vue-router'
  import { POOLS_INFO } from '@/config/constants/Pools'

  export default defineComponent({
    setup() {
      const route = useRoute()
      const router = useRouter()

      watch(
        route,
        ({ name }) => {
          if (name === 'pool') {
            const {
              state: {
                staker: { poolId },
              },
            } = stakingModule

            if (poolId > 0 && poolId <= POOLS_INFO.length) {
              router.replace({ name: POOLS_INFO[poolId - 1].routeName })
            } else {
              router.replace({ name: POOLS_INFO[0].routeName })
            }
          }
        },
        { immediate: true },
      )
    },
  })
</script>
