import { getProvider } from '@/utils/contracts/getProvider'
import { unrefWithFailback } from '@/utils/unrefWithFailback'
import { createSharedComposable } from '@vueuse/core'
import { computed } from 'vue'
import { useEthers } from './useEthers'

export const useSignerOrProvider = createSharedComposable(() => {
  const { signer } = useEthers()

  return computed(() => unrefWithFailback(signer, getProvider()))
})
