<template lang="pug">
  section(:class="$style.wrapper")
    HomeSectionHeading(:class="$style.mainHeading" ref="mainHeading") About
    div(:class="$style.contentWrapper")
      div(:class="$style.profile")
        HomeSectionContentHeading(ref="contentHeading_1") Profile
        div(:class="$style.textWrapper" ref="textWrapper_1")
          | ProfileTextProfileTextProfileText
          HomeSectionContentSubHeading Skill
          HomeSkillGraphs(:class="$style.graphs")
      div(:class="$style.personalData")
        HomeSectionContentHeading(ref="contentHeading_2") PersonalData
        div(:class="$style.textWrapper" ref="textWrapper_2")
          HomeSectionContentSubHeading Name
          ul
            li suriranka osakana
          HomeSectionContentSubHeading Birth
          ul
            li 9999.12.12
          HomeSectionContentSubHeading HomeTown
          ul
            li japan
    SlotAnimationButton(:class="$style.moreButton" ref="moreButton" :text="'More'" href="hoge")
</template>

<script>
import gsap from 'gsap'

import HomeSectionHeading from '../atoms/HomeSectionHeading.vue'
import HomeSectionContentHeading from '../atoms/HomeSectionContentHeading.vue'
import HomeSectionContentSubHeading from '../atoms/HomeSectionContentSubHeading.vue'
import HomeSkillGraphs from '../organisms/HomeSkillGraphs.vue'
import SlotAnimationButton from '../atoms/SlotAnimationButton.vue'

export default {
  components: {
    HomeSectionHeading,
    HomeSectionContentHeading,
    HomeSectionContentSubHeading,
    HomeSkillGraphs,
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
      const moreButtonTranslateWidth = window.innerWidth - (window.pageXOffset + this.$refs.moreButton.$el.getBoundingClientRect().left)

      const contentHeadings = [this.$refs.contentHeading_1.$el, this.$refs.contentHeading_2.$el]
      const contentHeadingsBorder = [this.$refs.contentHeading_1.$refs.border, this.$refs.contentHeading_2.$refs.border]

      const textWrappers = [this.$refs.textWrapper_1, this.$refs.textWrapper_2]

      this.animation = gsap.timeline({ paused: true })
      this.animation.fromTo(this.$refs.mainHeading.$refs.text,
        { y: mainHeadingHeight, opacity: 0 },
        { y: 0, opacity: 1, ease: 'Bounce.easeOut', duration: 2 })
        .fromTo(contentHeadings, { opacity: 0 }, { opacity: 1, duration: 2 }, '-=2')
        .fromTo(contentHeadingsBorder, { width: 0 }, { width: '100%', ease: 'Power4.easeInOut', duration: 1.5 }, '-=2')
        .fromTo(textWrappers, { opacity: 0 }, { opacity: 1, duration: 2 }, '-=1.5')
        .fromTo(this.$refs.moreButton.$el, { x: moreButtonTranslateWidth, opacity: 0 }, { x: 0, opacity: 1, duration: 0.1 }, '-=1.5')
    },
    animationReverse () {
      this.animation.timeScale(2).reverse()
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
  .contentWrapper
    +breakpoint(large)
      display flex
      justify-content space-between
      .profile
        width 55%
      .personalData
        width 40%
    .textWrapper
      padding 15px 20px
      font-size(14px)
    ul li
      position relative
      padding-left 12px
      margin-left 10px
      &::before
        position absolute
        content ''
        left 0
        top 50%
        transform translateY(-50%)
        width 3px
        height 3px
        background #000
  .moreButton
    margin 50px 0 0 auto
    +breakpoint(small)
      margin 10px 0 45px auto
    opacity 0
  .graphs
    max-width 450px
</style>
