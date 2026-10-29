# Vibe Board 🚀

[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

轻量级看板应用 - 类 Jira 的任务管理工具

一个专注于个人和小团队的现代化任务管理看板，提供直观的可视化界面和流畅的拖拽体验。

## ✨ 功能特性

- 📋 **看板视图** - 拖拽式任务管理，支持列间移动和列内排序
- 📅 **时间线视图** - 甘特图展示任务时间线，一目了然
- 🌍 **国际化** - 支持中英文切换，界面友好
- 🎨 **主题切换** - 亮色/暗色模式，保护视力
- 💾 **本地存储** - 数据持久化，无需后端
- 🚀 **快速响应** - 基于 Vite 构建，开发和生产环境都极速
- 📱 **响应式设计** - 桌面端优先，平板移动端适配

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|-----|------|------|
| React | 18.2+ | 前端框架 |
| TypeScript | 5.2+ | 类型系统 |
| Vite | 5.0+ | 构建工具 |
| Ant Design | 5.12+ | UI 组件库 |
| Zustand | 4.4+ | 状态管理 |
| @dnd-kit | 6.1+ | 拖拽功能 |
| react-i18next | 13.5+ | 国际化 |
| date-fns | 3.0+ | 日期处理 |

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📝 开发脚本

| 命令 | 说明 |
|-----|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产版本 |
| `npm run lint` | 运行 ESLint 检查 |

## 📂 项目结构

```
vibe-board/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   ├── components/        # 组件
│   │   ├── common/        # 通用组件
│   │   ├── board/         # 看板视图组件
│   │   ├── timeline/      # 时间线视图组件
│   │   └── modals/        # 弹窗组件
│   ├── store/             # 状态管理
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   ├── hooks/             # 自定义 Hooks
│   ├── i18n/              # 国际化
│   ├── styles/            # 全局样式
│   ├── constants/         # 常量定义
│   ├── App.tsx            # 根组件
│   └── main.tsx           # 入口文件
├── index.html             # HTML 入口
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
└── package.json           # 项目配置
```

## 🔧 开发规范

### 代码风格

- 使用 TypeScript，禁止 `any` 类型
- 组件名使用 PascalCase
- 文件名使用 PascalCase（组件）或 camelCase（工具函数）
- 使用 ESLint 和 Prettier 保证代码一致性

### Git 提交规范

```
<type>(<scope>): <subject>

type:
  - feat: 新功能
  - fix: Bug 修复
  - docs: 文档更新
  - style: 代码格式
  - refactor: 重构
  - test: 测试
  - chore: 构建过程或辅助工具的变动
```

**示例**：
```bash
feat(board): 实现任务卡片拖拽功能
fix(timeline): 修复日期计算错误
docs(readme): 更新安装说明
```

### 分支管理

- `main` - 主分支，稳定版本
- `dev` - 开发分支，所有新功能从此分支提交 PR
- `feature/*` - 功能分支
- `fix/*` - 修复分支

## 📖 文档

- [产品需求文档 (PRD)](../PRD.md) - 详细的产品功能需求
- [技术设计文档 (TDD)](../TECHNICAL_DESIGN.md) - 完整的技术实现方案
- [UI 验证指南](UI_VERIFICATION_GUIDE.md) - UI 测试验收清单

## 🎯 开发计划

查看 [TECHNICAL_DESIGN.md](../TECHNICAL_DESIGN.md) 了解详细的任务拆解和开发计划。

### MVP 功能范围（一天完成）

- ✅ Task 1.1: 项目脚手架初始化
- ⏳ Task 1.2: 安装和配置依赖
- ⏳ Task 2.x: 数据层实现
- ⏳ Task 3.x: 国际化和主题
- ⏳ Task 4.x: 通用组件
- ⏳ Task 5.x: 任务管理弹窗
- ⏳ Task 6.x: 看板视图
- ⏳ Task 7.x: 时间线视图
- ⏳ Task 8.x: 集成和测试

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request 到 `dev` 分支

## 📄 License

MIT License - 详见 [LICENSE](LICENSE) 文件

## 👥 作者

- **Kohana Lam** - [GitHub](https://github.com/KohanaLam)

## 🙏 致谢

- [React](https://reactjs.org/) - 前端框架
- [Ant Design](https://ant.design/) - UI 组件库
- [Vite](https://vitejs.dev/) - 构建工具
- [dnd-kit](https://dndkit.com/) - 拖拽库

---

⭐ 如果这个项目对你有帮助，请给个 Star！
