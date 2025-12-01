import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/cataloghydi',
      name: 'cataloghydi',
      component: () => import('../views/CatalogHydi.vue'),
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/Category.vue'),
    },
    {
      path: '/cataloghydizip',
      name: 'cataloghydizip', 
      component: () => import('../views/CatalogHydizip.vue'),
    },
    {
      path: '/catalogtshirt',
      name: 'catalogtshirt', 
      component: () => import('../views/CatalogTshirt.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/Favorites.vue'),
    },
  ],
})

export default router
