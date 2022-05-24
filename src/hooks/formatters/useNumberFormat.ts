import { numberFormat } from '@/utils/strFormat/numberFormat'
import { MaybeRef } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { computed, unref } from 'vue'

export const useNumberFormat = (
  bignumber: MaybeRef<BigNumber | number>,
  options: MaybeRef<Intl.NumberFormatOptions> = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 6,
  },
) => computed(() => numberFormat(unref(bignumber), unref(options)))
