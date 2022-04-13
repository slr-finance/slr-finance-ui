export const REFERRER_QUERY_PARAM = 'r'
export const REFERRER_STORAGE_NAME = 'referrer'

export enum REFERRALS_ACTIONS {
  Presale = 1,
  Staking = 2,
  Transfer = 3,
  Sell = 4,
  Buy = 5,
}

export const REFERRALS_ACTIONS_LABELS: Record<number, string> = {
  [REFERRALS_ACTIONS.Presale]: 'Presale',
  [REFERRALS_ACTIONS.Staking]: 'Staking',
  [REFERRALS_ACTIONS.Transfer]: 'Transfer',
  [REFERRALS_ACTIONS.Sell]: 'Sell',
  [REFERRALS_ACTIONS.Buy]: 'Buy',
}
