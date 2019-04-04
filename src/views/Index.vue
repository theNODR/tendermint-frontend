<template>
  <div>
    <div class="layout" :style="{backgroundColor: $store.state.background}">
      <div class="header">
        <app-header/>
      </div>
      <div v-show="$route.path.match('account')">
        <div class="total">      
          <div class="indicator">
            {{statDetails && statDetails[0] && (statDetails[statDetails.length-1].totals.upload.size/(1024*1024*256)).toFixed(3) || 0}}
            <svg class="symbol" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM6.60376 8.10347L6.64518 13.7873H5.30329H4.72346V4.21282H5.5932L11.5323 10.0036L11.4909 4.21282H13.4043V13.7873H12.5346L6.60376 8.10347Z" fill="white"/> </svg>
          </div>
          <div class="label">Total Balance</div>
        </div>
        <div class="player">
          <app-player :statDetails="statDetails" :mediaSourceExtensions="supports.mediaSourceExtensions"/>
        </div>
      </div>
      <keep-alive>
        <router-view :data="peerList" :statDetails="statDetails" :mediaSourceExtensions="supports.mediaSourceExtensions"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<style scoped>
  .layout { width: 100vw; height: 100vh; overflow-y: scroll; }
  .total { margin: 20px auto; max-width: 500px; width: 100%; padding: 0 20px; color: white; }
  .indicator { font-size: 4rem; font-weight: 600; display: flex; line-height: .8; }
  .symbol { margin: 0 5px; }
  .label { font-size: 1.25rem; margin: 10px 0; font-weight: 500; }
  .header { width: 500px; max-width: 500px; width: 100%; z-index: 100; margin: 0 auto; position: relative; }
  .player { width: 500px; max-width: 500px; width: 100%; margin: 0 auto; }
</style>

<script>
  import { cloneDeep, groupBy, map, sortBy, reverse, isEqual, uniq, uniqBy, } from 'lodash'
  import axios from 'axios'
  import { formatBytes } from '@/shared'
  import AppPlayer from '@/components/AppPlayer'
  import AppHeader from '@/components/AppHeader'

  export default {
    components: { AppPlayer, AppHeader, },
    data: function() {
      return {
        statDetails: [],
        tlprt: null,
        connectionId: null,
        peerList: [],
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
        let STREAM_URL = "https://stream.teleport.media/hls/video.m3u8"
        let API_KEY = process.env.VUE_APP_API_KEY;
        let hls = new Hls();
        let video = document.getElementById('video')
        let flagUrlCleaner = /\/([0-9a-f]{1,})\.ts/
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play()
        })
        teleport.initialize({
          apiKey: API_KEY,
          loader: {
            type: "hlsjs",
            params: {
              hlsjs: hls,
              urlCleaner: (url) => {
                let _u = (new URL(url)).pathname;
                if (flagUrlCleaner.test(_u)) {
                  let _r = _u.match(flagUrlCleaner)
                  if (_r) return _r[1]
                }
                return _u
              }
            }
          }
        })
        .then((instance) => {
          tlprt = instance;
          window.tlprt = instance;
          hls.loadSource(`https://cryptostream.teleport.media/hls/1/playlist.m3u8?k=${instance.publicKeyHash}`);
          tlprt.onPeeringModeChanged = (mode) => console.log(`current peering mode: ${teleport.PeeringMode[mode]}`);
          tlprt.onPeerConnectionOpened = (peerId) => { console.log(`peer connected: ${peerId}`) }
          tlprt.onPeerConnectionClosed = (peerId) => { console.log(`peer disconnected: ${peerId}`) }
          tlprt.onSegmentLoaded = (segment) => console.log(`segment loaded:`, segment);
          tlprt.onSegmentUploaded = (segment) => console.log(`segment uploaded:`, segment);
          tlprt.onLedgerPublicEvent = (e) => console.log('onLedgerPublicEvent', e)
          tlprt.onPeerInfo = (e) => console.log('onPeerInfo', e)
          window.addEventListener("unload", function () {
            if (tlprt) {
              tlprt.dispose();
              tlprt = null;
            }
          });
        })
        setInterval(() => {
          if (tlprt) {
            this.statDetails.push(cloneDeep(tlprt.getStatDetails()))
            this.connectionId = tlprt.connectionId
            this.tlprt = tlprt
          }
        }, 1000)
      },
    }
  }
</script>
