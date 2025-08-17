<template>
  <div class="dialog-form">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      @close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item
          :label="field.label"
          :prop="field.prop"
          v-for="(field, index) in fields"
          :key="index"
        >
          <el-input
            v-model="formData[field.prop]"
            v-if="field.type === 'input'"
            :disabled="type === 'detail'"
          ></el-input>
          <el-input
            v-model="formData[field.prop]"
            v-if="field.type === 'password'"
            :disabled="type === 'detail'"
            show-password
          ></el-input>
          <el-input-number
            v-model="formData[field.prop]"
            :value="field.defaultValue"
            v-if="field.type === 'inputNum'"
            :disabled="type === 'detail'"
            controls-position="right"
            :min="0"
            :max="100"
            :step="1"
            :step-strictly="true"
            :precision="0"
            :value-format="
              (val) => {
                if (val === 0) {
                  return '';
                }
                return val;
              }
            "
          ></el-input-number>

          <el-select
            v-model="formData[field.prop]"
            v-if="field.type === 'select'"
            :disabled="type === 'detail'"
          >
            <el-option
              v-for="item in field.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="upload-container" v-if="field.type === 'img'">
            <el-upload
              class="avatar-uploader"
              v-loading="uploadLoading"
              element-loading-text="上传中..."
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="handleFileUpload"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <img
                v-if="imageUrl || formData[field.prop]"
                :src="imageUrl || baseApi + formData[field.prop]"
                class="avatar"
              />

              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <d2p-wang-editor
            v-if="field.type === 'editor'"
            ref="editor"
            v-model="formData[field.prop]"
            :value="formData[field.prop] || ''"
          ></d2p-wang-editor>
          <el-input
            v-if="field.type === 'inputText'"
            v-model="formData[field.prop]"
            :disabled="type === 'detail'"
            :rows="4"
            :autosize="{ minRows: 4, maxRows: 8 }"
            type="textarea"

          ></el-input>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="imageDialogVisible" append-to-body>
        <img width="100%" :src="imageUrl" alt="" />
      </el-dialog>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            v-if="type !== 'detail'"
            type="primary"
            @click="submitForm"
            :loading="loading"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Upload } from './uploadApi'

