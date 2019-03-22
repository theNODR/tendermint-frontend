<template>
  <div style="height: 100%;">
    <chart :options="options" :autoresize="true" style="height: 100%; width: 100%;"/>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts'
  import 'echarts/map/js/world.js'
  import { uniqBy, find, } from 'lodash'
  
  export default {
    props: ['data',],
    components: {'chart': ECharts, },
    computed: {
      // markerCount() {
      //   return uniqBy(this.data, peer => {
      //     return `${peer.latitude}, ${peer.longitude}`
      //   }).length
      // },
      // connectionCount() {
      //   return uniqBy(this.data, 'connection_id')
      // },
      markerList() {
        return uniqBy(this.data, peer => {
          return `${peer.latitude}, ${peer.longitude}`
        }).map(peer => {
          return {
            latitude: peer.latitude,
            longitude: peer.longitude,
          }
        })
      },
      lineList() {
        let result = []
        this.data.forEach(connection => {
          let target = find(this.data, {'connection_id': connection.target_id})
          if (!target) return
          result.push([
              [connection.longitude, connection.latitude],
              [target.longitude, target.latitude],
            ])
        })
        return result
      },
      options() {
        return {
          backgroundColor: '#404a59',
          geo: {
            type: 'map',
            zlevel: 0,
            map: 'world',
            roam: true,
            zoom: 3,
            silent: true,
            itemStyle: {
              normal: {
                areaColor: '#323c48',
                borderColor: '#111',
              },
            },
          },
          series: [{
            type: 'scatter',
            zlevel: 1,
            coordinateSystem: 'geo',
            data: uniqBy(this.data, peer => {
              return `${peer.latitude}, ${peer.longitude}`
            }).map(peer => {
              return [peer.longitude, peer.latitude, 1]
            })
          }, {
            type: 'lines',
            zlevel: 2,
            coordinateSystem: 'geo',
            lineStyle: {
              normal: {
                color: 'red',
                opacity: 0,
                curveness: .3,
              },
            },
            effect: {
              show: true,
              period: 7,
              trailLength: 0.1,
              symbolSize: 3,
            },
            blendMode: 'lighter',
            data: this.lineList,
          }],
        }
      },
    },
  }
</script>
