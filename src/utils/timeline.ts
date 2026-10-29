import {
  addWeeks,
  startOfWeek,
  endOfWeek,
  differenceInDays,
  eachWeekOfInterval,
} from 'date-fns'
import type { Task } from '@/types'
import { TIMELINE_CONFIG } from '@/constants'

/**
 * 获取时间线的时间范围
 * @param referenceDate 参考日期（默认为当前日期）
 * @returns 开始和结束日期
 */
export const getTimelineRange = (referenceDate: Date = new Date()) => {
  const start = addWeeks(startOfWeek(referenceDate, { weekStartsOn: 1 }), -TIMELINE_CONFIG.WEEKS_BEFORE)
  const end = addWeeks(endOfWeek(referenceDate, { weekStartsOn: 1 }), TIMELINE_CONFIG.WEEKS_AFTER)

  return { start, end }
}

/**
 * 获取时间范围内的所有周
 * @param start 开始日期
 * @param end 结束日期
 * @returns 周的开始日期数组
 */
export const getWeeksInRange = (start: Date, end: Date): Date[] => {
  try {
    return eachWeekOfInterval(
      { start, end },
      { weekStartsOn: 1 } // 周一作为一周的开始
    )
  } catch (error) {
    console.warn('Failed to get weeks in range:', error)
    return []
  }
}

/**
 * 计算任务条在时间线中的位置和宽度
 * @param task 任务对象
 * @param timelineStart 时间线开始日期
 * @param timelineEnd 时间线结束日期
 * @param containerWidth 容器宽度（像素）
 * @returns 位置信息（left 和 width，单位：像素）或 null
 */
export const calculateTaskBarPosition = (
  task: Task,
  timelineStart: Date,
  timelineEnd: Date,
  containerWidth: number
): { left: number; width: number } | null => {
  // 任务必须有开始日期和结束日期
  if (!task.startDate || !task.dueDate) {
    return null
  }

  try {
    const taskStart = new Date(task.startDate)
    const taskEnd = new Date(task.dueDate)

    // 计算总天数
    const totalDays = differenceInDays(timelineEnd, timelineStart)
    if (totalDays <= 0) {
      return null
    }

    // 计算任务开始位置的偏移天数
    const startOffset = differenceInDays(taskStart, timelineStart)

    // 计算任务持续天数
    const duration = differenceInDays(taskEnd, taskStart)

    // 计算像素位置
    const left = (startOffset / totalDays) * containerWidth
    const width = Math.max((duration / totalDays) * containerWidth, 20) // 最小宽度 20px

    // 如果任务完全在时间线范围外，返回 null
    if (left + width < 0 || left > containerWidth) {
      return null
    }

    return { left, width }
  } catch (error) {
    console.warn('Failed to calculate task bar position:', error)
    return null
  }
}

/**
 * 检查任务是否在时间线范围内
 * @param task 任务对象
 * @param timelineStart 时间线开始日期
 * @param timelineEnd 时间线结束日期
 * @returns 是否在范围内
 */
export const isTaskInTimelineRange = (
  task: Task,
  timelineStart: Date,
  timelineEnd: Date
): boolean => {
  if (!task.startDate || !task.dueDate) {
    return false
  }

  try {
    const taskStart = new Date(task.startDate)
    const taskEnd = new Date(task.dueDate)

    // 任务的结束日期在时间线开始之后，且任务的开始日期在时间线结束之前
    return taskEnd >= timelineStart && taskStart <= timelineEnd
  } catch {
    return false
  }
}
