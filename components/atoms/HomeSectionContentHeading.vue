<template lang="pug">
  h2(:class="$style.heading")
    slot
    div(:class="$style.border" ref="border")
</template>

<style lang="stylus" module>
.heading
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
