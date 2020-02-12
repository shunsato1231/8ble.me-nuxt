<template lang="pug">
  .wrapper
    template(v-for="post in posts")
      Article(:post="post")

</template>

<script>
import _ from 'lodash'
import Article from '../../components/molecules/Article.vue'

export default {
  components: {
    Article
  },
  created () {
    console.log(this.posts)
  },
  asyncData ({ params }) {
    const json = require(`~/contents/blog/summary.json`)
    const posts = _.orderBy(json.fileMap, 'created_at', 'desc').slice(0, 6)
    return { posts }
  }
}
</script>
