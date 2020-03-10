<template lang="pug">
  div
    ArticleList(:posts="posts")
    Pagination(:list="paginationList", :par="6", :currentIndex="currentIndex" path="/blog/page/" firstPath="/blog/")
    div(:class="$style.pager")
      BackToButton(text="TOP" href="/")
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'

import ArticleList from '../../components/organisms/ArticleList.vue'
import Pagination from '../../components/molecules/Pagination.vue'
import BackToButton from '../../components/atoms/BackToButton.vue'

import { sourceFileArray, fileMap } from '../../contents/blog/summary.json'

import Meta from '~/assets/mixins/meta'

export default {
  layout: 'baseLayout',
  components: {
    ArticleList,
    Pagination,
    BackToButton
  },
  mixins: [Meta],
  data () {
    return {
      meta: {
        title: `Blog | ${process.env.baseSiteName}`,
        description: 'BLOG 記事一覧',
        type: 'blog'
      },
      ldItems: [
        {
          '@type': 'CollectionPage',
          '@id': `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}/#webpage`,
          'url': `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}`,
          'name': `Blog | ${process.env.baseSiteName}`,
          'isPartOf': {
            '@id': process.env.baseUrl
          },
          'inLanguage': 'ja',
          'about': {
            '@id': `${process.env.baseUrl}/#org`
          },
          'description': 'BLOG 記事一覧'
        }
      ],
      breadcrumbs: [
        {
          text: process.env.baseDesc,
          url: '/'
        },
        {
          text: 'Blog',
          url: '/blog'
        }
      ]
    }
  },
  computed: {
    currentIndex () {
      return this.$route.params.id ? Number(this.$route.params.id) : 1
    }
  },
  asyncData ({ params }) {
    let index
    if (params.id) {
      index = params.id
    } else {
      index = 1
    }

    const posts = _.orderBy(fileMap, 'created_at', 'desc').slice((index - 1) * 6, index * 6)
    const paginationList = sourceFileArray
    return { posts, paginationList }
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
    return sourceFileArray[(index - 1) * 6]
  }
}
</script>

<style lang="stylus" module>
  .pager
    width 90%
    margin 50px auto 20px auto
</style>
