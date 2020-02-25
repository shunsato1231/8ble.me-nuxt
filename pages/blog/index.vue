<template lang="pug">
  div
    ArticleList(:posts="posts")
    Pagination(:list="paginationList", :par="6", :currentIndex="currentIndex" path="/blog/page/" firstPath="/blog/")
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'

import ArticleList from '../../components/organisms/ArticleList.vue'
import Pagination from '../../components/molecules/Pagination.vue'

import { sourceFileArray, fileMap } from '../../contents/blog/summary.json'

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
