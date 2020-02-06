<template lang="pug">
  h1(:class="$style.heading")
    span(:class="$style.text" ref="text")
      slot
</template>

<script>
export default {

}
</script>

<style lang="stylus" module>
.heading
  font-size(40px)
  font-weight 800
  font-family 'Rajdhani', sans-serif
  text-align center
  overflow hidden
  .text
    display inline-block
    line-height 40px
    letter-spacing 15px
    padding-left 15px
</style>
