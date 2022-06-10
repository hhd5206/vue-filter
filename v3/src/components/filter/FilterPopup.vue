<script setup>
import { defineProps, defineEmits, computed, reactive } from 'vue'
import { Popup, Button } from 'vant'
import { deepClone } from '@/utils'
import { isActivesEquals } from '@/utils'

const props = defineProps({
  filterShow: {
    type: Boolean,
    default: false,
    required: true,
  },
  filterRenderMap: {
    type: Object,
    default: () => { },
    required: true,
  }
})

const emits = defineEmits(['update:filterShow', 'update:filterRenderMap', 'confirm', 'onLinkage'])

let lastFilterQueryParams = reactive({})

// 筛选条件
const filterQueryParams = computed(() => {
  const obj = {}
  const { filterRenderMap } = props
  Object.keys(filterRenderMap).forEach((key) => {
    const item = filterRenderMap[key]
    const value = item.value
    if (!item.isNotRender && (Array.isArray(value) ? value.length : value)) {
      const splitKeyArray = key.split('&&')
      if (splitKeyArray.length === 1) {
        obj[key] = value
      } else {
        const splitValueArray =
          value && value.split('&&')
        splitValueArray &&
          splitKeyArray.forEach((skey, index) => {
            obj[skey] = splitValueArray[index]
          })
      }
    }
  })
  return obj
})

const isFilterShow = computed({
  get() {
    return props.filterShow
  },
  set(val) {
    emits('update:filterShow', val)
    // 对比值有没有变化从而发不发起请求
    if (
      isActivesEquals(
        filterQueryParams,
        lastFilterQueryParams
      )
    ) return false
    emits('confirm', filterQueryParams)
  },
})

const isComponentShow = computed(() => {
  return (linkage, key) => {
    if (!linkage) return true
    const parentVal = filterQueryParams.value[linkage.to]
    if (parentVal) {
      emits(`onLinkage`, { key, parentVal, ...linkage })
    } else {
      onResetByKey(key)
    }
    return !!parentVal
  }
})

// 重置某项
const onResetByKey = (key) => {
  emits('update:filterRenderMap', key, undefined)
}
// 重置所有
const onReset = () => {
  Object.keys(props.filterRenderMap).forEach((key) => {
    // 渲染的值才重置
    if (!props.filterRenderMap[key].isNotRender) {
      onResetByKey(key)
    }
  })
}
// 每次显示记录筛选条件 用来跟关闭时做对比
const handleOpened = () => {
  lastFilterQueryParams = deepClone(filterQueryParams)
}

</script>

<template>
  <Popup v-model:show="isFilterShow" position="right" class="popup" @click-overlay="isFilterShow = false"
    @opened="handleOpened">
    <div class="popup-main">
      <template v-for="(item, key) in filterRenderMap">
        <template v-if="!item.isNotRender">
          <component :is="item.component" v-show="isComponentShow(item.linkage, key)" :key="key"
            v-model:value="item.value" v-model:text="item.text" :title="item.title" :columns="item.columns"
            v-bind="item.extraOptions" />
        </template>
      </template>
    </div>

    <div class="popup-footer">
      <Button class="popup-footer-button" type="info" plain @click="onReset">
        重置
      </Button>
      <Button class="popup-footer-button" type="info" @click="isFilterShow = false">
        确认
      </Button>
    </div>
  </Popup>
</template>

<style  lang="scss">
.popup {
  height: 100vh;
  width: 90%;

  &-main {
    height: calc(100vh - 60px);
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;
  }

  &-footer {
    text-align: center;
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;

    &-button {
      width: 48%;
      height: 40px;
    }
  }
}
</style>
