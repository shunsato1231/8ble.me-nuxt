import webpack from 'webpack'

export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css' }
    ]
  },
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-webfontloader'
  ],
  styleResources: {
    stylus: [
      '~/assets/style/mixins.styl',
      '~assets/style/mediaquery.styl'
    ]
  },
  webfontloader: {
    google: {
      families: ['Rajdhani:400,500,600,700,800']
    }
  },
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ]
  },
  plugins: [
    '@/plugins/mixins',
    '@/plugins/filter',
    '@/plugins/markdown-it',
    '@/plugins/prism'
  ],
  router: {
    extendRoutes (routes, resolve) {
      routes.unshift({
        path: '/blog/page/:id',
        component: resolve(__dirname, 'pages/blog/index.vue')
      },
      {
        path: '/blog/category/:slug/page/:id',
        component: resolve(__dirname, 'pages/blog/category/_slug.vue')
      },
      {
        path: '/blog/tag/:slug/page/:id',
        component: resolve(__dirname, 'pages/blog/tag/_slug.vue')
      },
      {
        path: '/blog/:year/page/:id',
        component: resolve(__dirname, 'pages/blog/_year/index.vue')
      },
      {
        path: '/blog/:year/:month/page/:id',
        component: resolve(__dirname, 'pages/blog/_year/_month/index.vue')
      }
      )
    }
  }
}
