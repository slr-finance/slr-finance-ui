<template>
  <div class="rounded-12 bg-gray-800 bg-opacity-70 px-ui-page-inner-spacing py-24 relative">
    <ui-poligon
      v-if="currentPhase != 0"
      animated
      variant="violet"
      class="absolute top-0 right-0 transform translate-x-4 400:translate-x-8 600:translate-x-12 875:translate-x-18 -translate-y-18"
    >
      {{ bageText }}
    </ui-poligon>

    <ui-galaxy-loader
      v-if="isFetching && !isInitalFetched"
      class="w-full h-full"
    />

    <template v-else>
      <presale-time v-if="currentPhase < 4" />
      <white-list-state v-if="currentPhase == 0" />
      <presale-launched-state v-else-if="currentPhase < 4" />
      <presale-ended-state v-else />
      <slot
        v-if="!isFetching"
        name="footer"
      />
    </template>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'
  import { UiButton, UiGalaxyLoader, UiPoligon } from '@slr-finance/uikit'
  import PresaleTime from './PresaleTime.vue'
  import { usePresale } from '../../hooks/usePresale'

  export default defineComponent({
    name: 'presale-information',
    props: {
      bageText: {
        type: String,
        default: 'Info',
      },
    },
    setup() {
      const { currentPhase, isFetching, isInitalFetched } = usePresale()

      return {
        isFetching,
        isInitalFetched,
        currentPhase,
      }
    },
    components: {
      UiButton,
      UiPoligon,
      PresaleTime,
      UiGalaxyLoader,
      PresaleLaunchedState: defineAsyncComponent({
        loader: () => import('./PresaleLaunchedState.vue'),
        loadingComponent: UiGalaxyLoader,
      }),
      PresaleEndedState: defineAsyncComponent({
        loader: () => import('./PresaleEndedState.vue'),
        loadingComponent: UiGalaxyLoader,
      }),
      WhiteListState: defineAsyncComponent({
        loader: () => import('./WhiteListState.vue'),
        loadingComponent: UiGalaxyLoader,
      }),
    },
  })
</script>
