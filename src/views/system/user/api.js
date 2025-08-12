import { request } from '@/api/service'

export function Search (data) {
  return request({
    url: '/api/User/Search',
    method: 'post',
    data
  })
}

export function SetUserCode (data) {
  return request({
    url: '/api/User/SetUserCode',
    method: 'post',
    data
  })
}

export function ResetPassWord (userId) {
  return request({
    url: '/api/User/ResetPassWord',
    method: 'post',
    params: { userId }
  })
}

export function QueryDoctor (data) {
  return request({
    url: '/api/User/QueryDoctor',
    method: 'post',
    data
  })
}

export function EditPassWord (data) {
  return request({
    url: '/api/User/EditPassWord',
    method: 'post',
    data
  })
}

export function CreateOrEditSave (data) {
  return request({
    url: '/api/User/CreateOrEditSave',
    method: 'post',
    data
  })
}

export function GetUserById (id) {
  return request({
    url: '/api/User/getUserById',
    method: 'get',
    params: { id }
  })
}

export function DeleteUserById (id) {
  return request({
    url: '/api/User/DeleteById',
    method: 'delete',
    params: { id }
  })
}
