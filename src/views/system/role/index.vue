<template>
  <d2-container>
    <template slot="header">角色管理</template>
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
        </el-button-group>
        <crud-toolbar
          :search="null"
          :compact="null"
          :columns="crud.columns"
          @refresh="doRefresh()"
          @columns-filter-changed="handleColumnsFilterChanged"
        />
      </div>
       <template slot="menuIdStrFormSlot" slot-scope="scope">
         <el-cascader
         style="width: 100%;"
          :options="menuList"
          :props="{
            label: 'name',
            value: 'id',
            children: 'children',
            multiple: true,
            checkStrictly: true
          }"
          clearable
          filterable
          collapse-tags
          :show-all-levels="false"
          v-model="scope.form.menuIdStr"
          ref="cascader"

        ></el-cascader>

        </template>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { GetAllMenu } from '@/views/system/menu/api'

import * as api from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'roleList',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      menuList: []
    }
  },
  methods: {
    async GetAllMenu () {
      const res = await GetAllMenu()
      if (res.isSuccessful) {
        this.menuList = this.dealChild(res.resultObj[0].children)
      }
    },
    dealChild (list) {
      list.forEach(item => {
        if (item.children) {
          this.dealChild(item.children)
          if (item.children.length === 0) delete item.children
        }
      })
      return list
    },

    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      console.log('query', query)

      return api.GetRoleByNameOrCode(query)
    },
    addRequest (row) {
      // console.log('row', row)
      const menuStr = this.$refs.cascader.getCheckedNodes().map(item => item.label).join(',')

      const obj = {
        ...row,
        menuIdStr: row.menuIdStr.join(','),
        menuStr: menuStr
      }

      return api.CreateOrEditSave(obj)
    },
    updateRequest (row) {
      const menuStr = this.$refs.cascader.getCheckedNodes().map(item => item.label).join(',')
      delete row.createTime
      const obj = {
        ...row,
        menuIdStr: row.menuIdStr.join(','),
        menuStr: menuStr
      }
      return api.CreateOrEditSave(obj)
    },
    delRequest (row) {
      return api.DeleteRoleById(row.id)
    },
    doDialogOpened (context) {
      context.form.menuIdStr && (context.form.menuIdStr = context.form.menuIdStr.split(','))
    }

  },
  mounted () {
    this.GetAllMenu()
  }
}
</script>
