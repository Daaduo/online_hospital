import { request } from '@/api/service'

export function GetList (data) {
  return request({
    url: '/api/Department/Search',
    method: 'post',
    data
  })
}

export function QueryIsRecommend (data) {
  return request({
    url: '/api/Department/QueryIsRecommend',
    method: 'post',
    data
  })
}

export function Save (data) {
  return request({
    url: '/api/Department/CreateOrEditSave',
    method: 'post',
    data
  })
}

export function getSingleById (params) {
  return request({
    url: '/api/Department/CreateOrEditSave',
    method: 'get',
    params
  })
}

export function Del (params) {
  return request({
    url: '/api/Department/DeleteById',
    method: 'delete',
    params
  })
}
