import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/kindle/cms/bookType/loadList',
    method: 'post',
    params: query
  })
}
