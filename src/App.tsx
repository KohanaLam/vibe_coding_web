import { useEffect } from 'react'
import { Button, ConfigProvider, theme, Space, Switch, Select } from 'antd'
import { PlusOutlined, BulbOutlined, GlobalOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/appStore'
import { useTaskStore } from '@/store/taskStore'
import type { Locale } from '@/types'
import './App.css'

function App() {
  const { t } = useTranslation()
  const { config, setLocale, toggleTheme } = useAppStore()
  const { tasks, loadFromStorage, initSampleData } = useTaskStore()
  const { token } = theme.useToken()

  // 初始化数据
  useEffect(() => {
    // 加载应用配置
    useAppStore.getState().loadFromStorage()

    // 加载任务数据
    loadFromStorage()

    // 如果没有任务，初始化示例数据
    if (tasks.length === 0) {
      initSampleData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: config.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div style={{
        padding: '2rem',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        transition: 'all 0.3s ease',
      }}>
        {/* 头部 */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            color: token.colorPrimary,
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
          }}>
            {t('app.title')}
          </h1>
          <p style={{
            color: token.colorTextSecondary,
            fontSize: '1.1rem',
          }}>
            {t('app.slogan')}
          </p>
        </div>

        {/* 设置面板 */}
        <div style={{
          maxWidth: '600px',
          margin: '0 auto 3rem',
          padding: '2rem',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-card)',
        }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            {t('setting.language')} & {t('setting.theme')}
          </h2>

          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* 语言切换 */}
            <div>
              <div style={{
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <GlobalOutlined />
                <strong>{t('setting.language')}</strong>
              </div>
              <Select
                value={config.locale}
                onChange={(value: Locale) => setLocale(value)}
                style={{ width: '100%' }}
                size="large"
                options={[
                  { label: t('setting.chinese'), value: 'zh-CN' },
                  { label: t('setting.english'), value: 'en-US' },
                ]}
              />
            </div>

            {/* 主题切换 */}
            <div>
              <div style={{
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <BulbOutlined />
                <strong>{t('setting.theme')}</strong>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <Switch
                  checked={config.theme === 'dark'}
                  onChange={toggleTheme}
                  checkedChildren={t('setting.dark')}
                  unCheckedChildren={t('setting.light')}
                />
                <span style={{ color: token.colorTextSecondary }}>
                  {config.theme === 'dark' ? t('setting.dark') : t('setting.light')}
                </span>
              </div>
            </div>
          </Space>
        </div>

        {/* 任务统计 */}
        <div style={{
          maxWidth: '600px',
          margin: '0 auto 3rem',
          padding: '2rem',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-card)',
        }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            {t('task.title')} {t('action.filter')}
          </h2>

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{t('column.todo')}:</span>
              <strong>{tasks.filter(t => t.status === 'todo').length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{t('column.inProgress')}:</span>
              <strong>{tasks.filter(t => t.status === 'inProgress').length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{t('column.review')}:</span>
              <strong>{tasks.filter(t => t.status === 'review').length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{t('column.done')}:</span>
              <strong>{tasks.filter(t => t.status === 'done').length}</strong>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-color)',
              fontWeight: 'bold',
            }}>
              <span>{t('action.filter')} {t('task.title')}:</span>
              <span style={{ color: token.colorPrimary }}>{tasks.length}</span>
            </div>
          </Space>
        </div>

        {/* 开发进度 */}
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '2rem',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-card)',
        }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            Development Progress
          </h2>

          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div style={{ color: token.colorSuccess }}>✅ Phase 1: Project Setup</div>
            <div style={{ color: token.colorSuccess }}>✅ Phase 2: Data Layer</div>
            <div style={{ color: token.colorSuccess }}>✅ Phase 3: i18n & Theme</div>
            <div style={{ color: token.colorTextSecondary }}>⏳ Phase 4: Common Components</div>
            <div style={{ color: token.colorTextSecondary }}>⏳ Phase 5: Task Modals</div>
            <div style={{ color: token.colorTextSecondary }}>⏳ Phase 6: Board View</div>
            <div style={{ color: token.colorTextSecondary }}>⏳ Phase 7: Timeline View</div>
            <div style={{ color: token.colorTextSecondary }}>⏳ Phase 8: Integration</div>
          </Space>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
            >
              {t('action.create')} {t('task.task')}
            </Button>
          </div>
        </div>

        {/* 提示信息 */}
        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          color: token.colorTextTertiary,
          fontSize: '0.9rem',
        }}>
          <p>{t('task.dragTip')}</p>
          <p style={{ marginTop: '0.5rem' }}>
            Press F12 to open console and see test results
          </p>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default App
