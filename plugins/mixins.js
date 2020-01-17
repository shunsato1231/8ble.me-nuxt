import Vue from 'vue'

Vue.mixin({
  methods: {
    $delay (msec, func = () => {}) {
      let timeoutId
      let r
      const exec = () => new Promise((resolve) => {
        r = resolve
        timeoutId = setTimeout(async () => {
          timeoutId = null
          await func()
          resolve()
        }, msec)
      })
      return {
        exec,
        cancel: () => {
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
            r()
          }
        }
      }
    }
  }
})
