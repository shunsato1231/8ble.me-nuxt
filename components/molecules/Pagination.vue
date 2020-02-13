<template lang="pug">
  ul(:class="$style.pager")
    nuxt-link(
      :to="firstPath ? firstPath : path + '1'"
      :class="[$style.item, (currentIndex > 2) ? [$style.enable] : [$style.disable]]"
      ) |<
    nuxt-link(
      :to="( path === 1 && firstPath ) ? firstPath : path + (currentIndex - 1)"
      :class="[$style.item, (currentIndex > 1) ? [$style.enable] : [$style.disable]]"
      ) <

    template(v-if="currentIndex > 1")
      nuxt-link(
        :to="firstPath ? firstPath : path + '1'"
        :class="[$style.item, $style.enable]"
        ) 1
      span(v-if="prevIndexOmmited" :class="$style.ommited")
      template(v-for="index in currentIndex - 1")
        nuxt-link(
          v-if="index > currentIndex - 3 && index > 1"
          :to="path + index"
          :class="[$style.item, $style.enable]"
        ) {{index}}

    nuxt-link(
      :to="path + currentIndex"
      :class="[$style.item, $style.current]"
      ) {{currentIndex}}

    template(v-if="currentIndex < lastIndex")
      template(v-for="index of lastIndex")
        template(v-if="index > currentIndex")
          nuxt-link(
            v-if="nextIndexOmmited && index < currentIndex + 3 || !nextIndexOmmited && index < lastIndex"
            :to="path + index"
            :class="[$style.item, $style.enable]"
          ) {{index}}
      span(v-if="nextIndexOmmited" :class="$style.ommited")
      nuxt-link(
        :to="path + lastIndex"
        :class="[$style.item, $style.enable]"
        ) {{lastIndex}}

    nuxt-link(
      :to="path + (currentIndex + 1)"
      :class="[$style.item, (currentIndex < lastIndex) ? [$style.enable] : [$style.disable]]"
      ) >
    nuxt-link(
      :to="path + lastIndex"
      :class="[$style.item, (currentIndex < lastIndex - 1) ? [$style.enable] : [$style.disable]]"
      ) >|
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    par: {
      type: Number,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    firstPath: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    lastIndex () {
      return Math.ceil(this.list.length / this.par)
    },
    prevIndexOmmited () {
      return this.currentIndex > 4
    },
    nextIndexOmmited () {
      return this.lastIndex - this.currentIndex > 2
    }
  }
}
</script>

<style lang="stylus" module>
.pager
  display table
  margin 20px auto
  font-family Rajdhani, sans-serif

.item
  display inline-block
  font-size(18px)
  width 25px
  height 25px
  line-height 25px
  margin 0 8px
  text-align center
.ommited
  &:after
    display inline-block
    font-family: 'Arial'
    content "\2022\2022\2022"
    letter-spacing 3px
    color #ddd
    font-size 12px
    transform translateY(-1px)
.disable
  pointer-events none
  color #ddd
  font-weight 400
.enable
  cursor pointer
  font-weight 600
  color #000
.current
  pointer-events none
  border-radius 5px
  color #fff
  font-weight 400
  background-color #aaa
</style>
