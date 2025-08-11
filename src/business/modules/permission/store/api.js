import { request } from '@/api/service'
export function getPermissions () {
  return request({
    url: '/api/Menu/GetUserMenu',
    method: 'post'
  }).then(ret => {
    // 如果使用你自己的后端，需要在此处将返回结果改造为本模块需要的结构
    // 结构详情，请参考示例中打印的日志 ”获取权限数据成功：{...}“ （实际上就是“资源管理”页面中列出来的数据）

    // 添加错误处理，确保ret.resultObj存在且有元素
    if (!ret || !ret.resultObj || !Array.isArray(ret.resultObj) || ret.resultObj.length === 0) {
      console.error('获取权限数据格式错误，返回空菜单')
      return []
    }

    // 确保children存在
    return ret.resultObj[0].children || []
  }).catch(error => {
    console.error('获取权限数据失败:', error)
    return []
  })
}
