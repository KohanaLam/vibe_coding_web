// 任务优先级类型
export type TaskPriority = 'high' | 'medium' | 'low';

// 任务类型
export type TaskType = 'story' | 'task' | 'bug';

// 任务数据模型
export interface Task {
  id: string;                    // UUID v4
  title: string;                 // 任务标题（必填，最大 200 字符）
  description?: string;          // 任务描述（Markdown 格式，最大 5000 字符）
  status: string;                // 状态 ID（关联 Column.id）
  priority: TaskPriority;        // 优先级
  type: TaskType;                // 任务类型
  startDate?: string;            // 开始日期（ISO 8601 格式）
  dueDate?: string;              // 截止日期（ISO 8601 格式）
  createdAt: string;             // 创建时间
  updatedAt: string;             // 更新时间
  order: number;                 // 列内排序（数字越小越靠前）
}

// 列数据模型
export interface Column {
  id: string;                    // 列 ID（短字符串，如 'todo'）
  titleKey: string;              // 国际化 key（如 'column.todo'）
  order: number;                 // 列排序
}

// 语言类型
export type Locale = 'zh-CN' | 'en-US';

// 主题类型
export type Theme = 'light' | 'dark';

// 应用配置
export interface AppConfig {
  locale: Locale;                // 当前语言
  theme: Theme;                  // 当前主题
}

// 视图类型
export type ViewType = 'board' | 'timeline';
