import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const resultMap = {
  code: 'SUCCESS',
  msg: '成功',
  body: null
}
const List = []
const Count = 50

for (let i = 0; i < Count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@ctitle(3,4)'
  }))
}

export default {
  getList: (config) => {
    const {name, page = 1, limit = 20, sort} = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (name && item.name.indexOf(name) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    resultMap.body = {
      totalCount: mockList.length,
      list: pageList
    }
    return resultMap
  },
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
