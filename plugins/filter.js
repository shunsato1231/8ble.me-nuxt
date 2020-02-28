import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function (value) {
  return moment(value).format('YYYY.MM.DD')
})

const zenkaku = /(?:[！”＃＄％＆’（）＊＋，－．／：；＜＝＞？＠［￥］＾＿‘｛｜｝￣])|(?:[、。・゛゜´｀¨ヽヾゝゞ〃仝々〆〇ー―‐＼～～∥…‥“〔〕〈〉《》「」『』【】±×÷≠≦≧∞∴♂♀°′″℃￠￡§☆★○●◎◇◇◆□■△▲▽▼※〒→←↑↓〓])|(?:[０-９])|(?:[Ａ-Ｚ])|(?:[ａ-ｚ])|(?:[ぁ-ん])|(?:[ァ-ヶ])|(?:[Α-Ωα-ω])|(?:[А-Яа-я])|(?:[\u2570-\u25FF])|(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF])/g

Vue.filter('zenkaku', function (value) {
  return value.replace(zenkaku, `<span class="zenkaku">$&</span>`)
})
