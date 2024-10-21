import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppContextProvider } from './ContextAPI.jsx'
import { Toaster } from 'react-hot-toast'
import { useWallet, WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider, WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';
import toast from 'react-hot-toast'

function onError(e) {
  if (e instanceof WalletNotFoundError) {
    toast.error(e.message);
  } else if (e instanceof WalletDisconnectedError) {
    toast.error(e.message);
  } else toast.error(e.message);
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WalletProvider onError={onError}>
      <WalletModalProvider>
        <AppContextProvider>
          <App />
          <Toaster position='top-right' />
        </AppContextProvider>

      </WalletModalProvider>
    </WalletProvider>
  </StrictMode>
)
