<template lang="pug">
  main
    Header
    //- Sidebar
    div(:class="[$style.wrapper, {[$style.transition]: transition}]")
      nuxt
</template>

<script>
import Header from '../components/organisms/Header'
// import Sidebar from '../components/organisms/Sidebar'

export default {
  components: {
    Header
    // Sidebar
  },
  data () {
    return {
      transition: false
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
