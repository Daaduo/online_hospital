<template>
  <div class="hospital-fullpage">
    <!-- 导航栏 - 固定在顶部 -->
    <nav class="main-nav">
      <div class="nav-container">
        <div class="logo-area">
          <img src="/image/logo.png" alt="健康医院logo" class="logo" />
          <div class="logo-text">
            <h1>妇幼保健互联网医院</h1>
            <p>专业医疗 · 呵护健康</p>
          </div>
        </div>

        <ul class="nav-links">
          <li @click="scrollToSection('hero')">首页</li>
          <li @click="scrollToSection('departments')">科室介绍</li>
          <li @click="scrollToSection('doctors')">医生团队</li>
          <li @click="scrollToSection('services')">特色服务</li>
          <li @click="scrollToSection('news')">健康资讯</li>
          <li @click="scrollToSection('contact')">联系我们</li>
        </ul>

        <!-- <div class="nav-actions">
          <div class="hotline">
            <span>📞 400-123-4567</span>
          </div>
          <button class="appointment-btn" @click="scrollToSection('appointment')">
            立即预约
          </button>
        </div> -->
      </div>
    </nav>

    <!-- 英雄区域 - 全屏高度 -->
    <section id="hero" class="hero-section">
      <div class="hero-slider">
        <div
          class="slide active"
          v-for="(slide, index) in heroSlides"
          :key="index"
        >
          <img :src="slide.image" :alt="slide.title" class="slide-image" />
          <div class="slide-content">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-desc">{{ slide.description }}</p>
            <button class="slide-btn" @click="scrollToSection('appointment')">
              {{ slide.ctaText }}
            </button>
          </div>
        </div>
      </div>
      <div class="scroll-indicator" @click="scrollToSection('departments')">
        <span>向下滚动</span>
        <i class="scroll-icon">↓</i>
      </div>
    </section>

    <!-- 科室介绍区域 -->
    <section id="departments" class="department-section">
      <div class="section-header">
        <h2 class="section-title">科室介绍</h2>
        <p class="section-subtitle">我们拥有完善的科室设置和专业的医疗团队</p>
      </div>

      <div class="department-grid">
        <div class="department-card" v-for="dept in departments" :key="dept.id">
          <div class="dept-icon">{{ dept.icon }}</div>
          <h3 class="dept-name">{{ dept.name }}</h3>
          <p class="dept-desc">{{ dept.description }}</p>
          <a href="#" class="dept-link">了解更多 →</a>
        </div>
      </div>
    </section>

    <!-- 医生团队区域 -->
    <section id="doctors" class="doctors-section">
      <div class="section-header">
        <h2 class="section-title">医生团队</h2>
        <p class="section-subtitle">汇聚行业精英，提供专业诊疗服务</p>
      </div>

      <div class="doctors-grid">
        <div class="doctor-card" v-for="doctor in doctors" :key="doctor.id">
          <img :src="doctor.avatar" :alt="doctor.name" class="doctor-avatar" />
          <div class="doctor-info">
            <h3 class="doctor-name">{{ doctor.name }}</h3>
            <p class="doctor-title">{{ doctor.title }}</p>
            <p class="doctor-dept">{{ doctor.department }}</p>
            <p class="doctor-bio">{{ doctor.bio }}</p>
            <button class="consult-btn">在线咨询</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 特色服务区域 -->
    <section id="services" class="services-section">
      <div class="section-header">
        <h2 class="section-title">特色服务</h2>
        <p class="section-subtitle">专注于提供高质量的医疗健康服务</p>
      </div>

      <div class="services-grid">
        <div class="service-card" v-for="service in services" :key="service.id">
          <div class="service-icon">{{ service.icon }}</div>
          <h3 class="service-name">{{ service.name }}</h3>
          <p class="service-desc">{{ service.description }}</p>
        </div>
      </div>
    </section>

    <!-- 健康资讯区域 -->
    <section id="news" class="news-section">
      <div class="section-header">
        <h2 class="section-title">健康资讯</h2>
        <p class="section-subtitle">了解最新的健康知识和医院动态</p>
      </div>

      <div class="news-tabs">
        <div class="tab active" @click="setNewsTab('health')">健康知识</div>
        <div class="tab" @click="setNewsTab('hospital')">医院动态</div>
        <div class="tab" @click="setNewsTab('notice')">医院公告</div>
      </div>

      <div class="news-grid" v-if="activeNewsTab === 'health'">
        <div class="news-card" v-for="item in healthNews" :key="item.id">
          <img :src="item.image" :alt="item.title" class="news-image" />
          <div class="news-content">
            <div class="news-date">{{ item.date }}</div>
            <h3 class="news-title">{{ item.title }}</h3>
            <p class="news-excerpt">{{ item.excerpt }}</p>
            <a href="#" class="read-more">阅读全文 →</a>
          </div>
        </div>
      </div>

      <div class="news-grid" v-if="activeNewsTab === 'hospital'">
        <div class="news-card" v-for="item in hospitalNews" :key="item.id">
          <img :src="item.image" :alt="item.title" class="news-image" />
          <div class="news-content">
            <div class="news-date">{{ item.date }}</div>
            <h3 class="news-title">{{ item.title }}</h3>
            <p class="news-excerpt">{{ item.excerpt }}</p>
            <a href="#" class="read-more">阅读全文 →</a>
          </div>
        </div>
      </div>

      <div class="news-grid" v-if="activeNewsTab === 'notice'">
        <div class="news-card" v-for="item in notices" :key="item.id">
          <img :src="item.image" :alt="item.title" class="news-image" />
          <div class="news-content">
            <div class="news-date">{{ item.date }}</div>
            <h3 class="news-title">{{ item.title }}</h3>
            <p class="news-excerpt">{{ item.excerpt }}</p>
            <a href="#" class="read-more">阅读全文 →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们区域 -->
    <section id="contact" class="contact-section">
      <div class="section-header">
        <h2 class="section-title">联系我们</h2>
        <p class="section-subtitle">欢迎随时联系我们，我们将竭诚为您服务</p>
      </div>

      <div class="contact-container">
        <div class="contact-info">
          <h3>医院信息</h3>
          <div class="info-item">
            <span class="info-icon">📍</span>
            <span class="info-text">北京市海淀区健康路88号</span>
          </div>
          <div class="info-item">
            <span class="info-icon">📞</span>
            <span class="info-text">010-12345678</span>
          </div>
          <div class="info-item">
            <span class="info-icon">✉️</span>
            <span class="info-text">contact@healthhospital.com</span>
          </div>
          <div class="info-item">
            <span class="info-icon">⏰</span>
            <span class="info-text">周一至周五: 8:00 - 17:30</span>
          </div>
        </div>

        <div class="map-container" id="map-container"></div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="main-footer">
      <div class="footer-container">
        <div class="footer-column">
          <h3>关于我们</h3>
          <ul>
            <li><a href="#">医院简介</a></li>
            <li><a href="#">领导团队</a></li>
            <li><a href="#">发展历程</a></li>
            <li><a href="#">荣誉资质</a></li>
            <li><a href="#">招聘信息</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>就医指南</h3>
          <ul>
            <li><a href="#">预约挂号</a></li>
            <li><a href="#">门诊指南</a></li>
            <li><a href="#">住院指南</a></li>
            <li><a href="#">医保政策</a></li>
            <li><a href="#">交通指南</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>科室导航</h3>
          <ul>
            <li v-for="dept in departments.slice(0, 6)" :key="dept.id">
              <a href="#">{{ dept.name }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>关注我们</h3>
          <div class="qrcode-container">
            <img
              src="https://picsum.photos/id/1025/120/120"
              alt="微信公众号二维码"
              class="qrcode"
            />
            <p>扫码关注小程序</p>
          </div>
        </div>
      </div>

      <div class="copyright">
        <p>© 2023 健康医院 版权所有 | 京ICP备12345678号</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HospitalFullPage',
  data () {
    return {
      // 英雄区轮播
      heroSlides: [
        {
          image: 'https://picsum.photos/id/1084/1920/1080',
          title: '专业医疗服务，守护您的健康',
          description:
            '我们拥有一流的医疗团队和先进的医疗设备，为您提供全方位的健康保障',
          ctaText: '立即预约'
        },
        {
          image: 'https://picsum.photos/id/1083/1920/1080',
          title: '权威专家团队，提供精准诊疗',
          description: '汇聚各领域专家，结合先进技术，为您提供个性化的诊疗方案',
          ctaText: '了解专家'
        },
        {
          image: 'https://picsum.photos/id/1060/1920/1080',
          title: '舒适就医环境，贴心医疗服务',
          description: '以人为本的服务理念，让您在就诊过程中感受温暖与关怀',
          ctaText: '参观医院'
        }
      ],

      // 科室数据
      departments: [
        {
          id: 1,
          icon: '⚕️',
          name: '内科',
          description:
            '专注于成人疾病的诊断和治疗，包括心血管、呼吸、消化等多个专业方向'
        },
        {
          id: 2,
          icon: '🔬',
          name: '外科',
          description:
            '手术治疗各类疾病和创伤，包括普通外科、骨科、神经外科等专业'
        },
        {
          id: 3,
          icon: '👶',
          name: '儿科',
          description: '儿童健康和疾病防治，为0-18岁儿童提供专业医疗服务'
        },
        {
          id: 4,
          icon: '👩',
          name: '妇产科',
          description: '女性健康和生殖系统疾病诊疗，提供孕期保健和妇科疾病治疗'
        },
        {
          id: 5,
          icon: '👁️',
          name: '眼科',
          description:
            '眼部疾病和视力矫正，包括白内障、青光眼、近视防控等专业服务'
        },
        {
          id: 6,
          icon: '👂',
          name: '耳鼻喉科',
          description:
            '耳、鼻、喉相关疾病治疗，包括听力障碍、鼻窦炎、咽喉疾病等'
        },
        {
          id: 7,
          icon: '🦷',
          name: '口腔科',
          description:
            '口腔疾病防治和牙齿美容，包括龋齿治疗、正畸、种植牙等服务'
        },
        {
          id: 8,
          icon: '🧠',
          name: '神经内科',
          description: '诊治脑血管疾病、癫痫、痴呆、头痛等神经系统疾病'
        }
      ],

      // 医生数据
      doctors: [
        {
          id: 1,
          name: '张医生',
          title: '主任医师',
          department: '内科',
          avatar: 'https://picsum.photos/id/1001/300/300',
          bio: '从事内科临床工作30年，擅长心血管疾病的诊断与治疗，发表学术论文50余篇。'
        },
        {
          id: 2,
          name: '李医生',
          title: '副主任医师',
          department: '外科',
          avatar: 'https://picsum.photos/id/1002/300/300',
          bio: '外科领域资深专家，擅长各类微创手术，临床经验丰富，技术精湛。'
        },
        {
          id: 3,
          name: '王医生',
          title: '主治医师',
          department: '儿科',
          avatar: 'https://picsum.photos/id/1003/300/300',
          bio: '专注儿童健康领域15年，对儿童常见病和疑难杂症有丰富诊疗经验。'
        },
        {
          id: 4,
          name: '赵医生',
          title: '主任医师',
          department: '妇产科',
          avatar: 'https://picsum.photos/id/1004/300/300',
          bio: '妇产科权威专家，擅长高危产妇管理和妇科微创手术，深受患者信赖。'
        },
        {
          id: 5,
          name: '刘医生',
          title: '副主任医师',
          department: '眼科',
          avatar: 'https://picsum.photos/id/1005/300/300',
          bio: '眼科专家，在白内障、青光眼等疾病治疗方面有深厚造诣，手术技术精湛。'
        }
      ],

      // 特色服务
      services: [
        {
          id: 1,
          icon: '🔬',
          name: '健康体检',
          description: '提供全面的健康检查服务，早期发现潜在健康风险'
        },
        {
          id: 2,
          icon: '🏥',
          name: '住院治疗',
          description: '舒适的住院环境和专业的护理团队，提供优质住院服务'
        },
        {
          id: 3,
          icon: '👩⚕️',
          name: '家庭医生',
          description: '为家庭提供专属医疗顾问服务，全方位保障家庭成员健康'
        },
        {
          id: 4,
          icon: '💊',
          name: '慢病管理',
          description: '针对高血压、糖尿病等慢性疾病提供专业管理方案'
        },
        {
          id: 5,
          icon: '🚑',
          name: '急诊服务',
          description: '24小时急诊服务，为突发疾病和创伤提供及时救治'
        },
        {
          id: 6,
          icon: '🌿',
          name: '中医理疗',
          description: '结合传统中医理论，提供针灸、推拿等理疗服务'
        }
      ],

      // 健康资讯
      activeNewsTab: 'health',

      healthNews: [
        {
          id: 1,
          date: '2023-10-15',
          title: '秋季如何预防呼吸道疾病',
          excerpt:
            '秋季气温变化大，是呼吸道疾病高发季节。专家建议注意保暖，加强锻炼，保持室内通风...',
          image: 'https://picsum.photos/id/1000/400/300'
        },
        {
          id: 2,
          date: '2023-10-10',
          title: '合理膳食有助于控制血糖',
          excerpt:
            '对于糖尿病患者，合理的膳食结构至关重要。本文介绍几种有助于控制血糖的食物和饮食方法...',
          image: 'https://picsum.photos/id/1009/400/300'
        },
        {
          id: 3,
          date: '2023-10-08',
          title: '正确的姿势能有效预防颈椎疾病',
          excerpt:
            '现代人群长期伏案工作，颈椎疾病发病率逐年上升。掌握正确的坐姿和站姿，能有效预防颈椎问题...',
          image: 'https://picsum.photos/id/1010/400/300'
        },
        {
          id: 4,
          date: '2023-10-05',
          title: '秋季护肤小窍门',
          excerpt:
            '秋季气候干燥，皮肤容易缺水。本文分享几个简单有效的秋季护肤方法，帮助保持肌肤水润...',
          image: 'https://picsum.photos/id/1017/400/300'
        },
        {
          id: 5,
          date: '2023-10-03',
          title: '运动前后的正确拉伸方法',
          excerpt:
            '正确的拉伸可以减少运动损伤，提高运动效果.本文介绍运动前后不同部位的拉伸技巧...',
          image: 'https://picsum.photos/id/1018/400/300'
        }
      ],

      hospitalNews: [
        {
          id: 1,
          date: '2023-10-15',
          title: '我院引进最新一代磁共振设备',
          excerpt:
            '为提升诊疗水平，我院最新引进了国际先进的3.0T磁共振设备，将为患者提供更精准的影像诊断...',
          image: 'https://picsum.photos/id/1011/400/300'
        },
        {
          id: 2,
          date: '2023-10-12',
          title: '知名专家王教授加盟我院',
          excerpt:
            '国内著名心血管专家王教授正式加盟我院，将定期坐诊并指导临床工作...',
          image: 'https://picsum.photos/id/1012/400/300'
        },
        {
          id: 3,
          date: '2023-10-10',
          title: '我院成功举办首届健康科普大赛',
          excerpt:
            '为普及健康知识，我院举办了首届健康科普大赛，医护人员积极参与，创作了大量优质科普作品...',
          image: 'https://picsum.photos/id/1013/400/300'
        }
      ],

      notices: [
        {
          id: 1,
          date: '2023-10-05',
          title: '关于调整门诊时间的通知',
          excerpt:
            '自2023年10月10日起，我院门诊时间调整为8:00-17:30，节假日门诊安排另行通知...',
          image: 'https://picsum.photos/id/1014/400/300'
        },
        {
          id: 2,
          date: '2023-10-01',
          title: '国庆期间就诊须知',
          excerpt:
            '国庆假期（10月1日-7日）我院急诊24小时正常运行，门诊仅上午开放，请合理安排就诊时间...',
          image: 'https://picsum.photos/id/1015/400/300'
        },
        {
          id: 3,
          date: '2023-09-28',
          title: '我院新增儿科夜间门诊',
          excerpt:
            '为方便儿童患者就诊，自10月1日起，我院增设儿科夜间门诊，时间为18:00-21:00...',
          image: 'https://picsum.photos/id/1016/400/300'
        }
      ],
      map: {}
    }
  },
  methods: {
    // 初始化地图
    async initMap () {},

    // 滚动到指定区域
    scrollToSection (sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // 减去导航栏高度
          behavior: 'smooth'
        })
      }
    },

    // 设置资讯标签
    setNewsTab (tabName) {
      this.activeNewsTab = tabName
      // 移除所有标签的active类
      document.querySelectorAll('.news-tabs .tab').forEach((tab) => {
        tab.classList.remove('active')
      })
      // 给当前点击的标签添加active类
      event.currentTarget.classList.add('active')
    }
  },
  mounted () {
    // 实现英雄区轮播效果
    let currentSlide = 0
    const slides = document.querySelectorAll('.hero-slider .slide')

    setInterval(() => {
      slides[currentSlide].classList.remove('active')
      currentSlide = (currentSlide + 1) % slides.length
      slides[currentSlide].classList.add('active')
    }, 5000)
  }
}
</script>

