import type { Result } from '@ethersproject/abi'
import { Ref, ref, watch } from 'vue'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import { BigNumber as BigNumberEthers } from 'ethers'
import contractsAddresses from '@/config/constants/contractsAddresses'
import { REFERRALS_ACTIONS, REFERRALS_ACTIONS_LABELS } from '@/config/constants/referrals'
import { parseWei } from '@/utils/bigNumber'
import { shortenAddress } from '@/utils/address/shortenAddress'
import { multicall, Call } from '@/utils/contracts/multicall'
import { tokenAmountFormat } from '@/utils/strFormat/tokenAmountFormat'
import { createSharedComposable } from '@vueuse/core'
import { useReferralContract } from '@/hooks/contracts/useReferralContract'
import { StopController } from '@/utils/StopController'
import { ReferralService__factory } from '@slr-finance/contracts'

interface AccrualRaw extends Result {
  from: string
  timestamp: number
  amount: BigNumberEthers
  action: REFERRALS_ACTIONS
}

export type AccrualInfo = {
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

const FETCHING_STEP = 20

export const useReferrerAccrualList = createSharedComposable(() => {
  const accrualsList = ref<AccrualInfo[]>([]) as Ref<AccrualInfo[]>
  const isFetching = ref(false)
  const numberOfAccruals = ref(0)
  const referralContract = useReferralContract()

  const resetState = () => {
    accrualsList.value = []
    isFetching.value = false
    numberOfAccruals.value = 0
  }

  watch(
    referralContract,
    async (contract, _, onCleanup) => {
      try {
        resetState()
        const stopController = new StopController(onCleanup)
        const signerAddress = await contract?.signer?.getAddress()

        if (!signerAddress) {
          stopController.stop()
        }

        stopController.breakIfStoping()

        isFetching.value = true

        const [totalAccrualsBn] = await contract.functions.accrualHistoryLength(signerAddress)
        const totalAccruals = totalAccrualsBn.toNumber()
        numberOfAccruals.value = totalAccruals

        stopController.breakIfStoping()

        for (let fromIndex = totalAccruals - 1; fromIndex >= 0; fromIndex -= FETCHING_STEP) {
          let calls: Call[] = []

          for (let index = fromIndex; index >= Math.max(0, fromIndex - FETCHING_STEP + 1); index--) {
            calls.push({
              address: contractsAddresses.ReferralService,
              name: 'accrualHistory',
              params: [signerAddress, index],
            })
          }

          const [referrals] = await multicall<AccrualRaw[]>(ReferralService__factory.abi, calls)

          stopController.breakIfStoping()

          accrualsList.value.push(
            ...referrals.map(({ from, timestamp, amount: amountEthersBn, action }) => {
              const amount = parseWei(amountEthersBn, 18)
              const date = dayjs.unix(timestamp)

              return {
                address: from,
                shortAddress: shortenAddress(from),
                timestamp,
                amount,
                dateStr: date.format('YYYY-MM-DD'),
                timeStr: date.format('HH:MM'),
                amountStr: tokenAmountFormat(amount, 'SLR'),
                actionLabel: REFERRALS_ACTIONS_LABELS[action],
                action,
              }
            }),
          )
        }

        isFetching.value = false
      } catch (error) {
        resetState()

        if (!StopController.isStoped(error)) {
          throw error
        }
      }
    },
    { immediate: true },
  )

  return { isFetching, accrualsList, numberOfAccruals }
})
