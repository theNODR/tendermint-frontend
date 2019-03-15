<template>
  <div>
    <chart :options="options" style="width: 100%; height: 300px;"/>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts'
  import { formatBytes } from '@/shared'

  export default {
    props: ['data'],
    components: {'chart': ECharts, },
    computed: {
      options() {
        let start = new Date()
        return {
          grid: {
            left: '5%',
            right: '5%',
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false,
            },
          },
          yAxis: [
            {show: false},
            {show: false},
          ],
          series: [
            // {
            //   name: '123',
            //   type: 'line',
            //   symbol: 'none',
            //   yAxisIndex: 1,
            //   data: this.data.map(x => {
            //     return [+start.getTime() + x.totals.cdn.time, x.totals.cdn.speed]
            //   })
            // },
            {
              type:'line',
              stack: true,
              symbol: 'none',
              yAxisIndex: 0,
              itemStyle: {
                color: '#fff',
              },
              lineStyle: {
                width: 1,
                color: '#007df7',
                opacity: 1,
              },
              areaStyle: {
                color: '#007df7',
                opacity: 0,
              },
              // step: 'middle',
              name: 'cdn',
              data: this.data.map(x => {
                return [+start.getTime() + x.totals.cdn.time, x.totals.cdn.size]
              }),
              markLine: {
                silent: true,
                lineStyle: {
                  color: '#000',
                  width: 1,
                },
                symbol: 'none',
                label: {
                  formatter: (x) => formatBytes(x.value)
                },
                data: [
                  [{
                    type: 'max',
                    x: '5%',
                  },
                  {
                    type: 'max',
                    x: '90%',
                  }],
                ],
              },
            },
            {
              type: 'line',
              stack: true,
              yAxisIndex: 0,
              symbol: 'none',
              itemStyle: {
                color: '#007df7',
              },
              lineStyle: {
                width: 1,
                color: '#007df7',
              },
              areaStyle: {
                opacity: 0,
              },
              // step: 'middle',
              name: 'pdn',
              data: this.data.map(x => {
                return [+start.getTime() + x.totals.cdn.time, x.totals.pdn.size]
              })
            },
          ]
        }
      },
    },
  }
</script>
