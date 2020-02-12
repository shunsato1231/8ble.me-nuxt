<template lang="pug">
  section(:class="$style.wrapper")
    h1(ref="title")
      div(v-for="str in titleSplit" ref="chars") {{str}}
    TypingText(:class="$style.type" @complete="changeText", :text="description" caretColor="#999", ref="typing")
    div(:class="$style.scrollDown" ref="scrollDown")
      span(ref="scrollDownText") Scroll Down
      div(:class="$style.bar" ref="scrollDownBar")
</template>

<script>
import gsap from 'gsap'

import TypingText from '../atoms/TypingText.vue'

export default {
  components: {
    TypingText
  },
  data () {
    return {
      title: 'Title',
      titleSplit: '',
      description: '',
      descriptions: [
        'description1, description1, description1, description1, description1',
        'description2, description2, description2, description2, description2',
        'description3, description3, description3, description3, description3'
      ],
      animation: '',
      count: 0,
      stopChangetext: false
    }
  },
  mounted () {
    this.createAnimation()
  },
  created () {
    this.titleSplit = this.title.split('')
  },
  methods: {
    createAnimation () {
      this.animation = gsap.timeline({ paused: true, onReverseComplete: this.reverseFunction })
      this.animation.add(this.animateTitle)
        .fromTo(this.$refs.typing.$el, { opacity: 0 }, { opacity: 1, duration: 2 }, '+=2')
        .add(this.animateTyping, 2)
        .fromTo(this.$refs.scrollDownBar, { height: 0 }, { height: 100, duration: 0.5 }, '-=1.8')
        .fromTo(this.$refs.scrollDownText, { opacity: 0 }, { opacity: 1, duration: 1 }, '-=1')
    },
    animationReverse () {
      this.animation.timeScale(2).reverse()
    },
    animateTitle () {
      const tl = gsap.timeline()
      const chars = this.$refs.chars
      const centerIndex = Math.floor(chars.length / 2)

      for (let i = 0; i < chars.length; i++) {
        tl.fromTo(chars[i],
          { x: (i - centerIndex) * 40, opacity: 0, scale: 1.5, ease: 'Bounce.easeOut' },
          { x: 0, opacity: 1, scale: 1, ease: 'Bounce.easeOut', duration: 1.8 },
          i * 0.1
        )
      }

      tl.play()
    },
    animateTyping () {
      this.stopChangetext = false
      this.count = 0
      this.description = this.descriptions[0]
    },
    changeText () {
      if (this.stopChangetext) {
        return
      }

      if (this.count < this.descriptions.length - 1) {
        this.count++
      }

      this.description = this.descriptions[this.count]
    },
    reverseFunction () {
      this.$refs.typing.stop()
      this.stopChangetext = true
      this.description = ''
      this.$refs.typing.stop()
    }
  }
}
</script>

<style lang="stylus" module>
.wrapper
  display flex
  flex-direction column
  justify-content center
  padding 8%
  h1
    display flex
    font-size 8vw
    line-height 8vw
    +breakpoint(middle)
      font-size 13vw
      line-height 13vw
    +breakpoint(small)
      font-size 20vw
      line-height 20vw
    font-family 'Rajdhani', sans-serif
  .type
    font-size 2vw
    +breakpoint(middle)
      font-size 3vw
    +breakpoint(small)
      font-size 16px
      line-height 20px
      height 40px
    height 20px
    font-family 'Rajdhani', sans-serif
    font-weight 600
    color #999
  .scrollDown
    position fixed
    left 3%
    bottom 0
    writing-mode: vertical-lr;
    font-size(18px)
    font-family 'Rajdhani', sans-serif
    font-weight 400
    padding-bottom 110px
  .bar
    background #000
    position absolute
    display block
    content ''
    width 2px
    height 100px
    left 10px
    bottom 0
</style>
