import { createRouter, createWebHistory } from 'vue-router'
import PassengerListView from '@/views/PassengerListView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import PassengerView from '@/views/PassengerView.vue'
import PassengerDetailView from '@/views/passenger/PassengerDetailView.vue'
import PassengerAirlineView from '@/views/passenger/PassengerAirlineView.vue'
import { usePassengerStore } from '@/stores/passenger'
import PassengerAPIServices from '@/services/PassengerAPIServices'
import type { AxiosError } from 'axios'
import nProgress from 'nprogress'

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
          !to.query?.page ||
          parseInt(to.query?.page as string) < 1 ||
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
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const passengerStore = usePassengerStore()
        passengerStore.resetPassenger()
        nProgress.set(0.4)
        PassengerAPIServices.getPassenger(id)
          .then((res) => {
            passengerStore.setPassenger(res.data)
          })
          .catch((err: AxiosError) => {
            if (err.response && err.response.status === 404) {
              return { name: '404-resource', params: { resource: 'passenger' } }
            } else if (err.code === 'ERR_NETWORK') return { name: 'network-error' }
          })
      },
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
        }
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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else return { top: 0 }
  }
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
