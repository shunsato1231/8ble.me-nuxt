<template lang="pug">
  div
    section(data-href="/") home
    section(data-href="/about") about
    section(data-href="/blog") blog
</template>

<script>
export default {
  layout: 'SectionScroll',
  data () {
    return {
      anchor: [
        '/',
        '/about',
        '/blog'
      ]
    }
  },
  mounted () {
    this.$nuxt.$emit('updateAnchor', this.anchor)
  }
}
</script>

<style lang="stylus">
  section
    width 100vw
    height 100vh
</style>
