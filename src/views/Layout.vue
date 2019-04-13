<template>
  <div>
    <div class="layout">
      <a href="https://nodr.io" target="_blank">
        <svg width="119" height="25" viewBox="0 0 119 25" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M113.457 24.3418L108.39 16.6897H105.226V24.3418H100.49V0.268799H107.791C110.769 0.268799 113.085 0.992644 114.74 2.44033C116.394 3.88803 117.201 5.87343 117.201 8.37586C117.201 9.86492 116.89 11.2506 116.27 12.5535C115.65 13.8564 114.698 14.8698 113.416 15.6143L119 24.3418H113.457ZM105.206 12.0985H108.577C109.859 12.0985 110.81 11.7262 111.389 10.961C111.968 10.2165 112.279 9.38925 112.279 8.52063C112.279 7.65202 112.03 6.82477 111.534 6.0182C111.038 5.21163 110.066 4.81868 108.618 4.81868H105.226V12.0985H105.206Z"/> <path d="M4.79806 24.4246L4.69465 10.1338L19.5025 24.4246H21.674V0.351562H16.8966L17 14.9112L2.17154 0.351562H0V24.4246H1.44769H4.79806Z"/> <path d="M88.5775 6.65932C87.6675 4.77732 86.2198 3.22622 84.2344 2.04739C82.249 0.868551 79.7259 0.268799 76.6444 0.268799H67.1724V4.81868H69.4473V19.7713H67.1724V24.3211L77.8232 24.3625C80.0361 24.3625 82.0422 23.8868 83.8828 22.9355C85.7235 21.9842 87.1919 20.6192 88.288 18.8613C89.3841 17.1034 89.9218 15.0559 89.9218 12.7396C89.9425 10.5681 89.4875 8.54132 88.5775 6.65932ZM82.8695 17.8479C81.4218 19.1095 79.4777 19.7506 77.0167 19.7506H74.204V4.798H78.0714C79.0021 4.798 80.0154 5.02549 81.0702 5.4598C82.1249 5.89411 83.0556 6.68 83.8415 7.81747C84.6274 8.95494 85.041 10.4854 85.041 12.388C85.041 14.7664 84.3172 16.5863 82.8695 17.8479Z"/> <path d="M44.7534 24.6107C51.5494 24.6107 57.0587 19.1014 57.0587 12.3054C57.0587 5.5093 51.5494 0 44.7534 0C37.9573 0 32.448 5.5093 32.448 12.3054C32.448 19.1014 37.9573 24.6107 44.7534 24.6107Z"/> </svg>
      </a>
      <p>NODR app lets you share unused bandwidth of smart devices and get paid.</p>
      <div class="player">
        <transition name="fade">
          <div class="splash" v-if="!loaded">
            <div class="splash__progress">
              <div class="splash__progress_bar"></div>
            </div>
          </div>
        </transition>
        <p v-if="mse">
          <span>Current balance: <strong>{{balance && balance.toFixed(2)}}</strong></span>
          <svg class="symbol" width="16" height="16" viewBox="0 0 18 18" fill="black" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM6.60376 8.10347L6.64518 13.7873H5.30329H4.72346V4.21282H5.5932L11.5323 10.0036L11.4909 4.21282H13.4043V13.7873H12.5346L6.60376 8.10347Z"/> </svg>
        </p>
        <p v-if="mse">Your ID: {{tlprt && tlprt.connectionId}}</p>
        <div class="video-container">
          <video class="video" id="video" autoplay controls muted playsinline>
            <source id="video-source" type="application/x-mpegURL">
          </video>
        </div>
        <div v-if="mse" class="indicators">
          <div>
            <span>Down: {{tlprt && formatBytes(tlprt.getStatDetails.totals.cdn.size + tlprt.getStatDetails.totals.pdn.size)}}</span>
            <i class="fas fa-cloud-download-alt"></i>
          </div>
          <div>
            <span>Up: {{tlprt && formatBytes(tlprt.getStatDetails.totals.upload.size)}}</span>
            <i class="fas fa-cloud-upload-alt"></i>
          </div>
        </div>
      </div>
      <p v-if="!mse">Oh, looks like your device doesn't support technologies required to connect to our network.</p>
      <div class="nav">
        <div :class="['nav__item', {'nav__item--active': mode == 'transactions'}]" @click="mode = 'transactions'" v-if="mse">Transactions</div>
        <div :class="['nav__item', {'nav__item--active': mode == 'peers'}]" @click="mode = 'peers'" v-if="mse">Peers</div>
        <div :class="['nav__item', {'nav__item--active': mode == 'console'}]" @click="mode = 'console'" v-if="mse">Console</div>
        <div :class="['nav__item', {'nav__item--active': mode == 'network'}]" @click="mode = 'network'">Network</div>
        <div :class="['nav__item', {'nav__item--active': mode == 'more'}]" @click="mode = 'more'">More</div>
      </div>
      <div v-if="mode == 'transactions'">
        <p v-if="unconfirmedIncomeList <= 0">There are no transactions yet. Give it a second.</p>
        <table v-if="unconfirmedIncomeList.length > 0">
          <thead>
            <tr>
              <th>Peer ID</th>
              <th style="text-align: right;">Data Uploaded</th>
              <th style="text-align: right;">Tokens Earned</th>
              <th style="text-align: center;">Confirmed</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table" v-for="(income, index) in unconfirmedIncomeList" :key="index">
              <td>{{income.cid}}</td>
              <td style="text-align: right;">{{formatBytes(income.volume, 0)}}</td>
              <td style="text-align: right;">{{income.tokens.toFixed(4)}}</td>
              <td style="text-align: center;">
                <i v-if="find(incomeCHannelCloseList, {'address': income.address})" class="im im-check-mark-circle"></i>
                <i v-else class="im im-circle-o"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="mode == 'peers'">
        <p v-if="peerListNow <= 0">No one is connected. Searching for peers...</p>
        <table v-if="peerListNow.length > 0">
          <thead>
            <tr>
              <th>Peer ID</th>
              <th style="text-align: right;">Download</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table" v-for="(peer, index) in peerListNow" :key="index">
              <td>{{peer.id}}</td>
              <td style="text-align: right;">{{peer.download.speed.toFixed(2)}} Mbps</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="mode == 'console'" class="console">
        <div class="console__item" v-for="(item, index) in console" :key="index">
          {{item}}
        </div>
      </div>
      <div v-if="mode == 'network'">
        <base-world :data="peerList" class="map"/>
      </div>
      <div v-if="mode == 'more'">
        <div class="subscribe">
          <div class="subscribe__text">Be the first to join!</div>
          <input type="email" class="subscribe__input" v-model="email" placeholder="Please, enter your email address">
          <div class="subscribe__button" @click="subscribeEmail">Join</div>
          <div class="subscribe__splash" v-if="emailSubmitted">
            <div>Thanks for joining! ✨</div>
          </div>
        </div>
        <a href="https://medium.com/nodr" target="_blank" class="more__item">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 24h-24v-24h24v24zm-4.03-5.649v-.269l-1.247-1.224c-.11-.084-.165-.222-.142-.359v-8.998c-.023-.137.032-.275.142-.359l1.277-1.224v-.269h-4.422l-3.152 7.863-3.586-7.863h-4.638v.269l1.494 1.799c.146.133.221.327.201.523v7.072c.044.255-.037.516-.216.702l-1.681 2.038v.269h4.766v-.269l-1.681-2.038c-.181-.186-.266-.445-.232-.702v-6.116l4.183 9.125h.486l3.593-9.125v7.273c0 .194 0 .232-.127.359l-1.292 1.254v.269h6.274z"/></svg>
          <div><strong>Read more on Medium</strong></div>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .layout { padding: 10px; }
  .player { position: relative; max-width: 500px; width: 100%; }
  .splash { position: absolute; display: flex; justify-content: center; align-items: center; padding: 10px 0; top: 0; left: 0; right: 0; bottom: 0; background: black; z-index: 100; border-radius: 5px; }
  .splash__progress { overflow: hidden; position: relative; width: 25%; box-shadow: 0 0 0 1px inset white; height: 8px; border-radius: 1000px; }
  .splash__progress_bar { width: 100%; height: 100%; background: white; transform: translateX(-100%); border-radius: inherit; animation: 60s ease-out progress forwards; }
  .video-container { width: 100%; max-width: 500px; overflow: hidden; }
  .video { object-fit: cover; width: 100%; height: 250px; }
  .symbol { margin: 0 .25em; vertical-align: middle; display: inline-block; line-height: 1; }
  table { border-collapse: separate; }
  thead tr th { text-align: left; }
  td, th { padding: 5px 10px 5px 0; vertical-align: top; }
  .im { font-size: 1em; }
  .fas { margin: 0 .25em; }
  .indicators { display: grid; grid-template-columns: 50% 50%; max-width: 500px; width: 100%; text-align: center; margin: 10px 0; }
  .nav { font-size: 1.75rem; margin: .5em 0; font-weight: 600; display: flex; flex-wrap: wrap; }
  .nav__item { margin: .25rem 1em .25rem 0; color: rgba(0,0,0,.25); cursor: pointer; display: inline-block; }
  .nav__item--active { color: black; }
  .console { background: black; color: white; font-family: 'Inconsolata', monospace; font-size: 1rem; padding: 5px; }
  .console__item { margin-bottom: 1em; }
  .map { height: 600px; border-radius: 5px; position: relative; }
  .more__item { display: grid; grid-template-columns: 35px 1fr; align-items: center; color: inherit; }
  .subscribe { overflow: hidden; width: 100%; max-width: 500px; margin: 10px 0; box-shadow: 0 0 0 1px inset black; border-radius: 5px; padding: 10px; position: relative; }
  .subscribe__text { font-weight: 600; }
  .subscribe__input { background-color: transparent; border: none; outline: none; font-size: inherit; font-family: inherit; width: 100%; margin: 10px 0 0; }
  .subscribe__button { background: black; color: white; font-weight: 700; right: 0; bottom: 0; position: absolute; margin: 10px; padding: 5px 10px; border-radius: 3px; }
  .subscribe__splash { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: black; color: white; display: flex; justify-content: center; align-items: center; }

  @media (max-width: 500px) {
    .indicators { text-align: left; }
  }

  @keyframes progress {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0); }
  }

  .fade-enter-active, .fade-leave-active { transition: 1s all; }
  .fade-leave { opacity: 1; }
  .fade-leave-to { opacity: 0; }
