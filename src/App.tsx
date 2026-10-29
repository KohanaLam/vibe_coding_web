import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Vibe Board</h1>
        <p>轻量级看板应用</p>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          项目初始化成功！
        </p>
      </div>
    </>
  )
}

export default App
