<template>
  <div class="field">
    <div class="field-header">
      <span>{{ title }}</span>
      <Search v-if="showSearch" v-model="search" placeholder="请输入"></Search>
      <template v-if="!isRadio">
        <img class="check-icon" v-if="!isCheck" src="../../assets/icons/cancel.png" @click.stop="handleChose(true)" />
        <img class="check-icon" v-else src="../../assets/icons/confirm.png" @click.stop="handleChose(false)" />
      </template>
    </div>
    <div class="field-main check-box-group" :style="`${isShrink && isShowShrink ? 'maxHeight:60px' : 'height:auto'}`">
      <div v-for="(item, index) in currentColumns" :key="item[valueKey] + index" :class="`check-box-item${value && value.indexOf(item[valueKey]) !== -1 ? '__active' : ''
      }`" @click="onCheckBoxItemClick(item[valueKey])">
        {{ item[textKey] }}
      </div>
    </div>
    <div v-if="isShowShrink" class="shrink" @click="isShrink = !isShrink">{{ isShrink ? '展开' : '收起' }}</div>
  </div>
</template>

<script>
import { Search } from 'vant'

export default {
  name: 'ItemPicker',
  components: {
    Search
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    isRadio: {
      type: Boolean,
      default: false,
    },
    value: {
      required: true,
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    textKey: {
      type: String,
      default: 'text',
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    isShowShrink: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isCheck() {
      return this.value && this.value.length === this.columns.length
    }
  },
  watch: {
    search(newSearch) {
      this.currentColumns = this.columns.filter(column => column[this.textKey].indexOf(newSearch) > -1)
    },
    columns: {
      handler(newColumns) {
        this.currentColumns = newColumns
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      search: undefined,
      copyColumns: [],
      currentColumns: [],
      isShrink: true
    }
  },
  methods: {
    handleChose(isChose) {
      this.$emit('update:value', isChose ? this.columns.map(item => item[this.valueKey]) : [])
    },
    onCheckBoxItemClick(val) {
      let taskTypeNameList = this.value || []
      if (!this.isRadio) {
        const i = taskTypeNameList.indexOf(val)
        i === -1 ? taskTypeNameList.push(val) : taskTypeNameList.splice(i, 1)
      } else if (taskTypeNameList.length && taskTypeNameList.indexOf(val) > -1) {
        taskTypeNameList = undefined
      } else {
        taskTypeNameList = [val]
      }
      this.$emit('update:value', taskTypeNameList)
    },
  },
}
</script>
<style lang='scss' scoped>
@import '@/assets/css/filter.scss';

.field {
  ::v-deep {
    .van-search {
      padding: 0 10px;
      flex: 1;
    }
  }
}

.shrink {
  text-align: right;
  font-size: 14px;
  color: #328deb;
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.check-icon {
  display: block;
  margin-right: 6px;
  width: 16px;
  height: 16px;
}

.check-box-group {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;

  .check-box-item {
    margin-right: 5px;
    margin-bottom: 5px;
    padding: 4px 9px;
    background-color: #f2f2f2;
    text-align: center;
    box-sizing: border-box;
    border-radius: 16px;
  }

  .check-box-item__active {
    @extend .check-box-item;
    padding: 3px 8px;
    background-color: white;
    color: var(--van-blue);
    border: 1px solid var(--van-blue);
  }
}
</style>
