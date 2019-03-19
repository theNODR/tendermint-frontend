<template>
  <div>
    <div id="map" style="height: 200px; overflow: hidden;"></div>
  </div>
</template>

<script>
  import leaflet from 'leaflet'

  export default {
    mounted() {
      let map = leaflet.map('map').setView([51.5, -0.09], 13);
      leaflet.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'osm',
        // accessToken: 'your.mapbox.access.token'
      }).addTo(map);
    }
  }
</script>
