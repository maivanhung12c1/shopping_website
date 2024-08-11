import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'

import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Dashboard from './views/auth/Dashboard'
import Logout from './views/auth/Logout'
import ForgotPassword from './views/auth/ForgotPassword'
import CreatePassword from './views/auth/CreatePassword'
import MainWrapper from './layout/MainWrapper'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/create-new-password' element={<CreatePassword />} />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  )
}

export default App
