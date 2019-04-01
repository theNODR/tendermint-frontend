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
  import AppHeader from '@/components/AppHeader'
  import AppPlayer from '@/components/AppPlayer'

  export default {
    components: { AppHeader, AppPlayer, },
    props: ['statDetails',],
  }
</script>
