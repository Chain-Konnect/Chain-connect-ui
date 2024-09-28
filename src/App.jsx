import { useState } from 'react'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster />
      {/* <Login /> */}
      <LandingPage />
    </>
  )
}

export default App
