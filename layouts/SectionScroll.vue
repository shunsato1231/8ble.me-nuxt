<template lang="pug">
  main
    SectionScrollWrapper
      nuxt
</template>

<script>
import SectionScrollWrapper from '../components/organisms/SectionScrollWrapper.vue'

export default {
  components: {
    SectionScrollWrapper
  },
  created () {
    this.$nuxt.$on('updateAnchor', this.setAnchor)
  },
  methods: {
    setAnchor (anchor) {
      console.log(anchor)
    }
  }
}
</script>
