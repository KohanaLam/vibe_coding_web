# 手动测试指南

## 🚀 运行项目

### 开发服务器已启动 ✅

**访问地址**: http://localhost:5173/

开发服务器已经在后台运行，直接在浏览器访问即可。

---

## 🧪 测试清单

### 1. 打开浏览器控制台

**步骤**:
1. 打开浏览器访问 http://localhost:5173/
2. 按 `F12` 或右键 → "检查" 打开开发者工具
3. 切换到 **Console (控制台)** 标签

### 2. 查看自动测试结果

页面加载后，控制台会自动显示 3 套测试结果：

#### ✅ Storage 测试 (约 1 秒后)
```
🧪 Running storage tests...
=== Storage Tests ===
1. Testing isAvailable()...
   ✓ localStorage available: true
2. Testing setItem/getItem with simple data...
   ✓ setItem result: true
   ...
8. Cleaning up test data...
   ✓ Test data cleaned up
=== All Storage Tests Passed! ===
```

#### ✅ Task Store 测试 (约 2 秒后)
```
🧪 Running Task Store tests...
=== Task Store Tests ===
1. Testing initialization...
   ✓ Store loaded: true
   ...
16. Testing reload from storage...
    ✓ Data persisted: true
=== All Task Store Tests Passed! ===
Final state:
- Total tasks: 4
- Todo: 1
- In Progress: 1
- Review: 1
- Done: 1
```

#### ✅ App Store 测试 (约 3 秒后)
```
🧪 Running App Store tests...
=== App Store Tests ===
1. Testing initialization...
   ✓ Store loaded: true
   ✓ Current locale: zh-CN
   ✓ Current theme: light
   ...
11. Testing DOM updates...
    ✓ Dark theme applied to DOM: true
    ✓ Light theme applied to DOM: true
=== All App Store Tests Passed! ===
```

### 3. 预期结果

**所有测试应该显示**:
- ✅ Storage 测试: 8/8 通过
- ✅ Task Store 测试: 16/16 通过
- ✅ App Store 测试: 11/11 通过
- ✅ **总计**: 35/35 测试通过

**没有错误**:
- ❌ 不应该有红色的错误信息
- ❌ 不应该有 "failed" 字样

---

## 🔍 手动功能测试

### 测试 1: 页面基本显示

**当前页面应该显示**:
```
┌─────────────────────────────────┐
│    Vibe Board (蓝色标题)         │
│    轻量级看板应用                │
│                                 │
│    [+] Count is 0               │  ← Ant Design 按钮
│                                 │
│    ✅ Task 1.1: 完成            │
│    ✅ Task 1.2: 完成            │
│                                 │
│    已安装: Ant Design...        │
└─────────────────────────────────┘
```

