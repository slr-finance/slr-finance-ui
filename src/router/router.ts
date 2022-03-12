import { routerBeforeEach } from '@/i18n/routerBeforeEach'
import { createRouter as vueCreateRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

export const router = vueCreateRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(routerBeforeEach)
