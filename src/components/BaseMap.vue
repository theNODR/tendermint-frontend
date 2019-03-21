<template>
  <div>
    <div id="map" style="height: 200px; overflow: hidden;"></div>
  </div>
</template>

<script>
  import leaflet from 'leaflet'
  import { uniqBy, find, } from 'lodash'

  export default {
    props: ['data'],
    data: function() {
      return {
        map: null,
      }
    },
    computed: {
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
              [connection.latitude, connection.longitude],
              [target.latitude, target.longitude],
          ])
        })
        return result
      },
    },
    watch: {
      data: {
        handler(newVal, oldVal) {
          this.markerList.forEach(node => {
            new leaflet.marker([node.latitude, node.longitude]).addTo(this.map)
          })
          new leaflet.polyline(this.lineList).addTo(this.map)
        },
      }
    },
    mounted() {
      this.map = leaflet.map('map').setView([51.5, -0.09], 2);
      leaflet.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        maxZoom: 18,
        id: 'osm',
      }).addTo(this.map);
    }
  }
</script>
