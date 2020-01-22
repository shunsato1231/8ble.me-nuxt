<template lang="pug">
  .post(v-html="bodyHtml")
</template>

<script>
import { sourceFileArray } from '../../../../../contents/blog/summary.json'

export default {
  data () {
    return {
    }
  },
  validate ({ params }) {
    return sourceFileArray.includes(`contents/blog/${params.year}-${params.month}-${params.slug}.md`)
  },
  async asyncData ({ params }) {
    const post = await require(`~/contents/blog/json/${params.year}-${params.month}-${params.slug}.json`)
    return Object.assign({}, post)
  }
  // head () {
  //   const url = `${this.url}/blog/${this.params.year}/${this.params.month}/${this.params.slug}/`
  // }
}
</script>
