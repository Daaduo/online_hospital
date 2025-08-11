import { request } from '@/api/service'

export function GetList (data) {
  return request({
    url: '/api/Menu/Search',
    method: 'post',
    data
  })
}
export function GetUserMenu (data) {
  return request({
    url: '/api/Menu/GetUserMenu',
    method: 'post',
    data
  })
}
export function GetAllMenu () {
  return request({
    url: '/api/Menu/GetALLMenu',
    method: 'get'
  })
}

export function SaveMenu (obj) {
  return request({
    url: '/api/Menu/CreateOrEditSave',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/api/Menu/DeleteById',
    method: 'delete',
    params: { id }
  })
}
export function GetMenuById (id) {
  return request({
    url: '/api/Menu/getMenuById',
    method: 'get',
    params: { id }
  })
}
