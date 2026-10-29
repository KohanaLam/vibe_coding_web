import { create } from 'zustand'
import type { AppConfig, Locale, Theme } from '@/types'
import { storage } from '@/utils/storage'
import { STORAGE_KEYS, DEFAULT_CONFIG } from '@/constants'
import i18n from '@/i18n'

/**
 * App Store 状态接口
 */
interface AppState {
  // ==================== 状态 ====================
  config: AppConfig
  isLoaded: boolean

  // ==================== 语言管理 ====================
  /**
   * 切换语言
   * @param locale 语言代码
   */
  setLocale: (locale: Locale) => void

  /**
   * 获取当前语言
   * @returns 当前语言代码
   */
  getLocale: () => Locale

  // ==================== 主题管理 ====================
  /**
   * 切换主题
   * @param theme 主题类型
   */
  setTheme: (theme: Theme) => void

  /**
   * 获取当前主题
   * @returns 当前主题类型
   */
  getTheme: () => Theme

  /**
   * 切换主题（亮色/暗色）
   */
  toggleTheme: () => void

  // ==================== 数据持久化 ====================
  /**
   * 从 localStorage 加载配置
   */
  loadFromStorage: () => void

  /**
   * 保存配置到 localStorage
   * @returns 是否成功
   */
  saveToStorage: () => boolean

  /**
   * 重置为默认配置
   */
  resetConfig: () => void
}

/**
 * 应用 DOM 上的主题
 * @param theme 主题类型
 */
const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  console.log(`Theme applied: ${theme}`)
}

/**
 * App Store
 * 使用 Zustand 管理应用配置
 */
export const useAppStore = create<AppState>((set, get) => ({
  // ==================== 初始状态 ====================
  config: DEFAULT_CONFIG,
  isLoaded: false,

  // ==================== 语言管理 ====================
  setLocale: (locale) => {
    // 更新 i18n 语言
    i18n.changeLanguage(locale)

    // 更新状态
    set((state) => ({
      config: {
        ...state.config,
        locale,
      },
    }))

    // 持久化
    get().saveToStorage()

    console.log(`Language changed to: ${locale}`)
  },

  getLocale: () => {
    return get().config.locale
  },

  // ==================== 主题管理 ====================
  setTheme: (theme) => {
    // 应用主题到 DOM
    applyTheme(theme)

    // 更新状态
    set((state) => ({
      config: {
        ...state.config,
        theme,
      },
    }))

    // 持久化
    get().saveToStorage()

    console.log(`Theme changed to: ${theme}`)
  },

  getTheme: () => {
    return get().config.theme
  },

  toggleTheme: () => {
    const currentTheme = get().config.theme
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light'
    get().setTheme(newTheme)
  },

  // ==================== 数据持久化 ====================
  loadFromStorage: () => {
    // 加载配置
    const config = storage.getItem<AppConfig>(STORAGE_KEYS.CONFIG)

    if (config) {
      // 更新状态
      set({
        config,
        isLoaded: true,
      })

      // 应用配置
      i18n.changeLanguage(config.locale)
      applyTheme(config.theme)

      console.log('App config loaded from localStorage:', config)
    } else {
      // 使用默认配置
      set({
        config: DEFAULT_CONFIG,
        isLoaded: true,
      })

      // 应用默认配置
      i18n.changeLanguage(DEFAULT_CONFIG.locale)
      applyTheme(DEFAULT_CONFIG.theme)

      // 保存默认配置
      get().saveToStorage()

      console.log('Using default app config:', DEFAULT_CONFIG)
    }
  },

  saveToStorage: () => {
    const { config } = get()
    const success = storage.setItem(STORAGE_KEYS.CONFIG, config)

    if (success) {
      console.log('App config saved to localStorage')
      return true
    }

    console.error('Failed to save app config')
    return false
  },

  resetConfig: () => {
    // 重置为默认配置
    set({ config: DEFAULT_CONFIG })

    // 应用默认配置
    i18n.changeLanguage(DEFAULT_CONFIG.locale)
    applyTheme(DEFAULT_CONFIG.theme)

    // 持久化
    get().saveToStorage()

    console.log('App config reset to default')
  },
}))
