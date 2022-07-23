const fetchPromises = new Map<string, Promise<Response>>()

const checkSupportedVideoCodec = () => {
  if (import.meta.env.SSR) {
    return undefined
  }

  const testVideoEl = document.createElement('video')

  const codecs = [
    {
      name: 'vp9',
      type: 'video/webm; codecs="vp9, vorbis"',
      extension: 'webm',
    },
    {
      name: 'vp8',
      type: 'video/webm; codecs="vp8, vorbis"',
      extension: 'webm',
    },
    {
      name: 'h264',
      type: 'video/mp4; codecs="avc1.42E01E"',
      extension: 'mp4',
    },
  ]

  const availableCodec = codecs.find((codec) => testVideoEl.canPlayType(codec.type) !== '')

  return availableCodec
}

export const codec = checkSupportedVideoCodec()

export const prefetchVideo = async (folderPath: string) => {  
  if (!codec) {
    throw new Error()
  }

  const videoFileUrl = `${folderPath}/${codec.name}.${codec.extension}`

  if (fetchPromises.has(videoFileUrl)) {
    return fetchPromises.get(videoFileUrl) as Promise<Response>
  } else {
    const promise = fetchVideoAndCache(videoFileUrl)

    fetchPromises.set(videoFileUrl, promise)

    const response = await promise

    fetchPromises.delete(videoFileUrl)

    return response
  }
}

const fetchVideoAndCache = async (videoFileUrl: string) => {
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

  return networkResponse
}

export const playVideoFromCache = async (video: HTMLVideoElement, videoFileUrl: string) => {
  video.load()

  const response = await prefetchVideo(videoFileUrl)
  const data = await response.clone().blob()

  video.src = URL.createObjectURL(data)
}
