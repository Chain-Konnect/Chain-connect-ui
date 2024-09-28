import React from 'react'
import { add, bookmark, comment, fire, likes, nft } from '../assets'

const ProfilePage = () => {
    const myPost = [0, 1, 2, 4, 5, 6, 7, 9]
    return (
        <div className="flex-[0.8] bg-gray-200 overflow-y-scroll p-4 font-poppins">
            <div className='flex justify-between'>
                <p>Profile</p>
                <div>

                </div>

            </div>
            <div>
                <div>
                    <div className='flex items-center space-x-4'>
                        <div className='rounded-full border   h-[150px] w-[150px] my-4'>
                            <img src={nft} className='w-full h-full bg-white rounded-full' />


                        </div>
                        <div className='space-x-2'>
                            <button className='bg-blue-600 py-2 px-2 text-white rounded-sm'>Change Avatar</button>
                            <button className='bg-orange-600 py-2 px-2 text-white rounded-sm'>Mint Avatar</button>
                            <div className='flex space-x-4 mt-2'>
                                <p>Followers : <span className='font-semibold'>4K</span></p>
                                <p>Following : <span className='font-semibold'>1K</span></p>
                            </div>
                        </div>
                       
                    </div>
                    <div className=''>
                        <div>
                            <p>Username</p>
                            <input type="text" className='w-1/2 py-3 px-2 outline-none rounded-md' readOnly placeholder='@Michael_12' />
                        </div>
                        <div className='my-4'>
                            <p>Profile Name</p>
                            <input type="text" className='w-1/2 py-3 px-2 outline-none rounded-md' readOnly placeholder='Michael Owen' />
                        </div>
                        <div className='my-4'>
                            <p>Amout Of Chain-Connect (CC) Token Earned</p>
                            <input type="text" className='w-1/2 py-3 px-2 outline-none rounded-md' readOnly placeholder='100,000' />
                        </div>
                        <div className='my-4'>
                            <p>About Me</p>
                            <textarea name="" id="" rows={5} className='w-1/2 outline-none rounded-md p-3'></textarea>
                        </div>
                        <button className='bg-blue-600 py-2 px-2 text-white rounded-sm'>Update Profile</button>

                    </div>


                </div>
            </div>


        </div>
    )
}

export default ProfilePage
