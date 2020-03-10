<template lang="pug">
  ol(:class="$style.breadcrumbs")
    li(v-for="(item, index) in breadcrumbs")
      template(v-if="index !== breadcrumbs.length - 1")
        nuxt-link(:to="item.url") {{item.text}}
        span /
      span(v-else) {{item.text}}
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="stylus" module>
.breadcrumbs
  list-style none
  display flex
  font-size(10px)
  color #888
  &:before
    color #888
    margin-right 3px
    margin-top 2px

    font-family "Font Awesome 5 Free"
    content "\f0c1"
    -moz-osx-font-smoothing grayscale
    -webkit-font-smoothing antialiased
    display inline-block
    font-style normal;
    font-variant normal
    text-rendering auto
    line-height 1
    font-weight 900
  a
    font-weight normal
    color #2e2e2e
    margin-right 5px
  span
    margin-right 5px
</style>
