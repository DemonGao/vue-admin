import Mock from 'mockjs'
// import { param2Obj } from '@/utils'

// const resultMap = {
//   code: 'SUCCESS',
//   msg: '成功',
//   body: null
// }

export default {
  add: () => {
    return Mock.mock({
      code: 'SUCCESS',
      msg: '成功',
      body: '@increment'
    })
  }
}
