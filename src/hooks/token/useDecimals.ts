import { getErc20Contract } from '@/utils/contracts/getErc20Contract'
import { MaybeRef } from '@vueuse/core'
import { isAddress } from 'ethers/lib/utils'
import { Ref, ref, unref, watch } from 'vue'

export type UseDecimalsReturns = [Ref<number>, Ref<boolean>]

export const useDecimals = (tokenAddress: MaybeRef<string>): UseDecimalsReturns => {
  const decimal = ref(0)
  const isFetching = ref(false)

  const fetchDecimal = async () => {
    try {
      const tokenAddressVal = unref(tokenAddress)

      if (!isAddress(tokenAddressVal)) {
        if (tokenAddressVal) {
          throw new Error()
        } else {
          isFetching.value = false
          decimal.value = 0

          return
        }
      }

      isFetching.value = false
      decimal.value = 0

      const responce = await getErc20Contract(tokenAddressVal).decimals()

      decimal.value = responce
    } catch (error) {
      throw error
    } finally {
      isFetching.value = false
    }
  }

  watch(() => tokenAddress, fetchDecimal, { immediate: true })

  return [decimal, isFetching]
}
