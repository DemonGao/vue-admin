import request from '@/utils/request'

export function add (data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/cms/book/add',
      method: 'POST',
      data
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
