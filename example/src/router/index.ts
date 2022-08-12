import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/pages/index.vue'
import All from '~/pages/all/all.vue'
import mouse from '~/pages/event/mouse.vue'
import mouseMove from '~/pages/event/mouseMove.vue'
import resize from '~/pages/event/resize.vue'
import scroll from '~/pages/event/scroll.vue'
import outsidePress from '~/pages/event/outsidePress.vue'

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
    {
      path: '/resize',
      component: resize,
    },
    {
      path: '/scroll',
      component: scroll,
    },
    {
      path: '/outsidePress',
      component: outsidePress,
    },
    { path: '/:pathMatch(.*)*', component: All },
  ],
})

export default router
