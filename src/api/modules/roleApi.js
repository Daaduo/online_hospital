export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 获取角色分页列表
   */
  SYS_ROLE_GET_PAGE (data = {}) {
    // 接口请求
    return request({
      url: '/Role/Search',
      method: 'post',
      data
    })
  },

  /**
   * @description 根据条件获取角色分页列表
   */
  SYS_ROLE_GET_PAGE_BY_CONDITION (data = {}) {
    // 接口请求
    return request({
      url: '/Role/SearchByNameOrCode',
      method: 'post',
      data
    })
  },

  /**
   * @description 新增角色
   */
  SYS_ROLE_ADD (data = {}) {
    // 接口请求
    return request({
      url: '/Role/CreateOrEditSave',
      method: 'post',
      data
    })
  },

  /**
   * @description 删除角色
   */
  SYS_ROLE_DELETE (id) {
    // 接口请求
    return request({
      url: `/Role/DeleteById${id}`,
      method: 'delete'
    })
  },
  /**
 * @description 单个获取
 */
  SYS_ROLE_GET_BY_ID (id) {
  // 接口请求
    return request({
      url: `Role/getRoleById/${id}`,
      method: 'get'
    })
  }
})
