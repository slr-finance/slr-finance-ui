import { routerBeforeEach } from '@/i18n/routerBeforeEach'
import { createRouter as vueCreateRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import { routes } from './routes'

export const createRouter = () => {
  const router = vueCreateRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  })

  router.beforeEach(routerBeforeEach)

  return router
}
