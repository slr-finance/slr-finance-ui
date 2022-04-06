<template>
  <div
    class="pool-navigation sticky overflow-hidden bg-white bg-opacity-20 rounded-12 px-8 text-12"
    :class="classList"
  >
    <transition
      mode="out-in"
      name="fade"
    >
      <div
        :key="poolId"
        class="wrapper flex flex-col justify-start"
      >
        <router-link
          class="firstItem ui-link h-40 flex justify-between items-center"
          v-if="prevPoolName"
          :to="prevPoolRoute"
        >
          <div>{{ prevPoolName }} {{ prevApyStr }}</div>
          <ui-icon
            name="arrow-pixel-to"
            class="mr-8"
            rotate="180"
            size="16"
          />
        </router-link>
        <router-link
          class="ui-link h-40 flex justify-between items-center"
          v-if="nextPoolName"
          :to="nextPoolRoute"
        >
          <div>{{ nextPoolName }} {{ nextApyStr }}</div>
          <ui-icon
            name="arrow-pixel-to"
            class="mr-8"
            size="16"
          />
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue'
  import { MAX_POOL_ID, POOLS_INFO } from '@/config/constants/Pools'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import { usePool } from '@/store/hooks/usePool'
  import { BIG_ZERO } from '@/utils/bigNumber'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'

  export default defineComponent({
    name: 'staking-navigation',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const prevPoolId = computed(() => (props.poolId > 1 ? props.poolId - 1 : 0))
      const nextPoolId = computed(() => (props.poolId < MAX_POOL_ID ? props.poolId + 1 : 0))
      const prevPoolInfo = computed(() => {
        const id = prevPoolId.value

        return id ? POOLS_INFO.find((pool) => pool.id === id) : undefined
      })
      const nextPoolInfo = computed(() => {
        const id = nextPoolId.value

        return id ? POOLS_INFO.find((pool) => pool.id === id) : undefined
      })

      const prevPoolName = computed(() => prevPoolInfo.value?.name)
      const nextPoolName = computed(() => nextPoolInfo.value?.name)
      const prevPoolRoute = computed(() => ({ name: prevPoolInfo.value?.routeName }))
      const nextPoolRoute = computed(() => ({ name: nextPoolInfo.value?.routeName }))
      const prevPoolData = usePool(prevPoolId)
      const nextPoolData = usePool(nextPoolId)
      const prevApy = computed(() => prevPoolData.value?.apy ?? BIG_ZERO)
      const nextApy = computed(() => nextPoolData.value?.apy ?? BIG_ZERO)
      const prevApyStr = usePercentFormat(prevApy)
      const nextApyStr = usePercentFormat(nextApy)

      const classList = computed(() => (prevPoolId.value && nextPoolId.value ? '-full' : '-single'))

      return {
        prevPoolName,
        nextPoolName,
        prevPoolRoute,
        nextPoolRoute,
        prevApyStr,
        nextApyStr,
        classList,
      }
    },
    components: {
      UiButton,
      UiIcon,
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .pool-navigation {
    min-width: 155px;
    transition: height 0.7s;
  }

  .pool-navigation.-full {
    height: 80px;
  }

  .pool-navigation.-full::before {
    width: calc(100% - 16px);
    @apply absolute top-1/2 h-1 bg-white bg-opacity-40 content-[''];
  }

  .pool-navigation.-single {
    height: 40px;
  }

  .ui-link {
    @apply outline-none text-white;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.8s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
