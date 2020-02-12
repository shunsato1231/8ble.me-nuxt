<template lang="pug">
  ul(:class="[$style.nav, { [$style.flex]: directionRow }]")
    li(v-for="(anchor, index) in anchorList" :key="index")
      nuxt-link(:to="anchor" :class="{[$style.active]: activeSectionIndex == index}") {{index}}
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
    },
    directionRow: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="stylus" module>
  .nav
    text-align center
    font-family 'Rajdhani', sans-serif
    margin-left 22px
    a
      transition .5s
      color #ccc
      font-weight 400
      font-size(20px)
      +breakpoint(small)
        font-size(15px)
      &:hover
        cursor pointer
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
      +breakpoint(small)
        font-size(25px)
      &::before
        position absolute
        content ''
        width 20px
        height 1px
        transform translateY(-50%)
        background #000
        left -22px
        top 50%
  .flex
    display flex
    justify-content center
    align-items flex-end
    margin-left 0
    margin-bottom 10px
    li
      +breakpoint(middle)
        margin-left 60px
      +breakpoint(small)
        margin-left 30px
      &:nth-child(2)
        a
          padding-right 1px
    .active
      margin-bottom 10px
      +breakpoint(small)
        margin-bottom 5px
      &::before
        content ''
        width 2px
        transform translateX(-50%)
        top auto
        left 50%
        height 30px
        bottom -20px
        +breakpoint(small)
          height 20px
          bottom -15px
</style>
