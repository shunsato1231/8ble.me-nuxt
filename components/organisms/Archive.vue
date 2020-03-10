<template lang="pug">
  div(:class="$style.archive" ref="wrapper" :style="styles")
    div(@click="selectTab($event, 1)" @mouseover="mouseOver($event, 1)" @mouseleave="mouseLeave" :class="[$style.tab, {[$style.active]: isActive === 1}]")
      div(:class="$style.inner")
        span Categories
        div(:class="$style.bg")
    transition(@before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave")
      ul(:class="[$style.content, $style.categories]" v-if="isActive === 1")
        li(v-for="category in categories" :key="category.slug")
          nuxt-link(:to="'/blog/category/' + category.slug")
            span(:class="$style.name") {{category.name}}
            span(:class="$style.num") {{category.posts.length}}

    div(@click="selectTab($event, 2)" @mouseover="mouseOver($event, 2)" @mouseleave="mouseLeave" :class="[$style.tab, {[$style.active]: isActive === 2}]")
      div(:class="$style.inner")
        span Tags
        div(:class="$style.bg")
    transition(@before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave")
      div(:class="[$style.content, $style.tags]" v-if="isActive === 2")
        div(:class="[$style.wrapper]")
          nuxt-link(v-for="tag in tags" :to="'/blog/tag/' + tag.slug" :key="tag.slug")
            span(:class="$style.name") {{tag.name}}
            span(:class="$style.num") {{tag.posts.length}}

    div(@click="selectTab($event, 3)" @mouseover="mouseOver($event, 3)" @mouseleave="mouseLeave" :class="[$style.tab, {[$style.active]: isActive === 3}]")
      div(:class="$style.inner")
        span Yearly
        div(:class="$style.bg")
    transition(@before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave")
      ul(:class="[$style.content, $style.yearly]" v-if="isActive === 3")
        li(v-for="(posts, year) in yearly")
          nuxt-link(:to="'/blog/' + year")
            span(:class="$style.name") {{year}}
            span(:class="$style.num") {{posts.length}}

    div(@click="selectTab($event, 4)" @mouseover="mouseOver($event, 4)" @mouseleave="mouseLeave" :class="[$style.tab, {[$style.active]: isActive === 4}]")
      div(:class="$style.inner")
        span Monthly
        div(:class="$style.bg")
    transition(@before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave")
      div(:class="[$style.content, $style.monthly]" v-if="isActive === 4")
        ul(v-for="(monthList, year) in monthly")
          li(v-for="(posts, month) in monthList")
            nuxt-link(:to="'/blog/' + year + '/' + month")
              span(:class="$style.year") {{year}}
              span(:class="$style.month") {{month}}
</template>

<script>
import { tags, categories, yearly, monthly } from '../../contents/blog/archives.json'

export default {
  components: {
  },
  data () {
    return {
      tags,
      categories,
      yearly,
      monthly,
      isActive: 0,
      activeTabWidth: 0,
      activeTabLeftPosition: 0,
      style: {
        tabWidth: 0,
        tabLeftPosition: 0
      }
    }
  },
  computed: {
    styles () {
      return {
        '--tabWidth': this.style.tabWidth + 'px',
        '--tabLeftPosition': this.style.tabLeftPosition + 'px'
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.isActive = 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      const mediaQuery = window.matchMedia(this.$style.small)
      this.tabAlignment(mediaQuery)
      mediaQuery.addListener(this.tabAlignment)
    })
  },
  methods: {
    tabAlignment (mediaQuery) {
      if (!mediaQuery) {
        return
      }
      const tabs = this.$el.getElementsByClassName(this.$style.tab);
      [...tabs].reduce((leftPos, el) => {
        el.style.left = leftPos + 'px'
        leftPos += Math.ceil(el.offsetWidth)
        return leftPos
      }, 0)
    },
    selectTab (event, num) {
      const element = event.path[0]
      const wrapperLeft = this.$refs.wrapper.getBoundingClientRect().left
      const elementLeft = element.getBoundingClientRect().left

      if (this.isActive === num) {
        this.isActive = 0
        this.activeTabWidth = 0
        this.activeTabLeftPosition = 0
      } else {
        this.isActive = num
        this.activeTabWidth = element.offsetWidth
        this.activeTabLeftPosition = elementLeft - wrapperLeft
      }
    },
    mouseOver (event, num) {
      const element = event.path[0]
      const wrapperLeft = this.$refs.wrapper.getBoundingClientRect().left
      const elementLeft = element.getBoundingClientRect().left

      this.style.tabWidth = element.offsetWidth
      this.style.tabLeftPosition = elementLeft - wrapperLeft
    },
    mouseLeave () {
      this.style.tabWidth = this.activeTabWidth
      this.style.tabLeftPosition = this.activeTabLeftPosition
    },
    beforeEnter (el) {
      el.style.height = '0'
    },
    enter (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave (el) {
      el.style.height = '0'
    }
  }
}
</script>

<style lang="stylus" module>
.archive
  position relative
  font-family Rajdhani, sans-serif
  width 90%
  margin 10px auto
  padding-top 34px
  +breakpoint(small)
    padding-top 0
  &:before
    content ''
    position absolute
    top 34px
    left var(--tabLeftPosition)
    width  var(--tabWidth)
    height 2px
    background #000
    transition 0.3s
    +breakpoint(small)
      background transparent
  &:after
    display block
    content ''
    width 100%
    border-bottom 1px solid #ddd
  .tab
    top 0
    display table
    overflow hidden
    position absolute
    cursor pointer
    +breakpoint(small)
      display block
      position static
    .inner
      curor pointer
      pointer-events none
      position relative
      font-size(15px)
      font-weight 500
      padding 5px 15px 5px 5px
      transition 0.3s
      .bg
        content ''
        position absolute
        display block
        bottom 0px
        left 0px
        z-index: -1;
        background #000
        width 100%
        height 100%
        transform translateY(100%)
        transition 0.2s
        +breakpoint(small)
          transform translateX(calc(-100% - 2px)) translateY(calc(100% - 2px))
      span
        position relative
        padding-left 25px
        &::before
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          position absolute
          left 4px
          top 0
          bottom: 0
          margin-top auto
          margin-bottom auto
          content ''
          position absolute
          width 8px
          height 2px
          background-color #000
          transform translateY(2px) rotate(45deg)
          transform-origin 7px 1px
        &::after
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          position absolute
          left 11px
          top 0
          bottom: 0
          margin-top auto
          margin-bottom auto
          content ''
          position absolute
          width 8px
          height 2px
          background-color #000
          transform translateY(2px) rotate(-45deg)
          transform-origin 1px 1px
    &:hover
      .bg
        +breakpoint(small)
          transform translateX(0) translateY(calc(100% - 2px))
    &.active
      color #fff
      .inner
        .bg
          transform translateY(0)
        span
          &::before
            background #fff
            transform translateY(-2px) rotate(-45deg)
          &::after
            background #fff
            transform translateY(-2px) rotate(45deg)
  .content
    overflow hidden
  .categories
    li
      height 35px
      line-height 35px
      &:not(:last-child)
        border-bottom 1px solid #ddd
      a
        display flex
        justify-content space-between
        width 100%
        height 100%
        padding 0 5px
        &:hover
          background #f1f1f1
          text-decoration none
        .name
          font-weight 600
          color #000
          font-size(14px)
        .num
          font-weight 400
          margin-right 0
          margin-left auto
          color #aaa
          font-size(13px)
  .tags
    .wrapper
      display flex
      flex-wrap wrap
      margin 10px 0
    a
      display block
      background #f1f1f1
      height 25px
      line-height 25px
      padding 0 8px
      margin 5px

      &:hover
        text-decoration none
        background #ddd

      .name
        font-size(13px)
        font-weight 500
        color #000
        margin-right 8px
      .num
        font-size(12px)
        font-weight 400
        color #aaa
  .yearly
    @extend .categories
  .monthly
    ul
      display flex
      margin 10px 0
    li
      margin 5px
      width 38px
      height 45px
      background #f1f1f1
      a
        animateShatter()
        display block
        width 100%
        height 100%
        padding 5px
        &:hover
          text-decoration none
          .year
            color #fff
        .year
          display block
          text-align center
          font-size(12px)
          line-height 12px
          font-weight 500
          color #aaa
          transition 0.3s
        .month
          display block
          text-align center
          font-size(18px)
          line-height 23px
          font-weight 600
          margin auto 0
</style>

<style lang="stylus" scoped>
.v-enter-active
  transition height 0.4s ease-in-out 0.2s
  animation-name js-accordion--anime__opend
  animation-delay 0.4s
  animation-duration 0.2s
  animation-fill-mode both

.v-leave-active
  transition height 0.4s ease-in-out
  animation-name js-accordion--anime__closed
  animation-duration 0.2s
  animation-fill-mode both

@keyframes js-accordion--anime__opend
  0%
    opacity 0
  100%
    opacity 1

@keyframes js-accordion--anime__closed
  0%
    opacity 1
  100%
    opacity 0
</style>
