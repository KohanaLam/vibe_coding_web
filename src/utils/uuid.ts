import { v4 as uuidv4 } from 'uuid'

/**
 * 生成唯一的任务 ID
 * @returns UUID v4 字符串
 */
export const generateTaskId = (): string => {
  return uuidv4()
}

/**
 * 生成唯一的列 ID
 * @param name 列名称
 * @returns 格式化的 ID
 */
export const generateColumnId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '_')
}
