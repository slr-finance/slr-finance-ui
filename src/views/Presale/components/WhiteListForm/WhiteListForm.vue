<template>
  <ui-widget :color="widgetData.color">
    <template #bage>
      <ui-poligon
        variant="green-original"
        animated
      >
        {{ widgetData.bageText }}
      </ui-poligon>
    </template>

    <transition
      mode="out-in"
      name="fade"
    >
      <ui-galaxy-loader
        v-if="isFetching"
        class="w-full h-full"
      />

      <white-list-joined
        v-else-if="isJoined"
        class="w-full h-full"
      />

      <white-list-join
        v-else
        class="w-full h-full"
      />
    </transition>
  </ui-widget>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import UiGalaxyLoader from '@/components/ui/UiGalaxyLoader.vue'
  import UiPoligon from '@/components/ui/UiPoligon.vue'
  import UiWidget from '@/components/ui/UiWidget.vue'
  import WhiteListJoined from './WhiteListJoined.vue'
  import WhiteListJoin from './WhiteListJoin.vue'
  import { useWhiteList } from '../../hooks/useWhiteList'

  export default defineComponent({
    name: 'white-list-form',
    setup() {
      const [, isJoined, isFetching] = useWhiteList()
      const widgetData = computed(() => {
        const isJoinedVal = isJoined.value

        return {
          color: isJoinedVal ? 'green-original' : 'white',
          bageText: isJoinedVal ? 'Joined' : 'Open',
        }
      })

      return {
        isJoined,
        isFetching,
        widgetData,
      }
    },
    components: {
      UiGalaxyLoader,
      UiPoligon,
      UiWidget,
      WhiteListJoined,
      WhiteListJoin,
    },
  })
</script>
