<template>
  <div>
    <div class="layout">
    </div>
  </div>
</template>

<style scoped>
  .layout { margin: 0 auto; max-width: 500px; width: 100%; padding: 0 20px; color: white; }
  /* .total { margin: 20px 0; }
  .indicator { font-size: 4rem; font-weight: 600; display: flex; line-height: .8; }
  .symbol { margin: 0 5px; }
  .label { font-size: 1.25rem; margin: 10px 0; font-weight: 500; } */
  .article-wrapper { padding: 10px; }
  .article-container { background: white; margin: 0 auto 20px; max-width: 500px; width: 100%; padding: 10px; border-radius: 10px; }
  .article { display: block; height: 100px; background-size: cover; background-position-y: center; position: relative; margin-bottom: 10px; border-radius: 5px; }
  .article:last-child { margin-bottom: 0; }
  .caption { position: absolute; bottom: 0; background-color: rgba(0,0,0,.5); left: 0; right: 0; color: white; padding: 5px 10px; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; }
</style>

<script>
  import { formatBytes } from '@/shared'
  import axios from 'axios'
  import AppPlayer from '@/components/AppPlayer'

  export default {
    props: ['statDetails',],
    components: { AppPlayer, },
    data: function() {
      return {
        articleList: null,
      }
    },
    activated() {
      this.$store.dispatch('backgroundChange', '#3DBD29')
    },
    async created() {
      this.articleList = (await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fnodr&api_key=po2b9f3eag9dtis32bwdt7kdf1ihebxj7macacto')).data.items
    },
    methods: {
      formatBytes,
    },
  }
</script>
