<template>
  <div>
    <div class="map">
      <base-world :data="peerList"/>
    </div>
  </div>
</template>

<style scoped>
  .map { left: 0; right: 0; bottom: 0; top: 0; position: fixed; z-index: 0; }
</style>


<script>
  import BaseWorld from '@/components/BaseWorld'

  export default {
    components: { BaseWorld, },
    props: ['peerList',],
    activated() {
      this.$store.dispatch('backgroundChange', '#404A58')
    },
  }
</script>
