import { request } from '@/api/service'
/**
   * @description 搜索专家用户
   */
const EXPERT_USER_SEARCH = (data = {}) => {
  // 接口请求
  return request({
    url: '/api/ExpertUser/Search',
    method: 'post',
    data
  })
}

/**
   * @description 创建或编辑保存专家用户
   */
const EXPERT_USER_CREATE_OR_EDIT_SAVE = (data = {}) => {
  // 接口请求
  return request({
    url: '/api/ExpertUser/CreateOrEditSave',
    method: 'post',
    data
  })
}

/**
   * @description 根据ID获取专家用户
   */
const EXPERT_USER_GET_BY_ID = (id) => {
  // 接口请求
  return request({
    url: `/api/ExpertUser/getExpertUserById/${id}`,
    method: 'get'
  })
}

/**
   * @description 根据ID删除专家用户
   */
const EXPERT_USER_DELETE_BY_ID = (id) => {
  // 接口请求
  return request({
    url: `/api/ExpertUser/DeleteById/${id}`,
    method: 'delete'
  })
}
export default {
  EXPERT_USER_SEARCH,
  EXPERT_USER_CREATE_OR_EDIT_SAVE,
  EXPERT_USER_GET_BY_ID,
  EXPERT_USER_DELETE_BY_ID
}
