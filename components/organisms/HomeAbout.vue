<template lang="pug">
  section
    HomeSectionHeading(ref="mainHeading") About
    .contentWrapper
      .profile
        HomeSectionContentHeading Profile
        .textWrapper
          | ProfileTextProfileTextProfileText
          HomeSectionContentSubHeading Skill
          HomeSkillGraphs.graphs
      .personalData
        HomeSectionContentHeading PersonalData
        .textWrapper
          HomeSectionContentSubHeading Name
          ul
            li suriranka osakana
          HomeSectionContentSubHeading Birth
          ul
            li 9999.12.12
          HomeSectionContentSubHeading HomeTown
          ul
            li japan
    SlotAnimationButton.moreButton(ref="moreButton" :text="'More'" href="hoge")
</template>

<script>
import { TimelineMax, Bounce, Power4 } from 'gsap'

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

      this.animation = new TimelineMax({ paused: true })
      this.animation.fromTo('h1 span', 2,
        { y: mainHeadingHeight, opacity: 0 },
        { y: 0, opacity: 1, ease: Bounce.easeOut })
        .fromTo('h2', 2, { opacity: 0 }, { opacity: 1 }, '-=2')
        .fromTo('.border', 1.5, { width: 0 }, { width: '100%', ease: Power4.easeInOut }, '-=2')
        .fromTo('.textWrapper', 2, { opacity: 0 }, { opacity: 1 }, '-=1.5')
        .fromTo('.moreButton', 0.1, { x: moreButtonTranslateWidth, opacity: 0 }, { x: 0, opacity: 1 }, '-=1.5')
    }
  }
}
</script>

<style lang="stylus" scoped>
section
  display flex
  flex-direction column
  justify-content center
  .contentWrapper
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
    opacity 0
  .graphs
    max-width 450px
</style>
