<template>
  <div class="rounded-12 bg-gray-800 bg-opacity-70 px-ui-page-inner-spacing py-24 relative">
    <ui-poligon
      variant="violet"
      class="absolute top-0 right-0 transform translate-x-4 400:translate-x-8 600:translate-x-12 875:translate-x-18 -translate-y-18"
      >info</ui-poligon
    >
    <div class="text-gray">Presale information</div>
    <div class="uppercase text-whit font-title text-24 mt-6">2 days 22:02:21</div>
    <div class="text-gray text-12 mt-8">expiration date 23 may 2022 10:00 UTC</div>
    <div class="flex flex-col 500:flex-row justify-between mt-12">
      <span class="text-gray text-14">Today Presale price</span>
      <span class="text-white text-14">350,000 per 1 BNB</span>
    </div>
    <div class="flex flex-col 500:flex-row justify-between mt-12">
      <span class="text-gray text-14">Tomorow Presale price</span>
      <span class="text-red text-14">310,000 per 1 BNB</span>
    </div>
    <div class="text-gray mt-12">Already sold</div>
    <ui-progress
      class="mt-6"
      :max="max"
      :value="value"
    >
      <template #content>
        <span class="font-title text-14">{{ value }}/{{ max }} BNB</span>
      </template>
    </ui-progress>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiPoligon from '@/components/ui/UiPoligon.vue'
  import UiProgress from '@/components/ui/UiProgress.vue'

  export default defineComponent({
    name: 'presale-information',
    setup() {
      const value = ref(7500)
      const max = ref(14000)

      return {
        value,
        max,
      }
    },
    components: { UiButton, UiPoligon, UiProgress },
  })
</script>
