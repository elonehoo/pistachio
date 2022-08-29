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
import matchMedia from '~/pages/misc/matchMedia.vue'
import breakpoint from '~/pages/breakpoint/breakpoint.vue'
import mode from '~/pages/misc/model/mode.vue'
import interval from '~/pages/misc/interval.vue'
import lockScroll from '~/pages/misc/lockScroll.vue'
import broadcastChannel from '~/pages/web/broadcastChannel.vue'
import sharedRef from '~/pages/misc/sharedRef.vue'
import refShared from '~/pages/misc/refShared.vue'
import localStorage from '~/pages/storage/localStorage.vue'
import sessionStorage from '~/pages/storage/sessionStorage.vue'
import storage from '~/pages/storage/storage.vue'
import pagination from '~/pages/pagination/pagination.vue'

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
    {
      path: '/breakpoint',
      component: breakpoint,
    },
    {
      path: '/mode',
      component: mode,
    },
    {
      path: '/interval',
      component: interval,
    },
    {
      path: '/lockScroll',
      component: lockScroll,
    },
    {
      path: '/broadcastChannel',
      component: broadcastChannel,
    },
    {
      path: '/sharedRef',
      component: sharedRef,
    },
    {
      path: '/refShared',
      component: refShared,
    },
    {
      path: '/localStorage',
      component: localStorage,
    },
    {
      path: '/sessionStorage',
      component: sessionStorage,
    },
    {
      path: '/storage',
      component: storage,
    },
    {
      path: '/pagination',
      component: pagination,
    },
    { path: '/:pathMatch(.*)*', component: All },
  ],
})

export default router
