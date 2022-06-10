import { deepClone } from '@/utils'

const filterMixin = (filterRenderMap) => ({
  data() {
    return {
      filterRenderMaps: deepClone(filterRenderMap), // 筛选框配置项
      filterShow: false, // 筛选框显隐
      filterQueryParams: {}, // 筛选框条件
    }
  },
  methods: {
    // 筛选确认
    onFilterConfirm(params) {
      this.filterQueryParams = params
    },
    updateFilterRenderMap(key, value) {
      this.filterRenderMaps[key].value = value
      this.filterRenderMaps[key].text = value
    }
  },
})
export default filterMixin
