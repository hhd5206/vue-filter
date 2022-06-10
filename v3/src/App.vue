<script setup>
import FilterPopup from "@/components/filter/FilterPopup.vue"
import useFilter from "@/components/filter/useFilter"
import { filterRenderMap } from './demo'

const { filterShow, filterQueryParams, updateFilterRenderMap, onFilterConfirm, filterRenderMaps } = useFilter(filterRenderMap)

filterRenderMaps.fruit.columns = [
  {
    text: '苹果',
    value: 'apple',
  },
  {
    text: '香蕉',
    value: 'banana',
  },
]

console.log(filterQueryParams)

const handleLinkage = ({ key, handler }) => {
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
    if (JSON.stringify(columns) !== JSON.stringify(filterRenderMaps.origin.columns)) {
      filterRenderMaps.origin.columns = columns
      filterRenderMaps.origin.value = undefined
      filterRenderMaps.origin.text = undefined
    }
    return
  }
}
</script>

<template>
  <div id="app">
    <div @click="filterShow = true">显示</div>
    <filter-popup v-model:filterShow="filterShow" :filterRenderMap="filterRenderMaps"
      @update:filterRenderMap="updateFilterRenderMap" @onLinkage="handleLinkage" @confirm="onFilterConfirm" />
  </div>
</template>


<style>
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
}
</style>
