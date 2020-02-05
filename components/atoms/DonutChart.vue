<template lang="pug">
svg(:viewBox="viewBox")
  circle(:class="[$style.stroke, $style.base]" :cx="viewBoxWidth / 2" :cy="viewBoxWidth / 2" :r="radius" :stroke-width="strokeWidth")
  circle(:class="[$style.stroke, $style.percent]" ref="percent" :cx="viewBoxWidth / 2" :cy="viewBoxWidth / 2" :r="radius" :stroke-width="strokeWidth")
  text(x="50%" y="50%" text-anchor="middle" font-size="4" font-weight="bold")
    | {{text}}
  text(x="50%" y="65%" text-anchor="middle" font-size="3.5")
    | {{percent}}%
</template>

<script>
import { TweenMax } from 'gsap'
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    percent: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      toDashArray: String(this.percent) + ' ' + String(100 - this.percent),
      radius: 100 / Math.PI / 2,
      strokeWidth: 1.4
    }
  },
  computed: {
    viewBoxWidth () {
      return this.radius * 2 + this.strokeWidth * 2
    },
    viewBox () {
      return '0 ' + '0 ' + String(this.viewBoxWidth) + ' ' + String(this.viewBoxWidth)
    }
  },
  methods: {
    animate () {
      if (this.$refs.percent) {
        TweenMax.fromTo(this.$refs.percent, 0.5,
          { css: { strokeDasharray: '0 100' } },
          { css: { strokeDasharray: this.toDashArray } }
        )
      }
    }
  }
}
</script>

<style lang="stylus" module>
.stroke
  fill transparent
.base
  stroke #eee
.percent
  stroke-dashoffset 25
  stroke-dasharray 0,0,0,100
  stroke #000
</style>
