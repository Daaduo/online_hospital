<template>
  <d2-container>
    <template slot="header">用户管理</template>
    <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners" @reset-Password="resetPassword">
      <div slot="header">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
        />
        <el-button-group>
          <el-button size="small" style="margin-right: 10px;" type="primary" @click="addRow"
            ><i class="el-icon-plus" /> 新增</el-button
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
      <template slot="userRoleFormSlot" slot-scope="scope">
        <el-select v-model="scope.form.userRole" placeholder="请选择角色" style="width: 100%;">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.name" />
        </el-select>
      </template>

      <div slot="userRoleSearchSlot" slot-scope="scope">
        <el-select v-model="scope.search.code" placeholder="请选择角色">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

    </d2-crud-x>
  </d2-container>
</template>

<script>
import * as api from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { GetRoleByNameOrCode } from '@/views/system/role/api'
export default {
  name: 'userList',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      roleList: [],
      selectedRows: []
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      console.log('query', query)
      const params = {
        ...query,
        value: query.name || query.code
      }
      return api.Search(params)
    },
    doSelectionChange (selection) {
      this.selectedRows = selection.map(item => item.id)
      console.log('this.selectedRows', this.selectedRows)
    },
    resetPassword ({ row }) {
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
    },
    async getRoleList () {
      const res = await GetRoleByNameOrCode({
        page: 0,
        rows: 1000
      })
      if (res.isSuccessful) {
        this.roleList = res.resultObj.content.filter(item => item.name !== '超级管理员' || item.code !== 'Admin')
      }
    },
    addRequest (row) {
      console.log('row', row)
      return api.CreateOrEditSave(row)
    },
    updateRequest (row) {
      delete row.createTime
      return api.CreateOrEditSave(row)
    },
    delRequest (row) {
      return api.DeleteUserById(row.id)
    }
  }
}
</script>
