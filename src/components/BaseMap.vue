<template>
  <div>
    <div id="map" style="height: 100vh; overflow: hidden;"></div>
  </div>
</template>

<script>
  import leaflet from 'leaflet'
  import { uniqBy, find, } from 'lodash'

  const iconSVG = `
<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="9.5" cy="9.5" r="9.5" fill="#0062FF"/>
  <circle cx="9.5" cy="9.5" r="6.5" fill="white"/>
</svg>
  `

  export default {
    props: ['data'],
    data: function() {
      return {
        map: null,
        layerGroup: null,
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
          // this.map = leaflet.map('map').setView([51.5, -0.09], 2);
          // leaflet.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
          //   maxZoom: 18,
          //   id: 'osm',
          // }).addTo(this.map);
          let icon = leaflet.icon({
            iconUrl: 'data:image/svg+xml;base64,' + btoa(iconSVG),
            iconSize: [19,19],
          })
          let markerList = this.markerList.map(node => new leaflet.marker([node.latitude, node.longitude], {icon}))
          this.layerGroup = leaflet.layerGroup(markerList).addTo(this.map)
          new leaflet.polyline(this.lineList).addTo(this.map)
        },
      }
    },
    mounted() {
      this.map = leaflet.map('map').setView([51.5, -0.09], 3);
      leaflet.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        maxZoom: 18,
        id: 'osm',
      }).addTo(this.map);
    }
  }
</script>
