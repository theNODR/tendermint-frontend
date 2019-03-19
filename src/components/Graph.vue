<template>
  <div>
    <chart :options="options" :autoresize="true" style="width: 100%; height: 150px; background: #eee;"/>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import { map } from 'lodash'
  import 'echarts'
  import { formatBytes } from '@/shared'

  export default {
    props: ['data', 'edges',],
    components: {'chart': ECharts, },
    computed: {
      options() {
        let totalTraffic = this.edges.reduce((acc, val) => +acc + +val.value, 0)
        return {
          series: [
            {
              type: 'graph',
              // grid: {
              //   height: '50px',
              // },
              layout: 'force',
              roam: true,
              data: map(this.data, node => ({id: node.connection_id})),
              links: this.edges.map(node => {
                return {
                  ...node,
                  lineStyle: {
                    // color: '#000',
                    opacity: 1,//+node.value / totalTraffic
                  },
                }
              }),
            },
          ],
        }
      },
    },
  }
</script>
