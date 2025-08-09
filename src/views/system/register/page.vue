<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center">
      {{time}}
    </div>
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify">
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto">
            <!-- 注册新账号，开始您的医疗服务之旅 -->
          </p>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center">
          <!-- logo -->
          <img class="page-login--logo" src="../login/image/logo@2x.png">
          <!-- form -->
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form
                ref="registerForm"
                label-position="top"
                :rules="rules"
                :model="formRegister"
                size="default">
                <el-form-item prop="username">
                  <el-input
                    type="text"
                    v-model="formRegister.username"
                    placeholder="账号">
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="name">
                  <el-input
                    type="text"
                    v-model="formRegister.name"
                    placeholder="名称">
                    <i slot="prepend" class="fa fa-id-card-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="formRegister.password"
                    placeholder="密码">
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                  <el-input
                    type="password"
                    v-model="formRegister.confirmPassword"
                    placeholder="确认密码">
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="role">
                  <el-select
                    v-model="formRegister.role"
                    placeholder="选择角色">
                    <el-option
                      v-for="role in roles"
                      :key="role.value"
                      :label="role.label"
                      :value="role.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-button
                  size="default"
                  @click="submit"
                  type="primary"
                  class="button-login">
                  注册
                </el-button>
              </el-form>
            </el-card>
            <p
              class="page-login--options"
              flex="main:justify cross:center">
              <span><d2-icon name="question-circle"/> 帮助中心</span>
              <router-link to="/login">返回登录</router-link>
            </p>
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-locales">
            <a
              v-for="language in $languages"
              :key="language.value"
              @click="onChangeLocale(language.value)">
              {{ language.label }}
            </a>
          </p>
          <p class="page-login--content-footer-copyright">
            Copyright
            <d2-icon name="copyright"/>
            2018 D2 Projects 开源组织出品
            <a href="https://github.com/FairyEver">
              @FairyEver
            </a>
          </p>
          <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import localeMixin from '@/locales/mixin.js'
import * as api from './api'
export default {
  mixins: [
    localeMixin
  ],
  data () {
    return {
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      // 表单
      formRegister: {
        username: '',
        name: '',
        password: '',
        confirmPassword: '',
        role: ''
      },
      // 角色列表
      roles: [
        { label: '患者', value: 'patient' },
        { label: '医生', value: 'doctor' },
        { label: '管理员', value: 'admin' }
      ],
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '账号长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '密码长度在 6 到 20 个字符',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '请确认密码',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.formRegister.password) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        role: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }
        ]
      }
    }
  },
  mounted () {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
    this.getRoleList()
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    getRoleList () {
      this.$api.sysUser.SYS_ROLE_GET_PAGE({
        pageNum: 1,
        pageSize: 1000
      }).then(ret => {
        this.roleList = ret.data
      })
    },
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    /**
     * @description 提交表单
     */
    submit () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 调用注册API
          this.$api.sysUser.SYS_USER_REGISTER({
            username: this.formRegister.username,
            name: this.formRegister.name,
            password: this.formRegister.password,
            role: this.formRegister.role
          })
            .then(() => {
              this.$message.success('注册成功，请登录')
              this.$router.push('/login')
            })
            .catch(error => {
              this.$message.error(error.message || '注册失败，请重试')
            })
        } else {
          // 表单校验失败
          this.$message.error('表单校验失败，请检查')
        }
      })
    }
  }
}
</script>

<style lang="scss">
// 复用登录页面的样式
// @import '@/views/system/login/page.vue';
.page-login--content-header-motto {
  font-size: 14px;
}
</style>
