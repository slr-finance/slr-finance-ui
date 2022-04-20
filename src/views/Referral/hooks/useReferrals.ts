import { ref, watch } from 'vue'
import { useEthers } from '@/hooks/dapp/useEthers'
import { shortenAddress } from '@/utils/address/shortenAddress'
import { getReferralContract } from '@/utils/contracts/getReferralContract'
import { multicall, Call } from '@/utils/contracts/multicall'
import ReferralAbi from '@/config/abi/Referral.json'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import { BigNumber as BigNumberEthers } from 'ethers'
import { runAsyncWithParamChecking } from '@/hooks/runAsyncWithParamChecking'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import type { Result } from 'ethers/lib/utils'

dayjs.extend(localizedFormat)

interface ReferralInfoRaw extends Result {
  account: string
  timestamp: number
  dateStr: string
}

type ReferralInfo = {
  address: string
  shortAddress: string
  timestamp: number
  dateStr: string
  timeStr: string
}

export const useReferrals = () => {
  const { address } = useEthers()
  const referralsList = ref<ReferralInfo[]>([])
  const isFetching = ref(false)
  const numberOfReferrals = ref(0)

  watch(
    address,
    async () => {
      runAsyncWithParamChecking(
        address,
        async (addressVal, { breakIfValueChanged, isValueChanged, breakIfValueIsNil, isNilValue }) => {
          isFetching.value = !isNilValue()
          referralsList.value = []
          numberOfReferrals.value = 0
          const step = 20

          breakIfValueIsNil()

          const totalReferralsBn: BigNumberEthers[] = await getReferralContract().functions.referralsLength(addressVal)
          const totalReferrals = totalReferralsBn[0].toNumber()
          numberOfReferrals.value = totalReferrals

          breakIfValueChanged()

          for (let fromIndex = totalReferrals - 1; fromIndex >= 0; fromIndex -= step) {
            let calls: Call[] = []

            for (let index = fromIndex; index >= Math.max(0, fromIndex - step + 1); index--) {
              calls.push({
                address: contractsAddresses.ReferralService,
                name: 'referrals',
                params: [addressVal, index],
              })
            }

            const [referrals] = await multicall<ReferralInfoRaw[]>(ReferralAbi, calls)

            breakIfValueChanged()

            referralsList.value.push(
              ...referrals.map(({ account, timestamp }) => {
                const date = dayjs.unix(timestamp)
                return {
                  address: account,
                  shortAddress: shortenAddress(account),
                  timestamp,
                  dateStr: date.format('DD.MM.YY'),
                  timeStr: date.format('HH:MM'),
                }
              }),
            )
          }

          if (!isValueChanged()) {
            isFetching.value = false
          }
        },
      )
    },
    { immediate: true },
  )

  return { referralsList, isFetching, numberOfReferrals }
}
