import { POOLS_INFO } from '@/config/constants/Pools'
import { codec, prefetchVideo } from './cacheVideo'

export const prefetchPoolsVideo = () => {
  // Cache video [BEGIN]
  if (codec) {
    POOLS_INFO.forEach(({ page: { videoFolder } }) => prefetchVideo(videoFolder))
  }
  // Cache video [END]
}
