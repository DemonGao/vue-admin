import { param2Obj } from '@/utils'

const resultMap = {
  code: 'SUCCESS',
  msg: '成功',
  body: {}
}

const resultMapError = {
  code: '500',
  msg: '失败',
  body: null
}

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    resultMap.body = userMap[username]
    return resultMap
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      resultMap.body = userMap[token]
      return resultMap
    } else {
      return resultMapError
    }
  },
  logout: () => resultMap
}
