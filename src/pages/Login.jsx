import React, { useContext } from 'react'
import { logo } from '../assets'
import { AppContext } from '../ContextAPI';


const Login = () => {
    const { modals, setModals, userProfile, activateUser, activateAccountLoadingState, connectWallet } = useContext(AppContext);
 
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


                    {!window.tronWeb?.defaultAddress.base58 &&
                        <button onClick={() => connectWallet()} className='p-3 rounded-md bg-blue-600 mt-2 text-[10px]'>Connect Wallet</button>
                    }
                    {window.tronWeb?.defaultAddress.base58 && !userProfile?.status && <button className='py-2 px-4 my-4 rounded-md bg-blue-700' onClick={() => activateUser()}>
                        {activateAccountLoadingState ? "Activating" : "Activate Account"}

                    </button>
                    }

                </div>

            </div>

            <div>
            </div>
        </div>
    )
}

export default Login
