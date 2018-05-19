import request from '@/utils/request'

export function getToken() {
  return request({
    url: 'http://127.0.0.1:8443/cms/book/getToken', // 假地址 自行替换
    method: 'POST'
  })
}
