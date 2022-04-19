import { i18nRouteHelper } from '@/i18n'

export const linksList = [
  {
    label: 'Swap',
    route: i18nRouteHelper({ name: 'swap' }),
  },
  {
    label: 'Presale',
    route: i18nRouteHelper({ name: 'presale' }),
  },
  {
    label: 'Staking',
    route: i18nRouteHelper({ name: 'pool' }),
  },
  {
    label: 'Referral',
    route: i18nRouteHelper({ name: 'referral' }),
  },
]
