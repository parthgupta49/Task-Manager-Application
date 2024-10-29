import React from 'react'
import Navbar from './components/common/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
import ProtectedRoute from './components/core/Auth/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/dashboard/MyProfile'
import Settings from './components/core/dashboard/Settings/index';
import MyTasks from './components/core/dashboard/MyTasks'
import Queued from './components/common/Queued'
const App = () => {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar />
      <Queued/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />
          <Route path="dashboard/my-tasks" element={<MyTasks />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App