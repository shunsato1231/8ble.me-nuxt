<template lang="pug">
  div
    div(@click="toggleSidebar" :class="[$style.toggle, {[$style.translate]: stateToggle}]")
      div(:class="[$style.line, {[$style.close]: stateToggle}]")
      div(:class="[$style.line, {[$style.close]: stateToggle}]")
      div(:class="[$style.line, {[$style.close]: stateToggle}]")
    div(:class="[$style.toggleClose, {[$style.active]: stateToggle}]" @click="closeSidebar")
    aside(:class="[$style.content, {[$style.translate]: stateToggle}]")
      ul
        li
          router-link(:to="'/'") HOME
        li
          router-link(:to="'/about/'") ABOUT
        li
          router-link(:to="'/blog/'") BLOG
</template>

<script>
export default {
  data () {
    return {
      stateToggle: ''
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.path !== from.path) {
        this.stateToggle = false
      }
    },
    stateToggle (value) {
      this.$emit('toggleSidebar', value)
    }
  },
  created () {
    this.closeSidebar()
  },
  methods: {
    toggleSidebar () {
      this.stateToggle = !this.stateToggle
    },
    closeSidebar () {
      this.stateToggle = false
    }
  }
}
</script>

<style lang="stylus" module>
  .translate
    transform translateX(-250px)

  .toggle
    cursor pointer
    position fixed
    width 25px
    height 15px
    top 25px
    right 5%
    transition 0.5s
    z-index 102
    &:hover .line:after
      width 100%
      transform scaleX(1)
      transform-origin 0% 0%

    .line
      position absolute
      width 25px
      height 3px
      left 0
      background-color #000
      transition 0.6s
      transition-property transform
      transition-duration 0.8s
      transition-delay 0.2s
      transform-origin 50% 50%
      transition-timing-function cubic-bezier(1, 0, 0, 1)
      &:nth-child(2)
        top 6px
        transition opacity 0.4s linear 0.5s
        &:after
          transition-delay 0.1s
      &:nth-child(3)
        top 12px
        &:after
          transition-delay 0.2s
      &:after
        content ''
        position absolute
        top 0
        left 0
        display block
        width 100%
        height 3px
        transform scaleX(0)
        transform-origin 100% 0%
        background #a4a4a4
        transition-property transform
        transition-duration 0.4s
        transition-delay 0

    .close
      &:nth-child(1)
        transform translateY(6px) rotate(-45deg)
      &:nth-child(2)
        transition opacity 0.4s linear 0s
        opacity 0
      &:nth-child(3)
        transform translateY(-6px) rotate(45deg)

  .toggleClose
    position fixed
    z-index 101
    top 0
    bottom 0
    left 0
    right 0
    transition 0.6s
    pointer-events none
    background-color rgba(0, 0, 0, 0)
  .active
    transform translateX(-250px)
    pointer-events auto
    background-color rgba(0, 0, 0, 0.1)
  .content
    transition 0.6s
    z-index 102
    position fixed
    width 250px
    bottom 0
    top 0
    right -250px
    background #fff
    ul
      font-family 'Rajdhani', sans-serif
      width 85%
      margin 0 auto
      li
        width 100%
        height 45px
        a
          transition 0.5s
          display block
          width 100%
          height 100%
          padding 0 5%
          line-height 45px
          font-size(14px)
          font-weight 400
          color #aaa
          border-bottom solid 1px #eee
          &:hover
            text-decoration none
            color #333
            width 90%
            margin-left 10%
</style>
