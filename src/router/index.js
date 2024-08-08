import { createRouter, createWebHistory } from 'vue-router'
import ProductionListView from '../views/ProductionListView.vue'
import ProductionDetails from '../views/production/ProductionDetails.vue'
import ProductionEdit from '../views/production/ProductionEdit.vue'
import FormView from '../views/FormView.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '../views/NotFound.vue'
import NetworkErr from '../views/NetworkErr.vue'

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
      component: ProductionDetails,
      props: true
    },
    {
      path: '/production/:id/edit',
      name: 'production-edit',
      component: ProductionEdit,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/form',
      name: 'form',
      component: FormView
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErr
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router
