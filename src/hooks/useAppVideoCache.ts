import { playVideoFromCache } from "@/utils/video/cacheVideo"
import { MaybeRef } from "@vueuse/core"
import { watch, ref, unref } from "vue"

export const useAppVideoCache = (videoFileUrlRef: MaybeRef<string>, isShownRef:MaybeRef<boolean> = true) => {
  const videoRef = ref<HTMLVideoElement>()

  watch(
    <const>[
      videoRef,
      () => unref(isShownRef),
      () => unref(videoFileUrlRef),
    ],
    ([video, isShown, videoFileUrl]) => {
      if (video && isShown && videoFileUrlRef) {
        playVideoFromCache(video, videoFileUrl)
      }
    },
    { immediate: true },
  )

  return { videoRef }
}