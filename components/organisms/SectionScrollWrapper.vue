<template lang="pug">
  main
    .wrapper(:style="{transform: ' translate3d(0px,' + activeSectionIndex * windowHeight * -1 +'px, 0px)'}" :class="{ initial: initialLoadingFlag }")
      slot
    SectionScrollNavigation.nav(:anchor-list="anchorList", :active-section-index='activeSectionIndex')
    SectionScrollCounter.counter(:active-section-index='activeSectionIndex', :section-number='anchorList.length - 1')
</template>

<script>
import _ from 'lodash'
import SectionScrollNavigation from '../molecules/SectionScrollNavication.vue'
import SectionScrollCounter from '../molecules/SectionScrollCounter.vue'

export default {
  components: {
    SectionScrollNavigation,
    SectionScrollCounter
  },
  props: {
    anchorList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      mousewheelevent: '',
      activeSectionIndex: 0,
      prevActiveSectionIndex: 0,
      windowHeight: '',
      prevTime: '',
      prevDelta: '',
      anchorListState: '',
      initialLoadingFlag: true
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.hash !== from.hash) {
        const self = this
        const index = _.findIndex(self.anchorListState, function (anchor) { return anchor === to.hash })
        this.activeSectionIndex = index
      }
    },
    anchorList (value) {
      this.anchorListState = value

      const self = this
      const index = _.findIndex(self.anchorListState, function (anchor) { return anchor === self.$route.hash })
      this.activeSectionIndex = index
    },
    activeSectionIndex (index, prevIndex) {
      const toHash = this.anchorListState[index]
      if (toHash !== this.$route.hash && !this.initialLoadingFlag) {
        this.$router.push({ hash: toHash })
      }

      this.prevActiveSectionIndex = index
    }
  },
  mounted () {
    this.mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll'
    this.windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight

    window.addEventListener('resize', this.handleResize)
    window.addEventListener(this.mousewheelevent, this.handleWheel, false)
    window.addEventListener('keydown', this.handleKeydown, false)

    this.prevTime = new Date().getTime()
    this.initialLoading()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener(this.mousewheelevent, this.handleWheel, false)
    window.removeEventListener('keydown', this.handleKeydown, false)
  },
  methods: {
    handleResize: _.debounce(function () {
      this.windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    }, 300),

    handleWheel (e) {
      let curTime
      let isFired = false

      const delta = Math.abs(e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.detail))

      if (!delta) { return }

      if (delta - this.prevDelta > 0) {
        curTime = e.timeStamp

        if (!isFired && curTime - this.prevTime > 250) {
          if (e.deltaY < 0) {
            this.scrollUp()
          } else {
            this.scrollDown()
          }

          isFired = true
        }

        this.prevTime = curTime
      } else {
        isFired = false
      }

      this.prevDelta = delta
    },
    handleKeydown (e) {
      switch (e.key) {
        case 'ArrowUp':
          this.scrollUp()
          break
        case 'ArrowDown':
          this.scrollDown()
          break
        default:
          break
      }
    },
    async initialLoading () {
      await this.$delay(1000, () => {
        this.initialLoadingFlag = false
      }).exec()
    },
    async scrollUp () {
      if (this.activeSectionIndex > 0) {
        this.$emit('animationReverse', this.activeSectionIndex)
        this.activeSectionIndex--

        await this.$delay(1400, () => {
          this.$emit('animationPlay', this.activeSectionIndex)
        }).exec()
      }
    },
    async scrollDown () {
      this.$emit('animationReverse', this.activeSectionIndex)
      this.activeSectionIndex++

      await this.$delay(1400, () => {
        this.$emit('animationPlay', this.activeSectionIndex)
      }).exec()
    }
  }
}
</script>

<style lang="stylus">
  body
    overflow hidden
  #app
    height 100%
</style>

<style lang="stylus" scoped>
  main
    position fixed
    top 0
    left 0
    height 100vh
  section
    height 100vh
    width 100vw

  .wrapper
    height 100vh
    touch-action none
    position relative
    transition all 700ms ease 1200ms;
  .nav
    position fixed
    left 0
    top: 50%
    margin-left 22px
    transform translateY(-50%)
  .counter
    position fixed
    bottom 2.5%
    right 2.5%
  .initial
    transition none;
</style>
