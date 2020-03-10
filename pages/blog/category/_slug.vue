<template lang="pug">
  div
    h2(:class="$style.categoryName")
      span(:class="$style.label") Category:
      span(:class="$style.name") {{categoryName}}
    nuxt-link(:class="$style.allPosts" to="/blog")
      span(:class="$style.arrow") ←
      span all posts
    ArticleList(:posts="posts")
    Pagination(:list="paginationList", :par="6", :currentIndex="currentIndex" :path="'/blog/category/' + $route.params.slug + '/page/'" :firstPath="'/blog/category/' + $route.params.slug")
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
import { categories } from '../../../contents/blog/archives.json'

export default {
  layout: 'baseLayout',
  components: {
    ArticleList,
    Pagination,
    BackToButton
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

    const category = _(categories)
      .find(category => category.slug === params.slug)

    const categoryName = category.name
    const paginationList = category.posts

    const posts = _(paginationList)
      .map((item) => { return fileMap[item] })
      .orderBy('created_at', 'desc')
      .slice((index - 1) * 6, index * 6)
      .value()

    return { categoryName, paginationList, posts }
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

    const paginationList = _(categories)
      .find(category => category.slug === params.slug).posts

    return paginationList[(index - 1) * 6]
  }
}
</script>

<style lang="stylus" module>
  .categoryName
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
