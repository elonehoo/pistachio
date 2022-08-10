import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/pages/index.vue'
import All from '~/pages/all/all.vue'
import mouse from '~/pages/event/mouse.vue'
import mouseMove from '~/pages/event/mouseMove.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/mouse',
      component: mouse,
    },
    {
      path: '/mouseMove',
      component: mouseMove,
    },
    { path: '/:pathMatch(.*)*', component: All },
  ],
})

export default router
