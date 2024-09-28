import React from 'react'
import { add, bookmark, comment, fire, likes, nft } from '../assets'


const ChatWithAI = () => {
    const myPost = [0, 1, 2, 4, 5, 6, 7, 9]
    return (
        <div className="flex-[0.8] bg-gray-200  p-4 font-poppins h-screen">
            <div className='flex justify-between'>
                <p>Chat with CC OpenAI</p>
                <div>

                </div>

            </div>
            <div className='flex flex-col justify-between h-full'>
                <div className='bg-red-500 overflow-y-scroll max-h-[300px]'>

                </div>
                <div className='my-4 w-full bg-white rounded-md px-3 flex justify-between items-center'>
                    <input type="text" name="" className='h-[70px] w-4/5 outline-none p-4 bg-none' id="" placeholder='Type here .................' />
                    <button className='bg-blue-600 h-[40px] px-4 text-white rounded-lg'>Send</button>
                </div>

            </div>


        </div>
    )
}

export default ChatWithAI
