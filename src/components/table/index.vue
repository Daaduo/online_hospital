<template>
  <div class="table-with-search-and-pagination">
    <!-- 父组件传递的名称 -->
    <div v-if="title" class="table-title">{{ title }}</div>
    <div v-if="title" class="line"></div>
    <!-- 检索条件表单 -->
    <el-form
      :model="searchForm"
      :inline="true"
      @submit.native.prevent="handleSearch"
    >
      <el-form-item
        v-for="item in searchFormItems"
        :key="item.prop"
        :label="item.label"
      >
        <el-input
          v-if="item.type === 'input'"
          v-model="searchForm[item.prop]"
          :placeholder="item.placeholder || '请输入'"
          size="small"
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"

        ></el-input>
        <el-select
          v-else-if="item.type === 'select'"
          v-model="searchForm[item.prop]"
          :placeholder="item.placeholder || '请选择'"
          size="small"
          clearable
          @clear="handleSearch"
          @change="handleSearch"
        >
          <el-option
            v-for="option in item.options || []"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            size="small"
          ></el-option>
        </el-select>
        <!-- 可以根据需要添加更多类型的表单控件 -->
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleSearch"
          size="small"
          icon="el-icon-search"
          >查询</el-button
        >

        <el-button @click="resetForm" size="small" icon="el-icon-refresh"
          >重置</el-button
        >
      </el-form-item>
      <el-form-item style="position: absolute; right: 20px; margin-right: 0px">
        <el-button
          type="primary"
          @click="handleAdd"
          size="small"
          icon="el-icon-plus"
          style="margin-left: 10px"
          v-if="showAdd"
          >新增</el-button
        >
        <el-button
          type="danger"
          @click="handleBatchDelete"
          size="small"
          icon="el-icon-delete"
          style="margin-left: 10px"
          v-if="showBatchDelete"
          >批量删除</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table v-loading="loading" :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55" align="center" v-if="showSelection">

      </el-table-column>
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :align="column.align || 'center'"
      >
        <template v-slot:default="scope" v-if="column.slot">
          <slot :name="column.slot" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="currentPage"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableWithSearchAndPagination',
  props: {
    showSelection: {
      type: Boolean,
      default: true
    },

    // 是否显示批量删除按钮
    showBatchDelete: {
      type: Boolean,
      default: false
    },
    showAdd: {
      type: Boolean,
      default: false
    },

    // 表格标题（父组件传递）
    title: {
      type: String,
      default: ''
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 总记录数
    total: {
      type: Number,
      default: 0
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 当前页码
    currentPage: {
      type: Number,
      default: 1
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 字段配置
    fieldsConfig: {
      type: Array,
      default: () => [],
      validator: (value) => {
        return value.every((item) => item.prop && item.label)
      }
    },
    // 下拉选择框的选项数据
    selectOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // 搜索表单数据
      searchForm: {},
      // 选中的行数据
      selectedRows: []
    }
  },
  computed: {
    // 根据字段配置生成表格列
    columns () {
      const tableColumns = this.fieldsConfig
        .filter((field) => field.isTableColumn)
        .map((field) => {
          const column = {
            prop: field.prop,
            label: field.label
          }
          // 如果有插槽，添加插槽配置
          if (field.slot) {
            column.slot = field.slot
          }
          return column
        })
      // 添加操作列
      tableColumns.push({
        label: '操作',
        slot: 'action'
      })
      return tableColumns
    },
    // 根据字段配置生成搜索表单项
    searchFormItems () {
      return this.fieldsConfig
        .filter((field) => field.isSearchField)
        .map((field) => {
          const searchItem = {
            label: field.label,
            prop: field.searchProp || field.prop,
            type: field.type
          }
          // 如果是下拉选择框，添加选项
          if (field.type === 'select' && this.selectOptions[field.prop]) {
            searchItem.options = this.selectOptions[field.prop].map((item) => ({
              label: item.name || item.label,
              value: item.code || item.value
            }))
          }
          return searchItem
        })
    }
  },
  created () {
    // 初始化搜索表单
    this.initSearchForm()
  },
  methods: {
    // 初始化搜索表单
    initSearchForm () {
      // 使用 Object.assign 创建新对象，确保响应式
      this.searchForm = {}
      this.searchFormItems.forEach((item) => {
        // 使用 $set 确保属性是响应式的
        this.$set(this.searchForm, item.prop, item.defaultValue || '')
      })
    },
    // 处理搜索
    handleSearch () {
      this.$emit('search', {
        ...this.searchForm,
        page: 0,
        pageSize: this.pageSize
      })
    },
    // 重置表单
    resetForm () {
      this.initSearchForm()
      this.$emit('search', {
        ...this.searchForm,
        page: 0,
        pageSize: this.pageSize
      })
    },
    // 处理每页条数变化
    handleSizeChange (size) {
      this.$emit('size-change', size)
    },
    // 处理页码变化
    handleCurrentChange (current) {
      this.$emit('current-change', current)
    },
    // 处理新增
    handleAdd () {
      this.$emit('add')
    },
    // 处理批量删除
    handleBatchDelete () {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请选择需要删除的项')
        return
      }
      this.$confirm('确定要删除选中的 ' + this.selectedRows.length + ' 项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('batch-delete', this.selectedRows)
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 处理选择变化
    handleSelectionChange (selection) {
      this.selectedRows = selection
      this.$emit('selection-change', selection)
    }
  }
}
</script>

<style scoped>
.table-with-search-and-pagination {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
}

.table-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}
.line {
  /* width: 100%; */
  height: 1px;
  background-color: #e4e7ed;
  margin-bottom: 10px;
  box-sizing: border-box;
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 20px;
  padding-right: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
