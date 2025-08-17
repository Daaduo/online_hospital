<template>
  <div class="article-management">
    <table-component
      :tableData="userList"
      @edit="handleEdit"
      :title="'用户管理'"
      @add="handleAdd"
      :showBatchDelete="false"
      :showAdd="true"
      :showSelection="false"
      :currentPage="page.currentPage"
      :pageSize="page.pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @search="fetchUserList"
      :fieldsConfig="fieldsConfig"
      :selectOptions="selectOptions"
      :loading="loading"
    >
      <template slot="createTime" slot-scope="scope">
        {{ scope.row.createTime.replace("T", " ") }}
      </template>
      <template slot="userRole" slot-scope="scope">
        {{
          (roleList.find((item) => item.code === scope.row.userRole) || {})
            .name || ""
        }}
      </template>
      <template slot="action" slot-scope="scope">
        <div v-if="scope.row.userRole !== 'Admin'">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button
            type="info"
            size="mini"
            @click="handleResetPassword(scope.row)"
            >重置密码</el-button
          >
        </div>
      </template>
    </table-component>
    <dialog-form
      ref="dialogForm"
      :type="dialogType"
      :visible.sync="dialogVisible"
      @submit="handleSubmit"
      @close="handleClose"
      :fieldsConfig="fieldsConfig"
      :selectOptions="selectOptions"
      :initData.sync="formData"
    />
  </div>
</template>

<script>
import tableComponent from '@/components/table/index.vue'
import dialogForm from '@/components/dialog-form/index.vue'
import { GetList } from '@/views/system/role/api.js'

import * as api from './api.js'

export default {
  name: 'UserManagement',
  components: {
    dialogForm,

    tableComponent
  },
  data () {
    return {
      dialogType: 'add',
      page: {
        currentPage: 0,
        pageSize: 10
      },
      total: 0,
      dialogVisible: false,
      dialogTitle: '',
      userList: [],
      roleList: [],
      formData: {}, // 表单数据
      loading: false,

      // 统一字段配置
      fieldsConfig: [
        {
          prop: 'name',
          label: '用户名称',
          type: 'input',
          required: true,
          message: '请输入用户名称',
          trigger: 'blur',
          isTableColumn: true,
          isSearchField: true,
          isDialogField: true,
          searchProp: 'value'
        },
        {
          prop: 'loginName',
          label: '登录名',
          type: 'input',
          required: true,
          message: '请输入登录名',
          trigger: 'blur',
          isTableColumn: true,
          isDialogField: true
        },
        {
          prop: 'password',
          label: '密码',
          type: 'password',
          required: true,
          message: '请输入密码',
          trigger: 'blur',
          isDialogField: true,
          // 密码不在表格和搜索中显示
          isTableColumn: false,
          isSearchField: false
        },
        {
          prop: 'confirmPassword',
          label: '确认密码',
          type: 'password',
          required: true,
          message: '请输入确认密码',
          trigger: 'blur',
          isDialogField: true,
          // 密码不在表格和搜索中显示
          isTableColumn: false,
          isSearchField: false
        },
        {
          prop: 'userRole',
          label: '角色',
          type: 'select',
          required: true,
          message: '请选择角色',
          trigger: 'change',
          isTableColumn: true,
          isSearchField: true,
          isDialogField: true,
          searchProp: 'code',
          slot: 'userRole' // 表格中使用插槽
        },
        {
          prop: 'createTime',
          label: '创建时间',
          type: 'datetime',
          isTableColumn: true,
          isDialogField: false,
          isSearchField: false,
          slot: 'createTime' // 表格中使用插槽
        }
      ]
    }
  },
  computed: {
    // 下拉选择框的选项数据
    selectOptions () {
      return {
        userRole: this.roleList
      }
    }
  },
  created () {
    this.fetchUserList()

    this.getRoleList()
  },
  methods: {
    handleSizeChange (val) {
      this.page.pageSize = val
      this.fetchUserList()
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.fetchUserList()
    },
    // 获取角色列表
    async getRoleList () {
      try {
        const res = await GetList({
          page: 0,
          rows: 1000
        })
        if (res.isSuccessful && res.resultObj) {
          this.roleList = res.resultObj.content
        }
      } catch (error) {
        console.error('获取角色列表失败:', error)
      }
    },
    handleAdd () {
      // 在添加模式下显示密码和确认密码字段
      this.fieldsConfig.forEach((field) => {
        if (field.prop === 'password' || field.prop === 'confirmPassword') {
          field.isDialogField = true
        }
      })
      this.dialogType = 'add'
      this.dialogVisible = true
    },
    handleEdit (row) {
      // 先设置表单数据
      this.formData = { ...row }
      // console.log(this.formData, "this.formData");

      // 在编辑模式下隐藏密码和确认密码字段
      this.fieldsConfig.forEach((field) => {
        if (field.prop === 'password' || field.prop === 'confirmPassword') {
          field.isDialogField = false
        }
      })
      // 再设置类型和显示对话框
      this.dialogType = 'edit'
      this.dialogVisible = true
    },

    handleSubmit (formData, callback) {
      // console.log("提交表单数据:", formData);
      let obj = {}
      if (this.dialogType === 'edit') {
        obj = {
          id: formData.id,
          name: formData.name,
          loginName: formData.loginName,
          userRole: formData.userRole
        }
      } else {
        obj = {
          ...formData
        }
      }

      api.CreateOrEditSave(obj).then((res) => {
        callback()
        if (res.isSuccessful) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.fetchUserList()
          this.handleClose()
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },

    async fetchUserList (data) {
      // console.log(data, "data");
      this.loading = true

      try {
        // console.log(this.searchFormItems.find((item) => item.prop === 'name'))
        const obj = {
          page: this.page.currentPage,
          rows: this.page.pageSize,
          value: (data && data.value) || '',
          code: (data && data.code) || ''
        }
        const res = await api.Search(obj)
        if (res.isSuccessful && res.resultObj) {
          const obj = res.resultObj
          this.userList = obj.content
          this.page.currentPage = obj.number
          this.total = obj.totalElements
          this.loading = false
        } else {
          this.loading = false
        }
      } catch (error) {
        this.loading = false

        // console.error("获取文章列表失败:", error);
      }
    },
    handleResetPassword (row) {
      // console.log("重置密码:", row);
      // 增加用户确认弹窗
      this.$confirm('确定要重置' + row.name + '的密码吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 调用重置密码的 API
          api.ResetPassWord(row.id).then((res) => {
            if (res.isSuccessful) {
              this.$message({
                message: '重置成功',
                type: 'success'
              })
              this.fetchUserList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          })
        })
    }
  }
}
</script>

<style scoped></style>
