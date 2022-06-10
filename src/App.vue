<template>
  <div id="app">
    <div @click="filterShow = true">显示</div>
    <filter-popup v-model="filterShow" :filterRenderMap="filterRenderMaps"
      @updateFilterRenderMap="updateFilterRenderMap" @onLinkage="handleLinkage" @confirm="onFilterConfirm" />
  </div>
</template>

<script>
import FilterPopup from "@/components/filter/FilterPopup.vue"
import filterMixin from "@/mixins/filterMixin"
import { filterRenderMap } from './demo'

export default {
  name: 'App',
  mixins: [filterMixin(filterRenderMap)],
  components: {
    FilterPopup
  },
  methods: {
    handleLinkage({ key, handler }) {
      if (key === 'origin') {
        if (handler) {
          handler()
          return
        }
        const columns = [
          {
            text: '泰国',
            value: 'thailand',
          },
          {
            text: '越南',
            value: 'vietnam',
          },
        ]
        // 选项不一致才赋值和重置值  避免render死循环
        if (JSON.stringify(columns) !== JSON.stringify(this.filterRenderMaps.origin.columns)) {
          this.filterRenderMaps.origin.columns = columns
          this.filterRenderMaps.origin.value = undefined
          this.filterRenderMaps.origin.text = undefined
        }
        return
      }
    }
  },
  created() {
    this.filterRenderMaps.fruit.columns = [
      {
        text: '苹果',
        value: 'apple',
      },
      {
        text: '香蕉',
        value: 'banana',
      },
    ]
  },
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  --van-blue: #1989fa;
  --van-button-primary-background-color: var(--van-blue);
  --van-tabbar-item-active-color: var(--van-blue);
}
</style>
