import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Balance from './views/Balance.vue'
import Stats from './views/Stats.vue'
import Network from './views/Network.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '',
          redirect: '/stats',
        },
        {
          path: 'stats',
          component: Stats,
        },
        {
          path: 'balance',
          component: Balance,
        },
        {
          path: 'network',
          component: Network,
        },
      ],
    },
  ],
})