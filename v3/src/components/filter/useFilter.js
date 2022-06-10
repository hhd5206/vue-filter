import { ref, reactive } from 'vue'

const useFilter = (filterRenderMap) => {
  const filterShow = ref(false)
  const filterQueryParams = reactive({})
  const filterRenderMaps = reactive(filterRenderMap)

  const updateFilterRenderMap = (key, value) => {
    filterRenderMaps[key].value = value
    filterRenderMaps[key].text = value
  }

  const onFilterConfirm = (params) => {
    filterQueryParams.value = params
  }

  return {
    filterShow,
    filterQueryParams,
    filterRenderMaps,
    updateFilterRenderMap,
    onFilterConfirm,
  }
}

export default useFilter