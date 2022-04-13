import { ref, watch } from 'vue'
import { useEthers } from '@/hooks/dapp/useEthers'
import { shortenAddress } from '@/utils/address/shortenAddress'
import { getReferralContract } from '@/utils/contracts/getReferralContract'
import { multicall, Call } from '@/utils/contracts/multicall'
import ReferralAbi from '@/config/abi/Referral.json'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import { BigNumber as BigNumberEthers } from 'ethers'
import { runAsyncWithParamChecking } from '@/hooks/runAsyncWithParamChecking'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import type { Result } from 'ethers/lib/utils'
import { REFERRALS_ACTIONS_LABELS } from '@/config/constants/referrals'
import { parseWei } from '@/utils/bigNumber'

dayjs.extend(localizedFormat)

interface AccrualRaw extends Result {
  from: string
  timestamp: number
  amount: BigNumberEthers
  action: number
}

type AccrualInfo = {
  address: string
  shortAddress: string
  timestamp: number
  amount: BigNumber
  dateStr: string
  timeStr: string
  amountStr: string
  actionLabel: string
  action: number
}

export const useReferrerAccrualHistory = () => {
  const { address } = useEthers()
  const accrualList = ref<AccrualInfo[]>([])
  const isFetching = ref(false)
  const numberOfAccrual = ref(0)

  watch(
    address,
    async () => {
      runAsyncWithParamChecking(
        address,
        async (addressVal, { breakIfValueChanged, isValueChanged, breakIfValueIsNil, isNilValue }) => {
          isFetching.value = !isNilValue()
          accrualList.value = []
          numberOfAccrual.value = 0
          const step = 2

          breakIfValueIsNil()

          const totalAccrualsBn: BigNumberEthers[] = await getReferralContract().functions.accrualHistoryLength(
            addressVal,
          )
          const totalAccruals = totalAccrualsBn[0].toNumber()
          numberOfAccrual.value = totalAccruals

          breakIfValueChanged()

          for (let fromIndex = totalAccruals - 1; fromIndex >= 0; fromIndex -= step) {
            let calls: Call[] = []

            for (let index = fromIndex; index >= Math.max(0, fromIndex - step + 1); index--) {
              calls.push({
                address: contractsAddresses.ReferralService,
                name: 'accrualHistory',
                params: [addressVal, index],
              })
            }

            const [referrals] = await multicall<AccrualRaw[]>(ReferralAbi, calls)

            breakIfValueChanged()

            accrualList.value.push(
              ...referrals.map(({ from, timestamp, amount: amountEthersBn, action }) => {
                const amount = parseWei(amountEthersBn, 18)
                const date = dayjs.unix(timestamp)

                return {
                  address: from,
                  shortAddress: shortenAddress(from),
                  timestamp,
                  amount,
                  dateStr: date.format('DD.MM.YY'),
                  timeStr: date.format('HH:MM'),
                  amountStr: `${amount.toNumber().toLocaleString('en-En', {
                    style: 'decimal',
                    maximumFractionDigits: 6,
                  })} SLR`,
                  actionLabel: REFERRALS_ACTIONS_LABELS[action],
                  action,
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

  return { accrualList, isFetching, numberOfAccrual }
}
