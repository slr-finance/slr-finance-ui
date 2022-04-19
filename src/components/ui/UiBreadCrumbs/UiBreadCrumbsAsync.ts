import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent({
  loader: () => import('./UiBreadCrumbs.vue'),
})
