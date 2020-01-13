<template lang="pug">
  div
    section home
    section about
    section blog
    section contact
</template>

<script>
export default {
  layout: 'SectionScroll',
  data () {
    return {
      anchorList: [
        '/',
        '/about',
        '/blog',
        '/contact'
      ]
    }
  },
  mounted () {
    this.$nuxt.$emit('updateAnchorList', this.anchorList)
  }
}
</script>

<style lang="stylus">
  section
    width 100vw
    height 100vh
</style>
