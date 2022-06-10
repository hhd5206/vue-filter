<script setup>
import { defineProps, ref, defineEmits } from "vue"
import { Popup, Icon, Picker } from "vant"

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  columns: {
    type: Array,
    required: true,
    default: () => []
  },
  value: {
    required: true
  },
  text: {},
  valueKey: {
    type: String,
    default: 'value'
  },
  textKey: {
    type: String,
    default: 'text'
  }
})
const emits = defineEmits(['update:value', 'update:text'])
const isShow = ref(false)
const columnsFieldNames = {
  text: props.textKey
}
const onConfirm = (item) => {
  const value = item[props.valueKey]
  const text = item[props.textKey]

  emits('update:value', value)
  emits('update:text', text)
  isShow.value = false
}
const onCancel = () => {
  emits('update:value', undefined)
  emits('update:text', undefined)
}


</script>

<template>
  <div class="field">
    <div class="field-header">{{ title }}</div>
    <div class="field-main">
      <div class="range-field" v-if="value" @click="isShow = true">
        <div>{{ text }}</div>
        <icon name="clear" @click.stop="onCancel" />
      </div>
      <div class="range-field" v-else @click="isShow = true">
        <div>请选择</div>
        <icon name="arrow" />
      </div>
    </div>
    <popup v-model:show="isShow" position="bottom">
      <picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="isShow = false"
        :columns-field-names="columnsFieldNames" :title="title" />
    </popup>
  </div>
</template>

<style lang='scss' scoped>
@import "@/assets/css/filter.scss";
</style>
