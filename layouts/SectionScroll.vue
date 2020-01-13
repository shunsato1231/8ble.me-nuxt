<template lang="pug">
  main
    h1
    SectionScrollWrapper(:anchor-list="anchorList")
      nuxt
</template>

<script>
import SectionScrollWrapper from '../components/organisms/SectionScrollWrapper.vue'

export default {
  components: {
    SectionScrollWrapper
  },
  data () {
    return {
      anchorList: []
    }
  },
  created () {
    this.$nuxt.$on('updateAnchorList', this.setAnchorList)
  },
  methods: {
    setAnchorList (anchorList) {
      this.anchorList = anchorList
    }
  }
}
</script>
