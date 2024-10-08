import { useState, useContext, useEffect } from 'react'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import { AppContext } from './ContextAPI'


const projectId = import.meta.env.VITE_APP_WALLET_CONNECT_ID




function App() {
  const { modals, isConnected, userProfile, getUserProfile } = useContext(AppContext);
  const walletConnected = () => window.tronWeb?.defaultAddress.base58;

  useEffect(() => {
    getUserProfile()

  }, [!walletConnected])

  return (

    <>

      {/* {!window.tronWeb?.defaultAddress.base58 && (<Login />)} */}
      {window.tronWeb?.defaultAddress.base58 && userProfile?.status ? <LandingPage /> : <Login />}

    </>
  )
}

export default App
