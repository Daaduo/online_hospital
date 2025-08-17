<template>
  <div class="article-management">
    <table-component
      :tableData="articleList"
      @edit="handleEdit"
      @delete="handleDelete"
      :title="'banner配置'"
      @add="handleAdd"
      :showBatchDelete="false"
      :showAdd="true"
      :currentPage="page.currentPage"
      :pageSize="page.pageSize"
      :total="total"
      :dialogWidth="'40%'"
      :showSelection="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @search="fetchArticleList"
      :fieldsConfig="fieldsConfig"
      :selectOptions="selectOptions"
      :loading="loading"
    >
      <template slot="imgUrl" slot-scope="scope">
        <el-image
          :src="baseApi + scope.row.imgUrl"
          fit="contain"
          :preview-src-list="[baseApi + scope.row.imgUrl]"
          style="width: 50px; height: 50px"
        />
      </template>
      <template slot="createTime" slot-scope="scope">
        {{ scope.row.createTime.replace("T", " ") }}
      </template>

      <template slot="action" slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
          删除
        </el-button>
      </template>
      <template slot="typeCode" slot-scope="scope">
        {{
          scope.row.typeCode === "home"
            ? "首页banner"
            : scope.row.typeCode === "minor"
            ? "次要banner"
            : "小程序banner"
        }}
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
import { mapGetters } from 'vuex'
import tableComponent from '@/components/table/index.vue'
import dialogForm from '@/components/dialog-form/index.vue'
import * as api from './api.js'

export default {
  name: 'ArticleManagement',
  components: {
    dialogForm,
    tableComponent
  },
  data () {
    return {
      dialogType: 'add',
      formData: {},
      page: {
        currentPage: 0,
        pageSize: 10
      },
      total: 0,
      // 下拉选择框的选项数据
      selectOptions: {
        typeCode: [
          { label: '首页banner', value: 'home' },
          { label: '次要banner', value: 'minor' },
          { label: '小程序', value: 'app' }
        ]
      },
      // 统一字段配置
      fieldsConfig: [
        // 注意：isTop的options会从selectOptions中获取，这里不需要重复定义
        // 若需要静态数据，也可以直接在这里定义options
        {
          prop: 'name',
          label: '标题',
          type: 'input',
          required: true,
          message: '请输入标题',
          trigger: 'blur',
          isTableColumn: true,
          isSearchField: true,
          isDialogField: true,
          searchProp: 'value'
        },
        {
          prop: 'typeCode',
          label: '存放位置',
          type: 'select',
          required: true,
          message: '请选择存放位置',
          trigger: 'change',
          isTableColumn: true,
          isDialogField: true,
          isSearchField: false,
          searchProp: 'code',
          slot: 'typeCode'
        },
        {
          prop: 'pageUrl',
          label: '链接',
          type: 'input',
          required: true,
          message: '请输入链接',
          trigger: 'blur',
          isTableColumn: true,
          isSearchField: false,
          isDialogField: true
        },
        {
          prop: 'imgUrl',
          label: '图片',
          type: 'img',
          required: true,
          //   message: "请输入来源",
          trigger: 'blur',
          isTableColumn: true,
          isSearchField: false,
          isDialogField: true,
          slot: 'imgUrl' // 表格中使用插槽
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
      ],

      dialogVisible: false,
      dialogTitle: '',

      // 文章列表数据
      articleList: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters('d2admin/config', ['baseApi'])
  },
  created () {
    this.fetchArticleList()
    // console.log(process, "this.baseUrl");
  },
  methods: {
    handleAdd () {
      this.dialogType = 'add'
      this.dialogVisible = true
    },
    handleEdit (row) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.formData = { ...row }
    },
    handleDelete (row) {
      // 调用删除文章的 API
      this.$confirm(`确认要删除标题为 "${row.name}" 的数据吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.Del(row.id).then((res) => {
            if (res.isSuccessful) {
              this.$message.success('删除成功')
              this.fetchArticleList()
            } else {
              this.$message.error(res.resultMsg)
            }
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },

    handleSubmit (formData, callback) {
      console.log('提交表单数据:', formData)
      const obj = {
        ...formData
      }
      api.Save(obj).then((res) => {
        callback()

        if (res.isSuccessful) {
          this.$message.success('添加成功')
          this.fetchArticleList()
          this.handleClose()
        } else {
          this.$message.error(res.resultMsg)
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.fetchArticleList()
    },
    handleSizeChange (val) {
      this.page.pageSize = val
      this.fetchArticleList()
    },

    // 获取文章列表
    async fetchArticleList (data) {
      this.loading = true
      try {
        // 这里调用获取文章列表的 API
        const obj = {
          page: this.page.currentPage,
          pageSize: this.page.pageSize,
          value: (data && data.value) || ''
        }
        const res = await api.GetList(obj)
        console.log(res, 'res')

        if (res.isSuccessful && res.resultObj) {
          this.loading = false
          const obj = res.resultObj
          this.articleList = obj.content
          this.page.currentPage = obj.number
          this.total = obj.totalElements
        }
      } catch (error) {
        this.loading = false
        // console.error("获取文章列表失败:", error);
      }
    }
  }
}
</script>

<style scoped></style>
