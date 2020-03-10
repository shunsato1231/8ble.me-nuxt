import { tags, categories } from '../../contents/blog/archives.json'

export default {
  head () {
    const head = { meta: [] }

    // noScroll
    if (this.noScroll) {
      head.bodyAttrs = { class: 'noScroll' }
    }

    // url
    const url = `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}`
    head.meta.push({ hid: 'og:url', property: 'og:url', content: url })

    // title
    if (this.meta && this.meta.title) {
      head.title = this.meta.title
      head.meta.push({ hid: 'description', name: 'description', content: this.meta.description })
    } else {
      head.titile = process.env.baseSiteName
    }

    // description
    if (this.meta && this.meta.description) {
      head.meta.push({ hid: 'description', name: 'description', content: this.meta.description })
      head.meta.push({ hid: 'og:description', name: 'og:description', content: this.meta.description })
    } else {
      head.meta.push({ hid: 'description', name: 'description', content: process.env.baseDesc })
      head.meta.push({ hid: 'og:description', name: 'og:description', content: process.env.baseDesc })
    }

    // author
    if (this.meta && this.meta.author) {
      head.meta.push({ hid: 'author', name: 'author', content: this.meta.author })
    } else {
      head.meta.push({ hid: 'author', name: 'author', content: process.env.baseAuthor })
    }

    // image
    if (this.meta && this.meta.image) {
      head.meta.push({ hid: 'og:image', name: 'og:image', content: `${process.env.baseUrl}/${this.meta.image}` })
    } else {
      head.meta.push({ hid: 'og:image', name: 'og:image', content: `${process.env.baseUrl}/${process.env.baseImage}` })
    }

    // type
    if (this.meta && this.meta.type) {
      head.meta.push({ hid: 'og:type', name: 'og:type', content: this.meta.type })
    } else {
      head.meta.push({ hid: 'og:type', name: 'og:type', content: 'website' })
    }

    // keywords
    if (this.meta && this.meta.keywords) {
      head.meta.push({ hid: 'keywords', name: 'keywords', content: this.meta.keywords })
    } else {
      const allTags = tags.map(tag => tag.name)
      const allCategories = categories.map(category => category.name)
      const keywords = allCategories.concat(allTags)
      head.meta.push({ hid: 'keywords', name: 'keywords', content: keywords })
    }

    // Twitter Cards
    head.meta.push({ hid: 'twitter:card', name: 'twitter:card', content: 'summary' })
    if (this.meta && this.meta.twitterSite) {
      head.meta.push({ hid: 'twitter:site', name: 'twitter:site', content: this.meta.twitterSite })
    } else {
      head.meta.push({ hid: 'twitter:site', name: 'twitter:site', content: process.env.baseTwitterSite })
    }
    if (this.meta && this.meta.twitterCreator) {
      head.meta.push({ hid: 'twitter:creator', name: 'twitter:creator', content: this.meta.twitterCreator })
    } else {
      head.meta.push({ hid: 'twitter:creator', name: 'twitter:creator', content: process.env.baseTwitterCreator })
    }

    // Facebook ID
    if (this.meta && this.meta.facebookId) {
      head.meta.push({ hid: 'fb:app_id', name: 'fb:app_id', content: this.meta.facebookId })
    } else {
      head.meta.push({ hid: 'fb:app_id', name: 'fb:app_id', content: process.env.baseFacebookId })
    }
    return head
  },
  jsonld () {
    const ldItems = []

    // 共通の要素のみ定義
    const webSite = {
      '@type': 'WebSite',
      '@id': process.env.baseUrl,
      'inLanguage': 'ja',
      'name': process.env.baseSiteName,
      'url': process.env.baseUrl,
      'publisher': {
        '@id': `${process.env.baseUrl}/#org`
      },
      'description': process.env.baseDesc
    }
    ldItems.push(webSite)

    const organaization = {
      '@type': 'Organization',
      '@id': `${process.env.baseUrl}/#org`,
      'name': process.env.baseSiteName,
      'logo': {
        '@type': 'ImageObject',
        '@id': `${process.env.baseUrl}/#logo`,
        'url': `${process.env.baseUrl}/${process.env.baseImage}`
      },
      'image': {
        '@id': `${process.env.baseUrl}/#logo`
      },
      'founder': {
        '@type': 'Person',
        '@id': `${process.env.baseUrl}/#person`
      }
    }

    ldItems.push(organaization)

    const person = {
      '@type': 'Person',
      '@id': `${process.env.baseUrl}/#person`,
      'name': process.env.baseName,
      'gender': 'male',
      'description': process.env.profile,
      'url': process.env.baseUrl,
      'homeLocation': {
        '@type': 'Place',
        'name': 'Sapporo City Hokkaido, Japan'
      },
      'image': `${process.env.baseUrl}/${process.env.baseProfileImg}`
    }
    ldItems.push(person)

    // 下層ページの場合
    if (this.$route.path !== '/') {
      const title = this.meta && this.meta.title ? this.meta.title : process.env.baseSiteName
      const desc = this.meta && this.meta.description ? this.meta.description : process.env.baseDesc
      const image = this.meta && this.meta.image ? `${process.env.baseUrl}/${this.meta.image}` : `${process.env.baseUrl}/${process.env.baseImage}`

      const webPage = {
        '@type': 'WebPage',
        '@id': `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}/#webpage`,
        'url': `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}`,
        'name': title,
        'isPartOf': {
          '@id': process.env.baseUrl
        },
        'inLanguage': 'ja',
        'primaryImageOfPage': {
          '@type': 'ImageObject',
          '@id': `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}/#primaryimage`,
          'url': image
        },
        'description': desc,
        'breadcrumb': {
          '@id': `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}/#breadcrumb`
        }
      }
      ldItems.push(webPage)

      let breadcrumbItems = []
      if (!this.breadcrumbs) {
        const url = this.$route.path
        breadcrumbItems = url.split('/').map((item, index, array) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'item': {
            '@id': process.env.baseUrl + array.slice(0, index + 1).join('/'),
            'name': item
          }
        }))
      } else {
        breadcrumbItems = this.breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@id': `${process.env.baseUrl}${item.url}`,
            name: item.text
          }
        }))
      }

      const breadcrumb = {
        '@type': 'BreadcrumbList',
        '@id': `${process.env.baseUrl}${this.$router.history.base}${this.$route.path}/#breadcrumb`,
        'itemListElement': breadcrumbItems
      }
      ldItems.push(breadcrumb)
    }

    if (this.ldItems) {
      ldItems.push(this.ldItems)
    }

    return {
      '@context': 'http://schema.org',
      '@graph': ldItems
    }
  }
}
