import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/cms/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

/**
 * 获取用户权限
 * @param token
 */
export function getUserInfo(token) {
  return new Promise((resolve, reject) => {
    request({
      url: '/cms/user/userInfo',
      method: 'POST',
      params: { token }
    }).then((res) => {
      console.log(res)
      const {roles} = res
      Object.assign(res, {
        roles: roles.split(',')
      })
      resolve(res)
    }).catch((err) => reject(err))
  })
}

