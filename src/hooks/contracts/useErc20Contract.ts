import type { MaybeRef } from '@vueuse/core'
import { computed, markRaw, unref } from 'vue'
import { ERC20__factory } from '@slr-finance/contracts'
import { useSignerOrProvider } from '@/hooks/dapp/useSignerOrProvider'

export const useErc20Contract = (tokenAddress: MaybeRef<string>) => {
  const signerOrProvider = useSignerOrProvider()

  const erc20Contract = computed(() => markRaw(ERC20__factory.connect(unref(tokenAddress), signerOrProvider.value)))

  return erc20Contract
}
