import webpack from 'webpack'

require('dotenv').config()
const { BASE_SITE_NAME, BASE_DESC, BASE_URL, BASE_IMAGE, BASE_AUTHOR, BASE_TWITTER_SITE, BASE_TWITTER_CREATOR, BASE_FACEBOOK_ID, BASE_PROFILE, BASE_NAME, BASE_PROFILE_IMG } = process.env

const baseSiteName =  BASE_SITE_NAME || 'SiteName'
const baseDesc = BASE_DESC || 'description'
const baseUrl =  BASE_URL || 'http://localhost:3000'
const baseImage = BASE_IMAGE || 'hoge.jpg'
const baseAuthor = BASE_AUTHOR || 'unknown'
const baseTwitterSite = BASE_TWITTER_SITE || 'site'
const baseTwitterCreator = BASE_TWITTER_CREATOR || 'creator'
const baseFacebookId = BASE_FACEBOOK_ID || 'fbID'
const baseProfile = BASE_PROFILE || 'profile'
const baseName = BASE_NAME || 'name'
const baseProfileImg = BASE_PROFILE_IMG || 'profile.png'
export default {
  mode: 'universal',
  loading: '~/components/atoms/Loading.vue',
  env: {
    baseSiteName,
    baseDesc,
    baseUrl,
    baseImage,
    baseAuthor,
    baseTwitterSite,
    baseTwitterCreator,
    baseFacebookId,
    baseProfile,
    baseName,
    baseProfileImg
  },
  head: {
    title: baseSiteName,
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
    '@/mixins/mixins',
    '@/plugins/filter',
    '@/plugins/markdown-it',
    '@/plugins/prism',
    '@/plugins/jsonld'
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
