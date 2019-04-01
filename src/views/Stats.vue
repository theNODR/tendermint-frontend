<template>
  <div>
    <div class="layout">
      <div class="header">
        <app-header/>
        <app-player :statDetails="statDetails"/>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<style scoped>
  .layout { display: flex; justify-content: center; }
  .header { width: 500px; max-width: 500px; width: 100%; }
</style>


<script>
  import AppHeader from '@/components/AppHeader'
  import AppPlayer from '@/components/AppPlayer'

  export default {
    components: { AppHeader, AppPlayer, },
    props: ['statDetails',],
  }
</script>
