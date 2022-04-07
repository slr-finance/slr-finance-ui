<template>
  <div
    class="ui-qr flex justify-center items-center overflow-hidden select-none"
    ref="canvas"
  />
</template>

<script lang="ts">
  import { defineComponent, onMounted, toRef, watch } from 'vue'
  import { templateRef } from '@vueuse/core'
  import QRCodeStyling, { Options } from 'qr-code-styling'

  const getQrOptions = (data: string): Partial<Options> => {
    const options: Partial<Options> = {
      width: 600,
      height: 600,
      type: 'canvas',
      data,
      image: '/images/qr-code-logo.jpg',
      margin: 8,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'L',
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 1.5,
        margin: 0,
        crossOrigin: 'anonymous',
      },
      dotsOptions: {
        color: '#000',
        type: 'rounded',
      },
      backgroundOptions: {
        color: '#fff',
      },
      cornersSquareOptions: {
        color: '#000',
        type: 'extra-rounded',
      },
      cornersDotOptions: {
        color: '#000',
        type: 'dot',
      },
    }

    return options
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

<style>
  .ui-qr > canvas {
    width: 100%;
  }
</style>
