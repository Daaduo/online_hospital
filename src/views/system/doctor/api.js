import { request } from '@/api/service'

export function GetList (data) {
  return request({
    url: '/api/Doctor/Search',
    method: 'post',
    data
  })
}

export function QueryIsRecommend (data) {
  return request({
    url: '/api/Doctor/QueryIsRecommend',
    method: 'post',
    data
  })
}

export function Save (data) {
  return request({
    url: '/api/Doctor/Save',
    method: 'post',
    data
  })
}

export function getDoctorById (params) {
  return request({
    url: '/api/Doctor/getDoctorById',
    method: 'get',
    params
  })
}

export function Del (params) {
  return request({
    url: '/api/Doctor/DeleteById',
    method: 'delete',
    params
  })
}
