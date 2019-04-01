<template>
  <div>
    <div class="background">
      <keep-alive>
        <router-view :data="peerList" :statDetails="statDetails"/>
      </keep-alive>
    </div>
  </div>
</template>

<style scoped>
  .background { background-color: #3DBD29; width: 100vw; height: 100vh; overflow-y: scroll; }
</style>


<script>
  import { cloneDeep, groupBy, map, sortBy, reverse, isEqual, uniq, uniqBy, } from 'lodash'
  import axios from 'axios'
  import { formatBytes } from '@/shared'

  export default {
    data: function() {
      return {
        statDetails: [],
        tlprt: null,
        connectionId: null,
        peerList: [],
        peerListConnected: [],
        supports: {
          mediaSourceExtensions: null,
          hls: null,
        },
      }
    },
    mounted() {
      this.peerList = process.env.VUE_APP_API_RESPONSE ? JSON.parse(process.env.VUE_APP_API_RESPONSE).result : []
      this.supports.hls = document.getElementById('video') && document.getElementById('video').canPlayType('application/vnd.apple.mpegURL') ? true : false
      this.supports.mediaSourceExtensions = window.MediaSource ? true : false
      if (this.supports.mediaSourceExtensions) {
        this.playerInit()
      } else {
        document.getElementById('video-source').src = "https://stream.teleport.media/hls/video.m3u8"
      }
      setInterval(() => {
        axios.get(`https://api.teleport.media/demo/peerconnectionstat?apiKey=${process.env.VUE_APP_API_KEY}`)
          .then(({data}) => {
            if (!isEqual(this.peerList, data.result) && !process.env.VUE_APP_API_RESPONSE) {
              this.peerList = data.result
            }
          })
      }, 5000)
    },
    computed: {
      graphTable() {
        return map(this.peerList, (peer) => {
          return {
            source: peer.connection_id,
            target: peer.target_id,
            value: peer.pdn_size,
          }
        })
      },
      nodeTable() {
        return reverse(sortBy(map(groupBy(this.peerList, 'connection_id'), (k,v) => {
          return {
            connection_id: v,
            pdn_size: k.reduce((acc, val) => +acc + +val.pdn_size, 0)
          }
        }), 'pdn_size'))
      },
    },
    methods: {
      formatBytes,
      groupBy,
      map,
      playerInit() {
        let tlprt;
        let STREAM_URL = "https://stream.teleport.media/hls/video.m3u8";
        let API_KEY = process.env.VUE_APP_API_KEY;
          let hls = new Hls();
          let video = document.getElementById('video');
          hls.loadSource(STREAM_URL);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
          })
          teleport.initialize({
            apiKey: API_KEY,
            loader: {
              type: "hlsjs",
              params: {
                hlsjs: hls
              }
            }
          })
          .then((instance) => {
            tlprt = instance;
            tlprt.onPeerConnectionOpened = (peerId) => { 
              if (this.peerListConnected.indexOf(peerId) === -1) {
                this.peerListConnected.push(peerId);
              }
            }
            tlprt.onPeerConnectionClosed = (peerId) => {
              let index = this.peerListConnected.indexOf(peerId);
              if (index !== -1) {
                this.peerListConnected.splice(index, 1);
              }
            }
            window.addEventListener("unload", function () {
              if (tlprt) {
                tlprt.dispose();
                tlprt = null;
              }
            });
          })
          setInterval(() => {
            this.statDetails.push(cloneDeep(tlprt.getStatDetails()))
            this.connectionId = tlprt.connectionId
            this.tlprt = tlprt
          }, 1000)
      },
    }
  }
</script>
