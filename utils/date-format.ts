import dayjs from 'dayjs'
import 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { DatePickerDate } from 'v-calendar/dist/types/src/use/datePicker.js';

dayjs.locale('es')
dayjs.extend(relativeTime);

export const dateFormatted = (date: Date | string): string => {
  return dayjs(date).format('DD/MM/YYYY')
}

export const dateForFilterFormatted = (date: Date | string): string => {
  return dayjs(date).format('YYYY-MM-DD')
}

export const dateFormattedWithTime = (date: Date | string): string => {
  return dayjs(date).format('DD/MM/YYYY HH:mm')
}

export const timeSince = (date: Date | string): string => {
  return dayjs(date).fromNow()
}