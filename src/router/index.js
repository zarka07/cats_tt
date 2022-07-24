import { createRouter, createWebHistory } from 'vue-router'
import Girlpet from '../views/Girl-pet.vue'

const routes = [
  
  {
    path: '/',
    name: 'girl-pet',
    component: Girlpet
  },
  {
    path: '/breeds',
    name: 'breeds',
    component: () => import(/* webpackChunkName: "breeds" */ '../views/Breeds.vue')
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import(/* webpackChunkName: "favorites" */ '../views/Favorites.vue')
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import(/* webpackChunkName: "gallery" */ '../views/Gallery.vue')
  },
  {
    path: '/voting',
    name: 'voting',
    component: () => import(/* webpackChunkName: "voting" */ '../views/Voting.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
