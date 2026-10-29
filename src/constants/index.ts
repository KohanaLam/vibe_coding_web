import type { Column, AppConfig, Task } from '@/types'

// ==================== LocalStorage Keys ====================
export const STORAGE_KEYS = {
  TASKS: 'vibe_board_tasks',
  COLUMNS: 'vibe_board_columns',
  CONFIG: 'vibe_board_config',
} as const

// ==================== 默认列配置 ====================
export const DEFAULT_COLUMNS: Column[] = [
  { id: 'todo', titleKey: 'column.todo', order: 0 },
  { id: 'inProgress', titleKey: 'column.inProgress', order: 1 },
  { id: 'review', titleKey: 'column.review', order: 2 },
  { id: 'done', titleKey: 'column.done', order: 3 },
]

// ==================== 默认应用配置 ====================
export const DEFAULT_CONFIG: AppConfig = {
  locale: 'zh-CN',
  theme: 'light',
}

// ==================== 示例任务数据 ====================
export const SAMPLE_TASKS: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: '欢迎使用 Vibe Board',
    description: '这是一个示例任务。点击编辑或删除。\n\n**功能特性**:\n- 拖拽任务卡片\n- 编辑任务详情\n- 切换主题和语言',
    status: 'todo',
    priority: 'high',
    type: 'story',
    order: 0,
  },
  {
    title: '尝试拖拽任务卡片',
    description: '你可以拖拽任务卡片在不同列之间移动，或在同一列内调整顺序。',
    status: 'inProgress',
    priority: 'medium',
    type: 'task',
    startDate: new Date().toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7天后
    order: 0,
  },
  {
    title: '修复示例 Bug',
    description: '这是一个 Bug 类型的任务示例。',
    status: 'review',
    priority: 'high',
    type: 'bug',
    order: 0,
  },
  {
    title: '已完成的任务示例',
    description: '这个任务已经完成了！',
    status: 'done',
    priority: 'low',
    type: 'task',
    order: 0,
  },
]

// ==================== 优先级配置 ====================
export const PRIORITY_CONFIG = {
  high: {
    label: 'task.high',
    color: '#ff4d4f', // 红色
  },
  medium: {
    label: 'task.medium',
    color: '#faad14', // 橙色
  },
  low: {
    label: 'task.low',
    color: '#52c41a', // 绿色
  },
} as const

// ==================== 任务类型配置 ====================
export const TASK_TYPE_CONFIG = {
  story: {
    label: 'task.story',
    icon: 'BookOutlined',
    color: '#1890ff', // 蓝色
  },
  task: {
    label: 'task.task',
    icon: 'CheckSquareOutlined',
    color: '#52c41a', // 绿色
  },
  bug: {
    label: 'task.bug',
    icon: 'BugOutlined',
    color: '#ff4d4f', // 红色
  },
} as const

// ==================== 时间线配置 ====================
export const TIMELINE_CONFIG = {
  WEEKS_BEFORE: 2, // 当前日期前 N 周
  WEEKS_AFTER: 2,  // 当前日期后 N 周
} as const

// ==================== 验证规则 ====================
export const VALIDATION_RULES = {
  TASK_TITLE_MAX_LENGTH: 200,
  TASK_DESCRIPTION_MAX_LENGTH: 5000,
  MIN_COLUMNS: 2,
  MAX_TASKS: 500, // localStorage 容量限制
} as const
