<template>
  <Popup :value="isPopupShow" @click-overlay="isPopupShow = false" @opened="handleOpened" position="right"
    class="popup">
    <div class="popup-main">
      <template v-for="(item, key) in filterRenderMap">
        <template v-if="!item.isNotRender">
          <component :is="item.component" v-show="isComponentShow(item.linkage, key)" :key="key" :title="item.title"
            :columns="item.columns" :value.sync="item.value" :text.sync="item.text" v-bind="item.extraOptions">
          </component>
        </template>
      </template>
    </div>

    <div class="popup-footer">
      <Button class="popup-footer-button" type="info" @click="onReset" plain>重置</Button>
      <Button class="popup-footer-button" type="info" @click="isPopupShow = false">确认</Button>
    </div>
  </Popup>
</template>

<script>
import { Popup, Button } from 'vant'
import { deepClone, isActivesEquals } from '@/utils'

export default {
  name: 'FilterPopup',

  components: {
    Popup,
    Button,
  },

  model: {
    prop: 'popupShow',
    event: 'change',
  },

  props: {
    popupShow: {
      type: Boolean,
      default: false,
      required: true,
    },
    filterRenderMap: {
      type: Object,
      default: () => { },
      required: true,
    },
  },
  computed: {
    isPopupShow: {
      get() {
        return this.popupShow
      },
      set(val) {
        this.$emit('change', val)
        // 对比值有没有变化从而发不发起请求
        if (
          isActivesEquals(
            this.filterQueryParams,
            this.lastFilterQueryParams
          )
        ) { return }
        this.$emit('confirm', this.filterQueryParams)
      },
    },
    // 控制联动关系的显隐
    isComponentShow() {
      return (linkage, key) => {
        if (!linkage) return true
        const parentVal = this.filterQueryParams[linkage.to]
        if (parentVal) {
          this.$emit(`onLinkage`, { key, parentVal, ...linkage })
        } else {
          this.onResetByKey(key)
        }
        return !!parentVal
      }
    },
    // 筛选条件
    filterQueryParams() {
      const obj = {}
      const { filterRenderMap } = this
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
    },
  },

  data() {
    return {
      lastFilterQueryParams: {},
    }
  },

  methods: {
    // 重置某项
    onResetByKey(key) {
      this.$emit('updateFilterRenderMap', key, undefined)
    },
    // 重置所有
    onReset() {
      Object.keys(this.filterRenderMap).forEach((key) => {
        // 渲染的值才重置
        if (!this.filterRenderMap[key].isNotRender) {
          this.onResetByKey(key)
        }
      })
    },
    // 每次显示记录筛选条件 用来跟关闭时做对比
    handleOpened() {
      this.lastFilterQueryParams = deepClone(this.filterQueryParams)
    },
  },
}
</script>

<style scoped lang="scss">
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
