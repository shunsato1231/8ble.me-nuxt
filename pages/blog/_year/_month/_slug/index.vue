<template lang="pug">
  article
    .div(:class="$style.meta")
      h2(:class="$style.title") {{title}}
      time(:class="$style.date" :datetime="created_at") {{created_at | formatDate}}
      div(:class="$style.category")
        nuxt-link(:to="'/blog/category/' + category.slug" ref="category" v-html="$options.filters.zenkaku(category.name)")
      div(:class="$style.tags")
        nuxt-link(v-for="tag in tags" :to="'/blog/tag/' + tag.slug" ref="tags" v-html="$options.filters.zenkaku(tag.name)")
      nuxt-link(:class="$style.prev" v-if="prev" :to="prev.url")
        div(:class="$style.text")
          p {{prev.title}}
        i.fas.fa-chevron-right(:class="$style.icon")
      nuxt-link(:class="$style.next" v-if="next" :to="next.url")
        div(:class="$style.text")
          p {{next.title}}
        i.fas.fa-chevron-left(:class="$style.icon")
    div(:class="$style.textWrapper")
      .text(v-html="descriptionHtml + $md.render(bodyContent)")
      aside(:class="$style.share")
        div(:class="$style.shareTitle") Share on
        div(:class="$style.shareButtonWrapper")
          ShareButton(href="hoge" :iconClass="['fab', 'fa-twitter']" hoverColor="#00acee" text="ツイートする")
          ShareButton(href="hoge" :iconClass="['fab', 'fa-facebook-f']" hoverColor="#2c4762" text="シェアする")
          ShareButton(href="hoge" :iconClass="['fab', 'fa-google-plus-g']" hoverColor="#dd4b39" text="共有する")
          ShareButton(href="hoge" :iconClass="['fab', 'fa-hatena']" hoverColor="#008ce0" text="はてぶする")
      Breadcrumbs(:breadcrumbs='breadcrumbs')
    div(:class="$style.pager")
      BackToButton(text="BLOG" href="/blog")
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

import { sourceFileArray, fileMap } from '../../../../../contents/blog/summary.json'
import { createdIncrement } from '../../../../../contents/blog/archives.json'

import ShareButton from '../../../../../components/molecules/ShareButton.vue'
import Breadcrumbs from '../../../../../components/molecules/Breadcrumbs.vue'
import BackToButton from '../../../../../components/atoms/BackToButton.vue'

import Prism from '@/plugins/prism'
import Meta from '~/assets/mixins/meta'

