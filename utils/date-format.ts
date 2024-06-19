import dayjs from 'dayjs'
import 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('es')
dayjs.extend(relativeTime);

export const dateFormatted = (date: Date | string): string => {
  return dayjs(date).format('DD/MM/YYYY')
}

export const timeSince = (date: Date | string): string => {
  return dayjs(date).fromNow()
}