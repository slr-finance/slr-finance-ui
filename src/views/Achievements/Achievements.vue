<template>
  <div
    class="flex flex-1 flex-col justify-between items-center"
  >
    <div class="achievements-page-content">
      <div
        v-once
      >
        <h1 class="text-white font-title mb-16 text-ui-page-title">
          Achievements <span class="text-gray">station</span>
        </h1>

        <!-- <achievements-info class="mt-32 mb-48"/> -->
        <div class="space-y-32">
          <achievements-list
            v-for="group in groups"
            :group="group"
            :key="group.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useHead } from '@vueuse/head'
  // import AchievementsInfo from './components/AchievementsInfo.vue'
  import AchievementsList from './components/AchievementsList.vue'
  import { useAchievements } from './hooks/useAchievements'

  export default defineComponent({
    name: 'swap-achievements',
    setup() {
      useHead({
        title: 'SLR Achievements',
        meta: [
          {
            name: 'description',
            content: 'SLR Achievements',
          },
        ],
      })

      const { groups } = useAchievements()

      return { groups }
    },
    components: {
      // AchievementsInfo,
      AchievementsList
    }
  })
</script>

<style
  lang="postcss"
  scoped
>
  .achievements-page-content {
    width: 100%;
  }
</style>
