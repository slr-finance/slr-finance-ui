import { createSharedComposable } from "@vueuse/core";
import { useBalance } from "./useBalance";
import contractsAddresses from '@/config/constants/contractsAddresses'

export const useSlrBalance = createSharedComposable(() => useBalance(contractsAddresses.SolarToken))
