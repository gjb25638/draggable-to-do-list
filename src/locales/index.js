import tool from '@/utils/tool'
import { createI18n } from 'vue-i18n'
// import el_zh_tw from 'element-plus/lib/locale/lang/zh-tw'
// import el_zh_cn from 'element-plus/lib/locale/lang/zh-cn'
// import el_en from 'element-plus/lib/locale/lang/en'
// import el_ja from 'element-plus/lib/locale/lang/ja'

import zh_tw from './lang/zh-tw.js'
import zh_cn from './lang/zh-cn.js'
import en from './lang/en.js'
import ja from './lang/ja.js'

const messages = {
  'zh-tw': {
    // el: el_zh_tw,
    ...zh_tw
  },
  'zh-cn': {
    // el: el_zh_cn,
    ...zh_cn
  },
  en: {
    // el: el_en,
    ...en
  },
  ja: {
    // el: el_ja,
    ...ja
  }
}

const i18n = createI18n({
  legacy: false,
  locale: tool.data.get('APP_LANG') || 'zh-tw',
  fallbackLocale: 'zh-tw',
  globalInjection: true,
  messages
})

export default i18n
