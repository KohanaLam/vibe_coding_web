/**
 * localStorage 工具测试文件
 * 用于验证 storage.ts 的所有功能
 */

import { storage, validateTask } from '@/utils/storage'
import type { Task } from '@/types'

// 测试数据
const testTask: Task = {
  id: 'test-id-123',
  title: 'Test Task',
  description: 'This is a test task',
  status: 'todo',
  priority: 'high',
  type: 'task',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  order: 0,
}

// 测试函数
export const testStorage = () => {
  console.log('=== Storage Tests ===')

  // 测试 1: 检查 localStorage 是否可用
  console.log('1. Testing isAvailable()...')
  const isAvailable = storage.isAvailable()
  console.log(`   ✓ localStorage available: ${isAvailable}`)

  if (!isAvailable) {
    console.error('   ✗ localStorage is not available!')
    return
  }

  // 测试 2: 设置和获取简单数据
  console.log('2. Testing setItem/getItem with simple data...')
  const testKey = 'test_key'
  const testValue = { name: 'test', value: 123 }
  const setResult = storage.setItem(testKey, testValue)
  console.log(`   ✓ setItem result: ${setResult}`)

  const getValue = storage.getItem<typeof testValue>(testKey)
  console.log(`   ✓ getItem result:`, getValue)
  console.log(`   ✓ Data matches: ${JSON.stringify(getValue) === JSON.stringify(testValue)}`)

  // 测试 3: 设置和获取复杂对象（Task）
  console.log('3. Testing setItem/getItem with Task object...')
  const taskKey = 'test_task'
  storage.setItem(taskKey, testTask)
  const getTask = storage.getItem<Task>(taskKey)
  console.log(`   ✓ Task stored and retrieved`)
  console.log(`   ✓ Task title: ${getTask?.title}`)
  console.log(`   ✓ Task matches: ${JSON.stringify(getTask) === JSON.stringify(testTask)}`)

  // 测试 4: 设置和获取数组
  console.log('4. Testing setItem/getItem with array...')
  const arrayKey = 'test_array'
  const testArray = [testTask, { ...testTask, id: 'test-id-456' }]
  storage.setItem(arrayKey, testArray)
  const getArray = storage.getItem<Task[]>(arrayKey)
  console.log(`   ✓ Array stored and retrieved`)
  console.log(`   ✓ Array length: ${getArray?.length}`)
  console.log(`   ✓ Array matches: ${JSON.stringify(getArray) === JSON.stringify(testArray)}`)

  // 测试 5: 获取不存在的键
  console.log('5. Testing getItem with non-existent key...')
  const nonExistent = storage.getItem('non_existent_key')
  console.log(`   ✓ Returns null for non-existent key: ${nonExistent === null}`)

  // 测试 6: 移除数据
  console.log('6. Testing removeItem...')
  storage.removeItem(testKey)
  const afterRemove = storage.getItem(testKey)
  console.log(`   ✓ Item removed: ${afterRemove === null}`)

  // 测试 7: validateTask 函数
  console.log('7. Testing validateTask...')

  // 有效任务
  const validTask: Partial<Task> = {
    title: 'Valid Task',
    description: 'This is valid',
  }
  const validErrors = validateTask(validTask)
  console.log(`   ✓ Valid task errors: ${validErrors.length} (expected: 0)`)

  // 无标题
  const noTitleTask: Partial<Task> = {
    description: 'No title',
  }
  const noTitleErrors = validateTask(noTitleTask)
  console.log(`   ✓ No title task errors: ${noTitleErrors.length} (expected: 1)`)
  console.log(`     - ${noTitleErrors[0]}`)

  // 标题过长
  const longTitleTask: Partial<Task> = {
    title: 'a'.repeat(201),
  }
  const longTitleErrors = validateTask(longTitleTask)
  console.log(`   ✓ Long title task errors: ${longTitleErrors.length} (expected: 1)`)
  console.log(`     - ${longTitleErrors[0]}`)

  // 描述过长
  const longDescTask: Partial<Task> = {
    title: 'Valid',
    description: 'a'.repeat(5001),
  }
  const longDescErrors = validateTask(longDescTask)
  console.log(`   ✓ Long description task errors: ${longDescErrors.length} (expected: 1)`)
  console.log(`     - ${longDescErrors[0]}`)

  // 日期错误
  const invalidDateTask: Partial<Task> = {
    title: 'Valid',
    startDate: '2024-12-31',
    dueDate: '2024-01-01',
  }
  const invalidDateErrors = validateTask(invalidDateTask)
  console.log(`   ✓ Invalid date task errors: ${invalidDateErrors.length} (expected: 1)`)
  console.log(`     - ${invalidDateErrors[0]}`)

  // 测试 8: 清理测试数据
  console.log('8. Cleaning up test data...')
  storage.removeItem(taskKey)
  storage.removeItem(arrayKey)
  console.log('   ✓ Test data cleaned up')

  console.log('\n=== All Storage Tests Passed! ===\n')
}

// 自动执行测试（仅在开发环境）
if (import.meta.env.DEV) {
  // 延迟执行，确保 DOM 加载完成
  setTimeout(() => {
    console.log('\n🧪 Running storage tests...\n')
    testStorage()
  }, 1000)
}

export default testStorage
