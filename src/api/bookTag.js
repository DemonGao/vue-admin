import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/cms/bookTag/loadList',
    method: 'post',
    params: query
  })
}
