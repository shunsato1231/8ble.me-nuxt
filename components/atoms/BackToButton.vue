<template lang="pug">
div(:class="$style.wrapper" @mouseover="mouseover", @mouseleave="mouseleave" :style="{width: width + 'px', height: height + 'px'}")
  nuxt-link(:to="href" :class="$style.button" ref="button")
    i.fas.fa-long-arrow-alt-left
    span BACK TO {{text}}
  div(:class="$style.bg" ref="bg")
</template>

<script>
import { TimelineMax } from 'gsap'

export default {
  props: {
    text: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      animation: '',
      width: '',
      height: ''
    }
  },
  mounted () {
    this.width = this.$refs.button.$el.offsetWidth
    this.height = this.$refs.button.$el.offsetHeight

    this.animation = new TimelineMax({ paused: true })
    this.animation.fromTo(this.$refs.bg, 0.3,
      { width: '0', opacity: '0' },
      { width: '100%', opacity: '1' },
      '#start'
    )
  },
  methods: {
    mouseover () {
      this.animation.play()
    },
    mouseleave () {
      this.animation.reverse()
    }
  }
}
</script>

<style lang="stylus" module>
.wrapper
  position relative
  .button
    display inline-block
    position absolute
    z-index 1
    white-space: nowrap
    height 40px
    padding 10px 15px 10px 55px
    color #aaa
    border solid 2px #aaa
    border-radius 2px
    font-size 12px
    font-weight 600
    i
      position absolute
      left 15px
      top 50%
      height 15px
      line-height 17px
      margin-top -7.5px
      padding-right 15px
      font-size(14px)
      transition-property background-color
      transition-duration 0.3s
      &:after
        position absolute
        content ''
        width 1.5px
        height 12px
        right 0
        top 50%
        margin-top -6px
        background-color #ccc
    &:hover
      text-decoration none
      color #fff
      i
        color #fff
        &:after
          background #fff
  .bg
    position absolute
    z-index 0
    top 0
    left 0
    border-radius 3px
    height 100%
    background #aaa
</style>
