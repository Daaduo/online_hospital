export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true
    },
    options: {
      height: '100%'
    },
    viewOptions: {
      componentType: 'row'
    },
    formOptions: {
      defaultSpan: 12 // 默认的表单 span
    },
    searchOptions: {
      debounce: { // 自动查询防抖,debounce:false关闭自动查询
        wait: 500 // 延迟500毫秒
      }
    },
    pagination: { // 翻页配置
    // 支持el-pagination
      currentPage: 0,
      pageSize: 10,
      total: 1,
      storage: true // 本地保存用户每页条数修改，刷新不会丢失该修改，false=关闭
    // storage:'keysuffix'// 传入字符串，将会给保存的key增加一个后缀，用于区分同一个页面下多个crud
    },
    columns: [
      {
        title: '角色名称',
        key: 'name',
        search: {
          disabled: false
        },
        form: {
          rules: [
            { required: true, message: '请输入角色名称' }
          ]
        }
      },
      {
        title: '角色编码',
        key: 'code',
        search: {
          disabled: true
        },
        form: {
          rules: [
            { required: true, message: '请输入角色编码' }

          ]
        }
      },
      {
        title: '角色菜单',
        key: 'menuIdStr',
        form: {
          slot: true
        },
        show: false,
        component: {
          show: false
        }
      },
      {
        title: '角色菜单',
        key: 'menuStr',
        form: {
          show: false,
          disabled: true
        },
        component: {
          show: true
        },
        show: true
      },
      {
        title: '创建时间',
        key: 'createTime',
        width: 180,
        show: false,
        form: {
          disabled: true,
          show: false

        },
        valueBuilder (row) {
          row.createTime = row.createTime.replace('T', ' ')
        }

      },
      {
        title: '备注',
        key: 'remark',
        form: {
          component: {
            props: {
              type: 'textarea',
              rows: 4
            }
          }
        }
      }
    ],
    format: {
      response (ret) {
        ret.resultObj.content = ret.resultObj.content.filter(item => item.name !== '超级管理员' || item.code !== 'Admin')
        return ret.resultObj// getlist返回结果获取
      },
      page: { // page接口返回的数据结构配置，
        request: { // 请求参数
          current: 'page', // 当前页码
          size: 'rows' // 当前每页条数
        },
        response: { // 返回结果
          current: 'number', // 当前页码 ret.data.current
          size: 'size', // 每页条数，ret.data.size,
          total: 'numberOfElements', // 总记录数 ret.data.total
          records: 'content' // 列表数组 ret.data.records
        }
      }
    }
  }
}
