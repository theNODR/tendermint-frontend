<template>
  <div>
    <div class="map">
      <base-world :data="data"/>
    </div>
  </div>
</template>

<style scoped>
  .map { left: 0; right: 0; bottom: 0; top: 0; position: fixed; z-index: 0; }
</style>


<script>
  import AppHeader from '@/components/AppHeader'
  import BaseWorld from '@/components/BaseWorld'

  export default {
    components: { AppHeader, BaseWorld, },
    props: ['data',],
  }
</script>
