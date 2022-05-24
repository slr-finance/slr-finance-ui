<template>
  <div class="flex flex-col justify-between mt-8">
    <p class="text-gray text-14">Phase-1 price</p>
    <presale-price
      class="text-white text-12"
      :phase="1"
    />
  </div>
  <div class="flex flex-col justify-between mt-8">
    <p class="text-gray text-14">Phase-2 price</p>
    <presale-price
      class="text-white text-12"
      :phase="2"
    />
  </div>
  <div class="flex flex-col justify-between mt-8">
    <p class="text-gray text-14">Phase-3 price</p>
    <presale-price
      class="text-white text-12"
      :phase="3"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import PresalePrice from '../PresalePrice.vue'

  export default defineComponent({
    name: 'white-list-state',
    components: {
      PresalePrice,
    },
  })
</script>

<style></style>
