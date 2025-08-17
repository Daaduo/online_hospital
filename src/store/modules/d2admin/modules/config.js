/**
 * 系统配置模块
 */

// 导入环境变量
const baseApi = process.env.VUE_APP_BASE_API || process.env.VUE_APP_API || '/'

export default {
  namespaced: true,
  state: {
    // 基础API URL
    baseApi
  },
  getters: {
    // 获取基础API URL的getter
    baseApi: state => state.baseApi
  },
  mutations: {
    // 更新基础API URL的mutation
    setBaseApi (state, payload) {
      state.baseApi = payload
    }
  },
  actions: {
    // 更新基础API URL的action
    updateBaseApi ({ commit }, payload) {
      commit('setBaseApi', payload)
    }
  }
}
