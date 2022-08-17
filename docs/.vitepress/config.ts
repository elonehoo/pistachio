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
      pattern: 'https://github.com/elonehoo/vue-hooks/tree/main/docs/:path',
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
      { text: 'Composabl', link: '/composable/mouse' },
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
              text: 'Why vue-hooks',
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
              link: '/composable/mouse',
            },
            {
              text: 'mouseMove',
              link: '/composable/mouseMove',
            },
            {
              text: 'resize',
              link: '/composable/resize',
            },
            {
              text: 'scroll',
              link: '/composable/scroll',
            },
            {
              text: 'outsidePress',
              link: '/composable/outsidePress',
            },
            {
              text: 'mouseInElement',
              link: '/composable/mouseInElement',
            },
          ],
        },
        {
          text: 'Data',
          items: [
            {
              text: 'now',
              link: '/composable/now',
            },
            {
              text: 'date',
              link: '/composable/date',
            },
            {
              text: 'performance',
              link: '/composable/performance',
            },
          ],
        },
        {
          text: 'Format',
          items: [
            {
              text: 'format',
              link: '/composable/format',
            },
            {
              text: 'path',
              link: '/composable/path',
            },
          ],
        },
        {
          text: 'Breakpoint',
          items: [
            {
              text: 'breakpoint',
              link: '/composable/breakpoint',
            },
            {
              text: 'chrome',
              link: '/composable/chrome',
            },
          ],
        },
        {
          text: 'Misc',
          items: [
            {
              text: 'matchMedia',
              link: '/composable/matchMedia',
            },
          ],
        },
      ],
    },
  },
})
