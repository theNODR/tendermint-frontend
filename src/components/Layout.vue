<template>
  <div class="layout">
    <div class="account">Account</div>
    <div class="user-profile">
      <div class="logo">
        <svg height="25" viewBox="0 0 155 32" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M147.522 31.6504L140.934 21.7008H136.82V31.6504H130.662V0.349548H140.154C144.027 0.349548 147.038 1.29072 149.19 3.17308C151.341 5.05543 152.39 7.63694 152.39 10.8907C152.39 12.8269 151.986 14.6285 151.18 16.3227C150.373 18.0168 149.136 19.3344 147.469 20.3025L154.729 31.6504H147.522ZM136.793 15.7311H141.176C142.843 15.7311 144.08 15.247 144.833 14.2521C145.586 13.284 145.99 12.2084 145.99 11.079C145.99 9.94955 145.667 8.87392 145.022 7.82518C144.376 6.77644 143.112 6.26551 141.23 6.26551H136.82V15.7311H136.793Z"/> <path d="M6.23865 31.758L6.1042 13.1765L25.358 31.758H28.1815V0.457153H21.9697L22.1042 19.3882L2.82353 0.457153H0V31.758H1.88235H6.23865Z"/> <path d="M115.172 8.65879C113.989 6.21173 112.107 4.19492 109.525 2.66215C106.944 1.12937 103.663 0.349548 99.6563 0.349548H87.3403V6.26551H90.2983V25.7075H87.3403V31.6235L101.189 31.6773C104.066 31.6773 106.675 31.0588 109.068 29.8218C111.461 28.5848 113.371 26.81 114.796 24.5243C116.221 22.2386 116.92 19.5764 116.92 16.5647C116.947 13.7411 116.355 11.1058 115.172 8.65879ZM107.75 23.2067C105.868 24.847 103.34 25.6806 100.14 25.6806H96.4832V6.23862H101.512C102.722 6.23862 104.039 6.53442 105.411 7.09912C106.782 7.66383 107.992 8.68568 109.014 10.1647C110.036 11.6437 110.574 13.6336 110.574 16.1075C110.574 19.2 109.633 21.5664 107.75 23.2067Z"/> <path d="M58.1902 32C67.0267 32 74.1902 24.8366 74.1902 16C74.1902 7.16344 67.0267 0 58.1902 0C49.3536 0 42.1902 7.16344 42.1902 16C42.1902 24.8366 49.3536 32 58.1902 32Z"/> </svg>
      </div>
      <div class="pane">
        <video id="video" autoplay controls muted style="width: 100%;"></video>
        <div class="indicators">
          <div class="indicators__item indicators__item--highlight">
            <div class="indicators__item__label">
              <div style="margin-right: 10px;">Upload</div>
              <div><svg width="20" height="20" viewBox="0 0 32 32" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M21.3333 21.3333H17.3333V28H14.6667V21.3333H10.6667L16 16L21.3333 21.3333ZM25.972 13.456C25.6893 8.188 21.3413 4 16 4C10.6587 4 6.31067 8.188 6.028 13.456C2.60133 14.0733 0 17.064 0 20.6667C0 24.716 3.284 28 7.33333 28H12V25.3333H7.33333C4.76 25.3333 2.66667 23.24 2.66667 20.6667C2.66667 16.9373 5.972 15.556 8.57733 15.7067C8.35467 10.0827 11.5213 6.66667 16 6.66667C20.604 6.66667 23.8547 10.396 23.4227 15.7067C25.7493 15.6453 29.3333 16.708 29.3333 20.6667C29.3333 23.24 27.24 25.3333 24.6667 25.3333H20V28H24.6667C28.716 28 32 24.716 32 20.6667C32 17.064 29.3987 14.0733 25.972 13.456Z"/></svg></div>
            </div>
            <div class="indicators__item__value">
              {{tlprt.length > 0 && formatBytes(tlprt[tlprt.length-1].totals.upload.size)}}
            </div>
          </div>
          <!-- <div class="indicators__item">
            <div class="indicators__item__label">
              <div>My ID</div>
              <div><svg width="24" height="24" viewBox="0 0 28 28" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M14 0C6.2685 0 0 6.2685 0 14C0 21.7315 6.2685 28 14 28C21.7315 28 28 21.7315 28 14C28 6.2685 21.7315 0 14 0ZM23.0452 21.3558C22.7407 20.6722 22.1247 20.1997 20.8623 19.908C18.1872 19.2908 15.6963 18.7495 16.9038 16.4722C20.573 9.53983 17.8757 5.83333 14 5.83333C10.0473 5.83333 7.41533 9.68217 11.0962 16.4722C12.3398 18.7635 9.75683 19.3037 7.13767 19.908C5.873 20.1997 5.26167 20.6757 4.9595 21.3617C3.32033 19.3515 2.33333 16.7895 2.33333 14C2.33333 7.567 7.567 2.33333 14 2.33333C20.433 2.33333 25.6667 7.567 25.6667 14C25.6667 16.7872 24.6808 19.3468 23.0452 21.3558Z"/></svg></div>
            </div>
            <div class="indicators__item__value">
              {{connectionId && connectionId.slice(0,8)}}
            </div>
          </div> -->
          <div class="indicators__item">
            <div class="indicators__item__label">
              <div style="margin-right: 10px;">Teleport</div>
              <div><svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M8 20H11V15H13V20H16L12 24L8 20ZM19.479 7.092C19.267 3.141 16.006 0 12 0C7.994 0 4.733 3.141 4.521 7.092C1.951 7.555 0 9.798 0 12.5C0 15.537 2.463 18 5.5 18H9V16H5.5C3.57 16 2 14.43 2 12.5C2 9.703 4.479 8.667 6.433 8.78C6.266 4.562 8.641 2 12 2C15.453 2 17.891 4.797 17.567 8.78C19.312 8.734 22 9.531 22 12.5C22 14.43 20.43 16 18.5 16H15V18H18.5C21.537 18 24 15.537 24 12.5C24 9.798 22.049 7.555 19.479 7.092V7.092Z"/></svg></div>
            </div>
            <div class="indicators__item__value">
              {{tlprt.length > 0 && formatBytes(tlprt[tlprt.length-1].totals.pdn.size)}}
            </div>
          </div>
          <div class="indicators__item">
            <div class="indicators__item__label">
              <div style="margin-right: 10px;">CDN</div>
              <div><svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M8 20H11V15H13V20H16L12 24L8 20ZM19.479 7.092C19.267 3.141 16.006 0 12 0C7.994 0 4.733 3.141 4.521 7.092C1.951 7.555 0 9.798 0 12.5C0 15.537 2.463 18 5.5 18H9V16H5.5C3.57 16 2 14.43 2 12.5C2 9.703 4.479 8.667 6.433 8.78C6.266 4.562 8.641 2 12 2C15.453 2 17.891 4.797 17.567 8.78C19.312 8.734 22 9.531 22 12.5C22 14.43 20.43 16 18.5 16H15V18H18.5C21.537 18 24 15.537 24 12.5C24 9.798 22.049 7.555 19.479 7.092V7.092Z"/></svg></div>
            </div>
            <div class="indicators__item__value">
              {{tlprt.length > 0 && formatBytes(tlprt[tlprt.length-1].totals.cdn.size)}}
            </div>
          </div>
        </div>
      </div>
      <div class="chart">
        <chart :data="tlprt"/>
      </div>
    </div>
    <div class="node-list">
      <div class="h1">
        Node Rating
      </div>
      <div class="table table--thead">
        <div class="th">User</div>
        <div class="th">Upload</div>
        <div class="th">Tokens</div>
      </div>
      <div class="table" v-for="peer in nodeTable" :key="peer.connection_id">
        <div class="td">{{peer.connection_id.slice(0,6)}}</div>
        <div class="td">{{formatBytes(peer.pdn_size)}}</div>
        <div class="td">{{(peer.pdn_size/500000).toFixed(2)}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .layout { display: grid; grid-template-columns: 2fr 3fr; height: 100vh; }
  .logo { padding: 20px 50px; display: flex; justify-content: flex-start; }
  .pane { box-shadow: 0px 4px 16px rgba(48, 80, 109, 0.15); border-radius: 0 0 10px 10px; margin: 0 50px; }
  .indicators { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px 4px; }
  .indicators__item { padding: 10px 20px; overflow-x: hidden; }
  .indicators__item__label { display: flex; align-items: center; justify-content: flex-start; opacity: .5; text-transform: uppercase; font-size: .75rem; color: rgba(0,0,0,.75); }
  .indicators__item__value { font-size: 1.5rem; font-weight: 400; }
  .h1 { font-size: 1.5rem; font-weight: 700; margin: 4rem 50px 1rem; }
  .table { display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 1.25rem 0; margin: 0 50px; box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2); }
  .table--thead { background-color: none; text-transform: uppercase; font-size: .75rem; color: rgba(0,0,0,.5); letter-spacing: .15em; padding-top: .75rem; padding-bottom: .75rem; }
  .td { font-size: 1.25rem; }
  .chart { margin: 0 50px; }
  .account { position: absolute; top: 0; right: 0; }

  @media all and (max-width: 980px) {
    .layout { display: flex; flex-direction: column; }
    .logo { padding: 20px; }
    .pane { margin: 0 20px; }
    .indicators__item__value { font-size: 1rem; font-weight: 400; }
    .table { padding: 1rem 20px; margin: 0; }
    .h1 { margin: 2rem 20px 1rem; }
    .table--thead { margin: 0; padding: .75rem 20px; background-color: #F9FAFB; text-transform: uppercase; font-size: .75rem; color: rgba(0,0,0,.5); letter-spacing: .15em; padding-top: .75rem; padding-bottom: .75rem; }
    .chart { margin: 0 20px; }
  }
</style>

<script>
  import Chart from './Chart'
  import { cloneDeep, groupBy, map, sortBy, reverse, } from 'lodash'
  import axios from 'axios'
  import { formatBytes } from '@/shared'

  export default {
    components: { Chart, },
    data: function() {
      return {
        tlprt: [],
        connectionId: null,
        peerList: null,
      }
    },
    created() {
      this.playerInit()
      setInterval(() => {
        axios.get('https://api.teleport.media/demo/peerconnectionstat?apiKey=9c2fb9240c5a4e2c')
          .then(data => {
            console.log(data)
            this.peerList = data.result
          })
      }, 1000)
    },
    computed: {
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
        let API_KEY = "9c2fb9240c5a4e2c";
        let initApp = () => {
          let hls = new Hls();
          let video = document.getElementById('video');
          hls.loadSource(STREAM_URL);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
          });
          teleport.initialize({
            apiKey: API_KEY,
            loader: {
              type: "hlsjs",
              params: {
                hlsjs: hls
              }
            }
          })
          .then(function (instance) {
            tlprt = instance;
            console.log("The video has now been loaded!");
            tlprt.onSegmentLoaded = (segment) => console.log(`segment loaded:`, segment);
            window.addEventListener("unload", function () {
              if (tlprt) {
                tlprt.dispose();
                tlprt = null;
              }
            });
          })
          .catch(onError);
          setInterval(() => {
            this.tlprt.push(cloneDeep(tlprt.getStatDetails()))
            this.connectionId = tlprt.connectionId
          }, 1000)
        }
        function onError(error) {
          console.error("Error code", error.code, "object", error);
        }
        document.addEventListener("DOMContentLoaded", initApp);
      },
    }
  }
</script>
