<template>
  <div
    class="mb-40 flex justify-between items-start"
    :class="classList"
  >
    <div>
      <h1 class="text-ui-page-title uppercase font-title leading-140">
        Referral <span class="text-gray">station</span>
      </h1>
      <p
        class="text-gray text-ui-page-description mt-12"
        style="max-width: 600px"
      >
        Send your referral link to your friends and earn up to 15% from friends’ performance fees on SLR and 1% from their earnings on Launchpools via SLR Referral Program.
      </p>
    </div>
    <ui-bread-crumbs-async
      v-if="isDesktopLayout"
      :items="[
        { to: { name: 'dashboard' }, text: 'Home' },
        { to: { name: 'referral' }, text: 'Referral' },
      ]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiBreadCrumbsAsync from '@/components/ui/UiBreadCrumbs/UiBreadCrumbsAsync'
import { computedEager } from '@vueuse/shared'

export default defineComponent({
  name: 'referral-page-title',
  props: {
    isDesktopLayout: {
      type: Boolean,
      required: true,
    }
  },
  setup(props) {
    const classList = computedEager(() => props.isDesktopLayout ? 'col-span-2' : '')

    return { classList }
  },
  components: {
    UiBreadCrumbsAsync,
  }
})
</script>
