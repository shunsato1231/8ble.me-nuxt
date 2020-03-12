<template lang="pug">
  main#main
    transition
      Header(v-if="headerFlag")
    transition
      Sidebar(v-if="sidebarFlag" @toggleSidebar="changeToggle")
    div(:class="[$style.wrapper, {[$style.transition]: transition}, {[$style.translate]: stateToggle}]")
      transition
        Archive(v-if="archiveFlag")
      nuxt
</template>

<script>
import { mapGetters } from 'vuex'

import Archive from '../components/organisms/Archive.vue'
import Header from '../components/organisms/Header'
import Sidebar from '../components/organisms/Sidebar'

export default {
  components: {
    Header,
    Sidebar,
    Archive
  },
  data () {
    return {
      transition: false,
      stateToggle: ''
    }
  },
  watch: {
    '$route' () {
      this.loading()
    }
  },
  mounted () {
    this.loading()
  },
  computed: {
    ...mapGetters('baseLayout', [
      'headerFlag',
      'sidebarFlag',
      'archiveFlag'
    ])
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
    },
    loading () {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 1000)
      })
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