export default {
  components: {
    ShareButton,
    Breadcrumbs,
    BackToButton
  },
  mixins: [Meta],
  layout: 'baseLayout',
  computed: {
    descriptionHtml () {
      if (this.description) {
        return '<p>' + this.description + '</p><hr>'
      } else {
        return ''
      }
    },
    breadcrumbs () {
      return [
        {
          text: process.env.baseDesc,
          url: '/'
        },
        {
          text: 'Blog',
          url: `/blog`
        },
        {
          text: this.category.name,
          url: `/blog/category/${this.category.slug}`
        },
        {
          text: this.title,
          url: `${this.$router.history.base}${this.$route.path}`
        }
      ]
    }
  },
  async asyncData ({ params }) {
    const post = await require(`~/contents/blog/json/${params.year}-${params.month}-${params.slug}.json`)
    const currentPath = `contents/blog/json/${params.year}-${params.month}-${params.slug}.json`
    const currentIndex = createdIncrement.findIndex(val => val === currentPath)

    const prevPost = fileMap[createdIncrement[currentIndex + 1]]
    if (prevPost) {
      const prevUrl = '/blog/' + moment(prevPost.created_at).format('YYYY/MM') + '/' + prevPost.slug
      post.prev = { url: prevUrl, title: prevPost.title }
    } else {
      post.prev = false
    }

    const nextPost = fileMap[createdIncrement[currentIndex - 1]]
    if (nextPost) {
      const nextUrl = '/blog/' + moment(nextPost.created_at).format('YYYY/MM') + '/' + nextPost.slug
      post.next = { url: nextUrl, title: nextPost.title }
    } else {
      post.next = false
    }

    return Object.assign({}, post)
  },
  mounted () {
    this.setHeaderFlag(true)
    this.setArchiveFlag(false)
    this.setSidebarFlag(true)

    Prism.highlightAll()
    this.removeNoTitle()
  },
  methods: {
    ...mapActions('baseLayout', [
      'setHeaderFlag',
      'setSidebarFlag',
      'setArchiveFlag'
    ]),

    removeNoTitle () {
      Array.from(document.getElementsByClassName('toolbar-item')).forEach((el) => {
        if (el.children[0].textContent === 'no-title') {
          el.style.display = 'none'
        }
      })
    }
  },
  validate ({ params }) {
    return sourceFileArray.includes(`contents/blog/${params.year}-${params.month}-${params.slug}.md`)
  }
}
</script>
<style lang="stylus" module>
.meta
  position relative
  width 90%
  margin 35px auto 100px
  text-align center
  +breakpoint(small middle)
    padding 0 30px
  .title
    font-size(30px)
    font-weight 600
    margin-bottom 10px
  .date
    font-family 'Rajdhani', sans-serif
    position relative
    display inline-block
    font-size(16px)
    color #aaa
    font-weight 600
    padding-right 25px
    &::after
      position absolute
      content ''
      width 1px
      height 16px
      right 12px
      top 50%
      margin-top -8px
      background-color #ccc
  .category
    font-size(16px)
    font-family 'Rajdhani', sans-serif
    display inline-block
    a
      color #aaa
      font-weight 600
      &:hover
        color #000
        text-decoration none
    &::before
      color #aaa
      content 'CATEGORY :'
      font-weight 600
      margin-right 8px
  .tags
    font-family 'Rajdhani', sans-serif
    font-size(16px)
    &::before
      color #aaa
      content 'TAGS :'
      font-weight 600
      margin-right 8px
    a
      position relative
      color #aaa
      font-weight 600
      &:hover
        color #000
        text-decoration none
      &:not(:last-child)
        margin-right 20px
        &::after
          position absolute
          content ''
          width 2px
          height 12px
          top 50%
          right -10px
          margin-top -6px
          transform rotate(20deg)
          background-color #aaa
  .prev
    display block
    position fixed
    right 0
    top 55%
    width 35px
    height 100px
    background #2e2e2e
    border-radius 3px 0 0 3px
    +breakpoint(small middle)
      display table
      position absolute
      top 50%
      right 5px
      background none
      width auto
      height auto
    &:before
      content ''
      position absolute
      top 0
      right 0
      width 35px
      height 100px
      background #666
      border-radius 3px 0 0 3px
      z-index 2
      transform scaleX(0)
      transform-origin 0 100%
      transition-property transform
      transition-duration 0.6s
      transition-timing-function cubic-bezier(1, 0, 0, 1)
      +breakpoint(small middle)
        display none
    &:hover
      &:before
        transform scaleX(1)
        transform-origin 0% 0%
      .text
        transform: translateX(0)
    .text
      position absolute
      display flex
      align-items center
      justify-content center
      top 0
      right 35px
      background-color rgba(0, 0, 0, 0.4)
      width 200px
      height 100px
      padding 10px
      font-size(16px)
      color #fff
      transform translateX(235px)
      transition-duration 0.6s
      transition-delay 0
      transition-timing-function cubic-bezier(1, 0, 0, 1)
      +breakpoint(small middle)
        display none
      p
        display -webkit-box
        overflow hidden
        -webkit-line-clamp 4
        -webkit-box-orient vertical
        line-height 23px
        overflow-wrap break-word
    .icon
      position absolute
      display block
      font-size(20px)
      color #fff
      top 50%
      right 50%
      transform translateX(50%)translateY(-50%)
      z-index 3
      +breakpoint(small middle)
        font-size(24px)
        color #000

  .next
    @extends .prev
    left 0
    border-radius 0 3px 3px 0
    +breakpoint(small middle)
      left 5px
    &:before
      left 0
      border-radius 0 3px 3px 0
    .text
      left 35px
      transform translateX(-235px)

.textWrapper
  width 90%
  margin 0 auto
  font-feature-settings "palt" 1
  font-family "游ゴシック", "Yu Gothic", YuGothic, "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, "ＭＳ ゴシック", sans-serif
  +breakpoint(large)
    width 70%

