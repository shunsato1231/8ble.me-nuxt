<template lang="pug">
  div(:class="$style.wrapper")
    span(:class="[{[$style.caret]: caretFlag}, $style.str]" :style="{borderColor: caretColor}") {{displayText}}
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    caretColor: {
      type: String,
      default: '#000',
      required: false
    }
  },
  data () {
    return {
      caretFlag: false,
      displayText: ''
    }
  },
  watch: {
    text (value) {
      this.displayText = '';

      [...value].forEach((str, index) => {
        setTimeout(() => {
          this.displayText += str
        }, 20 * ++index)
      })

      this.$delay(20 * [...value].length + 1500, () => {
        this.$emit('complete')
      }).exec()
    }
  },
  created () {
    setInterval(() => {
      this.caretFlag = !this.caretFlag
    }, 400)
  },
  methods: {
    stop (value) {
      this.displayText = ''
    }
  }
}
</script>

<style lang="stylus" module>
  .wrapper
    display table
    position relative
    .str
      padding-right 2px
      border-right 0
    .caret
      border-right 2px solid
</style>
