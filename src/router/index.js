import { createRouter, createWebHistory } from 'vue-router'
import ProductionListView from '../views/ProductionListView.vue'
import ProductionDetails from '../views/ProductionDetails.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'production-list',
      component: ProductionListView
    },
    {
      path: '/production/:id',
      name: 'production-details',
      props: true,
      component: ProductionDetails
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
