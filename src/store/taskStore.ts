import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { Task, Column } from '@/types'
import { storage, validateTask } from '@/utils/storage'
import { getCurrentISODate } from '@/utils/date'
import { STORAGE_KEYS, DEFAULT_COLUMNS, SAMPLE_TASKS } from '@/constants'

/**
 * Task Store 状态接口
 */
interface TaskState {
  // ==================== 状态 ====================
  tasks: Task[]
  columns: Column[]
  isLoaded: boolean

  // ==================== CRUD 操作 ====================
  /**
   * 创建任务
   * @param taskData 任务数据（不包含 id, createdAt, updatedAt）
   * @returns 创建的任务，如果验证失败返回 null
   */
  createTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Task | null

  /**
   * 更新任务
   * @param id 任务 ID
   * @param updates 要更新的字段
   * @returns 是否成功
   */
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => boolean

  /**
   * 删除任务
   * @param id 任务 ID
   * @returns 是否成功
   */
  deleteTask: (id: string) => boolean

  /**
   * 根据 ID 获取任务
   * @param id 任务 ID
   * @returns 任务对象，不存在返回 undefined
   */
  getTaskById: (id: string) => Task | undefined

  /**
   * 根据状态获取任务列表
   * @param status 状态 ID
   * @returns 任务列表（已按 order 排序）
   */
  getTasksByStatus: (status: string) => Task[]

  // ==================== 拖拽排序 ====================
  /**
   * 移动任务到新列
   * @param taskId 任务 ID
   * @param newStatus 新状态
   * @param newOrder 新排序位置
   * @returns 是否成功
   */
  moveTask: (taskId: string, newStatus: string, newOrder: number) => boolean

  /**
   * 在同一列内调整任务顺序
   * @param taskId 任务 ID
   * @param newOrder 新排序位置
   * @returns 是否成功
   */
  reorderTask: (taskId: string, newOrder: number) => boolean

  // ==================== 批量操作 ====================
  /**
   * 批量删除任务
   * @param ids 任务 ID 数组
   * @returns 删除成功的数量
   */
  deleteTasks: (ids: string[]) => number

  /**
   * 清空所有任务
   */
  clearAllTasks: () => void

  // ==================== 数据持久化 ====================
  /**
   * 从 localStorage 加载数据
   */
  loadFromStorage: () => void

  /**
   * 保存到 localStorage
   * @returns 是否成功
   */
  saveToStorage: () => boolean

  /**
   * 初始化示例数据
   */
  initSampleData: () => void

  // ==================== 列管理 ====================
  /**
   * 获取所有列
   * @returns 列数组（已按 order 排序）
   */
  getColumns: () => Column[]
}

/**
 * Task Store
 * 使用 Zustand 管理任务状态
 */
