import constantRoutes, { frameInRoutes } from '@/router/routes'
import layoutHeaderAside from '@/layout/header-aside'
import { menuHeader } from '@/menu'
import router from '@/router'
import { uniqueId } from 'lodash'
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
// eslint-disable-next-line no-unused-vars
const StaticMenuHeader = [...menuHeader] // 静态菜单暂存，重新登录后，需要重新加载动态菜单与此处的静态菜单合并

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

function isEmpty (value) {
  if (value == null || value === '') {
    return true
  }
  return false
}
/**
 * 构建路由列表
 * menuType 1=menu 2=btn 3=route
 * @param routers
 * @param list
 * @returns {[]}
 */
function formatRouter (parent, list) {
  if (parent == null) {
    parent = { children: [] }
  }
  // console.log(list, 'list')
  list && list.forEach((item) => {
    let newRouter = parent
    if (!isEmpty(item.actionUrl) && item.actionUrl !== '#') { // 如果是按钮 或者没有配置component，则不加入路由
      let component = null
      if (item.component === 'layoutHeaderAside') {
        component = layoutHeaderAside
      } else if (item.component) {
        // 动态导入组件
        component = () => import('@/business/modules' + item.component)
      } else {
        // 默认使用布局组件
        component = _import('system' + item.actionUrl + '/index.vue')

        // console.log('component', component)
      }
      const children = parent.children
      newRouter = {
        path: item.actionUrl,
        name: item.name, // 确保路由名称唯一
        hidden: false,
        // 动态路由支持懒加载
        component: component,
        meta: {
          title: item.name,
          auth: true,
          cache: true,
          id: item.id
        }
      }
      children.push(newRouter)
    }
    if (item.children != null && item.children.length > 0) {
      if (newRouter.children == null) {
        newRouter.children = []
      }
      formatRouter(newRouter, item.children)
    }
  })

  return parent.children
}

/**
 * 构建菜单
 * @param menuTree
 * @returns {[]}
 */
function formatMenu (menuTree) {
  if (menuTree == null) {
    menuTree = []
  }
  let menus = []
  menuTree.forEach((item) => {
    // if (item.type !== 1) { // 只有菜单类型才加入
    //   return
    // }
    let children
    if (item.children != null && item.children.length > 0) {
      children = formatMenu(item.children)
    }
    let icon
    if (item.icon != null && item.icon !== '') {
      icon = item.icon
    }
    menus.push({ path: item.actionUrl, title: item.name, icon: icon, children: children })
  })

  if (menus.length === 0) {
    menus = undefined
  }
  return menus
}

/**
 * 构建权限码列表
 * @param menuTree
 * @param permissionList
 * @returns {*}
 */
// eslint-disable-next-line no-unused-vars
function formatPermissions (menuTree, permissionList) {
  if (menuTree == null) {
    menuTree = []
  }
  menuTree.forEach((item) => {
    if (item.permission != null && item.permission !== '') { // 权限为空
      permissionList.push(item.permission)
    }
    if (item.children != null && item.children.length > 0) {
      formatPermissions(item.children, permissionList)
    }
  })
  return permissionList
}

const state = {
  routes: [],
  addRoutes: [],
  permissions: [],
  inited: false
}

const mutations = {
  setRoutes: (state, { accessedRoutes: routes, permissions }) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    state.inited = true
    state.permissions = permissions
  },
  clear: () => {
    state.addRoutes = []
    state.routes = []
    state.inited = false
    state.permissions = []
  }
}

const actions = {
  generateRoutes ({ rootState, state, commit }, { menuTree }) {
    return new Promise(resolve => {
      // 处理路由
      // console.log('menuTree', menuTree)

      const accessedRoutes = formatRouter(null, menuTree) // 根据后台获取到的资源树构建路由列表

      // console.log(routes)

      // console.log('accessedRoutes', accessedRoutes)

      // const permissions = formatPermissions(menuTree, []) // 从资源树中抽取权限code列表
      commit('setRoutes', { accessedRoutes }) // 将菜单和权限存储到vuex里面
      // 将动态路由添加到frameInRoutes中
      accessedRoutes.forEach(route => {
        // 检查路由是否已存在
        const exists = frameInRoutes[0].children.some(r => r.path === route.path)
        if (!exists) {
          frameInRoutes[0].children.push(route)
          // console.log('添加路由', route, frameInRoutes)
        }
      })

      // 不需要直接添加accessedRoutes，因为它们已经被添加到frameInRoutes中了
      // 刷新路由系统
      router.options.routes = constantRoutes.concat(frameInRoutes)
      router.addRoutes(frameInRoutes)
      // console.log(frameInRoutes, 'frameInRoutes')

      // 使用已经包含动态路由的frameInRoutes来初始化页面
      commit('d2admin/page/init', frameInRoutes, { root: true })

      // 处理菜单
      const menus = supplementPath(formatMenu(menuTree)) // 根据后台获取的资源树，构建菜单
      // console.log(menus, 'menus')

      // menuHeader.splice(0, menuHeader.length)
      // menuHeader.push(...StaticMenuHeader) // 重新构建菜单列表
      // menuHeader.push(...menus) // 将动态菜单放进去

      // 重新设置顶栏菜单
      // commit('d2admin/menu/headerSet', menuHeader, { root: true })
      // 重新设置侧边栏菜单
      if (rootState.d2admin.menu.asideSet == null) {
        let menuDefault = process.env.VUE_APP_D2P_MENU_DEFAULT
        if (menuDefault == null) {
          // console.warn('默认左侧菜单未配置：VUE_APP_D2P_MENU_DEFAULT=', process.env.VUE_APP_D2P_MENU_DEFAULT)
          menuDefault = menus.length - 1
        }
        const defaultMenuIndex = parseInt(menuDefault)
        if (defaultMenuIndex >= 0) {
          // console.log('加载左侧菜单：第', defaultMenuIndex, '个')
          commit('d2admin/menu/asideSet', menus, { root: true })
        }
      }
      // 重新初始化菜单搜索功能
      commit('d2admin/search/init', menus, { root: true })

      resolve(true)
    })
  },
  clear ({ commit }) {
    commit('clear')
  }
}

const getters = {
  inited (state) {
    return state.inited
  },
  permissions (state) {
    return state.permissions
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
