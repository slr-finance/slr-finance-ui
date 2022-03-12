import memoizee from 'memoizee'

export const fetchVideoAndCache = memoizee(
  async (videoFileUrl: string) => {
    const cache = await window.caches.open('slr-video-pre-cache')
    // Сначала проверяем, есть ли видео в кэше.
    const cacheResponse = await cache.match(videoFileUrl)

    // Вернем кэшированный ответ, если видео в кэше.
    if (cacheResponse) {
      return cacheResponse
    }

    // В противном случае получаем видео из сети.
    const networkResponse = await fetch(videoFileUrl)

    // Добавляем ответ в кэш и параллельно возвращаем ответ сети.
    await cache.put(videoFileUrl, networkResponse.clone())
    fetchVideoAndCache.delete(videoFileUrl)

    return networkResponse
  },
  { primitive: true },
)

export const playVideoFromCache = async (video: HTMLVideoElement, videoFileUrl: string) => {
  video.load()

  const response = await fetchVideoAndCache(videoFileUrl)
  const data = await response.clone().blob()

  video.src = URL.createObjectURL(data)
}
