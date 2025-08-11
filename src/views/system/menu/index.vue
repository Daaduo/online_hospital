<template>
  <d2-container>
    <template slot="header">菜单列表</template>
    <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners">
      <div slot="header">
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
        <template slot="parentIdFormSlot" slot-scope="scope">
         <el-cascader
         style="width: 100%;"
          :options="menuList"
          :props="{
            label: 'name',
            value: 'id',
            children: 'children',
            checkStrictly: true
          }"
          clearable
          filterable
          :show-all-levels="false"
          v-model="scope.form.parentId"
          ref="cascader"

        ></el-cascader>

        </template>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import * as api from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'

export default {
  name: 'menuList',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      menuList: []
    }
  },
  methods: {
    async GetAllMenu () {
      const res = await api.GetAllMenu()
      if (res.isSuccessful) {
        this.menuList = this.dealChild(res.resultObj)
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
    pageRequest () {
      return api.GetAllMenu()
    },
    addRequest (row) {
      console.log(row, 'row')
      row.parentId = row.parentId.join('')
      const obj = {
        ...row
      }

      // 确保row对象包含icon字段
      return api.SaveMenu(obj)
    },
    updateRequest (row) {
      return api.SaveMenu(row)
    },
    delRequest (row) {
      return api.DelObj(row.id)
    },
    doDialogOpened (context) {
      context.form.parentId && (context.form.parentName = this.menuList.find(item => item.id === context.form.parentId).name)
    }
  },
  mounted () {
    this.GetAllMenu()
  }
}
</script>
