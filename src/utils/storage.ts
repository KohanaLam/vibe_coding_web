import type { Task } from '@/types'

/**
 * localStorage 工具类
 * 封装 localStorage 的读写操作，支持 JSON 序列化
 */
class Storage {
  /**
   * 获取数据
   * @param key 存储键
   * @returns 解析后的数据，如果不存在或解析失败返回 null
   */
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return null
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.warn(`Failed to get item from localStorage: ${key}`, error)
      return null
    }
  }

  /**
   * 设置数据
   * @param key 存储键
   * @param value 要存储的值
   * @returns 是否成功
   */
  setItem<T>(key: string, value: T): boolean {
    try {
      const item = JSON.stringify(value)
      localStorage.setItem(key, item)
      return true
    } catch (error) {
      console.warn(`Failed to set item to localStorage: ${key}`, error)
      return false
    }
  }

  /**
   * 移除数据
   * @param key 存储键
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn(`Failed to remove item from localStorage: ${key}`, error)
    }
  }

  /**
   * 清空所有数据
   */
  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.warn('Failed to clear localStorage', error)
    }
  }

  /**
   * 检查 localStorage 是否可用
   * @returns 是否可用
   */
  isAvailable(): boolean {
    try {
      const testKey = '__storage_test__'
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  }
}

// 导出单例
export const storage = new Storage()

/**
 * 任务验证函数
 * @param task 要验证的任务对象
 * @returns 错误信息数组，为空则验证通过
 */
export const validateTask = (task: Partial<Task>): string[] => {
  const errors: string[] = []

  // 标题验证
  if (!task.title || task.title.trim().length === 0) {
    errors.push('Title is required')
  }

  if (task.title && task.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }

  // 描述验证
  if (task.description && task.description.length > 5000) {
    errors.push('Description must be less than 5000 characters')
  }

  // 日期验证
  if (task.startDate && task.dueDate) {
    const startDate = new Date(task.startDate)
    const dueDate = new Date(task.dueDate)

    if (startDate > dueDate) {
      errors.push('Start date must be before due date')
    }
  }

  return errors
}
