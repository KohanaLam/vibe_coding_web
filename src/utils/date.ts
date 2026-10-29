import { format as dateFnsFormat, formatDistance, isValid } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import type { Locale } from '@/types'

/**
 * 获取 date-fns 的 locale 对象
 * @param locale 语言代码
 * @returns date-fns locale 对象
 */
export const getDateLocale = (locale: Locale) => {
  return locale === 'zh-CN' ? zhCN : enUS
}

/**
 * 格式化日期
 * @param date 日期字符串或 Date 对象
 * @param formatStr 格式字符串
 * @param locale 语言代码
 * @returns 格式化后的日期字符串
 */
export const formatDate = (
  date: string | Date,
  formatStr: string = 'yyyy-MM-dd',
  locale: Locale = 'zh-CN'
): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (!isValid(dateObj)) {
      return ''
    }
    return dateFnsFormat(dateObj, formatStr, { locale: getDateLocale(locale) })
  } catch (error) {
    console.warn('Failed to format date:', error)
    return ''
  }
}

/**
 * 格式化日期时间
 * @param date 日期字符串或 Date 对象
 * @param locale 语言代码
 * @returns 格式化后的日期时间字符串
 */
export const formatDateTime = (date: string | Date, locale: Locale = 'zh-CN'): string => {
  return formatDate(date, 'yyyy-MM-dd HH:mm', locale)
}

/**
 * 格式化相对时间（如：3 天前）
 * @param date 日期字符串或 Date 对象
 * @param baseDate 基准日期（默认为当前时间）
 * @param locale 语言代码
 * @returns 相对时间字符串
 */
export const formatRelativeTime = (
  date: string | Date,
  baseDate: Date = new Date(),
  locale: Locale = 'zh-CN'
): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (!isValid(dateObj)) {
      return ''
    }
    return formatDistance(dateObj, baseDate, {
      addSuffix: true,
      locale: getDateLocale(locale),
    })
  } catch (error) {
    console.warn('Failed to format relative time:', error)
    return ''
  }
}

/**
 * 检查日期是否有效
 * @param date 日期字符串或 Date 对象
 * @returns 是否有效
 */
export const isValidDate = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return isValid(dateObj)
  } catch {
    return false
  }
}

/**
 * 获取当前日期的 ISO 字符串
 * @returns ISO 8601 格式的日期字符串
 */
export const getCurrentISODate = (): string => {
  return new Date().toISOString()
}
