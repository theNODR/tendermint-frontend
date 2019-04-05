<template>
  <div>
    <div class="layout" :style="{backgroundColor: $store.state.background}">
      <div class="header center padding">
        <app-header/>
      </div>
      <div v-show="$route.path.match('account')">
        <div class="center padding">
          <div class="total">      
            <div class="indicator">
              {{balance && balance.toFixed(2)}}
              <svg class="symbol" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM6.60376 8.10347L6.64518 13.7873H5.30329H4.72346V4.21282H5.5932L11.5323 10.0036L11.4909 4.21282H13.4043V13.7873H12.5346L6.60376 8.10347Z" fill="white"/> </svg>
            </div>
            <div class="label">Total Balance</div>
          </div>
        </div>
        <div class="center" style="padding: 0 10px;">
          <app-player :show="mse" :indicator="tlprt && [tlprt.getStatDetails.totals.cdn.size, tlprt.getStatDetails.totals.upload.size]"/>
        </div>
        <div class="center padding">
          <h2>Transactions</h2>
          <div class="transaction" v-for="(income, index) in unconfirmedIncomeList" :key="index">
            <div>{{income.cid}}</div>
            <div style="display: flex; align-items: center;">
              <span style="padding-right: 10px;">{{income.tokens.toFixed(4)}}</span>
              <svg v-if="find(incomeCHannelCloseList, {'address': income.address})" fill="white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="white" width="20" height="20" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"/></svg>
            </div>
          </div>
        </div>
        <!-- <div class="center padding">
          <h2>Transactions</h2>
          <div class="transaction" v-for="segment in onSegmentUploadedList" :key="segment.result.timestamp">
            <div>{{segment.result.targetId}}</div>
            <div>{{formatBytes(segment.result.size, 0)}}</div>
          </div>
        </div> -->
      </div>
      <router-view :peerList="peerList"/>
    </div>
  </div>
</template>

<style scoped>
  .layout { width: 100vw; height: 100vh; overflow-y: scroll; }
  .header { z-index: 100; position: relative; }
  .center { margin: 20px auto; max-width: 500px; width: 100%; }
  .padding { padding: 0 10px; }
  .total { margin: 20px auto; max-width: 500px; width: 100%; color: white; }
  .indicator { font-size: 4rem; font-weight: 600; display: flex; line-height: .8; }
  .symbol { margin: 0 5px; }
  .label { font-size: 1.25rem; margin: 10px 0; font-weight: 500; }
  .transaction { margin: 10px 0; display: flex; justify-content: space-between; font-size: 1.25rem; }
</style>

<script>
  import { cloneDeep, groupBy, map, sortBy, reverse, isEqual, uniq, uniqBy, find, } from 'lodash'
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
        mse: null,
        peerList: [],
      }
    },
    mounted() {
      this.mse = window.MediaSource ? true : false
      if (this.mse) {
        this.playerInit()
      } else {
        document.getElementById('video-source').src = "https://stream.teleport.media/hls/video.m3u8"
      }
      this.$store.dispatch('backgroundChange', '#3DBD29')
      setInterval(() => {
        axios.get(`https://api.teleport.media/demo/peerconnectionstat?apiKey=${process.env.VUE_APP_API_KEY}`)
          .then(({data}) => {
            if (process.env.VUE_APP_API_RESPONSE) {
              this.peerList = JSON.parse(process.env.VUE_APP_API_RESPONSE).result
              return
            }
            if (!isEqual(this.peerList, data.result)) {
              this.peerList = data.result
            }
          })
      }, 1000)
    },
    computed: {
      ledgerBalanceIncomeList() {
        return this.onLedgerPublicEventList.filter(x => {
          return x.type == 'ledgerBalanceIncome' && x.balance > 0
        }).map(x => x.balance)
      },
      ledgerBalanceIncomeCurrent() {
        let ledgerBalanceList = this.onLedgerPublicEventList.filter(x => x.type == 'ledgerBalanceIncome')
        let last = ledgerBalanceList[ledgerBalanceList.length - 1]
        return (last && last.balance) || 0
      },
      confirmedIncomeList() {
        return this.unconfirmedIncomeList.filter(income => find(this.incomeCHannelCloseList, {'address': income.address}))
      },
      balance() {
        return this.confirmedIncomeList.reduce((acc, val) => acc + val.tokens, 0)
      },
      unconfirmedIncomeList() {
        let list = this.onLedgerPublicEventList.filter(x => x.type == 'unconfirmedIncome')
        return reverse(list)
      },
      incomeCHannelCloseList() {
        let list = this.onLedgerPublicEventList.filter(x => x.type == 'incomeCHannelClose')
        return list        
      },
    },
    methods: {
      find,
      formatBytes,
      reverse,
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
