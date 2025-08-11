<template>
  <d2-container>
    <template slot="header">用户管理</template>
    <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners">
      <div slot="header">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
        />
        <el-button-group>
          <el-button size="small" type="primary" @click="addRow"
            ><i class="el-icon-plus" /> 新增</el-button
          >
          <el-button size="small" type="warning" @click="resetPassword"
            ><i class="el-icon-key" /> 重置密码</el-button
          >
        </el-button-group>
        <crud-toolbar
          :search="null"
          :compact="null"
          :columns="crud.columns"
          @refresh="doRefresh()"
          @columns-filter-changed="handleColumnsFilterChanged"
        />
      </div>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import * as api from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'userList',
  mixins: [d2CrudPlus.crud],
  data () {
    return {}
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return api.Search(query)
    },
    addRequest (row) {
      return api.CreateOrEditSave(row)
    },
    updateRequest (row) {
      delete row.createTime
      return api.CreateOrEditSave(row)
    },
    delRequest (row) {
      return api.DeleteUserById(row.id)
    },
    resetPassword () {
      const selectedRows = this.$refs.d2Crud.getSelection()
      if (!selectedRows || selectedRows.length === 0) {
        this.$message.warning('请选择要重置密码的用户')
        return
      }
      if (selectedRows.length > 1) {
        this.$message.warning('只能选择一个用户进行密码重置')
        return
      }
      const row = selectedRows[0]
      this.$confirm('确定要重置用户 ' + row.name + ' 的密码吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.ResetPassWord(row.id).then(res => {
          if (res.isSuccessful) {
            this.$message.success('密码重置成功，新密码为：123456')
            this.doRefresh()
          } else {
            this.$message.error(res.message || '密码重置失败')
          }
        })
      }).catch(() => {})
    }
  }
}
</script>