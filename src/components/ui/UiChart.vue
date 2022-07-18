<template>
  <div ref="root"></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ColorType, createChart, IChartApi, LineStyle } from 'lightweight-charts'
  import { templateRef, useResizeObserver, watchOnce } from '@vueuse/core'

  export default defineComponent({
    name: 'ui-chart',
    setup() {
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

      watchOnce(rootRef, (rootEl) => {
        if (!rootEl) {
          throw new Error('[ui-chart]: rootEl is null')
        }

        chart = createChart(rootEl, {
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
      })
    },
  })
</script>
