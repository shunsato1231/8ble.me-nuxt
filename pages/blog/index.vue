<template lang="pug">
  div
    ArticleList(:posts="posts")
    Pagination(:list="articleList", :par="6", :currentIndex="currentIndex" path="/blog/page/" firstPath="/blog/")
</template>

<script>
import _ from 'lodash'
import ArticleList from '../../components/organisms/ArticleList.vue'
import Pagination from '../../components/molecules/Pagination.vue'
import { sourceFileArray } from '../../contents/blog/summary.json'

export default {
  layout: 'headerLayout',
  components: {
    ArticleList,
    Pagination
  },
  data () {
    return {
      articleList: []
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

    const json = require(`~/contents/blog/summary.json`)
    const posts = _.orderBy(json.fileMap, 'created_at', 'desc').slice((index - 1) * 6, index * 6)
    return { posts }
  },
  created () {
    this.articleList = sourceFileArray
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
