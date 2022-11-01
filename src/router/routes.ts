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
    components: {
      default: () => import('@/views/Presale'),
      'bg-video': () => import('@/views/Presale/components/view/PresaleBgView.vue'),
    },
    
  },
  {
    path: '/referral',
    name: 'referral',
    components: {
      default: () => import('@/views/Referral'),
      'left-top-sidebar': () => import('@/views/Referral/components/view/ReferralBackButtonView.vue'),
      'bg-video': () => import('@/views/Referral/components/view/ReferralBgView.vue'),
    },
  },
  {
    path: '/swap',
    name: 'swap',
    // redirect: { name: 'presale' },
    components: {
      default: () => import('@/views/Swap'),
      'bg-video': () => import('@/views/Swap/components/view/SwapBgView.vue'),
    },
  },
  {
    path: '/achievements',
    name: 'achievements',
    components: {
      default: () => import('@/views/Achievements'),
    },
  },
  {
    path: '/pool',
    name: 'pool',
    meta: {
      layout: {
        withoutSpacing: true
      }
    },
    components: {
      default: () => import('@/views/Pool/PoolLayout.vue'),
      'bg-video': () => import('@/views/Pool/components/view/PoolBgView'),
      'right-bottom-sidebar': () => import('@/views/Pool/components/view/PoolsFaqView'),
      'left-top-sidebar': () => import('@/views/Pool/components/view/PoolsListView.vue'),
      'right-top-sidebar': () => import('@/views/Pool/components/view/PoolsNavigationView'),
    },
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
