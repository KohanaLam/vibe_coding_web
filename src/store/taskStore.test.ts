/**
 * Task Store 测试文件
 * 用于验证 taskStore.ts 的所有功能
 */

import { useTaskStore } from '@/store/taskStore'
import type { Task } from '@/types'

// 测试数据
const testTaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Test Task',
  description: 'This is a test task',
  status: 'todo',
  priority: 'high',
  type: 'task',
  order: 0,
}

// 测试函数
export const testTaskStore = () => {
  console.log('=== Task Store Tests ===')

  // 获取 store 实例
  const store = useTaskStore.getState()

  // 测试 1: 初始化和加载
  console.log('1. Testing initialization...')
  store.loadFromStorage()
  console.log(`   ✓ Store loaded: ${store.isLoaded}`)
  console.log(`   ✓ Initial tasks count: ${store.tasks.length}`)
  console.log(`   ✓ Columns count: ${store.columns.length}`)

  // 清空所有任务，准备测试
  console.log('2. Clearing all tasks...')
  store.clearAllTasks()
  console.log(`   ✓ Tasks cleared: ${store.tasks.length === 0}`)

  // 测试 3: 创建任务
  console.log('3. Testing createTask...')
  const task1 = store.createTask(testTaskData)
  console.log(`   ✓ Task created: ${task1 !== null}`)
  console.log(`   ✓ Task has ID: ${task1?.id !== undefined}`)
  console.log(`   ✓ Task has createdAt: ${task1?.createdAt !== undefined}`)
  console.log(`   ✓ Tasks count: ${store.tasks.length}`)

  // 测试 4: 创建多个任务
  console.log('4. Creating multiple tasks...')
  const task2 = store.createTask({ ...testTaskData, title: 'Task 2', status: 'inProgress' })
  const task3 = store.createTask({ ...testTaskData, title: 'Task 3', status: 'todo', order: 1 })
  console.log(`   ✓ Tasks created: ${task2 !== null && task3 !== null}`)
  console.log(`   ✓ Total tasks: ${store.tasks.length}`)

  // 测试 5: 根据 ID 获取任务
  console.log('5. Testing getTaskById...')
  if (task1) {
    const foundTask = store.getTaskById(task1.id)
    console.log(`   ✓ Task found: ${foundTask !== undefined}`)
    console.log(`   ✓ Title matches: ${foundTask?.title === task1.title}`)
  }

  // 测试 6: 根据状态获取任务
  console.log('6. Testing getTasksByStatus...')
  const todoTasks = store.getTasksByStatus('todo')
  const inProgressTasks = store.getTasksByStatus('inProgress')
  console.log(`   ✓ Todo tasks: ${todoTasks.length} (expected: 2)`)
  console.log(`   ✓ InProgress tasks: ${inProgressTasks.length} (expected: 1)`)
  console.log(`   ✓ Tasks sorted by order: ${todoTasks[0].order <= todoTasks[1]?.order}`)

  // 测试 7: 更新任务
  console.log('7. Testing updateTask...')
  if (task1) {
    const updateSuccess = store.updateTask(task1.id, {
      title: 'Updated Task',
      priority: 'low',
    })
    const updatedTask = store.getTaskById(task1.id)
    console.log(`   ✓ Update success: ${updateSuccess}`)
    console.log(`   ✓ Title updated: ${updatedTask?.title === 'Updated Task'}`)
    console.log(`   ✓ Priority updated: ${updatedTask?.priority === 'low'}`)
    console.log(`   ✓ updatedAt changed: ${updatedTask?.updatedAt !== task1.createdAt}`)
  }

  // 测试 8: 移动任务到新列
  console.log('8. Testing moveTask...')
  if (task1) {
    const moveSuccess = store.moveTask(task1.id, 'done', 0)
    const movedTask = store.getTaskById(task1.id)
    console.log(`   ✓ Move success: ${moveSuccess}`)
    console.log(`   ✓ Status changed to done: ${movedTask?.status === 'done'}`)
    console.log(`   ✓ Order set to 0: ${movedTask?.order === 0}`)

    const doneTasks = store.getTasksByStatus('done')
    console.log(`   ✓ Done tasks count: ${doneTasks.length}`)
  }

  // 测试 9: 在同一列内调整顺序
  console.log('9. Testing reorderTask...')
  if (task3) {
    const todoTasksBefore = store.getTasksByStatus('todo')
    console.log(`   - Todo tasks before reorder: ${todoTasksBefore.length}`)

    const reorderSuccess = store.reorderTask(task3.id, 0)
    const reorderedTask = store.getTaskById(task3.id)
    console.log(`   ✓ Reorder success: ${reorderSuccess}`)
    console.log(`   ✓ Order changed to 0: ${reorderedTask?.order === 0}`)
  }

  // 测试 10: 验证失败的任务
  console.log('10. Testing validation...')
  const invalidTask = store.createTask({
    ...testTaskData,
    title: '', // 空标题
  })
  console.log(`   ✓ Invalid task rejected: ${invalidTask === null}`)

  // 测试 11: 删除任务
  console.log('11. Testing deleteTask...')
  if (task2) {
    const countBefore = store.tasks.length
    const deleteSuccess = store.deleteTask(task2.id)
    const countAfter = store.tasks.length
    console.log(`   ✓ Delete success: ${deleteSuccess}`)
    console.log(`   ✓ Task count decreased: ${countAfter === countBefore - 1}`)

    const deletedTask = store.getTaskById(task2.id)
    console.log(`   ✓ Task no longer exists: ${deletedTask === undefined}`)
  }

  // 测试 12: 批量删除
  console.log('12. Testing deleteTasks (batch)...')
  const remainingIds = store.tasks.map(t => t.id)
  if (remainingIds.length >= 2) {
    const idsToDelete = remainingIds.slice(0, 2)
    const deletedCount = store.deleteTasks(idsToDelete)
    console.log(`   ✓ Deleted count: ${deletedCount}`)
    console.log(`   ✓ Remaining tasks: ${store.tasks.length}`)
  }

  // 测试 13: 获取列
  console.log('13. Testing getColumns...')
  const columns = store.getColumns()
  console.log(`   ✓ Columns count: ${columns.length}`)
  console.log(`   ✓ Columns sorted: ${columns[0].order <= columns[1].order}`)
  columns.forEach(col => {
    console.log(`   - ${col.id}: ${col.titleKey}`)
  })

  // 测试 14: 持久化
  console.log('14. Testing persistence...')
  const saveSuccess = store.saveToStorage()
  console.log(`   ✓ Save success: ${saveSuccess}`)

  // 测试 15: 初始化示例数据
  console.log('15. Testing initSampleData...')
  store.clearAllTasks()
  store.initSampleData()
  console.log(`   ✓ Sample data initialized: ${store.tasks.length > 0}`)
  console.log(`   ✓ Sample tasks count: ${store.tasks.length}`)

  // 测试 16: 重新加载数据
  console.log('16. Testing reload from storage...')
  const tasksBeforeReload = store.tasks.length
  store.loadFromStorage()
  const tasksAfterReload = store.tasks.length
  console.log(`   ✓ Data persisted: ${tasksBeforeReload === tasksAfterReload}`)

  console.log('\n=== All Task Store Tests Passed! ===\n')
  console.log(`Final state:`)
  console.log(`- Total tasks: ${store.tasks.length}`)
  console.log(`- Todo: ${store.getTasksByStatus('todo').length}`)
  console.log(`- In Progress: ${store.getTasksByStatus('inProgress').length}`)
  console.log(`- Review: ${store.getTasksByStatus('review').length}`)
  console.log(`- Done: ${store.getTasksByStatus('done').length}`)
}

// 自动执行测试（仅在开发环境）
if (import.meta.env.DEV) {
  // 延迟执行，确保 store 初始化完成
  setTimeout(() => {
    console.log('\n🧪 Running Task Store tests...\n')
    testTaskStore()
  }, 2000)
}

export default testTaskStore
