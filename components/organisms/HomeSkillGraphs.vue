<template lang="pug">
  .wrapper
    DonutChart(:class="$style.graph" ref="html" text="HTML" :percent="80")
    DonutChart(:class="$style.graph" ref="css" text="CSS" :percent="80")
    DonutChart(:class="$style.graph" ref="js" text="JavaScript" :percent="70")
</template>

<script>
import DonutChart from '../atoms/DonutChart.vue'
export default {
  components: {
    DonutChart
  },
  data () {
    return {
      animateHtmlGraph: '',
      animateCSSGraph: '',
      animateJavascriptGraph: ''
    }
  },
  mounted () {
    this.animateHtmlGraph = this.$delay(1000, this.$refs.html.animate)
    this.animateCSSGraph = this.$delay(200, this.$refs.css.animate)
    this.animateJavascriptGraph = this.$delay(200, this.$refs.js.animate)

    this.animate()
  },
  beforeDestroy () {
    this.animateHtmlGraph.cancel()
    this.animateCSSGraph.cancel()
    this.animateJavascriptGraph.cancel()
  },
  methods: {
    async animate () {
      await this.animateHtmlGraph.exec()
      await this.animateCSSGraph.exec()
      await this.animateJavascriptGraph.exec()
    }
  }
}
</script>

<style lang="stylus" module>
.graph
  width 30%
  &:not(:last-child)
    margin-right 5%
</style>
