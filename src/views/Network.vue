<template>
  <div>
    <div class="layout">
      <div class="header">
        <app-header/>
      </div>
      <div class="map">
        <base-world :data="data"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .layout { display: flex; justify-content: center; }
  .header { width: 500px; max-width: 500px; width: 100%; z-index: 100; }
  .map { left: 0; right: 0; bottom: 0; top: 0; position: absolute; }
</style>


<script>
  import AppHeader from '@/components/AppHeader'
  import BaseWorld from '@/components/BaseWorld'

  export default {
    components: { AppHeader, BaseWorld, },
    props: ['data',],
  }
</script>
