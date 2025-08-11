<template>
  <d2-container>
    <template slot="header">专家成员列表</template>
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
          :columns="crud.columns"
          @refresh="doRefresh()"
          @columns-filter-changed="handleColumnsFilterChanged"
          :compact="null"

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
  name: 'menuList',
  mixins: [d2CrudPlus.crud],
  data () {
    return {}
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      console.log(api, 'api')

      // return api.GetList(query)
    },
    addRequest (row) {
      // 确保row对象包含icon字段
      // return api.SaveMenu(row)
    },
    updateRequest (row) {
      // return api.SaveMenu(row)
    },
    delRequest (row) {
      // return api.DelObj(row.id)
    }
  },
  mounted () {
  }
}
</script>
