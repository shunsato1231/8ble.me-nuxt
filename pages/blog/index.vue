<template lang="pug">
  .wrapper
    template(v-for="post in posts")
      Article(:post="post")

</template>

<script>
import _ from 'lodash'
import Article from '../../components/molecules/Article.vue'
import { sourceFileArray } from '../../contents/blog/summary.json'

export default {
  layout: 'headerLayout',
  components: {
    Article
  },
  validate ({ params }) {
    let index
    if (params.id) {
      index = params.id
    } else {
      index = 1
    }
    return sourceFileArray[(index - 1) * 6]
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
  }
}
</script>
