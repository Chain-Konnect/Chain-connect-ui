import React, { useContext } from 'react'
import { AppContext } from '../ContextAPI'


const IgniteAPostModal = () => {
    const { modals, setModals } = useContext(AppContext)
    return (
        <div className='fixed grid h-[100%] z-20 bg-modal-bg place-items-center w-full backdrop-blur-sm lg:px-0 px-4 top-0 font-poppins'>
            <div className='rounded-md  font-poppins bg-white p-4 w-2/5'>
                <div className='flex justify-between w-full'>
                    <p></p>
                    <p className='cursor-pointer bg-blue-600 p-2 rounded-full w-[30px] h-[30px] items-center flex justify-center text-white ' onClick={() => setModals({ ...modals, ignitePostModal: false })}>x</p>
                </div>
                <p className='font-semibold my-2 text-[12px]'>Ignite @Michael_12 Post</p>
                <p className='text-[12px] my-2'>Enter the amount of Chain-Connect Token you wish to send</p>
                <input type="number" name="" min={0} id="" className='w-full outline-none p-4  border border-black' placeholder='Enter amount here' />
                <div className='flex justify-end'>
                    <button className='bg-blue-600 rounded-md text-white px-4 py-2 my-4'>Send</button>
                </div>

            </div>

        </div>
    )
}

export default IgniteAPostModal