**检查项**:
- ✅ 标题是蓝色 (#1890ff)
- ✅ 按钮有 Ant Design 样式
- ✅ 按钮有加号图标
- ✅ 点击按钮数字会增加

### 测试 2: localStorage 数据

**打开 Application 标签**:
1. 在开发者工具中切换到 **Application** 标签
2. 左侧展开 **Storage** → **Local Storage** → `http://localhost:5173`

**应该看到 3 个键**:
- `vibe_board_tasks` - 任务数据（示例数据，4 个任务）
- `vibe_board_columns` - 列配置（4 列）
- `vibe_board_config` - 应用配置（语言和主题）

**点击查看内容**:
```json
// vibe_board_config
{
  "locale": "zh-CN",
  "theme": "light"
}

// vibe_board_tasks (数组，4 个任务)
[
  {
    "id": "uuid...",
    "title": "欢迎使用 Vibe Board",
    "status": "todo",
    "priority": "high",
    ...
  },
  ...
]
```

### 测试 3: 主题切换 (DOM)

**检查 HTML 根元素**:
1. 在开发者工具中切换到 **Elements** 标签
2. 找到 `<html>` 标签
3. 查看属性，应该有 `data-theme="light"`

**在控制台执行**:
```javascript
// 切换到暗色主题
useAppStore.getState().setTheme('dark')

// 应该看到:
// - 控制台输出: "Theme changed to: dark"
// - HTML 标签属性变为: data-theme="dark"
// - 页面背景色变暗 (如果 CSS 变量生效)

// 切换回亮色
useAppStore.getState().setTheme('light')
```

### 测试 4: 语言切换 (i18n)

**在控制台执行**:
```javascript
// 切换到英文
useAppStore.getState().setLocale('en-US')
// 控制台输出: "Language changed to: en-US"

// 切换回中文
useAppStore.getState().setLocale('zh-CN')
// 控制台输出: "Language changed to: zh-CN"
```

### 测试 5: 创建任务

**在控制台执行**:
```javascript
// 获取 store
const taskStore = useTaskStore.getState()

// 创建新任务
const newTask = taskStore.createTask({
  title: '测试任务',
  description: '这是一个测试任务',
  status: 'todo',
  priority: 'high',
  type: 'task',
  order: 0
})

// 查看结果
console.log('Created task:', newTask)

// 查看所有任务
console.log('All tasks:', taskStore.tasks)
```

**预期结果**:
- ✅ 返回新创建的任务对象
- ✅ 任务有自动生成的 ID
- ✅ 任务有 createdAt 和 updatedAt
- ✅ localStorage 自动更新

### 测试 6: 查询任务

**在控制台执行**:
```javascript
const taskStore = useTaskStore.getState()

// 查询 todo 状态的任务
const todoTasks = taskStore.getTasksByStatus('todo')
console.log('Todo tasks:', todoTasks)

// 查询 inProgress 状态的任务
const inProgressTasks = taskStore.getTasksByStatus('inProgress')
console.log('In Progress tasks:', inProgressTasks)

// 按 ID 查询
const task = taskStore.getTaskById(taskStore.tasks[0].id)
console.log('Task by ID:', task)
```

### 测试 7: 更新任务

**在控制台执行**:
```javascript
const taskStore = useTaskStore.getState()

// 获取第一个任务的 ID
const taskId = taskStore.tasks[0].id

// 更新任务
const success = taskStore.updateTask(taskId, {
  title: '更新后的标题',
  priority: 'low'
})

console.log('Update success:', success)

// 查看更新后的任务
const updatedTask = taskStore.getTaskById(taskId)
console.log('Updated task:', updatedTask)
```

**预期结果**:
- ✅ 返回 true
- ✅ 任务标题和优先级已更新
- ✅ updatedAt 时间已更新

### 测试 8: 移动任务

**在控制台执行**:
```javascript
const taskStore = useTaskStore.getState()

// 获取一个 todo 任务的 ID
const todoTasks = taskStore.getTasksByStatus('todo')
const taskId = todoTasks[0]?.id

if (taskId) {
  // 移动到 done 列
  const success = taskStore.moveTask(taskId, 'done', 0)
  console.log('Move success:', success)
  
  // 查看移动后的任务
  const movedTask = taskStore.getTaskById(taskId)
  console.log('Moved task status:', movedTask.status)
  
  // 查看 done 列的任务
  const doneTasks = taskStore.getTasksByStatus('done')
  console.log('Done tasks:', doneTasks.length)
}
```

### 测试 9: 删除任务

**在控制台执行**:
```javascript
const taskStore = useTaskStore.getState()

// 获取任务总数
console.log('Tasks before delete:', taskStore.tasks.length)

// 删除第一个任务
const taskId = taskStore.tasks[0].id
const success = taskStore.deleteTask(taskId)

console.log('Delete success:', success)
console.log('Tasks after delete:', taskStore.tasks.length)

// 尝试查询已删除的任务
const deletedTask = taskStore.getTaskById(taskId)
console.log('Deleted task (should be undefined):', deletedTask)
```

### 测试 10: 重新初始化示例数据

**在控制台执行**:
```javascript
const taskStore = useTaskStore.getState()

// 清空所有任务
taskStore.clearAllTasks()
console.log('Tasks after clear:', taskStore.tasks.length)

// 重新初始化示例数据
taskStore.initSampleData()
console.log('Tasks after init:', taskStore.tasks.length)

// 查看示例数据
console.log('Sample tasks:', taskStore.tasks)
```

---

## ✅ 验收检查清单

### 自动测试
- [ ] 打开 http://localhost:5173/
- [ ] 打开浏览器控制台 (F12)
- [ ] 查看是否有 3 套测试输出
- [ ] 确认所有测试都显示 ✓ 通过
- [ ] 确认没有红色错误信息

### 页面显示
- [ ] 标题显示为蓝色
- [ ] Ant Design 按钮样式正确
- [ ] 按钮点击可以增加计数
- [ ] 没有布局错误

### localStorage
- [ ] 打开 Application → Local Storage
- [ ] 看到 3 个键（tasks, columns, config）
- [ ] 数据格式正确（JSON）

### 功能测试
- [ ] 主题切换正常（执行测试 3）
- [ ] 语言切换正常（执行测试 4）
- [ ] 创建任务正常（执行测试 5）
- [ ] 查询任务正常（执行测试 6）
- [ ] 更新任务正常（执行测试 7）
- [ ] 移动任务正常（执行测试 8）
- [ ] 删除任务正常（执行测试 9）

---

## 🐛 常见问题

### Q1: 看不到测试输出？
**解决方案**:
1. 刷新页面 (Ctrl + F5 强制刷新)
2. 确保控制台过滤器设置为 "All"
3. 等待 3-4 秒，测试是延迟执行的

### Q2: 控制台显示错误？
**解决方案**:
1. 截图错误信息
2. 检查是否是网络请求错误（可以忽略）
3. 如果是代码错误，记录错误堆栈

### Q3: localStorage 看不到数据？
**解决方案**:
1. 在控制台执行: `useTaskStore.getState().initSampleData()`
2. 刷新 Application 标签
3. 检查是否有其他域名的 localStorage

### Q4: 主题切换看不到效果？
**说明**: 
- 当前只是切换了 `data-theme` 属性
- 视觉效果要等 UI 组件实现后才能看到
- 可以在 Elements 标签中看到属性变化

---

## 📸 预期截图

### 控制台 - 测试输出
应该看到三组测试，每组都有绿色的 ✓ 标记，最后显示 "All Tests Passed!"

### Application - localStorage
```
vibe_board_config: {"locale":"zh-CN","theme":"light"}
vibe_board_tasks: [4 个任务对象]
vibe_board_columns: [4 个列对象]
```

### Elements - HTML 根元素
```html
<html lang="en" data-theme="light">
```

---

## 📞 反馈

测试完成后，请告诉我：

1. ✅ **所有测试通过** → 继续 Phase 3
2. ❌ **有测试失败** → 请提供：
   - 失败的测试名称
   - 控制台错误信息
   - 截图（如果可能）

3. ❓ **不确定** → 描述你看到的情况

---

**测试地址**: http://localhost:5173/  
**预计测试时间**: 5-10 分钟  
**准备继续**: Phase 3 开发
