<template>
  <div class="article-management">
    <table-component
      :tableData="articleList"
      @edit="handleEdit"
      @delete="handleDelete"
      :title="'医生管理'"
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
      @search="getList"
      :fieldsConfig="fieldsConfig"
      :selectOptions="selectOptions"
      :loading="loading"
    >
      <template slot="createTime" slot-scope="scope">
        {{ scope.row.createTime.replace("T", " ") }}
      </template>
      <template slot="imageUrl" slot-scope="scope">
        <el-image
          :src="baseApi + scope.row.imageUrl"
          fit="contain"
          :preview-src-list="[baseApi + scope.row.imageUrl]"
          style="width: 50px; height: 50px"
        />
      </template>
      <template slot="contents" slot-scope="scope">
        <div v-html="scope.row.contents" v-if="scope.row.contents"></div>
      </template>

      <template slot="action" slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
          删除
        </el-button>
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
        isRecommend: [
          { label: '是', value: 1, code: 1 },
          { label: '否', value: 0, code: 0 }
        ]
      },

      // 统一字段配置
      fieldsConfig: [
        // 注意：isTop的options会从selectOptions中获取，这里不需要重复定义
        // 若需要静态数据，也可以直接在这里定义options
        {
          prop: 'name',
          label: '医生姓名',
          type: 'input',
          required: true,
          message: '请输入医生姓名',
          trigger: 'blur',
          isTableColumn: true,
          isSearchField: true,
          isDialogField: true,
          searchProp: 'value'
        },
        {
          prop: 'imgUrl',
          label: '医生头像',
          type: 'img',
          required: true,
          message: '请上传医生头像',
          trigger: 'blur',
          isTableColumn: true,
          isSearchField: false,
          isDialogField: true
        },
        {
          prop: 'speciality',
          label: '医生专业',
          type: 'input',
          required: true,
          message: '请输入医生专业',
          trigger: 'blur',
          isTableColumn: true,
          isSearchField: false,
          isDialogField: true
        },

        {
          prop: 'isRecommend',
          label: '是否推荐',
          type: 'select',
          required: true,
          message: '请选择是否推荐',
          trigger: 'change',
          isTableColumn: true,
          isDialogField: true,
          isSearchField: false,
          searchProp: 'code'
        },

        {
          prop: 'zhiCheng',
          label: '医生职称',
          type: 'input',
          required: true,
          message: '请输入医生职称',
          trigger: 'blur',
          isDialogField: true,
          // 密码不在表格和搜索中显示
          isTableColumn: true,
          isSearchField: false,
          slot: 'imageUrl'
        },
        {
          prop: 'identifier',
          label: '医生编号',
          type: 'input',
          required: true,
          message: '请输入医生编号',
          trigger: 'blur',
          isDialogField: true,
          // 密码不在表格和搜索中显示
          isTableColumn: true,
          isSearchField: false,
          slot: 'contents'
        },
        {
          prop: 'achievement',
          label: '医生成就',
          type: 'input',
          required: true,
          message: '请输入医生成就',
          trigger: 'blur',
          isDialogField: true,
          // 密码不在表格和搜索中显示
          isTableColumn: true,
          isSearchField: false
        },
        {
          prop: 'introduce',
          label: '医生介绍',
          type: 'inputText',
          required: true,
          message: '请输入医生介绍',
          trigger: 'blur',
          isTableColumn: true,
          isDialogField: true,
          isSearchField: false,
          searchProp: 'code'
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
      menuId: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters('d2admin/config', ['baseApi'])
  },

  created () {
    this.menuId = this.$router.currentRoute.meta.id

    this.getList()

    // 获取菜单id
    // console.log(this.$router.currentRoute,'当前路由')
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
    // handleBatchDelete(data) {
    //   console.log(data, "data");
    //   let selectIds = data.map((item) => item.id).join(",");

    //   api.Del(selectIds).then((res) => {
    //     if (res.isSuccessful) {
    //       this.$message.success("删除成功");
    //       this.getList();
    //     } else {
    //       this.$message.error(res.resultMsg);
    //     }
    //   });
    // },
    handleDelete (row) {
      // console.log("删除文章:", row);
      // 调用删除文章的 API
      this.$confirm('确定删除' + row.title + '吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.Del(row.id).then((res) => {
            if (res.isSuccessful) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(res.resultMsg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
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
          this.getList()
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
      this.getList()
    },
    handleSizeChange (val) {
      this.page.pageSize = val
      this.getList()
    },

    // 获取文章列表
    async getList (data) {
      // console.log(data, "data");
      this.loading = true

      try {
        // 这里调用获取文章列表的 API
        const obj = {
          page: this.page.currentPage,
          pageSize: this.page.pageSize,
          parentId: this.menuId,
          value: data ? data.title : ''
        }
        const res = await api.GetList(obj)
        console.log(res, 'res')

        if (res.isSuccessful && res.resultObj) {
          const obj = res.resultObj
          this.articleList = obj.content
          this.page.currentPage = obj.number
          this.total = obj.totalElements
        }
        this.loading = false
      } catch (error) {
        // console.error("获取文章列表失败:", error);
        this.loading = false
      }
    }
  }
}
</script>

<style scoped></style>
