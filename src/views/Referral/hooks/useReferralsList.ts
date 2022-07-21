import type { Result } from 'ethers/lib/utils'
import { ref, watch } from 'vue'
import { shortenAddress } from '@/utils/address/shortenAddress'
import { multicall, Call } from '@/utils/contracts/multicall'
import contractsAddresses from '@/config/constants/contractsAddresses'
import dayjs from 'dayjs'
import { useReferralContract } from '@/hooks/contracts/useReferralContract'
import { StopController } from '@/utils/StopController'
import { createSharedComposable } from '@vueuse/core'
import { Referral__factory } from '@/contracts'

interface ReferralInfoRaw extends Result {
  account: string
  timestamp: number
  dateStr: string
}

export type ReferralInfo = {
  address: string
  shortAddress: string
  timestamp: number
  dateStr: string
  timeStr: string
}

const FETCHING_STEP = 20

export const useReferralsList = createSharedComposable(() => {
  const isFetching = ref(false)
  const referralsList = ref<ReferralInfo[]>([])
  const numberOfReferrals = ref(0)
  const referralContract = useReferralContract()

  const resetState = () => {
    referralsList.value = []
    isFetching.value = false
    numberOfReferrals.value = 0
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

        const [totalReferralsBn] = await contract.functions.referralsLength(signerAddress)

        stopController.breakIfStoping()

        const totalReferrals = totalReferralsBn.toNumber()
        numberOfReferrals.value = totalReferrals

        for (let fromIndex = totalReferrals - 1; fromIndex >= 0; fromIndex -= FETCHING_STEP) {
          let calls: Call[] = []

          for (let index = fromIndex; index >= Math.max(0, fromIndex - FETCHING_STEP + 1); index--) {
            calls.push({
              address: contractsAddresses.ReferralService,
              name: 'referrals',
              params: [signerAddress, index],
            })
          }

          const [referrals] = await multicall<ReferralInfoRaw[]>(Referral__factory.abi, calls)

          stopController.breakIfStoping()

          referralsList.value.push(
            ...referrals.map(({ account, timestamp }) => {
              const date = dayjs.unix(timestamp)
              return {
                address: account,
                shortAddress: shortenAddress(account),
                timestamp,
                dateStr: date.format('YYYY-MM-DD'),
                timeStr: date.format('HH:MM'),
              }
            }),
          )
        }

        isFetching.value = false
      } catch (error) {
        resetState()

        throw error
      }
    },
    { immediate: true },
  )

  return { isFetching, referralsList, numberOfReferrals }
})
