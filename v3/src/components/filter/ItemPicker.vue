<script setup>
import { defineProps, ref, defineEmits, computed, watch } from "vue"
import { Search } from 'vant'

const props = defineProps({
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
})
const emits = defineEmits(['update:value'])
const isCheck = computed(() => props.value && props.value.length === props.columns.length)
const search = ref(undefined)
const currentColumns = ref([])
const isShrink = ref(true)
watch(search, (newSearch) => {
  currentColumns.value = props.columns.filter(column => column[props.textKey].indexOf(newSearch) > -1)
})
watch(() => props.columns, (newColumns) => {
  currentColumns.value = newColumns
}, {
  deep: true,
  immediate: true
})


const handleChose = (isChose) => {
  emits('update:value', isChose ? props.columns.map(item => item[props.valueKey]) : [])
}
const onCheckBoxItemClick = (val) => {
  let taskTypeNameList = props.value || []
  if (!props.isRadio) {
    const i = taskTypeNameList.indexOf(val)
    i === -1 ? taskTypeNameList.push(val) : taskTypeNameList.splice(i, 1)
  } else if (taskTypeNameList.length && taskTypeNameList.indexOf(val) > -1) {
    taskTypeNameList = undefined
  } else {
    taskTypeNameList = [val]
  }
  emits('update:value', taskTypeNameList)
}
</script>

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
      <div v-for="(item, index) in currentColumns" :key="index" :class="`check-box-item${value && value.indexOf(item[valueKey]) !== -1 ? '__active' : ''
      }`" @click="onCheckBoxItemClick(item[valueKey])">
        {{ item[textKey] }}
      </div>
    </div>
    <div v-if="isShowShrink" class="shrink" @click="isShrink = !isShrink">{{ isShrink ? '展开' : '收起' }}</div>
  </div>
</template>

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
