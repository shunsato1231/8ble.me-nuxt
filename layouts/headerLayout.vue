<template lang="pug">
  main
    Header
    Sidebar(@toggleSidebar="changeToggle")
    div(:class="[$style.wrapper, {[$style.transition]: transition}, {[$style.translate]: stateToggle}]")
      nuxt
</template>

<script>
import Header from '../components/organisms/Header'
import Sidebar from '../components/organisms/Sidebar'

export default {
  components: {
    Header,
    Sidebar
  },
  data () {
    return {
      transition: false,
      stateToggle: ''
    }
  },
  created () {
    const initial = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      })
    })

    initial.then(() => {
      this.transition = true
    })
  },
  methods: {
    changeToggle (flag) {
      this.stateToggle = flag
    }
  }
}
</script>

<style lang="stylus" module>
  .wrapper
    padding-top 65px
  .translate
    transform translateX(-250px)
  .transition
    transition 0.6s
</style>
