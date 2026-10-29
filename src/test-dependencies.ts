// 依赖导入测试文件
// 用于验证所有依赖包都可以正常导入

// React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Ant Design
import { Button, ConfigProvider, theme } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'

// Zustand
import { create } from 'zustand'

// dnd-kit
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'

// react-i18next
import { useTranslation, initReactI18next } from 'react-i18next'
import i18next from 'i18next'

// date-fns
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'

// uuid
import { v4 as uuidv4 } from 'uuid'

// 类型定义
interface TestStore {
  count: number
  increment: () => void
}

// Zustand Store 测试
const useTestStore = create<TestStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))

// 所有导入验证通过
console.log('✅ All dependencies imported successfully!')
console.log('✅ React:', React.version)
console.log('✅ Ant Design: imported')
console.log('✅ Zustand: imported')
console.log('✅ dnd-kit: imported')
console.log('✅ react-i18next: imported')
console.log('✅ date-fns: imported')
console.log('✅ uuid: imported')

// 导出测试
export {
  React,
  ReactDOM,
  Button,
  ConfigProvider,
  theme,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  create,
  DndContext,
  closestCenter,
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  useTranslation,
  initReactI18next,
  i18next,
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  zhCN,
  enUS,
  uuidv4,
  useTestStore,
}
