import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/cms/bookType/loadList',
    method: 'post',
    params: query
  })
}
