import { request } from '@/api/service'

/**
 * 文章列表
 * @param {
 *  "page": 0,
 *  "rows": 0,
 *  "order": "ASC",
 *  "sortField": "string",
 *  "value": "string",
 *  "code": "string",
 *  "parentId": 0
 * }
 * @returns
 */

export function GetList (data) {
  return request({
    url: '/api/Article/Search',
    method: 'post',
    data
  })
}
/**
 * 新增/编辑
 * @param {
 *  "id": 0,
 *  "title": "string",
 *  "titleSecond": "string",
 *  "contents": "string",
 *  "isTop": 0,
 *  "imageUrl": "string",
 *  "menuId": 0,
 *  "comeFrom": "string",
 *  "sequence": 0
 * }
 * @returns
 */

export function Save (data) {
  return request({
    url: '/api/Article/CreateOrEditSave',
    method: 'post',
    data
  })
}
export function GetSingle (id) {
  return request({
    url: '/api/Article/getArticleById',
    method: 'get',
    params: { id }
  })
}

export function Del (id) {
  return request({
    url: '/api/Article/DeleteById',
    method: 'delete',
    params: { id }
  })
}
