<template>
  <div>
    <div class="layout">
      Stats
    </div>
  </div>
</template>

<style scoped>
  .layout { margin: 0 auto; max-width: 500px; width: 100%; padding: 0 20px; color: white; }
</style>

<script>
  export default {
    activated() {
      this.$store.dispatch('backgroundChange', '#0062FF')
    },
  }
</script>
