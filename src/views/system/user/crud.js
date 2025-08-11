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
      total: 1
      // storage: true
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
        title: '登录名',
        key: 'loginName',
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
        title: '密码',
        key: 'password',
        form: {
          placeholder: '请输入密码',
          editDisabled: true,
          rules: [
            { required: true, message: '请输入密码' },
            {
              validator: (rule, value, callback) => {
                const d2Crud = vm.$refs.d2Crud
                // 当密码变化时，触发确认密码的重新验证
                if (d2Crud.confirmPassword) {
                  d2Crud.validateField('confirmPassword')
                }
                callback()
              },
              trigger: ['blur', 'change']
            }
          ],
          component: {
            props: {
              type: 'password'
            }
          },
          show: (mode) => mode === 'add'
        },
        component: {
          show: false
        },
        show: false
      }, {
        title: '确认密码',
        key: 'confirmPassword',
        form: {
          editDisabled: true,
          rules: [
            { required: true, message: '请输入确认密码' },
            {
              validator: (rule, value, callback) => {
                const password = vm.$refs.d2Crud.formData.password
                if (password !== value) {
                  callback(new Error('两次输入的密码不一致'))
                } else {
                  callback()
                }
              },
              trigger: ['blur', 'change']
            }
          ],
          component: {
            props: {
              type: 'password'
            }
          },
          show: (mode) => mode === 'add'
        },
        component: {
          show: false
        },
        show: false
      },
      {
        title: '角色',
        key: 'userRole',
        type: 'select',
        rules: [
          { required: true, message: '请选择角色' }
        ],
        form: {
          slot: true
        }
        // show: false,
        // component: {
        //   show: false
        // }
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
      }
    ],
    format: {
      response (ret) {
        ret.resultObj.content = ret.resultObj.content.filter(item => item.userRole !== 'Admin')
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
