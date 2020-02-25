<template lang="pug">
  div
    h2(:class="$style.archiveTitle")
      span(:class="$style.label") Archive:
      span(:class="$style.name") {{$route.params.year}}.{{$route.params.month}}
    nuxt-link(:class="$style.allPosts" to="/blog")
      span(:class="$style.arrow") ←
      span all posts
    ArticleList(:posts="posts")
    Pagination(:list="paginationList", :par="6", :currentIndex="currentIndex" :path="'/blog/' + $route.params.year + '/' + $route.params.month + '/page/'" :firstPath="'/blog/' + $route.params.year + '/' + $route.params.month")
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'

import ArticleList from '../../../../components/organisms/ArticleList.vue'
import Pagination from '../../../../components/molecules/Pagination.vue'

import { fileMap } from '../../../../contents/blog/summary.json'
import { monthly } from '../../../../contents/blog/archives.json'

export default {
  layout: 'baseLayout',
  components: {
    ArticleList,
    Pagination
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

    const paginationList = monthly[params.year][params.month]

    const posts = _(paginationList)
      .map((item) => { return fileMap[item] })
      .orderBy('created_at', 'desc')
      .slice((index - 1) * 6, index * 6)
      .value()

    return { paginationList, posts }
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

    const paginationList = monthly[params.year][params.month]

    return paginationList[(index - 1) * 6]
  }
}
</script>

<style lang="stylus" module>
  .archiveTitle
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
</style>
