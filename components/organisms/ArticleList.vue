<template lang="pug">
  div(:class="$style.wrapper")
    template(v-for="post in posts")
      Article(:class="$style.article" :post="post")
</template>

<script>
import Article from '../molecules/Article.vue'

export default {
  components: {
    Article
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="stylus" module>
.wrapper
  padding: 0;
  display flex
  flex-flow row wrap
  margin 0 auto
  +breakpoint(small)
    width 310px
  +breakpoint(middle)
    width 660px
  +breakpoint(large)
    width 990px

.article
  margin 30px
  +breakpoint(small)
    margin 20px
</style>
