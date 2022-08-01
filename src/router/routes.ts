import type { RouteRecordRaw } from 'vue-router'
import { POOLS_INFO } from '../config/constants/Pools'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard/Dashboard.vue'),
  },
  {
    path: '/presale',
    name: 'presale',
    component: () => import('@/views/Presale'),
  },
  {
    path: '/referral',
    name: 'referral',
    component: () => import('@/views/Referral'),
  },
  {
    path: '/swap',
    name: 'swap',
    redirect: { name: 'presale' },
    //component: () => import('@/views/Swap/Swap.vue'),
  },
  {
    path: '/achievements',
    name: 'achievements',
    component: () => import('@/views/Achievements/Achievements.vue'),
  },
  {
    path: '/pool',
    name: 'pool',
    component: () => import('@/views/Pool/PoolLayout.vue'),
    props: (to) => to.meta,
    children: [
      ...POOLS_INFO.map(({ name, id: poolId, routeName }): RouteRecordRaw => {
        return {
          path: name.toLocaleLowerCase(),
          name: routeName,
          component: () => import('@/views/Pool'),
          props: { poolId },
          meta: { poolId },
        }
      }),
    ],
  },
  { name: '404', path: '/:pathMatch(.*)*', component: () => import('@/views/404/404.vue') }
]
