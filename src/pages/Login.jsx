import React, { useContext } from 'react'
import { logo } from '../assets'
import { AppContext } from '../ContextAPI';
import { WalletModalProvider, WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';
import { useWallet, WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { ConnectComponent } from '../contractServices/constants';


const Login = () => {
    const { modals, setModals, userProfile, activateUser, activateAccountLoadingState, connectWallet } = useContext(AppContext);
    const { connect, disconnect, select, connected } = useWallet();

    return (
        <div className='flex flex-1 h-screen p-2 text-white font-poppins bg-gray-300'>
            <div className='flex-[0.4] bg-black h-full rounded-lg items-center flex flex-col justify-center'>
                <div className='flex items-center justify-center'>
                    <img src={logo} className='w-[20%]' />
                    <p className='text-[50px] font-semibold mt-10 -ml-4'>Connect</p>
                </div>

            </div>
            <div className='flex-[0.6] h-full rounded-2xl items-center flex flex-col justify-center'>
                <div className='flex flex-col items-center'>
                    <p className='text-[30px] font-semibold text-black'>Welcome back</p>
                    <p className='text-[12px] mt-2 text-black'>Connect, Create, Earn - Your Blockchain Social Hub</p>
                    <p className='text-[12px] mt-2 text-black'> Login or Sign up by connecting your wallet</p>



                    {connected && !userProfile?.status && <button className='py-2 px-4 my-4 rounded-md bg-blue-700' onClick={() => activateUser()}>
                        {activateAccountLoadingState ? "Activating" : "Activate Account"}

                    </button>
                    }

                    {!connected && <div className='my-3'>
                        <ConnectComponent></ConnectComponent></div>}


                </div>

            </div>

            <div>
            </div>
        </div>
    )
}

export default Login


