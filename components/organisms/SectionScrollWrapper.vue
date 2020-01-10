<template lang="pug">
  main
    .wrapper(:style="{transform: ' translate3d(0px,' + activeSectionIndex * windowHeight * -1 +'px, 0px)'}")
      slot
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      mousewheelevent: '',
      sections: '',
      activeSectionIndex: '',
      prevActiveSectionIndex: '',
      windowHeight: '',
      prevTime: '',
      prevDelta: ''
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.path !== from.path) {
        const self = this
        const index = _.findIndex(self.sections, function (o) { return o.dataset.href === to.path })
        this.activeSectionIndex = index
      }
    },
    activeSectionIndex (index, prevIndex) {
      const toPath = this.sections[index].dataset.href
      if (toPath !== this.$route.path) {
        this.$router.push(toPath)
        this.sections[prevIndex].classList.remove('active')
        this.sections[index].classList.add('active')
      }

      this.prevActiveSectionIndex = index
    }
  },
  mounted () {
    this.mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll'
    this.windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight

    this.sections = this.$el.querySelectorAll('section')
    window.addEventListener('resize', this.handleResize)
    window.addEventListener(this.mousewheelevent, this.handleWheel, false)
    this.prevTime = new Date().getTime()

    const self = this
    const index = _.findIndex(self.sections, function (o) { return o.dataset.href === self.$route.path })
    this.activeSectionIndex = index
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener(this.mousewheelevent, this.handleWheel, false)
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
          if (e.deltaY < 0 && this.activeSectionIndex > 0) {
            this.activeSectionIndex--
          } else if (e.deltaY > 0 && this.activeSectionIndex + 1 < this.sections.length) {
            this.activeSectionIndex++
          }

          isFired = true
        }

        this.prevTime = curTime
      } else {
        isFired = false
      }

      this.prevDelta = delta
    },
    setIndex (index) {
      this.activeSectionIndex = index
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
    height 100vh

  .wrapper
    height 100vh
    touch-action none
    position relative
    transition all 700ms ease 0s;

  section
    height 100vh
    width 100vw
</style>
