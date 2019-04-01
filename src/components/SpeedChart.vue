<template>
  <div>
    <!-- {{data}} -->
    <chart :options="options" :autoresize="true" style="width: 100%; height: 200px;"/>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts'

  export default {
    props: ['data',],
    components: {'chart': ECharts, },
    computed: {
      options() {
        let start = new Date()
        return {
          grid: {
            left: 0,
            right: 0,
            // top: 0,
            // bottom: 0,
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
                width: 2,
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              showMinLabel: true,
              showMaxLabel: true,
              color: '#fff',
            },
          },
          yAxis: [
            {show: false},
            {show: false},
          ],
          series: {
            type: 'line',
            symbol: 'none',
            step: 'middle',
            color: 'white',
            data: this.data.map(x => {
              return [+start.getTime() + x.totals.cdn.time, x.totals.cdn.speed + x.totals.pdn.speed]
            })
          },
        }
      },
    },
  }
</script>
