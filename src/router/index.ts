import { createRouter, createWebHistory } from 'vue-router'
import PassengerListView from '@/views/PassengerListView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import PassengerView from '@/views/PassengerView.vue'
import PassengerDetailView from '@/views/passenger/PassengerDetailView.vue'
import PassengerAirlineView from '@/views/passenger/PassengerAirlineView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'passenger-list',
      component: PassengerListView,
      props: (route) => ({ page: parseInt(route.query?.page as string) }),
      beforeEnter: (to, _, next) => {
        if (
          parseInt(to.query?.page as string) < 1 ||
          !to.query?.page ||
          isNaN(parseInt(to.query?.page as string))
        ) {
          next({ name: 'passenger-list', query: { page: 1 } })
        } else {
          next()
        }
      }
    },
    {
      path: '/passenger/:id',
      component: PassengerView,
      props: true,
      children: [
        {
          path: 'details',
          name: 'passenger-details',
          component: PassengerDetailView,
          props: true
        },
        {
          path: 'airline',
          name: 'passenger-airline',
          component: PassengerAirlineView,
          props: true
        },
      ]
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
