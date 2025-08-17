import { request } from '@/api/service'

export function GetList (data) {
  return request({
    url: '/api/Banner/Search',
    method: 'post',
    data
  })
}

export function Save (data) {
  return request({
    url: '/api/Banner/CreateOrEditSave',
    method: 'post',
    data
  })
}
export function GetSingle (id) {
  return request({
    url: '/api/Banner/getBannerById',
    method: 'get',
    params: { id }
  })
}

export function Del (id) {
  return request({
    url: '/api/Banner/DeleteById',
    method: 'delete',
    params: { id }
  })
}