<style scoped>
/* 基础样式 - 确保页面铺满全屏 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.hospital-fullpage {
  width: 100%;
  min-height: 100vh;
  font-family: "Segoe UI", "Microsoft YaHei", sans-serif;
  color: #333;
  background-color: #fff;
}

/* 导航栏样式 */
.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0;
}

.nav-container {
  width: 100%;
  max-width: 100%;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.logo-area {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
  width: auto;
  margin-right: 15px;
}

.logo-text h1 {
  font-size: 22px;
  color: #165dff;
  margin: 0 0 3px 0;
}

.logo-text p {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0 20px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;
  position: relative;
}

.nav-links li:hover {
  color: #165dff;
}

.nav-links li:after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #165dff;
  transition: width 0.3s;
}

.nav-links li:hover:after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.hotline {
  margin-right: 20px;
  font-size: 16px;
  color: #e63946;
  font-weight: 500;
}

.appointment-btn {
  background-color: #165dff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.appointment-btn:hover {
  background-color: #0e42d2;
}

/* 英雄区域样式 - 全屏高度 */
.hero-section {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  margin-top: 80px; /* 导航栏高度 */
}

.hero-slider {
  width: 100%;
  height: 100%;
  position: relative;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
}

.slide.active {
  opacity: 1;
  z-index: 1;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
}

