<template lang="pug">
  SectionScrollWrapper(:anchorList="anchorList" @animationPlay="animationPlay", @animationReverse="animationReverse")
    Home(ref="home" class="$style.section")
    HomeAbout(ref="about" :class="$style.section")
    HomeBlog(ref="blog" :posts="posts" :class="$style.section")
    HomeContact(ref="contact" :class="$style.section")

</template>

<script>
import _ from 'lodash'

import SectionScrollWrapper from '../components/organisms/SectionScrollWrapper.vue'
import Home from '../components/organisms/Home.vue'
import HomeAbout from '../components/organisms/HomeAbout.vue'
import HomeBlog from '../components/organisms/HomeBlog.vue'
import HomeContact from '../components/organisms/HomeContact.vue'

export default {
  head () {
    return {
      bodyAttrs: {
        class: 'noScroll'
      }
    }
  },
  components: {
    SectionScrollWrapper,
    Home,
    HomeAbout,
    HomeBlog,
    HomeContact
  },
  data () {
    return {
      sectionList: [
        { hash: '', ref: 'home' },
        { hash: '#about', ref: 'about' },
        { hash: '#blog', ref: 'blog' },
        { hash: '#contact', ref: 'contact' }
      ],
      anchorList: [],
      index: ''
    }
  },
  asyncData () {
    const json = require(`~/contents/blog/summary.json`)
    const posts = _.orderBy(json.fileMap, 'created_at', 'desc').slice(0, 3)
    return { posts }
  },
  mounted () {
    this.anchorList = _.map(this.sectionList, 'hash')

    const self = this
    const index = _.findIndex(self.anchorList, function (anchor) { return anchor === self.$route.hash })
    this.animationPlay(index)
  },
  methods: {
    animationPlay (index) {
      const ref = this.sectionList[index].ref

      if (this.$refs[ref].animation) {
        this.$refs[ref].animation.play()
      }
    },
    animationReverse (index) {
      const ref = this.sectionList[index].ref

      if (this.$refs[ref].animationReverse) {
        this.$refs[ref].animationReverse()
      }
    }
  }
}
</script>

<style lang="stylus" module>
  .section
    width 100vw
    height 100vh
    padding 0 5%
</style>
