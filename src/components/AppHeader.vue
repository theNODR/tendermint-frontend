<template>
  <div>
    <div class="app-header">
      <div class="header">
        <svg width="119" height="25" viewBox="0 0 119 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M113.457 24.3418L108.39 16.6897H105.226V24.3418H100.49V0.268799H107.791C110.769 0.268799 113.085 0.992644 114.74 2.44033C116.394 3.88803 117.201 5.87343 117.201 8.37586C117.201 9.86492 116.89 11.2506 116.27 12.5535C115.65 13.8564 114.698 14.8698 113.416 15.6143L119 24.3418H113.457ZM105.206 12.0985H108.577C109.859 12.0985 110.81 11.7262 111.389 10.961C111.968 10.2165 112.279 9.38925 112.279 8.52063C112.279 7.65202 112.03 6.82477 111.534 6.0182C111.038 5.21163 110.066 4.81868 108.618 4.81868H105.226V12.0985H105.206Z" fill="white"/> <path d="M4.79806 24.4246L4.69465 10.1338L19.5025 24.4246H21.674V0.351562H16.8966L17 14.9112L2.17154 0.351562H0V24.4246H1.44769H4.79806Z" fill="white"/> <path d="M88.5775 6.65932C87.6675 4.77732 86.2198 3.22622 84.2344 2.04739C82.249 0.868551 79.7259 0.268799 76.6444 0.268799H67.1724V4.81868H69.4473V19.7713H67.1724V24.3211L77.8232 24.3625C80.0361 24.3625 82.0422 23.8868 83.8828 22.9355C85.7235 21.9842 87.1919 20.6192 88.288 18.8613C89.3841 17.1034 89.9218 15.0559 89.9218 12.7396C89.9425 10.5681 89.4875 8.54132 88.5775 6.65932ZM82.8695 17.8479C81.4218 19.1095 79.4777 19.7506 77.0167 19.7506H74.204V4.798H78.0714C79.0021 4.798 80.0154 5.02549 81.0702 5.4598C82.1249 5.89411 83.0556 6.68 83.8415 7.81747C84.6274 8.95494 85.041 10.4854 85.041 12.388C85.041 14.7664 84.3172 16.5863 82.8695 17.8479Z" fill="white"/> <path d="M44.7534 24.6107C51.5494 24.6107 57.0587 19.1014 57.0587 12.3054C57.0587 5.5093 51.5494 0 44.7534 0C37.9573 0 32.448 5.5093 32.448 12.3054C32.448 19.1014 37.9573 24.6107 44.7534 24.6107Z" fill="white"/> </svg>
        <svg width="50" height="25" viewBox="0 0 50 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="1" y="1" width="48" height="23" rx="11.5" stroke="white" stroke-opacity="0.5" stroke-width="2"/> <rect x="29" y="4" width="17" height="17" rx="8.5" fill="white" fill-opacity="0.5"/> </svg>
      </div>
      <div class="navigation">
        <router-link to="/balance" tag="div" class="navigation-item">
          Balance
        </router-link>
        <router-link to="/stats" tag="div" class="navigation-item">
          Stats
        </router-link>
        <router-link to="/network" tag="div" class="navigation-item">
          Network
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .app-header { padding: 50px 20px 20px; }
  .header { display: flex; align-items: center; justify-content: space-between; }
  .navigation { text-transform: uppercase; font-weight: 700; color: white; letter-spacing: .1em; display: flex; justify-content: space-between; margin: 50px 0 0; }
  .navigation-item { padding-bottom: 2px; }
  .router-link-active { box-shadow: 0 2px 0 0 white; }
</style>
