<script setup>
import { defineProps, computed, ref, defineEmits } from 'vue'
import { Calendar, Icon } from "vant"
import { parseTime } from '@/utils'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    required: true
  },
})
const emits = defineEmits(["update:value"])

const startTime = computed(() => props.value && props.value.split('&&')[0])
const endTime = computed(() => props.value && props.value.split('&&')[1])
const isShow = ref(false)
const calendarRef = ref(null)

const onConfirm = (dateArr) => {
  emits('update:value', `${parseTime(dateArr[0], "{y}-{m}-{d}")}&&${parseTime(dateArr[1], "{y}-{m}-{d}")}`)
  isShow.value = false
}
const onCancel = () => {
  emits('update:value', undefined)
  calendarRef.value.reset()
}

</script>

<template>
  <div class="field">
    <Calendar ref="calendarRef" v-model:show="isShow" type="range" @confirm="onConfirm" :min-date="new Date(2021, 7, 1)"
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

<style lang='scss' scoped>
@import "@/assets/css/filter.scss";
</style>
