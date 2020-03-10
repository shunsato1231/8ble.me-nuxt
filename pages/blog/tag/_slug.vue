<template lang="pug">
  div
    h2(:class="$style.tagName")
      span(:class="$style.label") Tag:
      span(:class="$style.name") {{tagName}}
    nuxt-link(:class="$style.allPosts" to="/blog")
      span(:class="$style.arrow") ←
      span all posts
    ArticleList(:posts="posts")
    Pagination(:list="paginationList", :par="6", :currentIndex="currentIndex" :path="'/blog/tag/' + $route.params.slug + '/page/'" :firstPath="'/blog/tag/' + $route.params.slug")
    div(:class="$style.pager")
      BackToButton(text="INDEX" href="/blog")
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'

import ArticleList from '../../../components/organisms/ArticleList.vue'
import Pagination from '../../../components/molecules/Pagination.vue'
import BackToButton from '../../../components/atoms/BackToButton.vue'

import { fileMap } from '../../../contents/blog/summary.json'
import { tags } from '../../../contents/blog/archives.json'

import Meta from '~/assets/mixins/meta'

export default {
  layout: 'baseLayout',
  components: {
    ArticleList,
    Pagination,
    BackToButton
  },
  mixins: [Meta],
  computed: {
    currentIndex () {
      return this.$route.params.id ? Number(this.$route.params.id) : 1
    },
    ldItems () {
      return [
        {
          '@type': 'CollectionPage',
          '@id': `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}/#webpage`,
          'url': `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}`,
          'name': `Tag: ${this.tagName} | Blog | ${process.env.baseSiteName}`,
          'isPartOf': {
            '@id': process.env.baseUrl
          },
          'inLanguage': 'ja',
          'about': {
            '@id': `${process.env.baseUrl}/#org`
          },
          'description': `${process.env.baseSiteName} Blog ${this.tagName}タグの記事一覧`
        }
      ]
    },
    meta () {
      return {
        type: 'blog',
        title: `Tag: ${this.tagName} | Blog | ${process.env.baseSiteName}`,
        description: `${process.env.baseSiteName} Blog ${this.tagName}タグの記事一覧`
      }
    },
    breadcrumbs () {
      return [
        {
          text: process.env.baseDesc,
          url: '/'
        },
        {
          text: 'Blog',
          url: '/blog/'
        },
        {
          text: this.tagName,
          url: `/blog/tag/${this.$route.params.slug}`
        }
      ]
    }
  },
  asyncData ({ params }) {
    let index
    if (params.id) {
      index = params.id
    } else {
      index = 1
    }

    const tag = _(tags)
      .find(tag => tag.slug === params.slug)

    const tagName = tag.name
    const paginationList = tag.posts

    const posts = _(paginationList)
      .map((item) => { return fileMap[item] })
      .orderBy('created_at', 'desc')
      .slice((index - 1) * 6, index * 6)
      .value()

    return { tagName, paginationList, posts }
  },
  mounted () {
    this.setHeaderFlag(true)
    this.setArchiveFlag(true)
    this.setSidebarFlag(true)
  },
  methods: {
    ...mapActions('baseLayout', [
      'setHeaderFlag',
      'setSidebarFlag',
      'setArchiveFlag'
    ])
  },
  validate ({ params }) {
    let index
    if (params.id) {
      index = params.id
    } else {
      index = 1
    }

    const paginationList = _(tags)
      .find(tag => tag.slug === params.slug).posts

    return paginationList[(index - 1) * 6]
  }
}
</script>

<style lang="stylus" module>
  .tagName
    width 90%
    margin 0 auto
    font-family Rajdhani, sans-serif
    font-weight 700
    .label
      font-size(18px)
      margin-right 10px
    .name
      font-size(22px)
  .allPosts
    position relative
    display table
    margin-left 5%
    color #aaa
    font-family Rajdhani, sans-serif
    font-size(14px)
    line-height 14px
    padding 2px 0
    font-weight 400
    animateShatter()
    .arrow
      display inline-block
      margin-right 5px
      transform translateY(1px)
  .pager
    width 90%
    margin 50px auto 20px auto
</style>
