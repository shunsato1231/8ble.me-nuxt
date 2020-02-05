<template lang="pug">
  h3(:class="$style.heading")
    slot
</template>

<style lang="stylus" module>
.heading
  font-size(20px)
  font-weight 600
  font-family 'Rajdhani', sans-serif
</style>
