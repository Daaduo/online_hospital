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
      debounce: {
        wait: 500
      }
    },
    pagination: {
      currentPage: 0,
      pageSize: 10,
      total: 1,
      storage: true
    },
    columns: [
      {
        title: '用户名称',
        key: 'name',
        search: {
          disabled: false
        },
        form: {
          rules: [
            { required: true, message: '请输入用户名称' }
          ]
        }
      },
      {
        title: '用户编码',
        key: 'code',
        search: {
          disabled: true
        },
        form: {
          rules: [
            { required: true, message: '请输入用户编码' }
          ]
        }
      },
      {
        title: '用户密码',
        key: 'password',
        form: {
          rules: [
            { required: true, message: '请输入用户密码' }
          ],
          component: {
            props: {
              type: 'password'
            }
          }
        },
        show: false
      },
      {
        title: '所属部门',
        key: 'department',
        form: {
          component: {
            props: {
              placeholder: '请选择部门'
            }
          }
        }
      },
      {
        title: '联系电话',
        key: 'phone',
        form: {
          rules: [
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
          ]
        }
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
        return ret.resultObj
      },
      page: {
        request: {
          current: 'page',
          size: 'rows'
        },
        response: {
          current: 'number',
          size: 'size',
          total: 'numberOfElements',
          records: 'content'
        }
      }
    }
  }
}