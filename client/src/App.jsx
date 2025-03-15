import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Auth } from './components/Auth.jsx'

function App() {
  const [login, setLogin] = useState(<p>Waiting</p>)
  useEffect(() => {
    setLogin(Auth());
  }, [])

  return (
    <>
      {login}
    </>
  )
}

export default App
