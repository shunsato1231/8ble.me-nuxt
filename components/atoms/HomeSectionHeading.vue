<template lang="pug">
  h1
    span
      slot
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
h1
  font-size(40px)
  font-weight 800
  font-family 'Rajdhani', sans-serif
  margin-bottom 50px
  text-align center
  overflow hidden
  span
    display inline-block
    line-height 40px
    letter-spacing 15px
    padding-left 15px
</style>
