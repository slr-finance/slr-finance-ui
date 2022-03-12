<template>
  <div class="flex flex-col justify-start relative">
    <div
      v-if="nextPool"
      v-show="isHover"
      class="absolute bottom-full"
    >
      Next target: {{ nextPool.name }}
      <p>APY: {{ 123456 }} %</p>
    </div>

    <div class="flex items-end space-x-16">
      <ui-button
        :disabled="!toPrev"
        :to="toPrev"
      >
        <ui-icon name="arrow-left-short" />
      </ui-button>

      <ui-button
        v-if="toNext && nextPool"
        :to="toNext"
        @mouseenter="handleMouseEnterNext"
        @mouseleave="handleMouseLeaveNext"
      >
        {{ nextPool.name }}
        <ui-icon
          name="arrow-right"
          class="ml-8"
        />
      </ui-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue'
  import { POOLS_INFO } from '@/config/constants/Pools'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiIcon from '@/components/ui/UiIcon.vue'

  export default defineComponent({
    name: 'staking-navigation',
    props: {
      poolId: {
        type: Number,
        require: true,
      },
    },
    setup(props) {
      const isHover = ref(false)

      const currentPollIndex = computed(() => POOLS_INFO.findIndex((pool) => pool.id === props.poolId))
      const toPrev = computed(() => {
        const index = unref(currentPollIndex)

        return index > 0 ? { name: POOLS_INFO[index - 1].routeName } : undefined
      })

      const nextPool = computed(() => {
        const index = unref(currentPollIndex)

        return index < POOLS_INFO.length - 1 ? POOLS_INFO[index + 1] : undefined
      })

      const toNext = computed(() => {
        const nextPoolValue = unref(nextPool)

        return nextPoolValue ? { name: nextPoolValue.routeName } : undefined
      })

      const handleMouseEnterNext = () => {
        isHover.value = true
      }

      const handleMouseLeaveNext = () => {
        isHover.value = false
      }

      return {
        nextPool,
        toPrev,
        toNext,
        isHover,
        handleMouseEnterNext,
        handleMouseLeaveNext,
      }
    },
    components: {
      UiButton,
      UiIcon,
    },
  })
</script>
