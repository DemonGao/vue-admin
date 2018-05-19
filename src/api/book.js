import request from '@/utils/request'

export function add (query) {
  return new Promise((resolve, reject) => {
    request({
      url: '/kindle/cms/book/add',
      method: 'post',
      params: query
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
