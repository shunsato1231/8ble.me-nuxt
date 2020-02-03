<template lang="pug">
  section
    HomeSectionHeading(ref="mainHeading") Blog
    .wrapper
      template(v-for="post in posts")
        Article.article(:post="post" ref="article")

    SlotAnimationButton.moreButton(ref="moreButton")(:text="'More'", href="hoge")

</template>

<script>
import gsap from 'gsap'

import HomeSectionHeading from '../atoms/HomeSectionHeading.vue'
import SlotAnimationButton from '../atoms/SlotAnimationButton.vue'
import Article from '../molecules/Article.vue'

export default {
  components: {
    HomeSectionHeading,
    SlotAnimationButton,
    Article
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
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
      const moreButtonTranslateWidth = window.innerWidth - (window.pageXOffset + this.$refs.moreButton.$el.getBoundingClientRect().left)

      this.animation = gsap.timeline({ paused: true })
      this.animation.fromTo('h1 span',
        { y: mainHeadingHeight, opacity: 0 },
        { y: 0, opacity: 1, ease: 'Bounce.easeOut', duration: 2 })
        .fromTo('.article',
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.4 },
          '-=1'
        )
        .fromTo('.moreButton', { x: moreButtonTranslateWidth, opacity: 0 }, { x: 0, opacity: 1, duration: 0.1 }, '-=1.5')
    },
    animationReverse () {
      this.animation.timeScale(2).reverse()
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
    padding: 0;
    display flex
    flex-flow row wrap
    margin 0 auto
    +breakpoint('small')
      width 280px
    +breakpoint('middle')
      width 680px
    +breakpoint('large')
      width 1020px
</style>
