import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Account from './views/Account.vue'
import Stats from './views/Stats.vue'
import Network from './views/Network.vue'
import Settings from './views/Settings.vue'
import Layout from './views/Layout.vue'
import L from './views/L.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: L,
      children: [
        {
          path: '',
          component: Account,
        },
        {
          path: 'account',
          component: Account,
        },
        {
          path: 'stats',
          component: Stats,
        },
        {
          path: 'network',
          component: Network,
        },
        {
          path: 'settings',
          component: Settings,
        },
      ],
    },
  ],
})