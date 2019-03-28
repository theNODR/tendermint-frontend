<template>
  <div>
    <!-- <div class="logo">
      <svg height="25" viewBox="0 0 155 32" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M147.522 31.6504L140.934 21.7008H136.82V31.6504H130.662V0.349548H140.154C144.027 0.349548 147.038 1.29072 149.19 3.17308C151.341 5.05543 152.39 7.63694 152.39 10.8907C152.39 12.8269 151.986 14.6285 151.18 16.3227C150.373 18.0168 149.136 19.3344 147.469 20.3025L154.729 31.6504H147.522ZM136.793 15.7311H141.176C142.843 15.7311 144.08 15.247 144.833 14.2521C145.586 13.284 145.99 12.2084 145.99 11.079C145.99 9.94955 145.667 8.87392 145.022 7.82518C144.376 6.77644 143.112 6.26551 141.23 6.26551H136.82V15.7311H136.793Z"/> <path d="M6.23865 31.758L6.1042 13.1765L25.358 31.758H28.1815V0.457153H21.9697L22.1042 19.3882L2.82353 0.457153H0V31.758H1.88235H6.23865Z"/> <path d="M115.172 8.65879C113.989 6.21173 112.107 4.19492 109.525 2.66215C106.944 1.12937 103.663 0.349548 99.6563 0.349548H87.3403V6.26551H90.2983V25.7075H87.3403V31.6235L101.189 31.6773C104.066 31.6773 106.675 31.0588 109.068 29.8218C111.461 28.5848 113.371 26.81 114.796 24.5243C116.221 22.2386 116.92 19.5764 116.92 16.5647C116.947 13.7411 116.355 11.1058 115.172 8.65879ZM107.75 23.2067C105.868 24.847 103.34 25.6806 100.14 25.6806H96.4832V6.23862H101.512C102.722 6.23862 104.039 6.53442 105.411 7.09912C106.782 7.66383 107.992 8.68568 109.014 10.1647C110.036 11.6437 110.574 13.6336 110.574 16.1075C110.574 19.2 109.633 21.5664 107.75 23.2067Z"/> <path d="M58.1902 32C67.0267 32 74.1902 24.8366 74.1902 16C74.1902 7.16344 67.0267 0 58.1902 0C49.3536 0 42.1902 7.16344 42.1902 16C42.1902 24.8366 49.3536 32 58.1902 32Z"/> </svg>
    </div> -->
    <div class="layout">
      <div class="pane-container">
        <div class="pane-container__pane">
          <div class="player-container">
            <video id="video" autoplay controls muted playsinline style="width: 100%; height: auto;">
              <source id="video-source" type="application/x-mpegURL">
            </video>
          </div>
          <div v-if="supports.mediaSourceExtensions" class="indicators">
            <div class="indicators__item">
              <div class="indicators__item__label">
                <div style="margin-right: 10px;">Download</div>
                <div><svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M8 20H11V15H13V20H16L12 24L8 20ZM19.479 7.092C19.267 3.141 16.006 0 12 0C7.994 0 4.733 3.141 4.521 7.092C1.951 7.555 0 9.798 0 12.5C0 15.537 2.463 18 5.5 18H9V16H5.5C3.57 16 2 14.43 2 12.5C2 9.703 4.479 8.667 6.433 8.78C6.266 4.562 8.641 2 12 2C15.453 2 17.891 4.797 17.567 8.78C19.312 8.734 22 9.531 22 12.5C22 14.43 20.43 16 18.5 16H15V18H18.5C21.537 18 24 15.537 24 12.5C24 9.798 22.049 7.555 19.479 7.092V7.092Z"/></svg></div>
              </div>
              <div class="indicators__item__value">
                {{statDetails.length > 0 && formatBytes(statDetails[statDetails.length-1].totals.pdn.size + statDetails[statDetails.length-1].totals.cdn.size, 1)}}
              </div>
            </div>
            <div class="indicators__item">
              <div class="indicators__item__label">
                <div style="margin-right: 10px;">Upload</div>
                <div><svg width="20" height="20" viewBox="0 0 32 32" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M21.3333 21.3333H17.3333V28H14.6667V21.3333H10.6667L16 16L21.3333 21.3333ZM25.972 13.456C25.6893 8.188 21.3413 4 16 4C10.6587 4 6.31067 8.188 6.028 13.456C2.60133 14.0733 0 17.064 0 20.6667C0 24.716 3.284 28 7.33333 28H12V25.3333H7.33333C4.76 25.3333 2.66667 23.24 2.66667 20.6667C2.66667 16.9373 5.972 15.556 8.57733 15.7067C8.35467 10.0827 11.5213 6.66667 16 6.66667C20.604 6.66667 23.8547 10.396 23.4227 15.7067C25.7493 15.6453 29.3333 16.708 29.3333 20.6667C29.3333 23.24 27.24 25.3333 24.6667 25.3333H20V28H24.6667C28.716 28 32 24.716 32 20.6667C32 17.064 29.3987 14.0733 25.972 13.456Z"/></svg></div>
              </div>
              <div class="indicators__item__value">
                {{statDetails.length > 0 && formatBytes(statDetails[statDetails.length-1].totals.upload.size, 1)}}
              </div>
            </div>
            <div class="indicators__item">
              <div class="indicators__item__label">
                <div style="margin-right: 10px;">ID</div>
                <div><svg width="20" height="20" viewBox="0 0 28 28" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M14 0C6.2685 0 0 6.2685 0 14C0 21.7315 6.2685 28 14 28C21.7315 28 28 21.7315 28 14C28 6.2685 21.7315 0 14 0ZM23.0452 21.3558C22.7407 20.6722 22.1247 20.1997 20.8623 19.908C18.1872 19.2908 15.6963 18.7495 16.9038 16.4722C20.573 9.53983 17.8757 5.83333 14 5.83333C10.0473 5.83333 7.41533 9.68217 11.0962 16.4722C12.3398 18.7635 9.75683 19.3037 7.13767 19.908C5.873 20.1997 5.26167 20.6757 4.9595 21.3617C3.32033 19.3515 2.33333 16.7895 2.33333 14C2.33333 7.567 7.567 2.33333 14 2.33333C20.433 2.33333 25.6667 7.567 25.6667 14C25.6667 16.7872 24.6808 19.3468 23.0452 21.3558Z"/></svg></div>
              </div>
              <div class="indicators__item__value">
                {{tlprt && tlprt.connectionId.slice(0,6)}}
              </div>
            </div>
            <!-- <div class="indicators__item">
              <div class="indicators__item__label">
                <div style="margin-right: 10px;">Teleport</div>
                <div><svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M8 20H11V15H13V20H16L12 24L8 20ZM19.479 7.092C19.267 3.141 16.006 0 12 0C7.994 0 4.733 3.141 4.521 7.092C1.951 7.555 0 9.798 0 12.5C0 15.537 2.463 18 5.5 18H9V16H5.5C3.57 16 2 14.43 2 12.5C2 9.703 4.479 8.667 6.433 8.78C6.266 4.562 8.641 2 12 2C15.453 2 17.891 4.797 17.567 8.78C19.312 8.734 22 9.531 22 12.5C22 14.43 20.43 16 18.5 16H15V18H18.5C21.537 18 24 15.537 24 12.5C24 9.798 22.049 7.555 19.479 7.092V7.092Z"/></svg></div>
              </div>
              <div class="indicators__item__value">
                {{statDetails.length > 0 && formatBytes(statDetails[statDetails.length-1].totals.pdn.size)}}
              </div>
            </div> -->
            <!-- <div class="indicators__item">
              <div class="indicators__item__label">
                <div style="margin-right: 10px;">CDN</div>
                <div><svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M8 20H11V15H13V20H16L12 24L8 20ZM19.479 7.092C19.267 3.141 16.006 0 12 0C7.994 0 4.733 3.141 4.521 7.092C1.951 7.555 0 9.798 0 12.5C0 15.537 2.463 18 5.5 18H9V16H5.5C3.57 16 2 14.43 2 12.5C2 9.703 4.479 8.667 6.433 8.78C6.266 4.562 8.641 2 12 2C15.453 2 17.891 4.797 17.567 8.78C19.312 8.734 22 9.531 22 12.5C22 14.43 20.43 16 18.5 16H15V18H18.5C21.537 18 24 15.537 24 12.5C24 9.798 22.049 7.555 19.479 7.092V7.092Z"/></svg></div>
              </div>
              <div class="indicators__item__value">
                {{statDetails.length > 0 && formatBytes(statDetails[statDetails.length-1].totals.cdn.size)}}
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="map">
        <base-world :data="peerList"/>
      </div>
    </div>
    <div class="layout" style="display: none;">
      <div class="user-profile">
        <!-- <div class="h1">Current session</div> -->
        <div class="pane">
          <video id="video" autoplay controls muted playsinline style="width: 100%;">
            <source id="video-source" type="application/x-mpegURL">
          </video>
          <div v-if="supports.mediaSourceExtensions" class="indicators">
            <div class="indicators__item">
              <div class="indicators__item__label">
                <div style="margin-right: 10px;">Download</div>
                <div><svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M8 20H11V15H13V20H16L12 24L8 20ZM19.479 7.092C19.267 3.141 16.006 0 12 0C7.994 0 4.733 3.141 4.521 7.092C1.951 7.555 0 9.798 0 12.5C0 15.537 2.463 18 5.5 18H9V16H5.5C3.57 16 2 14.43 2 12.5C2 9.703 4.479 8.667 6.433 8.78C6.266 4.562 8.641 2 12 2C15.453 2 17.891 4.797 17.567 8.78C19.312 8.734 22 9.531 22 12.5C22 14.43 20.43 16 18.5 16H15V18H18.5C21.537 18 24 15.537 24 12.5C24 9.798 22.049 7.555 19.479 7.092V7.092Z"/></svg></div>
              </div>
              <div class="indicators__item__value">
                {{statDetails.length > 0 && formatBytes(statDetails[statDetails.length-1].totals.pdn.size + statDetails[statDetails.length-1].totals.cdn.size, 1)}}
              </div>
            </div>
            <div class="indicators__item">
              <div class="indicators__item__label">
                <div style="margin-right: 10px;">Upload</div>
                <div><svg width="20" height="20" viewBox="0 0 32 32" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M21.3333 21.3333H17.3333V28H14.6667V21.3333H10.6667L16 16L21.3333 21.3333ZM25.972 13.456C25.6893 8.188 21.3413 4 16 4C10.6587 4 6.31067 8.188 6.028 13.456C2.60133 14.0733 0 17.064 0 20.6667C0 24.716 3.284 28 7.33333 28H12V25.3333H7.33333C4.76 25.3333 2.66667 23.24 2.66667 20.6667C2.66667 16.9373 5.972 15.556 8.57733 15.7067C8.35467 10.0827 11.5213 6.66667 16 6.66667C20.604 6.66667 23.8547 10.396 23.4227 15.7067C25.7493 15.6453 29.3333 16.708 29.3333 20.6667C29.3333 23.24 27.24 25.3333 24.6667 25.3333H20V28H24.6667C28.716 28 32 24.716 32 20.6667C32 17.064 29.3987 14.0733 25.972 13.456Z"/></svg></div>
              </div>
              <div class="indicators__item__value">
                {{statDetails.length > 0 && formatBytes(statDetails[statDetails.length-1].totals.upload.size, 1)}}
              </div>
            </div>
            <div class="indicators__item">
              <div class="indicators__item__label">
                <div style="margin-right: 10px;">Your ID</div>
                <div><svg width="20" height="20" viewBox="0 0 28 28" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M14 0C6.2685 0 0 6.2685 0 14C0 21.7315 6.2685 28 14 28C21.7315 28 28 21.7315 28 14C28 6.2685 21.7315 0 14 0ZM23.0452 21.3558C22.7407 20.6722 22.1247 20.1997 20.8623 19.908C18.1872 19.2908 15.6963 18.7495 16.9038 16.4722C20.573 9.53983 17.8757 5.83333 14 5.83333C10.0473 5.83333 7.41533 9.68217 11.0962 16.4722C12.3398 18.7635 9.75683 19.3037 7.13767 19.908C5.873 20.1997 5.26167 20.6757 4.9595 21.3617C3.32033 19.3515 2.33333 16.7895 2.33333 14C2.33333 7.567 7.567 2.33333 14 2.33333C20.433 2.33333 25.6667 7.567 25.6667 14C25.6667 16.7872 24.6808 19.3468 23.0452 21.3558Z"/></svg></div>
              </div>
              <div class="indicators__item__value">
                {{tlprt && tlprt.connectionId.slice(0,6)}}
              </div>
            </div>
            <!-- <div class="indicators__item">
              <div class="indicators__item__label">
                <div style="margin-right: 10px;">Teleport</div>
                <div><svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M8 20H11V15H13V20H16L12 24L8 20ZM19.479 7.092C19.267 3.141 16.006 0 12 0C7.994 0 4.733 3.141 4.521 7.092C1.951 7.555 0 9.798 0 12.5C0 15.537 2.463 18 5.5 18H9V16H5.5C3.57 16 2 14.43 2 12.5C2 9.703 4.479 8.667 6.433 8.78C6.266 4.562 8.641 2 12 2C15.453 2 17.891 4.797 17.567 8.78C19.312 8.734 22 9.531 22 12.5C22 14.43 20.43 16 18.5 16H15V18H18.5C21.537 18 24 15.537 24 12.5C24 9.798 22.049 7.555 19.479 7.092V7.092Z"/></svg></div>
              </div>
              <div class="indicators__item__value">
                {{statDetails.length > 0 && formatBytes(statDetails[statDetails.length-1].totals.pdn.size)}}
              </div>
            </div> -->
            <!-- <div class="indicators__item">
              <div class="indicators__item__label">
                <div style="margin-right: 10px;">CDN</div>
                <div><svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"> <path d="M8 20H11V15H13V20H16L12 24L8 20ZM19.479 7.092C19.267 3.141 16.006 0 12 0C7.994 0 4.733 3.141 4.521 7.092C1.951 7.555 0 9.798 0 12.5C0 15.537 2.463 18 5.5 18H9V16H5.5C3.57 16 2 14.43 2 12.5C2 9.703 4.479 8.667 6.433 8.78C6.266 4.562 8.641 2 12 2C15.453 2 17.891 4.797 17.567 8.78C19.312 8.734 22 9.531 22 12.5C22 14.43 20.43 16 18.5 16H15V18H18.5C21.537 18 24 15.537 24 12.5C24 9.798 22.049 7.555 19.479 7.092V7.092Z"/></svg></div>
              </div>
              <div class="indicators__item__value">
                {{statDetails.length > 0 && formatBytes(statDetails[statDetails.length-1].totals.cdn.size)}}
              </div>
            </div> -->
          </div>
          <div v-else class="pane__notice-webrtc">
            <div class="pane__notice-webrtc__icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#777" width="20" height="20" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.31 7.526c-.099-.807.528-1.526 1.348-1.526.771 0 1.377.676 1.28 1.451l-.757 6.053c-.035.283-.276.496-.561.496s-.526-.213-.562-.496l-.748-5.978zm1.31 10.724c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
            </div>
            This device does not seem to support WebRTC
          </div>
        </div>
        <!-- <div v-if="supports.mediaSourceExtensions" class="chart">
          <chart :data="statDetails"/>
        </div> -->
      </div>
      <div class="node-list">
        <!-- <div class="h1">System Status</div> -->
        <!-- <div class="h1">Node Rating {{nodeTable.length}} peers total, {{peerListConnected.length}} connected</div> -->
        <!-- <div style="margin: 20px 50px;">
          <graph :data="nodeTable" style="width:100%" :edges="graphTable"/>
        </div> -->
        <div class="map">
          <!-- <base-map :data="peerList"/> -->
          <base-world :data="peerList"/>
        </div>
        <!-- <div class="table table--thead">
          <div class="th">User</div>
          <div class="th">Upload</div>
          <div class="th">Tokens</div>
        </div>
        <div class="table" v-for="peer in nodeTable" :key="peer.connection_id">
          <div class="td">{{peer.connection_id.slice(0,6)}}</div>
          <div class="td">{{formatBytes(peer.pdn_size)}}</div>
          <div class="td">{{(peer.pdn_size/500000).toFixed(2)}}</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
  .layout { position: relative; }
  .pane-container { position: absolute; top: 0; left: 0; width: 45vw; z-index: 1; padding: 20px; }
  .pane-container__pane { background: white; border-radius: 10px; box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.25); }
  .player-container { padding: 20px 20px 0; z-index: 3; overflow: hidden; }
  video { border-radius: 5px; }
  .map { width: 100%; height: 100vh; }

  .fade-enter-active { transition: 2s 0s opacity; }
  .fade-enter { opacity: 0; }
  .fade-enter-to { opacity: 1; }
  .indicators { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px 4px; }
  .indicators__item { padding: 10px 20px; overflow-x: hidden; }
  .indicators__item__label { display: flex; align-items: center; justify-content: flex-start; opacity: .5; font-size: 1rem; color: rgba(0,0,0,.75); }
  .indicators__item__value { font-size: 1.5rem; font-weight: 400; overflow: hidden; }

  @media (max-width: 1000px) {
    .pane-container { width: 75vw; }
  }

  @media (max-width: 800px) {
    .pane-container { width: 100vw; }
    .indicators__item__value { font-size: 1rem; font-weight: 400; overflow: hidden; }
  }
  /* .layout { display: grid; grid-template-columns: 50% 50%; }
  .logo { display: flex; justify-content: flex-start; }
  .pane { box-shadow: 0px 4px 16px rgba(48, 80, 109, 0.15); border-radius: 0 0 10px 10px; }
  .node-list { background: rgba(0,0,0,.02); }
  .indicators { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px 4px; }
  .indicators__item { padding: 10px 20px; overflow-x: hidden; }
  .indicators__item__label { display: flex; align-items: center; justify-content: flex-start; opacity: .5; text-transform: uppercase; font-size: .75rem; letter-spacing: .1em; color: rgba(0,0,0,.75); }
  .indicators__item__value { font-size: 1.75vw; font-weight: 400; overflow: hidden; }
  .h1 { font-family: "Asap", sans-serif; font-size: 1.75rem; font-weight: 600; }
  .table { display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 1.25rem 0; box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2); }
  .table--thead { background-color: none; text-transform: uppercase; font-size: .75rem; color: rgba(0,0,0,.5); letter-spacing: .1em; padding-top: .75rem; padding-bottom: .75rem; }
  .td { font-size: 1.25rem; }
  .map { height: 100vh; }
  .pane, .chart, .h1 { margin: 50px 50px; }
  .logo { margin: 25px 50px; }
  .table { margin: 0 50px; }
  .pane__notice-webrtc { padding: 20px; display: flex; justify-content: center; color: rgba(0,0,0,.5); align-items: center; }
  .pane__notice-webrtc__icon { margin: 0 5px; }

  @media all and (max-width: 1000px) {
    .logo, .pane, .chart, .h1 { margin: 25px 20px; }
    .table { margin: 0; padding: .75rem 20px; }
    .map { height: 50vh; }
    .layout { display: flex; flex-direction: column; }
    .indicators__item__label { font-size: .6rem; }
    .indicators__item__value { font-size: calc(6px + 3vw); font-weight: 400; }
    .pane__notice-webrtc { font-size: .75rem; }
    .table--thead { padding: .75rem 20px; background-color: #F9FAFB; text-transform: uppercase; font-size: .75rem; color: rgba(0,0,0,.5); letter-spacing: .15em; padding-top: .75rem; padding-bottom: .75rem; }
  } */
