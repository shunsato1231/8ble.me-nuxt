<template lang="pug">
  section
    h1(ref="title")
      div(v-for="str in titleSplit" ref="chars") {{str}}
    TypingText.type(@complete="changeText", :text="description" caretColor="#999", ref="typing")
    .scrollDown Scroll Down
</template>

<script>
import { TimelineMax, Bounce } from 'gsap'

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
      this.animation = new TimelineMax({ paused: true, onReverseComplete: this.reverseFunction })
      this.animation.add(this.animateTitle)
        .fromTo('.type', 1, { opacity: 0 }, { opacity: 1 }, '+=2')
        .add(this.animateTyping, 2)
        .fromTo('.scrollDown', 1, { opacity: 0 }, { opacity: 1 })
    },
    animationReverse () {
      this.animation.timeScale(2).reverse()
    },
    animateTitle () {
      const tl = new TimelineMax()
      const chars = this.$refs.chars
      const centerIndex = Math.floor(chars.length / 2)

      for (let i = 0; i < chars.length; i++) {
        tl.fromTo(chars[i], 1.8,
          { x: (i - centerIndex) * 40, opacity: 0, scale: 1.5, ease: Bounce.easeOut },
          { x: 0, opacity: 1, scale: 1, ease: Bounce.easeOut },
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

<style lang="stylus" scoped>
section
  display flex
  flex-direction column
  justify-content center
  padding 8%
  h1
    display flex
    font-size 8vw
    line-height 8vw
    font-family 'Rajdhani', sans-serif
  .type
    font-size 2vw
    height 20px
    font-family 'Rajdhani', sans-serif
    font-weight 600
    color #999
  .scrollDown
    position fixed
    left 2%
    bottom 0
    writing-mode: vertical-lr;
    font-size 1.2vw
    font-family 'Rajdhani', sans-serif
    font-weight 400
    margin-bottom 105px
    &:after
      background #000
      position absolute
      display block
      content ''
      width 2px
      height 100px
      left 50%
      transform translateX(-50%)
      bottom -105px
</style>
