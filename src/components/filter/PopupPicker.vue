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
    <popup v-model="isShow" position="bottom">
      <picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="isShow = false" :value-key="textKey"
        :title="title" />
    </popup>
  </div>
</template>
<script>
import { Popup, Icon, Picker } from "vant";

export default {
  name: 'PopupPicker',
  components: { Popup, Picker, Icon },
  props: {
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
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    onConfirm(item) {
      const value = item[this.valueKey]
      const text = item[this.textKey]

      this.$emit('update:value', value)
      this.$emit('update:text', text)
      this.isShow = false
    },
    onCancel() {
      this.$emit('update:value', undefined)
      this.$emit('update:text', undefined)
    }
  },
}
</script>
<style lang='scss' scoped>
@import "@/assets/css/filter.scss";
</style>
