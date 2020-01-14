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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    stylus: [
      '~/assets/style/reset.styl',
      '~/assets/style/_mixins.styl',
    ]
  },
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ]
  },
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'about',
        path: '/about',
        component: resolve(__dirname, 'pages/index.vue')
      },
      {
        name: 'blog',
        path: '/blog',
        component: resolve(__dirname, 'pages/index.vue')
      },
      {
        name: 'contact',
        path: '/contact',
        component: resolve(__dirname, 'pages/index.vue')
      }
      )
    }
  }
}
