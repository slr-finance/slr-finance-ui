<template>
  <div
    class="pool-mobile-bg pointer-events-none flex justify-end items-stretch w-full fixed z-bg-content right-0 bottom-0"
  >
    <picture>
      <source
        :srcset="imgsPaths.webp"
        type="image/webp"
      />
      <img
        :src="imgsPaths.jpg"
        class="w-full img"
        width="960"
        height="600"
      />
    </picture>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef } from 'vue'
  import { usePoolInfo } from '../../../hooks/usePoolInfo'

  export default defineComponent({
    name: 'pool-mobile-bg',
    props: {
      poolId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const poolInfo = usePoolInfo(toRef(props, 'poolId'))
      const imgsPaths = computed(() => ({
        jpg: `${poolInfo.value.page.mobileBgPath}.jpg`,
        webp: `${poolInfo.value.page.mobileBgPath}.webp`,
      }))

      return { imgsPaths }
    },
  })
</script>

<style lang="postcss">
  .pool-mobile-bg .img {
    animation-duration: 3s;
    animation-name: pool-mobile-bg-animation;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes pool-mobile-bg-animation {
    from {
      opacity: 1;
    }

    to {
      opacity: 0.7;
    }
  }
</style>
