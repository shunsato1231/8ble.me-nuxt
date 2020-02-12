<template lang="pug">
  nuxt-link(:class="$style.button" :to="href" :style="{width:width + 'px', height:height + 'px'}" @mouseover.native="mouseover", @mouseleave.native="mouseleave")
    span(:class="$style.str" v-for="str in textArray" ref="str") {{str}}
    div(:class="$style.bg" :style="{width:width + 'px', height:height + 'px'}" ref="bg")
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
    },
    width: {
      type: Number,
      default: 200,
      required: false
    },
    height: {
      type: Number,
      default: 40,
      required: false
    }
  },
  data () {
    return {
      animation: ''
    }
  },
  computed: {
    textArray () {
      return this.text.split('')
    }
  },
  mounted () {
    this.animation = new TimelineMax({ paused: true })
    this.animation.fromTo(this.$refs.bg, 0.3,
      { width: '0' },
      { width: '100%' },
      '#start'
    )
    this.animation.staggerFromTo(this.$refs.str, 0.2,
      { color: '#000' },
      { color: '#fff', rotationX: 360 },
      0.05,
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
  .button
    position relative
    display flex
    align-items center
    justify-content center
    border 3px solid #000
    font-size(15px)
    font-weight 600
    font-family 'Rajdhani', sans-serif
    &:hover
      text-decoration: none
    .bg
      position absolute
      display block
      top -3px
      left 0px
      z-index: -1;
      background #000
</style>
