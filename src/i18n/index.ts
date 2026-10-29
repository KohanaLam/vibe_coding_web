import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'

// 国际化配置
i18n
  .use(initReactI18next) // 绑定 react-i18next
  .init({
    resources: {
      'zh-CN': {
        translation: zhCN,
      },
      'en-US': {
        translation: enUS,
      },
    },
    lng: 'zh-CN', // 默认语言
    fallbackLng: 'zh-CN', // 回退语言
    interpolation: {
      escapeValue: false, // React 已经做了 XSS 防护
    },
    react: {
      useSuspense: false, // 禁用 Suspense，避免闪烁
    },
  })

export default i18n
