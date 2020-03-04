const fs = require('fs')
const moment = require('moment')

const json = JSON.parse(fs.readFileSync('./contents/blog/summary.json', 'utf8'))
const map = json.fileMap

const tags = Object.keys(map).map((key) => {
  map[key].tags.map((value) => {
    value.key = key
    return value
  })
  return map[key].tags
}).reduce((pre, current) => {
  pre.push(...current)
  return pre
}).filter((value, index, array) => {
  const firstIndex = array.findIndex(({ name }) => name === value.name)
  if (firstIndex === index) {
    array[firstIndex].posts = [array[firstIndex].key]
    delete array[firstIndex].key
  } else {
    array[firstIndex].posts.push(array[index].key)
  }
  return array.findIndex(({ name }) => name === value.name) === index
})

const categories = Object.keys(map).map((key) => {
  map[key].category.key = key
  return map[key].category
}).filter((value, index, array) => {
  const firstIndex = array.findIndex(({ name }) => name === value.name)
  if (firstIndex === index) {
    array[firstIndex].posts = [array[firstIndex].key]
    delete array[firstIndex].key
  } else {
    array[firstIndex].posts.push(array[index].key)
  }
  return array.findIndex(({ name }) => name === value.name) === index
})

const yearly = Object.keys(map).reduce((list, key) => {
  const year = moment(map[key].created_at).format('YYYY')
  if (!list[year]) {
    list[year] = []
  }
  list[year].push(key)
  return list
}, {})

const monthly = Object.keys(yearly).reduce((acc, key) => {
  if (!acc[key]) {
    acc[key] = []
  }
  const monthList = yearly[key].reduce((list, key) => {
    const month = moment(map[key].created_at).format('MM')
    if (!list[month]) {
      list[month] = []
    }
    list[month].push(key)
    return list
  }, {})

  acc[key] = monthList
  return acc
}, {})

const createdIncrement = Object.keys(map)
  .map(key => key)
  .sort((a, b) => {
    const momentA = moment(map[a].created_at)
    const momentB = moment(map[b].created_at)

    if (momentA.isAfter(momentB)) { return -1 }
    if (momentA.isBefore(momentB)) { return 1 }
  })

const output = { tags, categories, yearly, monthly, createdIncrement }

fs.writeFileSync('./contents/blog/archives.json', JSON.stringify(output))
