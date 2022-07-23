import { createWebHistory, createMemoryHistory, RouterOptions } from 'vue-router'
import { routes } from './routes'

export const routerOptions: RouterOptions = {
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes,
}
