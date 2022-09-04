import { defineConfig } from 'vitepress'
import { version } from '../../package.json'
import {
  description,
  discord,
  font,
  github,
  name,
  releases,
  twitter,
} from './meta'

export default defineConfig({
  lang: 'en-US',
  title: name,
  description,
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { property: 'og:title', content: name }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { name: 'twitter:title', content: name }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { href: font, rel: 'stylesheet' }],
    ['link', { rel: 'mask-icon', href: '/logo.svg', color: '#ffffff' }],
  ],
  lastUpdated: true,
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    editLink: {
      pattern: 'https://github.com/elonehoo/pistachio/tree/main/docs/:path',
      text: 'Suggest changes to this page',
    },
    socialLinks: [
      { icon: 'twitter', link: twitter },
      { icon: 'discord', link: discord },
      { icon: 'github', link: github },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-PRESENT Elone Hoo',
    },
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Composabl', link: '/composable/event/mouse' },
      {
        text: `v${version}`,
        items: [
          {
            text: 'Release Notes ',
            link: releases,
          },
        ],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            {
              text: 'Why pistachio',
              link: '/guide/why',
            },
            {
              text: 'Installation',
              link: '/guide/',
            },
            {
              text: 'Usage',
              link: '/guide/usage',
            },
          ],
        },
      ],
      '/composable/': [
        {
          text: 'Event',
          items: [
            {
              text: 'mouse',
              link: '/composable/event/mouse',
            },
            {
              text: 'mouseMove',
              link: '/composable/event/mouseMove',
            },
            {
              text: 'resize',
              link: '/composable/event/resize',
            },
            {
              text: 'scroll',
              link: '/composable/event/scroll',
            },
            {
              text: 'outsidePress',
              link: '/composable/event/outsidePress',
            },
            {
              text: 'mouseInElement',
              link: '/composable/event/mouseInElement',
            },
          ],
        },
        {
          text: 'Data',
          items: [
            {
              text: 'now',
              link: '/composable/data/now',
            },
            {
              text: 'date',
              link: '/composable/data/date',
            },
            {
              text: 'performance',
              link: '/composable/data/performance',
            },
          ],
        },
        {
          text: 'Format',
          items: [
            {
              text: 'format',
              link: '/composable/format/format',
            },
            {
              text: 'path',
              link: '/composable/format/path',
            },
          ],
        },
        {
          text: 'Breakpoint',
          items: [
            {
              text: 'breakpoint',
              link: '/composable/breakpoint/breakpoint',
            },
            {
              text: 'chrome',
              link: '/composable/breakpoint/chrome',
            },
          ],
        },
        {
          text: 'Misc',
          items: [
            {
              text: 'sharedRef',
              link: '/composable/misc/sharedRef',
            },
            {
              text: 'refShared',
              link: '/composable/misc/refShared',
            },
            {
              text: 'matchMedia',
              link: '/composable/misc/matchMedia',
            },
            {
              text: 'model',
              link: '/composable/misc/model',
            },
            {
              text: 'interval',
              link: '/composable/misc/interval',
            },
            {
              text: 'injectFactory',
              link: '/composable/misc/inject',
            },
            {
              text: 'lockScroll',
              link: '/composable/misc/lockScroll',
            },
            {
              text: 'refDebounced',
              link: '/composable/misc/refDebounced',
            },
          ],
        },
        {
          text: 'Storage',
          items: [
            {
              text: 'webStorage',
              link: '/composable/storage/webStorage',
            },
            {
              text: 'storage',
              link: '/composable/storage/storage',
            },
            {
              text: 'localStorage',
              link: '/composable/storage/localStorage',
            },
            {
              text: 'sessionStorage',
              link: '/composable/storage/sessionStorage',
            },
          ],
        },
        {
          text: 'Pagination',
          items: [
            {
              text: 'pagination',
              link: '/composable/pagination/pagination',
            },
            {
              text: 'arrayPagination',
              link: '/composable/pagination/arrayPagination',
            },
          ],
        },
        {
          text: 'Promise',
          items: [
            {
              text: 'promise',
              link: '/composable/promise/promise',
            },
            {
              text: 'lazyPromise',
              link: '/composable/promise/lazyPromise',
            },
            {
              text: 'cancellablePromise',
              link: '/composable/promise/cancellablePromise',
            },
            {
              text: 'retry',
              link: '/composable/promise/retry',
            },
          ],
        },
        {
          text: 'Web',
          items: [
            {
              text: 'fetch',
              link: '/composable/web/fetch',
            },
            {
              text: 'webSocket',
              link: '/composable/web/webSocket',
            },
            {
              text: 'intersectionObserver',
              link: '/composable/web/intersectionObserver',
            },
            {
              text: 'networkInformation',
              link: '/composable/web/networkInformation',
            },
            {
              text: 'online',
              link: '/composable/web/online',
            },
            {
              text: 'clipboard',
              link: '/composable/web/clipboard',
            },
            {
              text: 'pageVisibility',
              link: '/composable/web/pageVisibility',
            },
            {
              text: 'language',
              link: '/composable/web/language',
            },
            {
              text: 'broadcastChannel',
              link: '/composable/web/broadcastChannel',
            },
            {
              text: 'geolocation',
              link: '/composable/web/geolocation',
            },
          ],
        },
      ],
    },
  },
})