.slide:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.slide-title {
  font-size: 48px;
  margin: 0 0 20px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.slide-desc {
  font-size: 20px;
  margin: 0 0 30px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.slide-btn {
  background-color: #165dff;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
}

.slide-btn:hover {
  background-color: #0e42d2;
  transform: translateY(-3px);
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-align: center;
  z-index: 10;
  cursor: pointer;
  animation: bounce 2s infinite;
}

.scroll-indicator span {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
}

.scroll-icon {
  font-size: 24px;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-20px) translateX(-50%);
  }
  60% {
    transform: translateY(-10px) translateX(-50%);
  }
}

/* 通用区块样式 */
.section {
  width: 100%;
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 36px;
  color: #333;
  margin: 0 0 15px 0;
  position: relative;
  display: inline-block;
}

.section-title:after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #165dff;
}

.section-subtitle {
  font-size: 18px;
  color: #666;
  margin: 0;
  max-width: 700px;
  margin: 0 auto;
}

/* 科室介绍区域 */
.department-section {
  margin-top: 20px;
  background-color: #f9fafb;
}

.department-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 0 50px;
}

.department-card {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.department-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.dept-icon {
  font-size: 50px;
  color: #165dff;
  margin-bottom: 20px;
}

.dept-name {
  font-size: 22px;
  margin: 0 0 15px 0;
  color: #333;
}

.dept-desc {
  font-size: 15px;
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.dept-link {
  display: inline-block;
  color: #165dff;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.3s;
}

.dept-link:hover {
  color: #0e42d2;
  text-decoration: underline;
}

/* 医生团队区域 */
.doctors-section {
  margin-top: 20px;
  background-color: white;
}

.doctors-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 0 50px;
}

.doctor-card {
  display: flex;
  background-color: #f9fafb;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.doctor-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.doctor-avatar {
  width: 40%;
  object-fit: cover;
}

.doctor-info {
  width: 60%;
  padding: 25px;
}

.doctor-name {
  font-size: 22px;
  margin: 0 0 5px 0;
  color: #333;
}

.doctor-title {
  font-size: 16px;
  color: #165dff;
  margin: 0 0 10px 0;
}

.doctor-dept {
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px dashed #eee;
}

.doctor-bio {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.6;
  flex: 1;
}

.consult-btn {
  background-color: transparent;
  color: #165dff;
  border: 1px solid #165dff;
  padding: 8px 0;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}

.consult-btn:hover {
  background-color: #165dff;
  color: white;
}

/* 特色服务区域 */
.services-section {
  margin-top: 20px;
  padding-top: 20px;
  background-color: #f0f5ff;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 0 50px;
}

.service-card {
  background-color: white;
  border-radius: 10px;
  padding: 35px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 50px;
  color: #165dff;
  margin-bottom: 25px;
}

.service-name {
  font-size: 22px;
  margin: 0 0 15px 0;
  color: #333;
}

.service-desc {
  font-size: 15px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

/* 预约挂号区域 */
.appointment-section {
  background-color: white;
  padding-bottom: 100px;
}

.appointment-form-container {
  display: flex;
  gap: 40px;
  padding: 0 50px;
}

.appointment-form {
  flex: 2;
  background-color: #f9fafb;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 15px;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #165dff;
}

.submit-group {
  grid-column: 1 / 3;
}

.submit-btn {
  width: 100%;
  background-color: #165dff;
  color: white;
  border: none;
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0e42d2;
}

.appointment-info {
  flex: 1;
  background-color: #f0f5ff;
  border-radius: 10px;
  padding: 30px;
}

.appointment-info h3 {
  font-size: 20px;
  margin: 0 0 20px 0;
  color: #333;
}

.info-list {
  list-style: none;
  margin: 0 0 30px 0;
  padding: 0;
}

.info-list li {
  font-size: 15px;
  color: #666;
  margin-bottom: 12px;
  padding-left: 20px;
  position: relative;
}

.info-list li:before {
  content: "•";
  color: #165dff;
  position: absolute;
  left: 0;
}

.working-hours h4 {
  font-size: 16px;
  margin: 0 0 15px 0;
  color: #333;
}

.working-hours p {
  font-size: 15px;
  color: #666;
  margin: 0 0 8px 0;
}

/* 健康资讯区域 */
.news-section {
  margin-top: 20px;
  padding-top: 20px;
  background-color: #f9fafb;
}

.news-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  gap: 10px;
}

.tab {
  padding: 10px 25px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 20px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.tab.active {
  background-color: #165dff;
  color: white;
  border-color: #165dff;
}

.tab:hover:not(.active) {
  border-color: #165dff;
  color: #165dff;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 0 50px;
}

.news-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.news-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-content {
  padding: 25px;
}

.news-date {
  font-size: 13px;
  color: #999;
  margin: 0 0 10px 0;
}

.news-title {
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #333;
  line-height: 1.4;
}

.news-excerpt {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  font-size: 14px;
  color: #165dff;
  text-decoration: none;
  transition: color 0.3s;
}

.read-more:hover {
  color: #0e42d2;
  text-decoration: underline;
}

/* 联系我们区域 */
.contact-section {
  padding-top: 20px;
  margin-top: 20px;
  background-color: white;
  padding-bottom: 100px;
}

.contact-container {
  height: 400px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 0 50px;
}

.contact-info {
  background-color: #f9fafb;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.contact-info h3 {
  font-size: 20px;
  margin: 0 0 25px 0;
  color: #333;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.info-icon {
  font-size: 20px;
  color: #165dff;
  margin-right: 15px;
  margin-top: 3px;
}

.info-text {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
}

.social-links {
  margin-top: 30px;
  display: flex;
  gap: 15px;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #e8f0fe;
  color: #165dff;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s;
}

.social-icon:hover {
  background-color: #165dff;
  color: white;
  transform: translateY(-5px);
}

.contact-form {
  background-color: #f9fafb;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.contact-form h3 {
  font-size: 20px;
  margin: 0 0 25px 0;
  color: #333;
}

.contact-form .form-group {
  margin-bottom: 15px;
}

.map-container {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  height: 100%;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 页脚样式 */
.main-footer {
  width: 100%;
  background-color: #1d2129;
  color: white;
  padding: 80px 0 30px;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding: 0 50px 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-column h3 {
  font-size: 18px;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-column ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-column li {
  margin-bottom: 12px;
}

.footer-column a {
  color: #a0aec0;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-column a:hover {
  color: white;
}

.qrcode-container {
  text-align: center;
}

.qrcode {
  width: 120px;
  height: 120px;
  border: 3px solid white;
  margin: 0 auto 10px;
}

.qrcode-container p {
  font-size: 14px;
  color: #a0aec0;
  margin: 0;
}

.copyright {
  text-align: center;
  color: #a0aec0;
  font-size: 14px;
  padding-top: 30px;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .department-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .doctors-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .contact-container {
    grid-template-columns: 1fr 1fr;
  }

  .map-container {
    grid-column: 1 / 3;
  }
}

@media (max-width: 992px) {
  .nav-container {
    padding: 0 30px;
  }

  .nav-links li {
    margin: 0 10px;
    font-size: 15px;
  }

  .department-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .appointment-form-container {
    flex-direction: column;
  }

  .footer-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .nav-container {
    height: auto;
    flex-direction: column;
    padding: 15px 20px;
  }

  .logo-area {
    margin-bottom: 15px;
  }

  .nav-links {
    margin-bottom: 15px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-links li {
    margin: 5px 10px;
  }

  .hero-section {
    margin-top: 180px;
  }

  .slide-title {
    font-size: 32px;
  }

  .slide-desc {
    font-size: 16px;
  }

  .section {
    padding: 60px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .department-grid,
  .doctors-grid,
  .services-grid,
  .news-grid {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }

  .doctor-card {
    flex-direction: column;
  }

  .doctor-avatar,
  .doctor-info {
    width: 100%;
  }

  .appointment-form {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }

  .submit-group {
    grid-column: 1;
  }

  .appointment-form-container {
    padding: 0 20px;
  }

  .contact-container {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }

  .map-container {
    grid-column: 1;
  }

  .footer-container {
    grid-template-columns: 1fr;
    padding: 0 20px 30px;
  }
}
</style>
