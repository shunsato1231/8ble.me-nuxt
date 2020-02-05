<template lang="pug">
article(:class="$style.article")
  header
    ul
      li(v-for = "tag in post.tags")
        i(class="fas fa-tag" style="margin-right: 5px")
        span {{tag}}
    figure(v-if="post.thumbnail")
      img(:src="post.thumbnail")
    div(:class="$style.category")
      i(class="fas fa-folder" style="margin-right: 5px")
      span {{post.category}}
  div(:class="$style.body")
    h1 {{post.title}}
    div {{post.description}}
  footer
    span posted in
    time(:datetime = "post.date") {{post.created_at | formatDate}}
</template>

<script>
export default {
  components: {
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" module>
.article
  position relative
  width 280px
  height 380px
  background #f1f1f1
  border-radius 5px
  margin 30px
  font-weight normal

  &::before
    position absolute
    content 'Read\0020More'
    width 150px
    height 30px
    border solid 2px #fff
    opacity 0
    top 50%
    margin-top -15px
    left 50%
    margin-left -75px
    z-index 99
    text-align center
    font-size(14px)
    line-height 30px
    color #fff
    transition 0.5s

  &::after
    position absolute
    content ''
    width 280px
    height 380px
    background-color #000
    border-radius 5px
    opacity 0
    left 0
    top 0
    right 0
    bottom 0
    z-index 98
    transition 0.5s

  &:hover
    &::before
      opacity 1
    &::after
      opacity 0.6

  header
    position relative
    height 200px
    color #fff
    background #000
    border-radius 5px 5px 0 0

  figure
    overflow hidden
    position absolute
    right 15px
    top 15px
    width 120px
    height 120px
    border-radius 50%
    border 3px solid #fff

    img
      width 120px
      height 120px
  ul
    position absolute
    top 15px
    left 15px
    font-size(16px)
    li
      i
        vertical-align middle
        font-size(14px)
        margin-right 5px

  footer
    border-top 1px solid #ddd
    height 25px
    line-height 25px
    padding 0 10px
    color #a2a2a2
    span
      margin-right 5px

.category
  position absolute
  z-index 97
  bottom 15px
  right 0
  display table
  background-color #6e6e6e
  padding 5px 5px 5px 10px
  border-radius 18px 0 0 18px
  color #bcbcbc
  font-size(14px)
  i
    margin-right 5px

.body
  height 150px
  margin-bottom 5px
  overflow hidden
  h1
    margin-top 10px
    font-size(18px)
    font-weight 400
    padding 0 15px
  div
    margin 15px
    font-size(14px)
    color #888
    background linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #f1f1f1 50%, #f1f1f1 100%)
    overflow-wrap break-word
</style>
