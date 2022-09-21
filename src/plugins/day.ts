import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import { handleI18n } from './i18n';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/en';
import 'dayjs/locale/ja';
import 'dayjs/locale/es';
import 'dayjs/locale/tr';

(dayjs as any).extend(localizedFormat);
(dayjs as any).extend(relativeTime);
(dayjs as any).extend(utc);
(dayjs as any).extend(timezone);
const lang = localStorage.getItem('lang') || 'en';
(dayjs as any).locale(lang);
// dayjs.locale('en');
export function handleSecondUTC(millisecond: string | number) {
  return dayjs.utc(Number(millisecond) * 1000).format('YYYY-MM-DD HH:mm:ss');
}
export function handleSecondUS(millisecond: string | number) {
  return `${dayjs.utc(Number(millisecond) * 1000).format('llll')} +UTC`;
}
export function handleSecond(millisecond: string | number) {
  return (dayjs as any)(Number(millisecond) * 1000).format(
    'YYYY-MM-DD HH:mm:ss'
  );
}
export function handleTimeUTC(millisecond: string | number) {
  return dayjs.utc(Number(millisecond) * 1000).format('MM-DD');
}
export function handleTimeYear(millisecond: string | number) {
  return dayjs.utc(Number(millisecond) * 1000).format('YYYY-MM-DD');
}
export function handleDateUTC(millisecond: string | number) {
  return dayjs.utc(Number(millisecond) * 1000).format('YYYY-MM-DD');
}
export function handleGetSecondUTC(time: Date) {
  return (dayjs as any)(time).unix();
}
export function handleSecondsAgoUTC(millisecond: string | number) {
  //  console.log(millisecond);
  const d = new Date();
  const second = Number(d.getTime() / 1000);
  const diff = second - Number(millisecond);
  if (diff <= 60) {
    return `${diff} ${handleI18n('meta.second')}`;
  }
  return dayjs.utc(Number(millisecond) * 1000).fromNow();
}
export function handleSecondsAgo(millisecond: string | number) {
  return (dayjs as any)(Number(millisecond) * 1000).fromNow();
}
