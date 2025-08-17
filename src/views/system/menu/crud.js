
export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: false
    },
    options: {
      height: '100%',
      rowKey: 'id'

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
      },
      buttons: {
        search: {
          show: false
        },
        reset: {
          show: false
        }
      }
    },
    pagination: { // 翻页配置
      show: false,
      disabled: true,
      hideOnSinglePage: true

    },
    columns: [
      {
        title: '菜单名称',
        key: 'name',
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
          disabled: true
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
        title: '父级菜单',
        key: 'parentId',
        form: {
          show: true,
          slot: true,
          rules: [
            { required: true, message: '请选择父级菜单' }
          ]

        },
        valueBuilder (row) {
          // row.createTime = row.createTime.replace('T', ' ')
          // console.log(row,'row')

        },
        component: {
          show: false
        },
        show: false
      },
      {
        title: '父级菜单',
        key: 'parentName',
        search: {
          disabled: true
        },
        form: {
          disabled: true,
          show: false
        },
        component: {
          show: true
        },
        show: false
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
          disabled: true
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
    rowHandle: {
      show: true,
      width: 260,
      edit: {
        show (index, row) { return row.parentId !== 0 }
      },
      remove: {
        show (index, row) { return row.parentId !== 0 }
      }

    },
    format: {
      response (ret) {
        return ret // getlist返回结果获取
      },
      page: { // page接口返回的数据结构配置，
        request: { // 请求参数
          current: 'page', // 当前页码
          size: 'rows' // 当前每页条数
        },
        response: {
          current: '', // 当前页码 ret.data.current
          size: '', // 每页条数，ret.data.size, 你也可以配置一个方法，自定义返回
          total: '', // 总记录数 ret.data.total
          records: 'resultObj' // 列表数组 ret.data.records
        }
      }
    }
  }
}
