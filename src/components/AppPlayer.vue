<template>
  <div>
    <div class="player">
      <video id="video" autoplay controls muted playsinline style="width: 100%; height: auto;">
        <source id="video-source" type="application/x-mpegURL">
      </video>
      <div v-if="mediaSourceExtensions" class="indicators">
        <div class="indicators__item">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16 6.66667C20.604 6.66667 23.8547 10.396 23.4227 15.7067C25.7493 15.6453 29.3333 16.708 29.3333 20.6667C29.3333 23.24 27.24 25.3333 24.6667 25.3333H7.33333C4.76 25.3333 2.66667 23.24 2.66667 20.6667C2.66667 16.9373 5.972 15.556 8.57733 15.7067C8.35467 10.0827 11.5213 6.66667 16 6.66667ZM16 4C10.6587 4 6.31067 8.188 6.028 13.456C2.60133 14.0733 0 17.064 0 20.6667C0 24.716 3.284 28 7.33333 28H24.6667C28.716 28 32 24.716 32 20.6667C32 17.064 29.3987 14.0733 25.972 13.456C25.6893 8.188 21.3413 4 16 4ZM10.6667 17.3333H14.6667V12H17.3333V17.3333H21.3333L16 22.6667L10.6667 17.3333Z" fill="black"/> </svg>
          <div>{{statDetails && statDetails[0] && formatBytes(statDetails[statDetails.length-1].totals.cdn.size+statDetails[statDetails.length-1].totals.pdn.size)}}</div>
        </div>
        <div class="indicators__item">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16 6.66667C20.604 6.66667 23.8547 10.396 23.4227 15.7067C25.7493 15.6453 29.3333 16.708 29.3333 20.6667C29.3333 23.24 27.24 25.3333 24.6667 25.3333H7.33333C4.76 25.3333 2.66667 23.24 2.66667 20.6667C2.66667 16.9373 5.972 15.556 8.57733 15.7067C8.35467 10.0827 11.5213 6.66667 16 6.66667ZM16 4C10.6587 4 6.31067 8.188 6.028 13.456C2.60133 14.0733 0 17.064 0 20.6667C0 24.716 3.284 28 7.33333 28H24.6667C28.716 28 32 24.716 32 20.6667C32 17.064 29.3987 14.0733 25.972 13.456C25.6893 8.188 21.3413 4 16 4ZM21.3333 17.3333H17.3333V22.6667H14.6667V17.3333H10.6667L16 12L21.3333 17.3333Z" fill="black"/> </svg>
          <div>{{statDetails && statDetails[0] && formatBytes(statDetails[statDetails.length-1].totals.upload.size)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .player { background: white; padding: 10px; margin: 10px; border-radius: 10px; box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.15); }
  video { border-radius: 5px; }
  .indicators { display: flex; }
  .indicators__item { display: flex; flex-direction: column; flex-grow: 1; align-items: center; margin: 10px 0 5px; font-weight: 500; font-size: 1.25rem; line-height: 1.5; }
</style>

<script>
  import { formatBytes } from "@/shared"

  export default {
    props: ['statDetails', 'mediaSourceExtensions',],
    methods: {
      formatBytes,
    },
  }
</script>
