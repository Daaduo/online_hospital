import { request } from '@/api/service'

export function GetList (data) {
  return request({
    url: '/api/Role/Search',
    method: 'post',
    data
  })
}
export function GetRoleByNameOrCode (data) {
  return request({
    url: '/api/Role/SearchByNameOrCode',
    method: 'post',
    data
  })
}
export function CreateOrEditSave (data) {
  return request({
    url: '/api/Role/CreateOrEditSave',
    method: 'post',
    data
  })
}

export function GetRoleById (id) {
  return request({
    url: '/api/Role/getRoleById',
    method: 'get',
    params: { id }
  })
}
export function DeleteRoleById (id) {
  return request({
    url: '/api/Role/DeleteById',
    method: 'delete',
    params: { id }
  })
}
