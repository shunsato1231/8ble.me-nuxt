import MarkdownIt from 'markdown-it'

export default ({ app }, inject) => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typography: true,
    highlight: (str, val) => {
      try {
        const meta = JSON.parse('{' + val + '}')
        const lang = meta.lang ? 'language-' + meta.lang : ''
        const highlight = meta.highlight ? 'data-line="' + meta.highlight + '"' : ''
        const number = (meta.number === false) ? '' : 'line-numbers'
        const numberStyle = number ? 'number-line-style' : ''

        let title
        if (lang) {
          title = meta.title ? 'data-language="' + meta.title + '"' : 'data-language="' + meta.lang + '"'
        } else {
          title = meta.title ? 'data-language="' + meta.title + '"' : ''
        }

        return '<pre class="' + number + ' ' + numberStyle + '"' + highlight + '>' + '<code class="' + numberStyle + ' ' + lang + '"' + title + '>' + md.utils.escapeHtml(str) + '</code></pre>'
      } catch {
        return '<pre><code>' + md.utils.escapeHtml(str) + '</code></pre>'
      }
    }
  })

  md.use(require('markdown-it-footnote'))
  md.use(require('markdown-it-mark'))
  md.use(require('markdown-it-deflist'))

  const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const aIndex = tokens[idx].attrIndex('target')
    if (tokens[idx].attrs[0][1].match('http')) {
      if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank'])
      } else {
        tokens[idx].attrs[aIndex][1] = '_blank'
      }
    }
    return defaultRender(tokens, idx, options, env, self)
  }

  md.renderer.rules.footnote_caption = (tokens, idx) => {
    let n = Number(tokens[idx].meta.id + 1).toString()

    if (tokens[idx].meta.subId > 0) {
      n += ':' + tokens[idx].meta.subId
    }

    return n
  }

  md.renderer.rules.footnote_block_open = () => (
    '<section class="footnotes">\n' +
    '<ol class="footnotes-list">\n'
  )

  inject('md', md)
}