export const useTaskStore = create<TaskState>((set, get) => ({
  // ==================== 初始状态 ====================
  tasks: [],
  columns: DEFAULT_COLUMNS,
  isLoaded: false,

  // ==================== CRUD 操作 ====================
  createTask: (taskData) => {
    // 验证任务数据
    const errors = validateTask(taskData)
    if (errors.length > 0) {
      console.error('Task validation failed:', errors)
      return null
    }

    // 创建新任务
    const now = getCurrentISODate()
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    }

    // 更新状态
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }))

    // 持久化
    get().saveToStorage()

    return newTask
  },

  updateTask: (id, updates) => {
    const { tasks } = get()
    const taskIndex = tasks.findIndex((t) => t.id === id)

    if (taskIndex === -1) {
      console.warn(`Task not found: ${id}`)
      return false
    }

    // 验证更新后的数据
    const updatedTask = { ...tasks[taskIndex], ...updates }
    const errors = validateTask(updatedTask)
    if (errors.length > 0) {
      console.error('Task validation failed:', errors)
      return false
    }

    // 更新任务
    const newTasks = [...tasks]
    newTasks[taskIndex] = {
      ...updatedTask,
      updatedAt: getCurrentISODate(),
    }

    set({ tasks: newTasks })
    get().saveToStorage()

    return true
  },

  deleteTask: (id) => {
    const { tasks } = get()
    const newTasks = tasks.filter((t) => t.id !== id)

    if (newTasks.length === tasks.length) {
      console.warn(`Task not found: ${id}`)
      return false
    }

    set({ tasks: newTasks })
    get().saveToStorage()

    return true
  },

  getTaskById: (id) => {
    return get().tasks.find((t) => t.id === id)
  },

  getTasksByStatus: (status) => {
    return get()
      .tasks.filter((t) => t.status === status)
      .sort((a, b) => a.order - b.order)
  },

  // ==================== 拖拽排序 ====================
  moveTask: (taskId, newStatus, newOrder) => {
    const { tasks } = get()
    const task = tasks.find((t) => t.id === taskId)

    if (!task) {
      console.warn(`Task not found: ${taskId}`)
      return false
    }

    const oldStatus = task.status

    // 获取目标列的任务
    const targetTasks = tasks
      .filter((t) => t.status === newStatus && t.id !== taskId)
      .sort((a, b) => a.order - b.order)

    // 插入任务到新位置
    targetTasks.splice(newOrder, 0, task)

    // 重新计算 order
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        // 更新移动的任务
        return {
          ...t,
          status: newStatus,
          order: newOrder,
          updatedAt: getCurrentISODate(),
        }
      } else if (t.status === newStatus) {
        // 更新目标列的其他任务
        const index = targetTasks.findIndex((tt) => tt.id === t.id)
        return { ...t, order: index }
      } else if (t.status === oldStatus) {
        // 更新原列的任务（重新排序）
        const oldTasks = tasks
          .filter((tt) => tt.status === oldStatus && tt.id !== taskId)
          .sort((a, b) => a.order - b.order)
        const index = oldTasks.findIndex((tt) => tt.id === t.id)
        return { ...t, order: index }
      }
      return t
    })

    set({ tasks: updatedTasks })
    get().saveToStorage()

    return true
  },

  reorderTask: (taskId, newOrder) => {
    const { tasks } = get()
    const task = tasks.find((t) => t.id === taskId)

    if (!task) {
      console.warn(`Task not found: ${taskId}`)
      return false
    }

    const status = task.status

    // 获取同列的任务
    const statusTasks = tasks
      .filter((t) => t.status === status && t.id !== taskId)
      .sort((a, b) => a.order - b.order)

    // 插入任务到新位置
    statusTasks.splice(newOrder, 0, task)

    // 重新计算 order
    const updatedTasks = tasks.map((t) => {
      if (t.status === status) {
        const index = statusTasks.findIndex((tt) => tt.id === t.id)
        return { ...t, order: index }
      }
      return t
    })

    set({ tasks: updatedTasks })
    get().saveToStorage()

    return true
  },

  // ==================== 批量操作 ====================
  deleteTasks: (ids) => {
    const { tasks } = get()
    const newTasks = tasks.filter((t) => !ids.includes(t.id))
    const deletedCount = tasks.length - newTasks.length

    set({ tasks: newTasks })
    get().saveToStorage()

    return deletedCount
  },

  clearAllTasks: () => {
    set({ tasks: [] })
    get().saveToStorage()
  },

  // ==================== 数据持久化 ====================
  loadFromStorage: () => {
    // 加载任务
    const tasks = storage.getItem<Task[]>(STORAGE_KEYS.TASKS)

    // 加载列（如果存在自定义列）
    const columns = storage.getItem<Column[]>(STORAGE_KEYS.COLUMNS)

    set({
      tasks: tasks || [],
      columns: columns || DEFAULT_COLUMNS,
      isLoaded: true,
    })

    console.log(`Loaded ${tasks?.length || 0} tasks from localStorage`)
  },

  saveToStorage: () => {
    const { tasks, columns } = get()

    const tasksSuccess = storage.setItem(STORAGE_KEYS.TASKS, tasks)
    const columnsSuccess = storage.setItem(STORAGE_KEYS.COLUMNS, columns)

    if (tasksSuccess && columnsSuccess) {
      console.log(`Saved ${tasks.length} tasks to localStorage`)
      return true
    }

    console.error('Failed to save to localStorage')
    return false
  },

  initSampleData: () => {
    const now = getCurrentISODate()

    const sampleTasks: Task[] = SAMPLE_TASKS.map((taskData, index) => ({
      ...taskData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      order: index,
    }))

    set({ tasks: sampleTasks })
    get().saveToStorage()

    console.log('Initialized with sample data')
  },

  // ==================== 列管理 ====================
  getColumns: () => {
    return get().columns.sort((a, b) => a.order - b.order)
  },
}))
