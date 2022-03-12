import { ref, watch } from 'vue'
import { shortenAddress, useEthers } from 'vue-dapp'
import { getReferralContract } from '@/utils/contracts/getReferralContract'
import { multicall, Call } from '@/utils/contracts/multicall'
import ReferralAbi from '@/config/abi/Referral.json'
import contractsAddresses from '@/config/constants/contractsAddresses.json'
import { BigNumber as BigNumberEther } from 'ethers'
import { runAsyncWithParamChecking } from '@/hooks/runAsyncWithParamChecking'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import type { Result } from 'ethers/lib/utils'
import { REFERRALS_ACTIONS } from '@/config/constants/referrals'

dayjs.extend(localizedFormat)

interface AccrualRaw extends Result {
  from: string
  timestamp: number
  amount: BigNumberEther
  action: number
}

type AccrualInfo = {
  address: string
  shortAddress: string
  timestamp: number
  amount: BigNumber
  dateStr: string
  amountStr: string
  actionLabel: string
}

const TEN_BN = new BigNumber(10)

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

          const totalAccrualsBn: BigNumberEther[] = await getReferralContract().functions.accrualHistoryLength(
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

            const referrals = await multicall<AccrualRaw[]>(ReferralAbi, calls)

            breakIfValueChanged()

            accrualList.value.push(
              ...referrals.map(({ from, timestamp, amount: amountEthersBn, action }) => {
                const amount = new BigNumber(amountEthersBn._hex).div(TEN_BN.pow(18))

                return {
                  address: from,
                  shortAddress: shortenAddress(from),
                  timestamp,
                  amount,
                  dateStr: dayjs.unix(timestamp).format('LLL'),
                  amountStr: `${amount.toNumber().toLocaleString('en-En', {
                    style: 'decimal',
                    maximumFractionDigits: 6,
                  })} SOLAR>FINANCE`,
                  actionLabel: REFERRALS_ACTIONS[action],
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
