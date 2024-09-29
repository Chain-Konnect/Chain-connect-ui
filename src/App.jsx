import { useState, useContext } from 'react'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import { mainnet, morphSepolia } from './contractServices/constants'
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
  chains: [morphSepolia, mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

function App() {
  const { modals, isConnected } = useContext(AppContext);

  return (

    <>

      {!isConnected ? <Login /> : <LandingPage />}

    </>
  )
}

export default App
