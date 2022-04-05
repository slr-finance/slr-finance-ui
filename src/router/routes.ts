import type { RouteRecordRaw } from 'vue-router'
import { POOLS_INFO } from '../config/constants/Pools'

export const routes: RouteRecordRaw[] = [
  {
    path: '/:locale?',
    name: 'dashboard',
    component: () => import('@/views/Dashboard/Dashboard.vue'),
  },
  {
    path: '/:locale?/presale',
    name: 'presale',
    component: () => import('@/views/Presale'),
  },
  {
    path: '/:locale?/referral',
    name: 'referral',
    component: () => import('@/views/Referral'),
  },
  {
    path: '/:locale?/swap',
    name: 'swap',
    component: () => import('@/views/Swap/Swap.vue'),
  },
  {
    path: '/:locale?/pool',
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
]
