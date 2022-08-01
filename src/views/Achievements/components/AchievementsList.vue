<template>
  <h2 class="caption font-title text-ui-page-label">{{ group.title }} ({{ have }}/{{ total }})</h2>
  <section class="achievement-list bg-gray-800 py-24 rounded-16">
    <ui-scroll-snap
      class="list flex space-x-24 overflow-x-scroll"
      variant="gray-800"
    >
      <achievement-card
        class="achievement-list-item"
        v-for="i in total"
        :key="i"
      />
    </ui-scroll-snap>
      
    <achievements-list-actions class="action" />
  </section>
</template>

<script lang="ts">
import UiScrollSnap from '@/components/ui/UiScrollSnap.vue'
import { defineComponent } from 'vue'
import AchievementCard from './AchievementCard.vue'
import AchievementsListActions from './AchievementsListActions.vue'

export default defineComponent({
  name: 'achievement-list',
  props: {
    group: {
      type: Object,
      required: true,
    }
  },
  setup() {
    return {
      have: 4,
      total: 8,
    }
  },
  components: { AchievementCard, AchievementsListActions, UiScrollSnap },
})
</script>

<style scoped>
.achievement-list {
  @apply grid;
  grid-template-areas: 
    'caption caption'
    'list action'
  ;
}

.caption {
  grid-area: caption;
}

.list {
  grid-area: list;
}

.action {
  grid-area: action;
}

.achievement-list-item {
  scroll-snap-align: center;
}
</style>
