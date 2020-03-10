<template lang="pug">
  div(:class="$style.wrapper" @mouseover="mouseover", @mouseleave="mouseleave")
    a(target="_blank" :href="href")
      i(:class="iconClass")
      span {{text}}
    div(:class="$style.bg" ref="bg" :style="{background: hoverColor}")
</template>

<script>
import { TimelineMax } from 'gsap'

export default {
  props: {
    iconClass: {
      type: Array,
      required: false,
      default: () => (['fa', 'icon'])
    },
    text: {
      type: String,
      required: false,
      default: 'シェアする'
    },
    href: {
      type: String,
      required: true
    },
    hoverColor: {
      type: String,
      required: false,
      default: '#000'
    }
  },
  data () {
    return {
      animation: ''
    }
  },
  mounted () {
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
    width 110px
    height 25px
    background-color #2e2e2e
    padding 5px
    border-radius 3px
    a
      display flex
      align-items center
      justify-content center
      position absolute
      z-index 1
      top 0
      bottom 0
      left 0
      width 100%
      height 100%
      font-size(11px)
      color #fff
      i
        font-size(16px)
        margin-right 8px
        color #fff
      &:hover
        text-decoration none
    .bg
      position absolute
      z-index 0
      top 0
      left 0
      border-radius 3px
      height 100%
</style>

<style lang="stylus">
.fa-hatena:before
  content "B!"
  font-family Verdana
  font-weight bold
</style>
