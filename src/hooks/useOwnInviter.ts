import { ref, watch } from 'vue'
import { useEthers } from '@/hooks/dapp/useEthers'
import { getReferralContract } from '@/utils/contracts/getReferralContract'
import { runAsyncWithParamChecking } from '@/hooks/runAsyncWithParamChecking'
import { isAddress } from 'ethers/lib/utils'
import { constants } from 'ethers'
import { getReferrerFromCookies } from '@/libs/referral'

const getStorageInviterKey = (address: string) => `inviterBy:${address}`

export const useOwnInviter = () => {
  const { address } = useEthers()
  const isFetching = ref(false)
  const inviterAddress = ref('')

  const handleFetchOwnInviter = async () => {
    await runAsyncWithParamChecking(
      address,
      async (addressVal, { breakIfValueChanged, breakIfValueIsNil, isNilValue }) => {
        isFetching.value = !isNilValue()
        inviterAddress.value = ''

        breakIfValueIsNil()

        const storageKey = getStorageInviterKey(addressVal)
        const storageValue = localStorage.getItem(storageKey)

        if (storageValue && isAddress(storageValue)) {
          inviterAddress.value = storageValue
          isFetching.value = false
        } else {
          const address: string = await getReferralContract().referrers(addressVal)
          const isEmpty = address === constants.AddressZero

          if (!isEmpty && isAddress(address)) {
            localStorage.setItem(storageKey, address)
          }

          breakIfValueChanged()

          inviterAddress.value = isEmpty ? getReferrerFromCookies() : address
          isFetching.value = false
        }
      },
    )
  }

  watch(address, async () => handleFetchOwnInviter(), { immediate: true })

  return { inviterAddress, isFetching }
}
