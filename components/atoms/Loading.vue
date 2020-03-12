<template lang="pug">
  div(:class="$style.loading" v-if="loading && display")
  div(:class="$style.loaded" v-else-if="display")
</template>

<script>
export default {
  data: () => ({
    loading: false,
    display: false
  }),
  watch: {
    '$route' () {
      this.$nextTick(() => {
        this.display = this.$nuxt.layoutName === 'baseLayout'
      })
    }
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  },
  mounted () {
    this.display = this.$nuxt.layoutName === 'baseLayout'
  }
}
</script>

<style lang="stylus" module>
.loading
  position fixed
  width 100%
  height 8px
  z-index 101
  &:after
    position absolute
    content ''
    display block
    height 8px
    width 100%
    background #f1f1f1
    animation-name animateLoading
    animation-duration 0.8s
    animation-fill-mode both
    animation-iteration-count infinite
@keyframes animateLoading
  0%
    position absolute
    left 0
    right auto
    width 0
  45%
    position absolute
    left 0
    right auto
    width 100%
  50%
    left auto
    right 0
    width 100%
  100%
    left auto
    right 0
    width 0

.loaded
  position fixed
  width 100%
  height 8px
  background #000
  z-index 101
  animation-name animateLoaded
  animation-duration 0.8s
  animation-fill-mode both

@keyframes animateLoaded
  0%
    width 0
  100%
    width 100%
</style>
