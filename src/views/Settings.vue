<template>
  <div>
    <div class="layout">
      <div class="row">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5 2C3.346 2 2 3.346 2 5V19C2 20.654 3.346 22 5 22H19C20.654 22 22 20.654 22 19V5C22 3.346 20.654 2 19 2H5ZM24 5V19C24 21.761 21.762 24 19 24H5C2.238 24 0 21.761 0 19V5C0 2.239 2.238 0 5 0H19C21.762 0 24 2.239 24 5Z" fill="white"/></svg>
        <div class="row__text">Upload to peers</div>
      </div>
      <div class="row">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5 2C3.346 2 2 3.346 2 5V19C2 20.654 3.346 22 5 22H19C20.654 22 22 20.654 22 19V5C22 3.346 20.654 2 19 2H5ZM24 5V19C24 21.761 21.762 24 19 24H5C2.238 24 0 21.761 0 19V5C0 2.239 2.238 0 5 0H19C21.762 0 24 2.239 24 5Z" fill="white"/></svg>
        <div class="row__text">Download from peers</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .layout { margin: 0 auto; max-width: 500px; width: 100%; padding: 0 20px; color: white; }
  .row { margin: 20px 0; font-size: 1.25rem; color: white; font-weight: 500; display: flex; align-items: center; }
  .row__text { margin-left: 10px; }
</style>

<script>
  import SpeedChart from '@/components/SpeedChart'

  export default {
    props: ['statDetails', 'mediaSourceExtensions',],
    components: { SpeedChart, },
    activated() {
      this.$store.dispatch('backgroundChange', '#E4005D')
    },
  }
</script>
