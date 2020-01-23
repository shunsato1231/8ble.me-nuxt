<template lang="pug">
  section
    HomeSectionHeading(ref="mainHeading") Contact
    .wrapper
      i(class="fab fa-github")
      i(class="fab fa-facebook-f")
      i(class="fas fa-envelope")
</template>

<script>
import { TimelineMax, Bounce } from 'gsap'

import HomeSectionHeading from '../atoms/HomeSectionHeading.vue'
import SlotAnimationButton from '../atoms/SlotAnimationButton.vue'

export default {
  components: {
    HomeSectionHeading,
    SlotAnimationButton
  },
  data () {
    return {
      animation: ''
    }
  },
  mounted () {
    this.createAnimation()
  },
  methods: {
    createAnimation () {
      const mainHeadingHeight = this.$refs.mainHeading.$el.clientHeight

      this.animation = new TimelineMax({ paused: true })
      this.animation.fromTo('h1 span', 2,
        { y: mainHeadingHeight, opacity: 0 },
        { y: 0, opacity: 1, ease: Bounce.easeOut })
        .fromTo('.fa-github', 1,
          { y: -15, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=1'
        )
        .fromTo('.fa-facebook-f', 1,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=0.5'
        )
        .fromTo('.fa-envelope', 1,
          { y: -15, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=0.5'
        )
    }
  }
}
</script>

<style lang="stylus" scoped>
section
  display flex
  flex-direction column
  justify-content center
  .moreButton
    margin 50px 0 0 auto
    opacity 0
  .wrapper
    display flex
    justify-content center
    padding 10% 0
    i
      display flex
      width 60px
      height 60px
      justify-content center
      align-items center
      font-size(40px)
      line-height 40px
      background #000
      color #fff
      margin 0 25px
      border-radius 5px
</style>
