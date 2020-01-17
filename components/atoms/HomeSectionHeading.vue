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
  paddin 10px auto
  font-weight 800
  font-family 'Rajdhani', sans-serif
  margin-bottom 50px
  text-align center
  letter-spacing 15px
  overflow hidden
  span
    line-height 40px
    display inline-block
</style>
