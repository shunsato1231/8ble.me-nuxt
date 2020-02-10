<template lang="pug">
  section(:class="$style.wrapper")
    HomeSectionHeading(:class="$style.mainHeading" ref="mainHeading") Blog
    div(:class='[$style.articleWrapper, {[$style.articleList]: listDisplay}]')
      template(v-for="post in posts")
        .article(:class="$style.article")
          component(:post="post" ref="article" :is="articleComponent")

    SlotAnimationButton(:class="$style.moreButton" ref="moreButton")(:text="'More'", href="blog")

</template>

<script>
import gsap from 'gsap'

import HomeSectionHeading from '../atoms/HomeSectionHeading.vue'
import SlotAnimationButton from '../atoms/SlotAnimationButton.vue'
import Article from '../molecules/Article.vue'
import ArticleSimple from '../molecules/ArticleSimple.vue'

export default {
  components: {
    HomeSectionHeading,
    SlotAnimationButton,
    Article,
    ArticleSimple
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      animation: '',
      matchMedia: {},
      queryMatches: '',
      articleComponent: '',
      listDisplay: ''
    }
  },
  mounted () {
    this.createAnimation()

    this.$nextTick(() => {
      const querySizes = [this.$style.small, this.$style.middle]

      querySizes.forEach((querySize, index) => {
        this.matchMedia[index] = window.matchMedia(querySize)
        this.matchMedia[index].addListener(this.changeArticleComponent)
        this.changeArticleComponent(this.matchMedia[index])
      })
    })
  },
  methods: {
    createAnimation () {
      const mainHeadingHeight = this.$refs.mainHeading.$el.clientHeight
      const moreButtonTranslateWidth = window.innerWidth - (window.pageXOffset + this.$refs.moreButton.$el.getBoundingClientRect().left)

      this.animation = gsap.timeline({ paused: true })
      this.animation.fromTo(this.$refs.mainHeading.$refs.text,
        { y: mainHeadingHeight, opacity: 0 },
        { y: 0, opacity: 1, ease: 'Bounce.easeOut', duration: 2 })
        .fromTo('.article',
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.4 },
          '-=1'
        )
        .fromTo(this.$refs.moreButton.$el, { x: moreButtonTranslateWidth, opacity: 0 }, { x: 0, opacity: 1, duration: 0.1 }, '-=1')
    },
    animationReverse () {
      this.animation.timeScale(2).reverse()
    },
    changeArticleComponent (e) {
      this.listDisplay = Object.entries(this.matchMedia)
        .map(([key, value]) => (value))
        .some(query => query.matches)

      if (this.listDisplay) {
        this.articleComponent = ArticleSimple
      } else {
        this.articleComponent = Article
      }
    }
  }
}
</script>

<style lang="stylus" module>
.wrapper
  display flex
  flex-direction column
  justify-content center
  .mainHeading
    +breakpoint(large)
      margin-bottom 100px
    +breakpoint(middle)
      margin-bottom 50px
    +breakpoint(small)
      margin-bottom 20px
  .moreButton
    margin 50px 0 0 auto
    +breakpoint(small)
      margin 20px 0 0 auto
    opacity 0
  .articleWrapper
    margin 0 auto
    width 100%
    max-width 950px
    display flex
    flex-flow row wrap
    justify-content space-between
  .articleList
    flex-direction column
    justify-content center
    .article
      width 100%
      box-sizing border-box
</style>
