<template>
  <div>
    <div class="layout">
      <div class="header">
        <app-header/>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .layout { display: flex; justify-content: center; }
  .header { width: 500px; max-width: 500px; width: 100%; }
</style>


<script>
  import AppHeader from '@/components/AppHeader'

  export default {
    components: { AppHeader, },
  }
</script>
