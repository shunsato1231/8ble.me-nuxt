<template lang="pug">
  ul
    li(v-for="index of indexNumber" :key="index" :class="{'active': activeSectionIndex == index}")
      {{index}}
</template>

<script>
export default {
  props: {
    indexNumber: {
      type: String,
      required: true
    },

    activeSectionIndex: {
      type: String,
      required: true
    }
  },
}
</script>

<style lang="stylus" scoped>
  li
    text-align center
    font-size(20px)
    font-family 'Rajdhani', sans-serif
</style>