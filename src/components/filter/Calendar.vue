<template>
  <div class="field">
    <Calendar ref="calendarRef" v-model="isShow" type="range" @confirm="onConfirm" :min-date="new Date(2021, 7, 1)"
      :max-date="new Date()" :allow-same-day="true" position="right" color="var(--van-blue)" />
    <div class="field-header">{{ title }}</div>
    <div class="field-main">
      <div class="range-field" v-if="startTime || endTime">
        <div class="range" @click="isShow = true">
          <div>{{ startTime }}</div>
          <div>~</div>
          <div>{{ endTime }}</div>
        </div>
        <Icon name="clear" @click="onCancel" />
      </div>
      <div class="range-field" v-else @click="isShow = true">
        <div>请选择</div>
        <Icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar, Icon } from "vant"
import { parseTime } from '@/utils'

export default {
  name: 'myCalendar',
  components: { Calendar, Icon },
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      required: true
    },
  },
  computed: {
    startTime() {
      return this.value && this.value.split('&&')[0]
    },
    endTime() {
      return this.value && this.value.split('&&')[1]
    }
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    onConfirm([startDate, endDate]) {
      this.$emit('update:value', `${parseTime(startDate).format("{y}-{m}-{d}")}&&${parseTime(endDate).format("{y}-{m}-{d}")}`)
      this.isShow = false
    },
    onCancel() {
      this.$emit('update:value', undefined)
      this.$refs.calendarRef.reset()
    }
  },
}
</script>
<style lang='scss' scoped>
@import "@/assets/css/filter.scss";
</style>
