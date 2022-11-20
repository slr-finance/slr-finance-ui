import { ref, watch } from 'vue'
import { computedAsync, createSharedComposable } from '@vueuse/core'
import { constants } from 'ethers'
import { isAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
// import { getReferrerFromCookies } from '@slr-finance/ui-share'
import { useReferralContract } from '@/hooks/contracts/useReferralContract'
import { StopController } from '@/utils/StopController'

const getStorageInviterKey = (address: string) => `inviterBy:${address}`

export const useOwnInviter = createSharedComposable(() => {
  const isFetching = ref(false)
  const referralContract = useReferralContract()

  const inviterAddress = computedAsync(
    async (onCancel) => {
      const stopController = new StopController(onCancel)

      const { value: referralContractVal } = referralContract
      // TODO: signer может быть null
      const signerAddress = await referralContractVal?.signer?.getAddress()

      if (!signerAddress) {
        stopController.stop()
      }

      stopController.breakIfStoping()

      const storageKey = getStorageInviterKey(signerAddress)
      const storageValue = localStorage.getItem(storageKey)

      if (storageValue && isAddress(storageValue)) {
        return storageValue
      }

      const [inviterAddress] = await referralContract.value.functions.referrers(signerAddress)

      stopController.breakIfStoping()

      const isEmpty = inviterAddress === constants.AddressZero

      if (!isEmpty && isAddress(inviterAddress)) {
        localStorage.setItem(storageKey, inviterAddress)

        return inviterAddress
      }

      return '' //getReferrerFromCookies()
    },
    AddressZero,
    isFetching,
  )

  return { inviterAddress, isFetching }
})