export default {
  name: 'DialogForm',
  props: {
    dialogWidth: {
      type: String,
      default: '50%'
    },

    // 控制弹窗是否显示
    visible: {
      type: Boolean,
      default: false
    },
    // 操作类型：'add' 新增, 'edit' 编辑, 'detail' 详情
    type: {
      type: String,
      default: 'add',
      validator: (value) => ['add', 'edit', 'detail'].includes(value)
    },
    // 初始数据，编辑和详情时使用
    initData: {
      type: Object,
      default: () => ({})
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
      dialogVisible: this.visible,
      formData: {},
      imageUrl: '', // 图片URL存储
      imageDialogVisible: false,
      loading: false, // 提交按钮loading
      uploadLoading: false // 上传操作loading
    }
  },
  computed: {
    dialogTitle () {
      switch (this.type) {
        case 'add':
          return '新增信息'
        case 'edit':
          return '编辑信息'
        case 'detail':
          return '信息详情'
        default:
          return ''
      }
    },
    ...mapGetters('d2admin/config', ['baseApi']),
    rules () {
      const rules = {}
      this.fieldsConfig
        .filter((field) => field.isDialogField && field.required)
        .forEach((field) => {
          if (field.prop === 'confirmPassword') {
            // 为确认密码添加自定义校验器
            rules[field.prop] = [
              {
                required: true,
                message: field.message,
                trigger: field.trigger
              },
              {
                validator: (rule, value, callback) => {
                  if (value !== this.formData.password) {
                    callback(new Error('两次输入的密码不一致'))
                  } else {
                    callback()
                  }
                },
                trigger: 'blur'
              }
            ]
          } else {
            rules[field.prop] = [
              {
                required: true,
                message: field.message,
                trigger: field.trigger
              }
            ]
          }
        })
      return rules
    },
    // 根据字段配置生成对话框字段
    fields () {
      return this.fieldsConfig
        .filter((field) => field.isDialogField)
        .map((field) => {
          const dialogField = {
            prop: field.prop,
            label: field.label,
            type: field.type,
            // 保留原始字段配置的其他属性
            ...field
          }
          // 如果是下拉选择框，处理选项
          if (field.type === 'select') {
            // 优先使用字段自身的options（静态数据）
            if (field.options) {
              dialogField.options = field.options
            } else if (this.selectOptions[field.prop]) {
              dialogField.options = this.selectOptions[field.prop].map(
                (item) => ({
                  label: item.name || item.label,
                  value: item.code || item.value
                })
              )
            }
          }
          return dialogField
        })
    }
  },
  created () {
    // 初始化时获取动态字典数据
  },
  watch: {
    visible (newVal) {
      this.dialogVisible = newVal
      if (newVal) {
        this.resetForm()
      }
    },
    type () {
      this.resetForm()
    },
    initData (newVal) {
      if (
        this.dialogVisible &&
        (this.type === 'edit' || this.type === 'detail')
      ) {
        // console.log(newVal, 'newVal')

        this.formData = { ...newVal }
      }
    },
    fields () {
      this.resetForm()
    }
  },
  methods: {
    // 自定义文件上传处理
    handleFileUpload (options) {
      const file = options.file
      const formData = new FormData()
      formData.append('file', file)
      // console.log('file', file)

      // 开始上传，设置上传loading状态
      this.uploadLoading = true

      // 调用上传接口
      Upload(formData)
        .then((res) => {
          // 上传完成，关闭上传loading状态
          this.uploadLoading = false

          if (res.isSuccessful) {
            this.imageUrl =
              'https://njht.jk.pakgif.cn/NJHT_File' + res.resultData
            // 找到类型为img的字段，并设置其值
            const imgField = this.fields.find((field) => field.type === 'img')
            if (imgField) {
              this.formData[imgField.prop] = res.resultData
            }
            this.$message.success(res.resultMsg || '上传成功')
          } else {
            this.$message.error(res.resultMsg || '上传失败')
          }
        })
        .catch(() => {
          // 上传失败，关闭上传loading状态
          this.uploadLoading = false
          this.$message.error('上传失败')
        })
    },

    // 上传成功回调
    handleAvatarSuccess (res) {
      this.imageUrl = res.url
      // 找到类型为img的字段，并设置其值
      const imgField = this.fields.find((field) => field.type === 'img')
      if (imgField) {
        this.formData[imgField.prop] = res.url
      }
    },

    // 上传前校验
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    resetForm () {
      if (this.type === 'add') {
        this.formData = {}
        // 初始化表单数据
        this.fields.forEach((field) => {
          this.$set(this.formData, field.prop, '')
        })
      } else if (this.type === 'edit' || this.type === 'detail') {
        // 对于编辑和详情模式，直接使用initData中的所有字段
        this.formData = { ...this.initData }
      }
    },
    handleClose () {
      this.imageUrl = ''
      this.$refs.form && this.$refs.form.resetFields()
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.loading = true

      this.$refs.form.validate((valid) => {
        if (valid) {
          // console.log(this.formData, 'this.formData11')
          this.$emit('submit', this.formData, () => {
            this.loading = false
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    // 图片预览方法
    handlePictureCardPreview () {
      // 创建一个临时图片查看器
      this.imageDialogVisible = true
    },
    // 移除图片方法
    handleRemove (file, fileList) {
      this.imageUrl = ''
      // 找到类型为img的字段，并清空其值
      const imgField = this.fields.find((field) => field.type === 'img')
      if (imgField) {
        this.formData[imgField.prop] = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.dialog-form {
  ::v-deep .el-dialog {
    // margin: 0 auto !important;
    height: 75%;
    overflow: hidden;

    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
      padding: 15px;
      margin-bottom: 80px;
    }
    .el-dialog__footer {
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: flex-end;
      z-index: 9999;
      width: 100%;
      padding: 20px;
    }
  }
}

::v-deep .avatar-uploader {
  width: fit-content;
  height: fit-content;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
    .el-loading-mask {
      // align-items: center;
      top: 25%;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
