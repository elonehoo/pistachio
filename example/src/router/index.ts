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
import arrayPagination from '~/pages/pagination/arrayPagination.vue'
import promise from '~/pages/promise/promise.vue'
import cancellablePromise from '~/pages/promise/cancellablePromise.vue'
import fetch from '~/pages/web/fetch.vue'
import webSocket from '~/pages/web/webSocket.vue'
import intersectionObserver from '~/pages/web/intersectionObserver.vue'
import networkInformation from '~/pages/web/networkInformation.vue'
import retry from '~/pages/promise/retry.vue'
import online from '~/pages/web/online.vue'
import clipboard from '~/pages/web/clipboard.vue'
import pageVisibility from '~/pages/web/pageVisibility.vue'
import language from '~/pages/web/language.vue'
import geolocation from '~/pages/web/geolocation.vue'
import cssVariables from '~/pages/web/cssVariables.vue'
import worker from '~/pages/web/worker.vue'
import workerFunction from '~/pages/web/workerFunction.vue'
import share from '~/pages/web/share.vue'
import timeout from '~/pages/web/timeout.vue'
import validation from '~/pages/validation/validation.vue'
import timeline from '~/pages/state/timeline.vue'
import undo from '~/pages/state/undo.vue'
import valueSync from '~/pages/state/valueSync.vue'
import title from '~/pages/meta/title.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/title',
      component: title,
    },
    {
      path: '/valueSync',
      component: valueSync,
    },
    {
      path: '/undo',
      component: undo,
    },
    {
      path: '/timeline',
      component: timeline,
    },
    {
      path: '/validation',
      component: validation,
    },
    {
      path: '/timeout',
      component: timeout,
    },
    {
      path: '/share',
      component: share,
    },
    {
      path: '/workerFunction',
      component: workerFunction,
    },
    {
      path: '/worker',
      component: worker,
    },
    {
      path: '/cssVariables',
      component: cssVariables,
    },
    {
      path: '/geolocation',
      component: geolocation,
    },
    {
      path: '/language',
      component: language,
    },
    {
      path: '/pageVisibility',
      component: pageVisibility,
    },
    {
      path: '/clipboard',
      component: clipboard,
    },
    {
      path: '/online',
      component: online,
    },
    {
      path: '/intersectionObserver',
      component: intersectionObserver,
    },
    {
      path: '/retry',
      component: retry,
    },
    {
      path: '/networkInformation',
      component: networkInformation,
    },
    {
      path: '/fetch',
      component: fetch,
    },
    {
      path: '/webSocket',
      component: webSocket,
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
    {
      path: '/arrayPagination',
      component: arrayPagination,
    },
    {
      path: '/promise',
      component: promise,
    },
    {
      path: '/cancellablePromise',
      component: cancellablePromise,
    },
    { path: '/:pathMatch(.*)*', component: All },
  ],
})

export default router
