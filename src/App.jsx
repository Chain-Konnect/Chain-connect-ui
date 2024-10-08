import { useContext, useEffect } from 'react'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import { AppContext } from './ContextAPI'

import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';

import '@tronweb3/tronwallet-adapter-react-ui/style.css';


function App() {
  const { userProfile, getUserProfile } = useContext(AppContext);
  const { connected, address } = useWallet();


  useEffect(() => {
    getUserProfile(address)

  }, [connected])

  return (


    <>
      {connected && userProfile?.status ? <LandingPage /> : <Login />}
    </>

  )



}

export default App


