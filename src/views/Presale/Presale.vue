<template>
  <transition
    mode="out-in"
    name="fade"
  >
    <ui-galaxy-loader
      class="w-full h-full flex-1 relative z-1"
      v-if="isFetching && !isInitalFetched"
    />
    <div
      v-else
      class="px-ui-page-spacing pt-ui-page-header-spacing pb-ui-page-bottom-spacing flex flex-col flex-1"
    >
      <div class="flex flex-col items-center max-w-[800px] mx-auto relative z-1">
        <div class="text-center flex flex-col justify-center items-center mb-24">
          <h1 class="text-ui-page-title text-white uppercase font-title">
            <span class="text-gray">phase-{{ currentPhase }}</span>
            space presale
          </h1>
          <p class="text-ui-page-description text-gray max-w-[350px] mt-10">
            Three-phase presale with up to {{ phaseDiscountStr }} discount of the listing price
          </p>
        </div>
        <div class="grid w-full gap-28 grid-cols-1 mt-28 875:grid-cols-2">
          <white-list-form v-if="currentPhase === 0" />
          <presale-form v-else-if="currentPhase > 0 && currentPhase < 4" />
          <deposit-presale-token-form v-else />
          <presale-information />
          <presale-details
            class="875:col-span-2"
            v-if="currentPhase < 4"
          />
          <presale-ended
            class="875:col-span-2"
            v-else
          />
        </div>
      </div>
      <presale-bg />
    </div>
  </transition>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { usePercentFormat } from '@/hooks/formatters/usePercentFormat'
  import UiButton from '@/components/ui/UiButton.vue'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'
  import { usePresale } from './hooks/usePresale'
  import PresaleForm from './components/PresaleForm.vue'
  import DepositPresaleTokenForm from './components/DepositPresaleTokenForm.vue'
  import PresaleDetails from './components/PresaleDetails.vue'
  import PresaleInformation from './components/PresaleInformation'
  import PresaleEnded from './components/PresaleEnded.vue'
  import WhiteListForm from './components/WhiteListForm'
  import PresaleBg from './components/PresaleBg.vue'

  export default defineComponent({
    name: 'presale-view',
    setup() {
      const { currentPhase, isFetching, isInitalFetched, phasesDiscounts } = usePresale()
      const phaseDiscount = computed(() => phasesDiscounts.value[0])
      const phaseDiscountStr = usePercentFormat(phaseDiscount)

      return {
        currentPhase,
        phaseDiscountStr,
        isFetching,
        isInitalFetched,
      }
    },
    components: {
      PresaleForm,
      UiButton,
      DepositPresaleTokenForm,
      PresaleDetails,
      PresaleInformation,
      PresaleEnded,
      UiGalaxyLoader,
      WhiteListForm,
      PresaleBg,
    },
  })
</script>
