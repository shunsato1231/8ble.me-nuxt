<template lang="pug">
  div
    template(v-for="section in sectionList")
      section(:is="section.component" ref="section" :class="{active: section.path === $route.path}") {{ section }}
</template>

<script>
import _ from 'lodash'

import HomeAbout from '../components/organisms/HomeAbout.vue'
export default {
  layout: 'SectionScroll',
  components: {
    HomeAbout
  },
  data () {
    return {
      sectionList: [
        { path: '/', component: 'section' },
        { path: '/about', component: HomeAbout },
        { path: '/blog', component: 'section' },
        { path: '/contact', component: 'section' }
      ]
    }
  },
  beforeRouteLeave (to, from, next) {
    const self = this
    const index = _.findIndex(self.sectionList, function (section) { return section.path === self.$route.path })

    if (this.$refs.section[index].animation) {
      this.$refs.section[index].reverse()
    }

    setTimeout(next, 1200)
  },
  mounted () {
    const anchorList = _.map(this.sectionList, 'path')
    this.$nuxt.$emit('updateAnchorList', anchorList)
  }
}
</script>

<style lang="stylus">
  section
    width 100vw
    height 100vh
    padding 8% 5%
    opacity 0
  .active
    opacity 1
</style>