</style>

<script>
  import Chart from './Chart'
  import Graph from './Graph'
  import BaseMap from './BaseMap'
  import BaseWorld from './BaseWorld'
  import { cloneDeep, groupBy, map, sortBy, reverse, isEqual, uniq, uniqBy, } from 'lodash'
  import axios from 'axios'
  import { formatBytes } from '@/shared'
  import Clappr from "clappr"

  export default {
    components: { Chart, Graph, BaseMap, BaseWorld, },
    data: function() {
      return {
        statDetails: [],
        tlprt: null,
        connectionId: null,
        peerList: null, //[{"connection_id":"488e59655a3a87a1","target_id":"b6b256e7179a05ef","pdn_size":"62792940","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"42fc078ae5646e31","target_id":"3d97d7dd6b73e99f","pdn_size":"57062888","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"f2a4dde748178a10","target_id":"fe50dfc350d2986c","pdn_size":"41487464","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"f5fbc32c19045d44","target_id":"b6b256e7179a05ef","pdn_size":"38691340","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"346db9ba2d026f66","target_id":"79455fe636b0c46a","pdn_size":"38338464","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"c3af7831d31abbb0","target_id":"8484cfc930d12ea0","pdn_size":"32039900","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"2c6ee3b658e62e74","target_id":"4b08096831020fbb","pdn_size":"30623884","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"55878449f5a45c0c","target_id":"fc23d17a9aa2ccc0","pdn_size":"29444184","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"60661b6f58dd4c0b","target_id":"9663da1e40cab7aa","pdn_size":"28075168","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"1c5c32c09ca76c15","target_id":"8484cfc930d12ea0","pdn_size":"26611776","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"1c90b29ef4048796","target_id":"ac8943c33bbcc3ac","pdn_size":"26607828","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"0a1c34f636dee7b7","target_id":"873d9a82f4a7b320","pdn_size":"23793092","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"6effb445eca33f33","target_id":"e1ca7074a711801b","pdn_size":"19028044","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"b0e3596d9408aee2","target_id":"3d97d7dd6b73e99f","pdn_size":"18358764","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"a4f7a54e9c132557","target_id":"25a8d12f8fac11f1","pdn_size":"17509380","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"8ed81caa6dab07f1","target_id":"e1ca7074a711801b","pdn_size":"17022272","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"9e7802fe2a237f6d","target_id":"e1ca7074a711801b","pdn_size":"15972292","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"345b0019ec38c42e","target_id":"9663da1e40cab7aa","pdn_size":"15736164","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"040081fbc16c91f9","target_id":"206251236ee97a0b","pdn_size":"15586704","ip":"46.146.112.3","latitude":58.01741027832031,"longitude":56.285518646240234},{"connection_id":"17f4327a86c55919","target_id":"38a7842b7775260a","pdn_size":"15142084","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"6c6c3556e69ea180","target_id":"a4bcb49d64069f8a","pdn_size":"15032856","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"65be256de49afcc7","target_id":"3ffa9ac8383584a8","pdn_size":"14483520","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"51f63b5c87928ac7","target_id":"38a7842b7775260a","pdn_size":"14078944","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"774f2352dd83f118","target_id":"9e7802fe2a237f6d","pdn_size":"13424892","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"cc8d54706fecfe6e","target_id":"8659bd816a5ba697","pdn_size":"13009224","ip":"46.146.112.3","latitude":58.01741027832031,"longitude":56.285518646240234},{"connection_id":"f5fbc32c19045d44","target_id":"488e59655a3a87a1","pdn_size":"12751288","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"8622a9e41ad5eecb","target_id":"cc8d54706fecfe6e","pdn_size":"12340320","ip":"46.146.112.3","latitude":58.01741027832031,"longitude":56.285518646240234},{"connection_id":"206251236ee97a0b","target_id":"040081fbc16c91f9","pdn_size":"12231468","ip":"46.146.112.3","latitude":58.01741027832031,"longitude":56.285518646240234},{"connection_id":"8ed81caa6dab07f1","target_id":"08097cc057e4b856","pdn_size":"12213232","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"54a1c557514f7e16","target_id":"a4bcb49d64069f8a","pdn_size":"11786096","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"b0e3596d9408aee2","target_id":"42fc078ae5646e31","pdn_size":"11705444","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"a4f7a54e9c132557","target_id":"b6b256e7179a05ef","pdn_size":"11123020","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"9e7802fe2a237f6d","target_id":"7724e80fa5406257","pdn_size":"10406176","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"3ffa9ac8383584a8","target_id":"dc4994d0cb040d96","pdn_size":"9933920","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"f7ec70775c8e9d39","target_id":"a4bcb49d64069f8a","pdn_size":"9870564","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"46d9bc0bc08e089c","target_id":"0691da3340f5f24b","pdn_size":"9701552","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"4e38350d361776d5","target_id":"a4bcb49d64069f8a","pdn_size":"9455460","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"804388534ce629eb","target_id":"0691da3340f5f24b","pdn_size":"9399812","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"7c51a03e8ae648df","target_id":"54a1c557514f7e16","pdn_size":"9395112","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"9201870f0ad09022","target_id":"dc4994d0cb040d96","pdn_size":"9344728","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"34fa0387c5061a74","target_id":"2c6ee3b658e62e74","pdn_size":"9290772","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"a675f397df42a258","target_id":"dc4994d0cb040d96","pdn_size":"9148456","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"f7ec70775c8e9d39","target_id":"4e38350d361776d5","pdn_size":"9011780","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"54a1c557514f7e16","target_id":"804388534ce629eb","pdn_size":"8360548","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"3bb4bf078d3b8340","target_id":"6effb445eca33f33","pdn_size":"7815160","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"a4f7a54e9c132557","target_id":"3d97d7dd6b73e99f","pdn_size":"7789592","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"4e38350d361776d5","target_id":"fe50dfc350d2986c","pdn_size":"7750112","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"af9d35a7b2878040","target_id":"0691da3340f5f24b","pdn_size":"7575460","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"3bb4bf078d3b8340","target_id":"8ed81caa6dab07f1","pdn_size":"7382008","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"873d9a82f4a7b320","target_id":"fe50dfc350d2986c","pdn_size":"7369036","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"1c5c32c09ca76c15","target_id":"aa5f6a40422d8828","pdn_size":"7357756","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"c695b140fe53a242","target_id":"1154a814e8b1b259","pdn_size":"7213560","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"3bb4bf078d3b8340","target_id":"7724e80fa5406257","pdn_size":"7078764","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"6effb445eca33f33","target_id":"08097cc057e4b856","pdn_size":"6838312","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"774f2352dd83f118","target_id":"ac8943c33bbcc3ac","pdn_size":"6838312","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"8ed81caa6dab07f1","target_id":"7724e80fa5406257","pdn_size":"6778152","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"94bc51e101d161ac","target_id":"9201870f0ad09022","pdn_size":"6595980","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"f77fc1acc60aa977","target_id":"dc4994d0cb040d96","pdn_size":"6516268","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"7c51a03e8ae648df","target_id":"a4bcb49d64069f8a","pdn_size":"6263972","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"6effb445eca33f33","target_id":"7724e80fa5406257","pdn_size":"6026904","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"6f740bd9016dcd40","target_id":"fa4b9c88fc4323b4","pdn_size":"5984980","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"9201870f0ad09022","target_id":"65be256de49afcc7","pdn_size":"5785700","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"09a8f0c9508ab47a","target_id":"38a7842b7775260a","pdn_size":"5415716","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"70ba88de68b70505","target_id":"0a1c34f636dee7b7","pdn_size":"5217564","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"46d9bc0bc08e089c","target_id":"804388534ce629eb","pdn_size":"5074872","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"28a1207592f953e3","target_id":"7724e80fa5406257","pdn_size":"4831224","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"a675f397df42a258","target_id":"9201870f0ad09022","pdn_size":"4699060","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"09a8f0c9508ab47a","target_id":"51f63b5c87928ac7","pdn_size":"4690600","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"ac8943c33bbcc3ac","target_id":"7724e80fa5406257","pdn_size":"4655632","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"1e4da0cc329af593","target_id":"8f86314e9e1bff69","pdn_size":"4649428","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"0a1c34f636dee7b7","target_id":"90a59d9f598bcb86","pdn_size":"4482108","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"cc8d54706fecfe6e","target_id":"8622a9e41ad5eecb","pdn_size":"4434544","ip":"46.146.112.3","latitude":58.01741027832031,"longitude":56.285518646240234},{"connection_id":"17f4327a86c55919","target_id":"90a59d9f598bcb86","pdn_size":"4412172","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"08097cc057e4b856","target_id":"b6b256e7179a05ef","pdn_size":"4203116","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"488e59655a3a87a1","target_id":"08097cc057e4b856","pdn_size":"3992180","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"38a7842b7775260a","target_id":"90a59d9f598bcb86","pdn_size":"3962664","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"af9d35a7b2878040","target_id":"54a1c557514f7e16","pdn_size":"3794780","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"70ba88de68b70505","target_id":"4e38350d361776d5","pdn_size":"3685928","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"f77fc1acc60aa977","target_id":"9201870f0ad09022","pdn_size":"3632724","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"46d9bc0bc08e089c","target_id":"a4bcb49d64069f8a","pdn_size":"3580084","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"f7ec70775c8e9d39","target_id":"54a1c557514f7e16","pdn_size":"3391144","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"28a1207592f953e3","target_id":"774f2352dd83f118","pdn_size":"3331172","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"8659bd816a5ba697","target_id":"cc8d54706fecfe6e","pdn_size":"3326096","ip":"46.146.112.3","latitude":58.01741027832031,"longitude":56.285518646240234},{"connection_id":"fe50dfc350d2986c","target_id":"873d9a82f4a7b320","pdn_size":"3287368","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"3ffa9ac8383584a8","target_id":"4b08096831020fbb","pdn_size":"3249956","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"34fa0387c5061a74","target_id":"3ffa9ac8383584a8","pdn_size":"3171748","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"a4f7a54e9c132557","target_id":"b0e3596d9408aee2","pdn_size":"3115912","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"c3af7831d31abbb0","target_id":"aa5f6a40422d8828","pdn_size":"3104444","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"94bc51e101d161ac","target_id":"0691da3340f5f24b","pdn_size":"3052556","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"9e7802fe2a237f6d","target_id":"ac8943c33bbcc3ac","pdn_size":"3013640","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"65be256de49afcc7","target_id":"dc4994d0cb040d96","pdn_size":"2981680","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"7c51a03e8ae648df","target_id":"fe50dfc350d2986c","pdn_size":"2930920","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"af4673eadc8b66b4","target_id":"ac8943c33bbcc3ac","pdn_size":"2817744","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"42fc078ae5646e31","target_id":"25a8d12f8fac11f1","pdn_size":"2789356","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"f5fbc32c19045d44","target_id":"08097cc057e4b856","pdn_size":"2749124","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"3bb4bf078d3b8340","target_id":"e1ca7074a711801b","pdn_size":"2696860","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"1c5c32c09ca76c15","target_id":"c3af7831d31abbb0","pdn_size":"2696484","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"54a1c557514f7e16","target_id":"0691da3340f5f24b","pdn_size":"2575600","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"6c6c3556e69ea180","target_id":"7c51a03e8ae648df","pdn_size":"2493256","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"6c6c3556e69ea180","target_id":"4e38350d361776d5","pdn_size":"2452084","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"b0e3596d9408aee2","target_id":"a4f7a54e9c132557","pdn_size":"2354512","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"1c90b29ef4048796","target_id":"7724e80fa5406257","pdn_size":"2338532","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"b0e3596d9408aee2","target_id":"b6b256e7179a05ef","pdn_size":"2304880","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"fa4b9c88fc4323b4","target_id":"f3181be17374dec5","pdn_size":"2303000","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"0691da3340f5f24b","target_id":"9201870f0ad09022","pdn_size":"2280064","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"4e38350d361776d5","target_id":"7c51a03e8ae648df","pdn_size":"2235696","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"804388534ce629eb","target_id":"94bc51e101d161ac","pdn_size":"2198848","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"346db9ba2d026f66","target_id":"1154a814e8b1b259","pdn_size":"2144704","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"34fa0387c5061a74","target_id":"4b08096831020fbb","pdn_size":"2139816","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"08097cc057e4b856","target_id":"e1ca7074a711801b","pdn_size":"2138312","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"09a8f0c9508ab47a","target_id":"17f4327a86c55919","pdn_size":"2074768","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"90a59d9f598bcb86","target_id":"873d9a82f4a7b320","pdn_size":"2008028","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"f2a4dde748178a10","target_id":"0a1c34f636dee7b7","pdn_size":"2006712","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"28a1207592f953e3","target_id":"9e7802fe2a237f6d","pdn_size":"1967044","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"1c5c32c09ca76c15","target_id":"1154a814e8b1b259","pdn_size":"1931136","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"aa5f6a40422d8828","target_id":"8484cfc930d12ea0","pdn_size":"1892972","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"af4673eadc8b66b4","target_id":"774f2352dd83f118","pdn_size":"1864396","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"c695b140fe53a242","target_id":"3655e4a245dd36c1","pdn_size":"1752912","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"6c6c3556e69ea180","target_id":"fe50dfc350d2986c","pdn_size":"1724524","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"17f4327a86c55919","target_id":"3d97d7dd6b73e99f","pdn_size":"1715124","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"09a8f0c9508ab47a","target_id":"0a1c34f636dee7b7","pdn_size":"1689744","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"774f2352dd83f118","target_id":"1c90b29ef4048796","pdn_size":"1655152","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"6f740bd9016dcd40","target_id":"f3181be17374dec5","pdn_size":"1579200","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"488e59655a3a87a1","target_id":"8ed81caa6dab07f1","pdn_size":"1564160","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"70ba88de68b70505","target_id":"873d9a82f4a7b320","pdn_size":"1532200","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"94bc51e101d161ac","target_id":"dc4994d0cb040d96","pdn_size":"1505128","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"e1ca7074a711801b","target_id":"08097cc057e4b856","pdn_size":"1494036","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"4eaa579303fbbd56","target_id":"61e8c7d374d46522","pdn_size":"1464520","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"8622a9e41ad5eecb","target_id":"8659bd816a5ba697","pdn_size":"1459632","ip":"46.146.112.3","latitude":58.01741027832031,"longitude":56.285518646240234},{"connection_id":"4e38350d361776d5","target_id":"f2a4dde748178a10","pdn_size":"1431620","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"b0e3596d9408aee2","target_id":"38a7842b7775260a","pdn_size":"1349088","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"f2a4dde748178a10","target_id":"4e38350d361776d5","pdn_size":"1294568","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"af9d35a7b2878040","target_id":"a4bcb49d64069f8a","pdn_size":"1243244","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"f2a4dde748178a10","target_id":"70ba88de68b70505","pdn_size":"1227640","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"e1ca7074a711801b","target_id":"7724e80fa5406257","pdn_size":"1220684","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"af9d35a7b2878040","target_id":"46d9bc0bc08e089c","pdn_size":"1203764","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"9663da1e40cab7aa","target_id":"fa4b9c88fc4323b4","pdn_size":"1168608","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"6c6c3556e69ea180","target_id":"f7ec70775c8e9d39","pdn_size":"1158644","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"6effb445eca33f33","target_id":"8ed81caa6dab07f1","pdn_size":"1140784","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"1e4da0cc329af593","target_id":"345b0019ec38c42e","pdn_size":"1011064","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"55878449f5a45c0c","target_id":"8f86314e9e1bff69","pdn_size":"995648","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"4e38350d361776d5","target_id":"70ba88de68b70505","pdn_size":"972336","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"b6b256e7179a05ef","target_id":"25a8d12f8fac11f1","pdn_size":"914808","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"7c51a03e8ae648df","target_id":"70ba88de68b70505","pdn_size":"914808","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"00bba90db0898217","target_id":"8abcbf7274d39a5e","pdn_size":"910484","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"39137c324323edd3","target_id":"00bba90db0898217","pdn_size":"877584","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"8484cfc930d12ea0","target_id":"1154a814e8b1b259","pdn_size":"877584","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"3d97d7dd6b73e99f","target_id":"25a8d12f8fac11f1","pdn_size":"849948","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"70ba88de68b70505","target_id":"f2a4dde748178a10","pdn_size":"821936","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"9201870f0ad09022","target_id":"f77fc1acc60aa977","pdn_size":"815168","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"8ed81caa6dab07f1","target_id":"b6b256e7179a05ef","pdn_size":"793360","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"46d9bc0bc08e089c","target_id":"54a1c557514f7e16","pdn_size":"782644","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"2c6ee3b658e62e74","target_id":"3ffa9ac8383584a8","pdn_size":"775500","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"42fc078ae5646e31","target_id":"b0e3596d9408aee2","pdn_size":"771552","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"55878449f5a45c0c","target_id":"3655e4a245dd36c1","pdn_size":"768544","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"9e7802fe2a237f6d","target_id":"3bb4bf078d3b8340","pdn_size":"757640","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"6effb445eca33f33","target_id":"3bb4bf078d3b8340","pdn_size":"724740","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"3655e4a245dd36c1","target_id":"fc23d17a9aa2ccc0","pdn_size":"718724","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"5b692c98ad1e4f9b","target_id":"040081fbc16c91f9","pdn_size":"708384","ip":"46.146.112.3","latitude":58.01741027832031,"longitude":56.285518646240234},{"connection_id":"9201870f0ad09022","target_id":"94bc51e101d161ac","pdn_size":"657812","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"2c6ee3b658e62e74","target_id":"34fa0387c5061a74","pdn_size":"639012","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"3d97d7dd6b73e99f","target_id":"38a7842b7775260a","pdn_size":"635816","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"fe50dfc350d2986c","target_id":"7c51a03e8ae648df","pdn_size":"633184","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"7c51a03e8ae648df","target_id":"f2a4dde748178a10","pdn_size":"625476","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"1154a814e8b1b259","target_id":"346db9ba2d026f66","pdn_size":"607804","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"b0e3596d9408aee2","target_id":"25a8d12f8fac11f1","pdn_size":"542192","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"54a1c557514f7e16","target_id":"46d9bc0bc08e089c","pdn_size":"536552","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"dc4994d0cb040d96","target_id":"3ffa9ac8383584a8","pdn_size":"518128","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"f5fbc32c19045d44","target_id":"8ed81caa6dab07f1","pdn_size":"501584","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"488e59655a3a87a1","target_id":"f5fbc32c19045d44","pdn_size":"489364","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"34fa0387c5061a74","target_id":"aa5f6a40422d8828","pdn_size":"465488","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"af9d35a7b2878040","target_id":"804388534ce629eb","pdn_size":"444620","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"9e7802fe2a237f6d","target_id":"6effb445eca33f33","pdn_size":"438040","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922},{"connection_id":"b6b256e7179a05ef","target_id":"08097cc057e4b856","pdn_size":"354192","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"f7ec70775c8e9d39","target_id":"804388534ce629eb","pdn_size":"333888","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"4b08096831020fbb","target_id":"3ffa9ac8383584a8","pdn_size":"320540","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"46d9bc0bc08e089c","target_id":"af9d35a7b2878040","pdn_size":"305688","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"a675f397df42a258","target_id":"94bc51e101d161ac","pdn_size":"285572","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"a4bcb49d64069f8a","target_id":"804388534ce629eb","pdn_size":"277300","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"79455fe636b0c46a","target_id":"1154a814e8b1b259","pdn_size":"270720","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"6f740bd9016dcd40","target_id":"8abcbf7274d39a5e","pdn_size":"244024","ip":"52.231.158.118","latitude":35.102779388427734,"longitude":129.040283203125},{"connection_id":"873d9a82f4a7b320","target_id":"90a59d9f598bcb86","pdn_size":"239136","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"9201870f0ad09022","target_id":"a675f397df42a258","pdn_size":"227104","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"774f2352dd83f118","target_id":"28a1207592f953e3","pdn_size":"203228","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"873d9a82f4a7b320","target_id":"4e38350d361776d5","pdn_size":"191572","ip":"104.42.55.239","latitude":37.77492904663086,"longitude":-122.41941833496094},{"connection_id":"00bba90db0898217","target_id":"39137c324323edd3","pdn_size":"98512","ip":"52.229.169.61","latitude":22.285520553588867,"longitude":114.1576919555664},{"connection_id":"51f63b5c87928ac7","target_id":"3d97d7dd6b73e99f","pdn_size":"98512","ip":"104.210.114.100","latitude":-33.86785125732422,"longitude":151.2073211669922}],
        peerListConnected: [],
        supports: {
          mediaSourceExtensions: null,
          hls: null,
        },
      }
    },
    mounted() {
      this.supports.hls = document.getElementById('video').canPlayType('application/vnd.apple.mpegURL') ? true : false
      this.supports.mediaSourceExtensions = window.MediaSource ? true : false
      if (this.supports.hls) {
        document.getElementById('video-source').src = "https://stream.teleport.media/hls/video.m3u8"
      } else {
        this.playerInit()
      }
      setInterval(() => {
        axios.get(`https://api.teleport.media/demo/peerconnectionstat?apiKey=${process.env.VUE_APP_API_KEY}`)
          .then(({data}) => {
            if (!isEqual(this.peerList, data.result)) {
              this.peerList = data.result
            }
          })
      }, 1000)
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
