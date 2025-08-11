<template>
  <d2-container class="page">
    <!-- 欢迎信息 -->
    <div class="welcome-container">
      <div class="welcome-card">
        <h1 class="welcome-title">
          欢迎您! {{ info.name || "尊敬的用户" }} 登录系统
        </h1>
        <p class="welcome-subtitle">
          在线医院管理系统 - 高效、便捷的医疗服务平台
        </p>
        <div class="actions">
          <el-button type="primary" size="medium" @click="handleStart"
            >开始使用</el-button
          >
        </div>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'SystemIndexPage',
  components: {},
  data () {
    return {
      coverImage: '/image/healthcare-banner.svg'
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    ...mapState('d2admin/user', ['info']),
    username () {
      return this.userInfo && this.userInfo.name
    }
  },
  methods: {
    handleStart () {
      this.$router.push('/system/dashboard')
    },
    handleHelp () {
      this.$message('客服支持：400-123-4567')
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.welcome-container {
  width: 100%;
  // height: 100%;
  height: calc(100% - 220px);
}

.welcome-card {
  border-radius: 12px;
  padding: 40px 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-image: url("/image/healthcare-banner.svg");
  background-size: cover;
  background-position: center;
  height: 100%;

  text-align: center;
}

.logo {
  width: 120px;
  height: 120px;
  margin: 0 auto 25px;
  display: block;
}

.welcome-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.welcome-subtitle {
  color: #fff;
  font-size: 16px;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>
