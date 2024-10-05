import { useState, useContext, useEffect } from 'react'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import { Holesky, mainnet, morphSepolia } from './contractServices/constants'
import { AppContext } from './ContextAPI'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const projectId = import.meta.env.VITE_APP_WALLET_CONNECT_ID



const metadata = {
  name: 'Chain-Connect',
  description: 'Connect,Create and Earn',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default 
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})

createWeb3Modal({
  ethersConfig,
  chains: [Holesky],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

function App() {
  const { modals, isConnected, userProfile, getUserProfile } = useContext(AppContext);

  useEffect(() => {
    getUserProfile()

  }, [isConnected])

  return (

    <>

      {!isConnected && (<Login />)}
      {isConnected && userProfile?.status ? <LandingPage /> : <Login />}

    </>
  )
}

export default App
