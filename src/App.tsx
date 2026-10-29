import { useState } from 'react'
import { Button, ConfigProvider, theme } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { token } = theme.useToken()

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: token.colorPrimary }}>Vibe Board</h1>
        <p>轻量级看板应用</p>

        <div style={{ marginTop: '2rem' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCount(count + 1)}
          >
            Count is {count}
          </Button>
        </div>

        <div style={{ marginTop: '2rem', color: token.colorTextSecondary }}>
          <p>✅ Task 1.1: 项目脚手架初始化 - 完成</p>
          <p>✅ Task 1.2: 安装和配置依赖 - 完成</p>
          <p style={{ marginTop: '1rem', fontSize: '14px' }}>
            已安装: Ant Design, Zustand, @dnd-kit, react-i18next, date-fns, uuid
          </p>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default App
