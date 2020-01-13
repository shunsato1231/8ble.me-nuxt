<template lang="pug">
  ul
    li(v-for="(anchor, index) in anchorList" :key="index")
      nuxt-link(:to="anchor" :class="{'active': activeSectionIndex == index}") {{index}}
</template>

<script>
export default {
  props: {
    anchorList: {
      type: Array,
      required: true
    },
    activeSectionIndex: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
  li
    text-align center
    font-family 'Rajdhani', sans-serif
    a
      color #ccc
      font-weight 400
      font-size(20px)
      &:hover
        text-decoration none
        color #000
        font-size(30px)
        font-weight 600
    .active
      position relative
      display block
      width 100%
      font-size(30px)
      font-weight 600
      color #000
      &::before
        position absolute
        content ''
        width 20px
        height 1px
        transform translateY(-50%)
        background #000
        left -22px
        top 50%
</style>
