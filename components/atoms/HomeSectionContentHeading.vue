<template lang="pug">
  h2
    slot
    .border
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
h2
  position relative
  font-size(22px)
  font-weight 700
  font-family 'Rajdhani', sans-serif
  .border
    position absolute
    bottom 0
    left 0
    background #000
    width 100%
    height  3px
</style>
