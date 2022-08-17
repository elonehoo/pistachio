import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/pages/index.vue'
import All from '~/pages/all/all.vue'
import mouse from '~/pages/event/mouse.vue'
import mouseMove from '~/pages/event/mouseMove.vue'
import resize from '~/pages/event/resize.vue'
import scroll from '~/pages/event/scroll.vue'
import outsidePress from '~/pages/event/outsidePress.vue'
import mouseInElement from '~/pages/dom/mouseInElement.vue'
import now from '~/pages/date/now.vue'
import date from '~/pages/date/date.vue'
import performance from '~/pages/date/performance.vue'
import format from '~/pages/format/format.vue'
import path from '~/pages/format/path.vue'
import matchMedia from '~/pages/breakpoint/matchMedia.vue'

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
    {
      path: '/mouseInElement',
      component: mouseInElement,
    },
    {
      path: '/now',
      component: now,
    },
    {
      path: '/date',
      component: date,
    },
    {
      path: '/performance',
      component: performance,
    },
    {
      path: '/format',
      component: format,
    },
    {
      path: '/path',
      component: path,
    },
    {
      path: '/matchMedia',
      component: matchMedia,
    },
    { path: '/:pathMatch(.*)*', component: All },
  ],
})

export default router