</style>

<script>
  import { reverse, isEqual, find, } from 'lodash'
  import axios from 'axios'
  import { formatBytes } from '@/shared'
  import BaseWorld from '@/components/BaseWorld'

  export default {
    components: { BaseWorld, },
    data: function() {
      return {
        tlprt: null,
        onLedgerPublicEventList: [],
        onSegmentUploadedList: [],
        peerListConnected: [],
        mse: null,
        peerList: [],
        loaded: null,
        mode: null,
        console: [],
        email: null,
        emailSubmitted: null,
      }
    },
    mounted() {
      this.console.unshift('Loading...')
      this.console.unshift('Reticulating splines...')
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
      const ledgerSocket = new WebSocket('ws://ledger-tendermint.nodr.io:2000')
      ledgerSocket.addEventListener('open', function (event) {
          ledgerSocket.send('Hello Server!')
      })

      ledgerSocket.addEventListener('message', function (event) {
          console.log('Message from server ', event.data)
      })
    },
    computed: {
      peerListNow() {
        let result = []
        if (this.peerListConnected.length > 0 && tlprt && tlprt.getStatDetails) {
          this.peerListConnected.forEach(peerId => {
            const found = find(this.tlprt.getStatDetails.details, {id: peerId})
            if (found) result.push(found)
          })
        }
        return result
      },
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
      subscribeEmail() {
        axios.post('https://api.hsforms.com/submissions/v3/integration/submit/5724892/8e21ff73-fa16-4c79-9d22-a0b473dab2aa', {
          fields: [{
            name: 'email',
            value: this.email,
          }],
        }).then(() => this.emailSubmitted = true)
      },
      peeringModeChange() {
        if (window.tlprt) {
          window.tlprt.peeringMode = 1
        }
      },
      onLedgerPublicEvent(event) {
        console.log('onLedgerPublicEvent', event)
        this.console.unshift(['onLedgerPublicEvent', event])
        this.onLedgerPublicEventList = [...this.onLedgerPublicEventList, event]
      },
      onSegmentUploaded(segment) {
        console.log(`onSegmentUploaded:`, segment);
        this.console.unshift([`onSegmentUploaded:`, segment]);
        this.onSegmentUploadedList = [...this.onSegmentUploadedList, segment]
      },
      onPeerConnectionOpened(peerId) {
        console.log(`onPeerConnectionOpened: ${peerId}`)
        this.console.unshift([`onPeerConnectionOpened: ${peerId}`])
        if (this.peerListConnected.indexOf(peerId) === -1) {
          this.peerListConnected.push(peerId);
        }
      },
      onPeerConnectionClosed(peerId) {
        console.log(`onPeerConnectionClosed: ${peerId}`)
        this.console.unshift([`onPeerConnectionClosed: ${peerId}`])
        let index = this.peerListConnected.indexOf(peerId);
        if (index !== -1) {
          this.peerListConnected.splice(index, 1);
        }
      },
      onSegmentLoaded(segment) {
        console.log(`onSegmentLoaded:`, segment)
        this.console.unshift([`onSegmentLoaded:`, segment])
      },
      onPeerInfo(e) {
        console.log('onPeerInfo', e)
        this.console.unshift(['onPeerInfo', e])
      },
      onPeeringModeChanged(mode) {
        console.log(`onPeeringModeChanged: ${teleport.PeeringMode[mode]}`)
        this.console.unshift([`onPeeringModeChanged: ${teleport.PeeringMode[mode]}`])
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
          setTimeout(() => {
            this.loaded = true
          }, 1000)
          tlprt = instance;
          window.tlprt = instance;
          hls.loadSource(`https://cryptostream.teleport.media/hls/1/playlist.m3u8?k=${instance.publicKeyHash}`);
          tlprt.onPeeringModeChanged = this.onPeeringModeChanged
          tlprt.onPeerConnectionOpened = this.onPeerConnectionOpened
          tlprt.onPeerConnectionClosed = this.onPeerConnectionClosed
          tlprt.onSegmentLoaded = this.onSegmentLoaded
          tlprt.onSegmentUploaded = this.onSegmentUploaded
          tlprt.onLedgerPublicEvent = this.onLedgerPublicEvent
          tlprt.onPeerInfo = this.onPeerInfo
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