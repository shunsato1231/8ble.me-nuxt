<template lang="pug">
  main(:class="$style.notFound")
    div(:class="$style.notFoundWrapper")
      h1
        p 4
        p 0
        p 4
      p.notFound Not Found
      SlotAnimationButton(:class="$style.button" text="Back to Top" href="/" ref="button")
</template>

<script>
import gsap from 'gsap'
import SlotAnimationButton from '../components/atoms/SlotAnimationButton.vue'

export default {
  components: {
    SlotAnimationButton
  },
  mounted () {
    const ButtonTranslateWidth = window.innerWidth - (window.pageXOffset + this.$refs.button.$el.getBoundingClientRect().right)

    gsap.timeline({ paused: true })
      .fromTo('h1 p',
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.3, ease: 'Bounce.easeOut' }
      )
      .fromTo('.notFound',
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1, ease: 'Bounce.easeOut' },
        '-=1'
      )
      .fromTo(this.$refs.button.$el, { x: -ButtonTranslateWidth, opacity: 0 }, { x: 0, opacity: 1, duration: 0.1 }, '-=0.5')
      .play()
  }
}
</script>
<style lang="stylus" module>
  .notFound
    color #000
    height 100vh
    width 100vw
    display flex
    justify-content center
    align-items center

  .notFoundWrapper
    display table

    h1
      display flex
      margin 0 auto
      font-family 'Rajdhani', sans-serif
      p
        font-weight 800
        +breakpoint(small)
          font-size 45vw
          line-height 28vw
        +breakpoint(middle)
          font-size 40vw
          line-height 25vw
        +breakpoint(large)
          font-size 25vw
          line-height 15vw

    p
      font-family 'Rajdhani', sans-serif
      margin 0 0 20px 0
      font-weight 600
      +breakpoint(small)
        font-size 10vw
      +breakpoint(middle)
        font-size 8vw
      +breakpoint(large)
        font-size 5vw

    a
      &::before
        content '←'
        margin-right 20px
        margin-top 2px
        font-weight 700
      &:hover
        &::before
          color #fff

    .button
      opacity 0
</style>
