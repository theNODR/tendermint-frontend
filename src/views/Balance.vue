<template>
  <div>
    <div class="layout">
      <div class="total">      
        <div class="indicator">
          {{statDetails && statDetails[0] && (statDetails[statDetails.length-1].totals.upload.size/(1024*1024*256)).toFixed(3)}}
          <svg class="symbol" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM6.60376 8.10347L6.64518 13.7873H5.30329H4.72346V4.21282H5.5932L11.5323 10.0036L11.4909 4.21282H13.4043V13.7873H12.5346L6.60376 8.10347Z" fill="white"/> </svg>
        </div>
        <div class="label">Total Balance</div>
      </div>
    </div>
    <div class="article-container">
      <div v-for="article in articleList" :key="article.title">
        <a :href="article.link">
          <div class="article" :style="{backgroundImage: `url(${article.thumbnail})`}">
            <div class="caption">{{article.title}}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .layout { margin: 0 auto; max-width: 500px; width: 100%; padding: 0 20px; color: white; }
  .total { margin: 20px 0; }
  .indicator { font-size: 4rem; font-weight: 600; display: flex; line-height: .8; }
  .symbol { margin: 0 5px; }
  .label { font-size: 1.25rem; margin: 10px 0; font-weight: 500; }
  .article-container { margin: 0 auto 20px; max-width: 500px; width: 100%; padding: 0 10px; }
  .article { height: 100px; background-size: cover; background-position-y: center; position: relative; margin-bottom: 10px; border-radius: 5px; }
  .caption { position: absolute; bottom: 0; background-color: rgba(0,0,0,.5); left: 0; right: 0; color: white; padding: 5px 10px; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; }
</style>

<script>
  import { formatBytes } from '@/shared'
  import axios from 'axios'

  export default {
    props: ['statDetails',],
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
