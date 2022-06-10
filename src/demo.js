import ItemPicker from '@/components/filter/ItemPicker.vue'
import Calendar from '@/components/filter/Calendar.vue'
import PopupPicker from '@/components/filter/PopupPicker.vue'

export const filterRenderMap = {
  'startTime&&endTime': {
    title: '日期',
    value: undefined,
    text: undefined,
    component: Calendar
  },
  fruit: {
    title: '水果',
    columns: [],
    value: undefined,
    text: undefined,
    component: PopupPicker,
  },
  origin: {
    title: '产地',
    columns: [],
    value: undefined,
    text: undefined,
    component: PopupPicker,
    linkage: {
      to: 'fruit',
      handler: undefined
    },
  },
  color: {
    title: '颜色',
    columns: [
      {
        dictText: '红',
        dictValue: 'red',
      },
      {
        dictText: '黄',
        dictValue: 'yellow',
      },
    ],
    value: undefined,
    text: undefined,
    component: PopupPicker,
    extraOptions: {
      valueKey: 'dictValue',
      textKey: 'dictText'
    }
  },
  weight: {
    title: '重量',
    columns: [
      {
        text: '1斤以下',
        value: '1',
      },
      {
        text: '1-5斤',
        value: '2',
      },
    ],
    value: undefined,
    text: undefined,
    component: ItemPicker,
    extraOptions: {
      isRadio: true,
      showSearch: true
    }
  },
}