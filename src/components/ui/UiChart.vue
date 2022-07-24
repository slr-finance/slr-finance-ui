<template>
  <div
    class="ui-chart"
    ref="root"
  >
  
  </div>
</template>

<script lang="ts">
  import type {IChartApi} from 'lightweight-charts'
  import { defineComponent, Ref } from 'vue'
  import { templateRef, useResizeObserver, watchOnce } from '@vueuse/core'

  const loadLightweightChatrs = async () => {
    const { ColorType, createChart, LineStyle } = await import('lightweight-charts') 

    return { ColorType, createChart, LineStyle }
  }

  export default defineComponent({
    name: 'ui-chart',
    setup() {
      const initChart = async (rootEl:HTMLElement) => {
        const { ColorType, createChart, LineStyle } = await loadLightweightChatrs()

        const chart = createChart(rootEl, {
          layout: {
            background: {
              type: ColorType.Solid,
              color: 'transparent',
            },
            textColor: '#525C67',
            fontSize: 12,
          },
          rightPriceScale: {
            borderColor: 'transparent',
          },
          grid: {
            horzLines: {
              style: LineStyle.Dashed,
              color: '#333333',
              visible: true,
            },
            vertLines: {
              visible: false,
            },
          },
        })

        return chart
      }

      if (!import.meta.env.SSR) {
        const rootRef = templateRef<HTMLElement>('root')
        let chart: IChartApi | undefined

        useResizeObserver(
          rootRef,
          ([
            {
              contentRect: { width, height },
            },
          ]) => {
            if (chart) {
              chart.resize(width, height)
            }
          },
        )
        watchOnce(rootRef, async (rootEl) => {
          if (!rootEl) {
            throw new Error('[ui-chart]: rootEl is null')
          }

          chart = await initChart(rootEl)

          const lineSeries = chart.addAreaSeries({
            lineColor: '#6D0DFC',
            lineWidth: 3,
            crosshairMarkerRadius: 4,
            topColor: 'rgba(109, 13, 252, 0.3)',
            bottomColor: 'rgba(109, 13, 252, 0)',
          })
          lineSeries.setData([
            { time: '2019-04-11', value: 0.2 },
            { time: '2019-04-12', value: 0.33 },
            { time: '2019-04-13', value: 0.34 },
            { time: '2019-04-14', value: 0.29 },
            { time: '2019-04-15', value: 0.43 },
            { time: '2019-04-16', value: 0.41 },
            { time: '2019-04-17', value: 0.63 },
            { time: '2019-04-18', value: 0.64 },
            { time: '2019-04-19', value: 0.89 },
            { time: '2019-04-20', value: 0.43 },
            { time: '2019-04-21', value: 0.83 },
            { time: '2019-04-22', value: 1.23 },
            { time: '2019-04-23', value: 1.43 },
          ])

          const rect = rootEl.getBoundingClientRect()

          chart.resize(rect.width, rect.height)
        })
      }
    },
  })
</script>
