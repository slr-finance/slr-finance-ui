import { createSharedComposable, useBreakpoints } from '@vueuse/core'

export const useAppBreakpoints = createSharedComposable(() => useBreakpoints({
    w300: 300,
    w350: 350,
    w380: 380,
    w480: 480,
    w580: 580,
    w641: 641,
    w875: 875,
    w980: 980,
    w1000: 1000,
    w1200: 1200,
  })
)
