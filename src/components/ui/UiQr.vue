<template>
  <div ref="canvas" />
</template>

<script lang="ts">
  import { defineComponent, onMounted, toRef, watch } from 'vue'
  import { templateRef } from '@vueuse/core'
  import QRCodeStyling, { Options } from 'qr-code-styling'

  const getQrOptions = (data: string): Partial<Options> => {
    return {
      width: 300,
      height: 300,
      type: 'canvas',
      data,
      image: '/favicon.ico',
      margin: 0,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'L',
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 1,
        margin: 0,
        crossOrigin: 'anonymous',
      },
      dotsOptions: {
        // color: '#000',
        gradient: {
          type: 'linear', // 'radial'
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#8688B2' },
            { offset: 1, color: '#77779C' },
          ],
        },
        type: 'dots',
      },
      backgroundOptions: {
        // color: '#fff',
        gradient: {
          type: 'linear', // 'radial'
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#ededff' },
            { offset: 1, color: '#e6e7ff' },
          ],
        },
      },
      cornersSquareOptions: {
        color: '#35495E',
        type: 'extra-rounded',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
        // },
      },
      cornersDotOptions: {
        color: '#35495E',
        type: 'dot',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
        // },
      },
    }
  }

  export default defineComponent({
    name: 'ui-qr',
    props: {
      data: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const canvasEl = templateRef<HTMLElement>('canvas')
      const qrCodeStyling = new QRCodeStyling(getQrOptions(props.data))

      onMounted(() => {
        qrCodeStyling.append(canvasEl.value)
      })

      watch(toRef(props, 'data'), (data) => {
        qrCodeStyling.update(getQrOptions(data))
      })
    },
  })
</script>
