<template>
  <div class="d2-icon-picker">
    <el-popover
      placement="bottom"
      width="400"
      trigger="click"
      v-model="visible"
    >
      <div class="d2-icon-picker__content">
        <el-input
          v-model="searchText"
          placeholder="搜索图标"
          class="d2-icon-picker__search"
        />
        <div class="d2-icon-picker__icons">
          <div
            v-for="icon in filteredIcons"
            :key="icon"
            class="d2-icon-picker__icon-item"
            @click="selectIcon(icon)"
          >
            <d2-icon :name="icon" />
            <span class="d2-icon-picker__icon-name">{{ icon }}</span>
          </div>
        </div>
      </div>
      <el-input
        slot="reference"
        v-model="value"
        :placeholder="placeholder"
        readonly
        class="d2-icon-picker__input"
      >
        <template slot="prefix" v-if="value">
          <d2-icon :name="value" class="d2-icon-picker__selected-icon" />
        </template>
      </el-input>
    </el-popover>
  </div>
</template>

<script>
import d2Icon from '@/components/d2-icon'

// 这里是常用图标列表，可根据实际需求扩展
const icons = [
  'home', 'folder-o', 'list', 'user-o', 'cog', 'bars', 'search',
  'plus', 'edit', 'trash-o', 'save', 'cancel', 'check', 'times',
  'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'info-circle',
  'warning', 'success', 'error', 'question-circle', 'star-o', 'heart-o'
]

export default {
  name: 'd2-icon-picker',
  components: {
    d2Icon
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '选择图标'
    }
  },
  data () {
    return {
      visible: false,
      searchText: '',
      icons: icons
    }
  },
  computed: {
    filteredIcons () {
      if (!this.searchText) {
        return this.icons
      }
      return this.icons.filter(icon =>
        icon.includes(this.searchText.toLowerCase())
      )
    }
  },
  methods: {
    selectIcon (icon) {
      this.$emit('input', icon)
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .d2-icon-picker__input{
 .el-input__prefix{
left: 10px;
}
}

.d2-icon-picker {
  &__selected-icon {
    margin-right: 5px;
    font-size: 16px;
  }

  &__content {
    padding: 10px;
  }

  &__search {
    margin-bottom: 10px;
  }

  &__icons {
    display: flex;
    flex-wrap: wrap;
    max-height: 300px;
    overflow-y: auto;
  }

  &__icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    margin: 5px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #f5f7fa;
    }
  }

  &__icon-name {
    font-size: 12px;
    margin-top: 5px;
    color: #606266;
  }
}
</style>
