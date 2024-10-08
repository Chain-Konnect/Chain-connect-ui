import React, { useState, useContext } from 'react'
import { ai, bookmark, chats, home, logout, nft, post, profile } from '../assets'
import { AppContext } from '../ContextAPI'
import { ConnectComponent } from '../contractServices/constants';

const SideBar = ({ currentNav, setCurrentNav }) => {
    const { modals, setModals, address, userProfile } = useContext(AppContext);




    return (
        <div className="flex-[0.2]  px-4 py-8 flex flex-col items-center">
            <div className='w-3/5 flex flex-col justify-center items-center'>
                <p className='font-semibold'>Chain-Connect</p>
                <div className='mx-auto rounded-full border   h-[100px] w-[100px] my-4'>
                    <img src={nft} className='w-full h-full rounded-full' />

                </div>
                <p className='text-[10px] italic'> <span className='font-semibold'>Username</span> : {userProfile?.profileName ?? 'N/A'}</p>
                <p className='text-[10px] italic'><span className='font-semibold'>Wallet :</span> {window.tronWeb?.defaultAddress.base58.substring(0, 4)}.......{window.tronWeb?.defaultAddress.base58.substr(-5)}</p>

            </div>
            <div className={`${currentNav == 0 ? 'bg-gray-400' : ''} my-2 flex  space-x-2 items-center cursor-pointer ml-2 hover:scale-x-95 hover:duration-300 hover:bg-gray-400 px-2 py-2 rounded-sm`} onClick={() => setCurrentNav(0)}>
                <img src={home} className='w-[5%]' />
                <p className=' tracking-widest'>Home</p>
            </div>
            <div className={`${currentNav == 1 ? 'bg-gray-400' : ''} my-2 flex  space-x-2 items-center cursor-pointer ml-2 hover:scale-x-95 hover:duration-300 hover:bg-gray-400 px-2 py-2 rounded-sm`} onClick={() => setCurrentNav(1)}>
                <img src={profile} className='w-[5%]' />
                <p className=' tracking-widest'>Profile</p>
            </div>
            <div className={`${currentNav == 2 ? 'bg-gray-400' : ''} my-2 flex  space-x-2 items-center cursor-pointer ml-2 hover:scale-x-95 hover:duration-300 hover:bg-gray-400 px-2 py-2 rounded-sm`} onClick={() => setCurrentNav(2)}>
                <img src={post} className='w-[5%]' />
                <p className=' tracking-widest'>Your Post</p>
            </div>
            <div className={`${currentNav == 3 ? 'bg-gray-400' : ''} my-2 flex  space-x-2 items-center cursor-pointer ml-2 hover:scale-x-95 hover:duration-300 hover:bg-gray-400 px-2 py-2 rounded-sm`} onClick={() => setCurrentNav(3)}>
                <img src={chats} className='w-[5%]' />
                <p className=' tracking-widest'>Chats</p>
            </div>
            <div className={` ${currentNav == 4 ? 'bg-gray-400' : ''} my-2 flex  space-x-2 items-center cursor-pointer ml-2 hover:scale-x-95 hover:duration-300 hover:bg-gray-400 px-2 py-2 rounded-sm`} onClick={() => setCurrentNav(4)}>
                <img src={ai} className='w-[5%]' />
                <p className=' tracking-widest'>Chat With AI</p>
            </div>
            <div className={`${currentNav == 5 ? 'bg-gray-400' : ''} my-2 flex  space-x-2 items-center cursor-pointer ml-2 hover:scale-x-95 hover:duration-300 hover:bg-gray-400 px-2 py-2 rounded-sm`} onClick={() => setCurrentNav(5)}>
                <p>Logout</p>
                <ConnectComponent></ConnectComponent>
            </div>




        </div>
    )
}

export default SideBar
