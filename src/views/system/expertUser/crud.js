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
      page: 1,
      rows: 10,
      total: 1,
      storage: true // 本地保存用户每页条数修改，刷新不会丢失该修改，false=关闭
    // storage:'keysuffix'// 传入字符串，将会给保存的key增加一个后缀，用于区分同一个页面下多个crud
    },
    columns: [
      {
        title: '菜单名称',
        key: 'name',
        search: {
          disabled: false
        },
        form: {
          rules: [
            { required: true, message: '请输入菜单名称' }
          ]
        }
      },
      {
        title: '菜单地址',
        key: 'actionUrl',
        search: {
          disabled: false
        },
        form: {
          rules: [
            { required: true, message: '请输入菜单地址' }
          ]
        }
      },
      {
        title: '菜单图标',
        key: 'icon',
        form: {
          component: {
            name: 'd2-icon-picker'
          },
          rules: [
            { required: true, message: '请选择菜单图标' }
          ]
        },
        component: {
          render: (h, { row }) => {
            return h('d2-icon', { props: { name: row.icon } })
          }
        }
      },
      {
        title: '创建时间',
        key: 'createTime',
        width: 180,
        form: {
          disabled: true
        },
        component: { props: { format: 'yyyy-MM-dd HH:mm:ss' } }
      },
      {
        title: '父级菜单',
        key: 'parentId',
        type: 'select',
        dict: {
          url: '/api/Menu/GetALLMenu',
          value: 'id',
          label: 'name',
          children: 'children',
          isTree: true
        },
        form: {
          value: 1,
          component: {
            props: {
              filterable: true,
              clearable: true
            }
          }
        }
      },
      {
        title: '菜单顺序',
        key: 'sequence',
        width: 120,
        form: {
          rules: [
            { required: true, message: '请输入菜单顺序' }
            // { type: 'number', message: '请输入数字' }
          ]
        }
      },
      {
        title: '菜单等级',
        key: 'mlevel',
        width: 120,
        form: {
          rules: [
            { required: true, message: '请输入菜单等级' }
          // { type: 'number', message: '请输入数字' }
          ]
          // disabled: true
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
        return ret.resultObj // getlist返回结果获取
      },
      page: { // page接口返回的数据结构配置，
        request: { // 请求参数
          current: 'page', // 当前页码
          size: 'rows' // 当前每页条数
        },
        response: { // 返回结果
          current: 'number', // 当前页码 ret.data.current
          size: 'size', // 每页条数，ret.data.size,
          // size: (data) => { return data.size }, //你也可以配置一个方法，自定义返回
          total: 'totalElements', // 总记录数 ret.data.total
          records: 'content' // 列表数组 ret.data.records
        }
      }
    }
  }
}
