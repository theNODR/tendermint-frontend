<template>
  <div>
    <div class="layout">
      <div class="header">Download Speed: {{statDetails && statDetails[0] && statDetails[statDetails.length-1].totals.cdn.speed}} Mbps</div>
      <speed-chart :data="statDetails"/>
      <!-- <div class="speed-container">
        <div class="speedometer">
          {{statDetails[statDetails.length-1].totals.cdn.speed}}
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
  .layout { margin: 0 auto; max-width: 500px; width: 100%; padding: 0 20px; color: white; }
  .header { font-size: 1.25rem; font-weight: 500; margin-top: 50px; }
  /* .speed-container { display: flex; justify-content: center; margin: 20px 0; }
  .speedometer { border-radius: 1000px; box-shadow: 0 0 0 0 2px white; } */
</style>

<script>
  import SpeedChart from '@/components/SpeedChart'

  export default {
    props: ['statDetails',],
    components: { SpeedChart, },
    activated() {
      this.$store.dispatch('backgroundChange', '#0062FF')
    },
  }
</script>
