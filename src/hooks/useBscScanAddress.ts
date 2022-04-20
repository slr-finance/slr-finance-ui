import { computed, Ref } from 'vue'
import { CHAIN_ID, NETWORK_DETAILS } from '@/config/constants/chain'

export const useBscScanAddress = (address: Ref<string>) => {
  return computed(() => `${NETWORK_DETAILS[CHAIN_ID].blockExplorerUrls[0]}address/${address.value}`)
}
