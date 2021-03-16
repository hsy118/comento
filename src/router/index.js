import Vue from 'vue'
import VueRouter from 'vue-router'
import MainFeed from '@/views/mainFeed.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainFeed',
    component: MainFeed
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
