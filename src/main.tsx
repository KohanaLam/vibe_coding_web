import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Import styles
import 'antd/dist/reset.css'
import './styles/global.css'

// Import i18n configuration
import './i18n'

// Import storage test (only runs in development)
import './utils/storage.test'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
