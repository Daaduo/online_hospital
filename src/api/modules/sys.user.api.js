export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN (params = {}) {
    // 接口请求
    return request({
      url: '/api/Account/login',
      method: 'post',
      params
    })
  },
  /**
   * @description 用户注册
   */
  SYS_USER_REGISTER (data = {}) {
    // 接口请求
    return request({
      url: '/api/Account/Regist',
      method: 'post',
      data
    })
  },

  /**
   * @description 获取用户信息
   */
  SYS_USER_INFO () {
    // 接口请求
    return request({
      url: '/api/User/QueryDoctor',
      method: 'get'
    })
  }

})
