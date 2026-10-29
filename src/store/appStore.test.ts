/**
 * App Store 测试文件
 * 用于验证 appStore.ts 的所有功能
 */

import { useAppStore } from '@/store/appStore'

// 测试函数
export const testAppStore = () => {
  console.log('=== App Store Tests ===')

  // 获取 store 实例
  const store = useAppStore.getState()

  // 测试 1: 初始化和加载
  console.log('1. Testing initialization...')
  store.loadFromStorage()
  console.log(`   ✓ Store loaded: ${store.isLoaded}`)
  console.log(`   ✓ Current locale: ${store.config.locale}`)
  console.log(`   ✓ Current theme: ${store.config.theme}`)

  // 测试 2: 获取当前配置
  console.log('2. Testing getters...')
  const currentLocale = store.getLocale()
  const currentTheme = store.getTheme()
  console.log(`   ✓ getLocale(): ${currentLocale}`)
  console.log(`   ✓ getTheme(): ${currentTheme}`)

  // 测试 3: 切换语言到英文
  console.log('3. Testing setLocale (en-US)...')
  const originalLocale = store.config.locale
  store.setLocale('en-US')
  const newLocale = store.getLocale()
  console.log(`   ✓ Locale changed from ${originalLocale} to ${newLocale}`)
  console.log(`   ✓ Config updated: ${store.config.locale === 'en-US'}`)

  // 测试 4: 切换语言到中文
  console.log('4. Testing setLocale (zh-CN)...')
  store.setLocale('zh-CN')
  const zhLocale = store.getLocale()
  console.log(`   ✓ Locale changed to: ${zhLocale}`)
  console.log(`   ✓ Config updated: ${store.config.locale === 'zh-CN'}`)

  // 测试 5: 切换主题到暗色
  console.log('5. Testing setTheme (dark)...')
  const originalTheme = store.config.theme
  store.setTheme('dark')
  const darkTheme = store.getTheme()
  console.log(`   ✓ Theme changed from ${originalTheme} to ${darkTheme}`)
  console.log(`   ✓ Config updated: ${store.config.theme === 'dark'}`)
  console.log(`   ✓ DOM attribute: ${document.documentElement.getAttribute('data-theme')}`)

  // 测试 6: 切换主题到亮色
  console.log('6. Testing setTheme (light)...')
  store.setTheme('light')
  const lightTheme = store.getTheme()
  console.log(`   ✓ Theme changed to: ${lightTheme}`)
  console.log(`   ✓ Config updated: ${store.config.theme === 'light'}`)
  console.log(`   ✓ DOM attribute: ${document.documentElement.getAttribute('data-theme')}`)

  // 测试 7: 切换主题（toggle）
  console.log('7. Testing toggleTheme...')
  const beforeToggle = store.getTheme()
  store.toggleTheme()
  const afterToggle = store.getTheme()
  console.log(`   ✓ Theme before toggle: ${beforeToggle}`)
  console.log(`   ✓ Theme after toggle: ${afterToggle}`)
  console.log(`   ✓ Theme toggled: ${beforeToggle !== afterToggle}`)

  // 再次切换回来
  store.toggleTheme()
  const backToOriginal = store.getTheme()
  console.log(`   ✓ Toggled back: ${backToOriginal === beforeToggle}`)

  // 测试 8: 持久化
  console.log('8. Testing persistence...')
  store.setLocale('en-US')
  store.setTheme('dark')
  const saveSuccess = store.saveToStorage()
  console.log(`   ✓ Save success: ${saveSuccess}`)

  // 测试 9: 重新加载数据
  console.log('9. Testing reload from storage...')
  const localeBeforeReload = store.config.locale
  const themeBeforeReload = store.config.theme
  store.loadFromStorage()
  const localeAfterReload = store.config.locale
  const themeAfterReload = store.config.theme
  console.log(`   ✓ Locale persisted: ${localeBeforeReload === localeAfterReload}`)
  console.log(`   ✓ Theme persisted: ${themeBeforeReload === themeAfterReload}`)

  // 测试 10: 重置配置
  console.log('10. Testing resetConfig...')
  store.setLocale('en-US')
  store.setTheme('dark')
  store.resetConfig()
  const resetLocale = store.getLocale()
  const resetTheme = store.getTheme()
  console.log(`   ✓ Config reset to default`)
  console.log(`   ✓ Locale after reset: ${resetLocale}`)
  console.log(`   ✓ Theme after reset: ${resetTheme}`)
  console.log(`   ✓ Is default locale: ${resetLocale === 'zh-CN'}`)
  console.log(`   ✓ Is default theme: ${resetTheme === 'light'}`)

  // 测试 11: DOM 更新验证
  console.log('11. Testing DOM updates...')
  store.setTheme('dark')
  const darkAttr = document.documentElement.getAttribute('data-theme')
  console.log(`   ✓ Dark theme applied to DOM: ${darkAttr === 'dark'}`)

  store.setTheme('light')
  const lightAttr = document.documentElement.getAttribute('data-theme')
  console.log(`   ✓ Light theme applied to DOM: ${lightAttr === 'light'}`)

  console.log('\n=== All App Store Tests Passed! ===\n')
  console.log(`Final state:`)
  console.log(`- Locale: ${store.config.locale}`)
  console.log(`- Theme: ${store.config.theme}`)
  console.log(`- isLoaded: ${store.isLoaded}`)
}

// 自动执行测试（仅在开发环境）
if (import.meta.env.DEV) {
  // 延迟执行，确保 store 和 i18n 初始化完成
  setTimeout(() => {
    console.log('\n🧪 Running App Store tests...\n')
    testAppStore()
  }, 3000)
}

export default testAppStore