.share
  width 100%
  margin 80px auto 10px auto
  border-top 1px solid #ddd
  border-bottom 1px solid #ddd
  padding 30px 0
  .shareTitle
    font-family 'Rajdhani', sans-serif
    font-weight 600
    font-size(18px)
    text-align center
  .shareButtonWrapper
    margin 30px auto 0
    width 240px
    display flex
    flex-wrap wrap
    justify-content space-between
    & > *
      margin-bottom 20px

.pager
  width 90%
  margin 50px auto 20px auto
</style>

<style lang="stylus">
.text
  h1
    margin 80px auto
    padding-bottom 5px
    font-size(30px)
    text-align center
  h2
    margin 50px auto
    padding-bottom 5px
    font-size(20px)
    text-align center
  h3
    position relative
    margin 30px 0 20px
    padding-left 25px
    font-size(18px)
    &:before
      position absolute
      content '// '
      top -7px
      left 0
      font-family 'Rajdhani', sans-serif
      font-size(28px)
      letter-spacing -3px
      font-weight 700
  h4
    font-size(16px)
    padding-bottom 5px
    border-bottom 1px solid #eee
    margin-bottom 15px
  h5
    position relative
    margin 20px 0 15px
    padding-left 20px
    font-size(15px)
    &:before
      position absolute
      display block
      content ''
      width 4px
      height 4px
      background #000
      top 50%
      left 8px
      margin-top -2px
      font-family 'Rajdhani', sans-serif
      font-size(28px)
      letter-spacing -3px
      font-weight 700
  h6
    position relative
    margin 20px 0 15px
    padding-left 20px
    font-size(14px)
    &:before
      position absolute
      display block
      content ''
      width 4px
      height 4px
      background #000
      top 50%
      left 8px
      margin-top -2px
      font-family 'Rajdhani', sans-serif
      font-size(28px)
      letter-spacing -3px
      font-weight 700
  p
    font-size(15px)
    margin-bottom 15px
    letter-spacing 0px
    line-height 1.75
    line-break strict
    word-break normal
    max-width 100%
    overflow hidden
  hr
    border none
    margin 50px auto
    position relative
    border-radius 50%
    height 10px
    width 10px
    background-color #ccc
    overflow visible
    &:before
      position absolute
      top 0
      left -20px
      display block
      content ''
      border-radius 50%
      height 10px
      width 10px
      background-color #ccc
    &:after
      position absolute
      top 0
      right -20px
      display block
      content ''
      border-radius 50%
      height 10px
      width 10px
      background-color #ccc
  img
    display block
    max-width 100%
    margin 30px auto
  ul
    margin 15px auto
    width 95%
    li
      font-size(15px)
      position relative
      margin-bottom 5px
      padding-left 30px
      &:before
        content ''
        position absolute
        height 3px
        width 3px
        background-color: #2e2e2e
        top 10.5px
        left 8.5px
  ol:not(.footnotes-list)
    counter-reset number
    list-style none
    margin 15px auto
    width 95%
    li
      position relative
      margin-bottom 5px
      padding-left 30px
      line-height 1.8em
      font-size 15px
      font-size 1.5rem
      &:before
        content ''
        position absolute
        height 22px
        width 22px
        border-radius 3px
        background-color #000
        top 5px
        left 0px
      &:after
        position absolute
        font-family 'Rajdhani', sans-serif
        font-weight 600
        font-size(16px)
        top 3px
        left 6px
        counter-increment number
        content counter(number)
        color #fff
  em
    background-color #FAFAD2
    font-size(15px)
    font-style normal
    padding 3px
  strong
    padding 2px 5px
    background: linear-gradient(transparent 40%, #FAFAD2 40%);
    font-weight bold

  .table-wrapper
    padding 10px
    margin 30px 0
    table
      width 100%
      min-width 400px
      margin auto
      border-collapse separate
      border-spacing 0
      border-radius 5px
      border solid 1px #d1d1d1
    tr
      width 100%
    th, td
      box-sizing border-box
      padding 15px
    thead
      th
        font-size(12px)
        background #000
        color #fff
        &:not(:last-child)
          border-right solid 1px #666
        &:first-child
          border-radius 5px 0 0 0
        &:last-child
          border-radius 0 5px 0 0
    tbody
      font-size(12px)
      th
        background #ccc
      tr
        &:not(:last-child)
          td
            border-bottom solid 1px #d1d1d1
        td:not(:last-child)
          border-right solid 1px #d1d1d1
  @media (max-width: 559px)
    .table-wrapper
      max-width 100%
      overflow-x: scroll
      &::-webkit-scrollbar
        background #fff
        border-radius 5px
        height 6px
        border 1px solid #eee
      &::-webkit-scrollbar-thumb
        background #eee
        border-radius 5px

.zenkaku
  font-size(14px)

/** footnote */
.footnote-ref
  font-size 75%
  line-height 0
  position relative
  vertical-align baseline
  top -0.5em
  a
    color #b0b0b0
    &:hover
      color #000

.footnotes
  width 90%
  margin 50px auto
  .footnotes-list
    list-style none
    counter-reset footnotes-list
    .footnote-item
      position relative
      padding-left 1.8em
      &:before
        display block
        position absolute
        top 0
        left 0
        counter-increment footnotes-list
        content counter(footnotes-list) '.'
        color #777
        font-size(12px)
        line-height 1.75
      *
        line-height 1.75
        font-size(12px)
        color #777
      a
        color #000
  .footnote-backref
    font-size(10px)

/**Prism */
code:not(.number-line-style)
  font-size(12px)
  font-family Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace
  padding 3px
  margin 0 5px
  background #f7f7f7
  border 1px solid #d1d1d1
  border-radius 4px

pre:not(.number-line-style)
  font-size(12px)
  font-family Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace
  background #F9FAFB
  border 1px solid #d1d1d1
  border-radius 4px
  padding 15px
  overflow-y: scroll;
  margin 15px 0
  code
    background initial
    border none
    overflow auto
    -webkit-overflow-scrolling touch
    will-change scroll-position

pre.number-line-style
  position relative
  width 100%
  background linear-gradient(rgba(245,246,248,.5) 50%,#f5f6f8 50%) 0 0 / 48px 48px #fff
  color #666
  line-height 24px
  tab-size 4
  hyphens none
  margin 15px 0
  overflow-y scroll
  border-radius 5px
  border 1px solid #d1d1d1
  padding-left 66px
  counter-reset linenumber
  code.number-line-style
    overflow auto
    -webkit-overflow-scrolling touch
    will-change scroll-position
    width 100%
    line-height initial
    font-family Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace
    font-size(10px)

/** lines */
.line-numbers-rows
  span
    height 24px

.line-highlight
  position absolute
  width calc(100% - 56px)
  left 56px
  background rgba(255, 255, 0, 0.1)

.line-numbers-rows
  position absolute
  display block
  top 0
  left 0
  width 56px
  height 100%
  color #fff
  font-family 'Rajdhani', sans-serif
  font-weight 600
  font-size 16px
  background #000
  span
    pointer-events none
    display block
    counter-increment linenumber
    &::before
      content '0' counter(linenumber, decimal-leading-zero) '.'
      display block
      text-align center
  span:nth-of-type(99) ~ span::before
    content counter(section, decimal-leading-zero) '.'

/** toolbar */
.code-toolbar
  position relative
  .toolbar
    position absolute
    right 0
    top 0
    span
      display block
      padding 0 8px
      height 24px
      line-height 24px
      background #d1d1d1
      color #fff
      border-radius 0 5px 0 5px
      font-family 'Rajdhani', sans-serif
      font-size(13px)
      font-weight 500
      &:empty
        display none
  pre, .line-numbers-rows
    padding-top 24px
    padding-bottom 24px
  .line-highlight
    transform translateY(24px)

/** syntax highlight */
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata
  color #bbb

.token.namespace
  opacity .7

.token.property,
.token.tag,
.token.constant,
.token.symbol,
.token.deleted
  color #f92672

.token.boolean,
.token.number
  color #ae81ff

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted
  color #35A6B8

.token.punctuation,
.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string,
.token.variable
  color #aaa

.token.atrule,
.token.attr-value,
.token.function,
.token.class-name
  color #F9AF0C

.token.keyword
  color #a6e22e

.token.regex,
.token.important
  color #E95C5C

.token.important,
.token.bold
  font-weight bold

.token.italic
  font-style italic

.token.entity
  cursor help

</style>
