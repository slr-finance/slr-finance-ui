import { REFERRER_STORAGE_NAME } from '@/config/constants/referrals'
import { constants } from 'ethers'
import { isAddress } from 'ethers/lib/utils'

export const getReferrerFromLocalstorage = (): string => {
  let referrer: string | null = localStorage.getItem(REFERRER_STORAGE_NAME)
  referrer = referrer && isAddress(referrer) ? referrer : constants.AddressZero

  return referrer
}
