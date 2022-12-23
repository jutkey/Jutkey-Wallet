import { createI18n } from 'vue-i18n';
import en from '@/lang/en-us';
import zh from '@/lang/zh-cn';
import tw from '@/lang/zh-tw';

const lang = localStorage.getItem('lang');
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: lang || 'en',
  messages: {
    en,
    'zh-cn': zh,
    'zh-tw': tw
  }
});
const { t } = i18n.global;
export function handleI18n(key: string, obj?: any) {
  if (obj) {
    return t(key, obj);
  }
  return t(key);
}
export default i18n;
