<template>
  <div>
    <div>Balance: {{ledgerBalanceIncomeCurrent.toFixed(2)}}</div>
    <video id="video" autoplay controls muted playsinline style="width: 500px; height: auto;">
      <source id="video-source" type="application/x-mpegURL">
    </video>
    <h2>Transactions</h2>
    <div v-for="segment in onSegmentUploadedList" :key="segment.result.timestamp">
      {{segment.result.targetId}}, {{segment.result.size}}
    </div>
  </div>
</template>

<style scoped>

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
        tlprt: null,
        onLedgerPublicEventList: [],
        onSegmentUploadedList: [],
      }
    },
    mounted() {
      let mse = window.MediaSource ? true : false
      if (mse) {
        this.playerInit()
      } else {
        document.getElementById('video-source').src = "https://stream.teleport.media/hls/video.m3u8"
      }
    },
    computed: {
      ledgerBalanceIncomeList() {
        return this.onLedgerPublicEventList.filter(x => x.type == 'ledgerBalanceIncome').map(x => x.balance)
      },
      ledgerBalanceIncomeCurrent() {
        let ledgerBalanceList = this.onLedgerPublicEventList.filter(x => x.type == 'ledgerBalanceIncome')
        let last = ledgerBalanceList[ledgerBalanceList.length - 1]
        return (last && last.balance) || 0
      }
    },
    methods: {
      peeringModeChange() {
        if (window.tlprt) {
          window.tlprt.peeringMode = 1
        }
      },
      onLedgerPublicEvent(event) {
        console.log('onLedgerPublicEvent', event)
        this.onLedgerPublicEventList = [...this.onLedgerPublicEventList, event]
      },
      onSegmentUploaded(segment) {
        console.log(`onSegmentUploaded:`, segment);
        this.onSegmentUploadedList = [...this.onSegmentUploadedList, segment]
      },
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
          console.log('Teleport initialized.')
          console.log('Instance', instance)
          tlprt = instance;
          window.tlprt = instance;
          hls.loadSource(`https://cryptostream.teleport.media/hls/1/playlist.m3u8?k=${instance.publicKeyHash}`);
          tlprt.onPeeringModeChanged = (mode) => console.log(`onPeeringModeChanged: ${teleport.PeeringMode[mode]}`);
          tlprt.onPeerConnectionOpened = (peerId) => { console.log(`onPeerConnectionOpened: ${peerId}`) }
          tlprt.onPeerConnectionClosed = (peerId) => { console.log(`onPeerConnectionClosed: ${peerId}`) }
          tlprt.onSegmentLoaded = (segment) => console.log(`onSegmentLoaded:`, segment);
          tlprt.onSegmentUploaded = this.onSegmentUploaded
          tlprt.onLedgerPublicEvent = this.onLedgerPublicEvent
          tlprt.onPeerInfo = (e) => console.log('onPeerInfo', e)
          window.addEventListener("unload", function () {
            if (tlprt) {
              tlprt.dispose();
              tlprt = null;
            }
          });
          setInterval(() => {
            this.tlprt = {
              connectionId: instance.connectionId,
              publicKeyHash: instance.publicKeyHash,
              apiKey: instance.apiKey,
              getStatDetails: instance.getStatDetails(),
              peeringMode: instance.peeringMode,
            }
          }, 1000)
        })
      },
    }
  }
</script>
