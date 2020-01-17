<template lang="pug">
  div
    span {{activeSectionIndex}}
    span /
    span {{sectionNumber}}
</template>

<script>
export default {
  props: {
    activeSectionIndex: {
      type: Number,
      required: true
    },
    sectionNumber: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
div
  font-family 'Rajdhani', sans-serif
  font-size(18px)
  font-weight 500
  color #ccc
</style>
