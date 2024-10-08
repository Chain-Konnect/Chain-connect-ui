import React, { useContext } from 'react'
import { add, bookmark, comment, fire, likes, nft } from '../assets'
import { AppContext } from '../ContextAPI'

const ProfilePage = () => {
    const myPost = [0, 1, 2, 4, 5, 6, 7, 9]
    const { modals, setModals, address, userProfile, claimRewards } = useContext(AppContext);
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
                            <img src={userProfile?.profileUrl ?? nft} className='w-full h-full bg-white rounded-full' />


                        </div>
                        <div className='space-x-2'>
                            <button className='bg-blue-600 py-2 px-2 text-white rounded-sm'>Change Avatar</button>
                            <button className='bg-orange-600 py-2 px-2 text-white rounded-sm'>Mint Avatar</button>
                            <div className='flex space-x-4 mt-2'>
                                <p>Followers : <span className='font-semibold'>{userProfile?.followersCount ?? 0}</span></p>
                                <p>Following : <span className='font-semibold'>{userProfile?.followingsCount ?? 0}</span></p>
                            </div>
                        </div>

                    </div>
                    <div className=''>

                        <div className='my-4'>
                            <p>Profile Name</p>
                            <input type="text" className='w-1/2 py-3 px-2 outline-none rounded-md' readOnly placeholder={userProfile?.profileName ?? "N/A"} />
                        </div>
                        <div className='my-4'>
                            <p>Amount Earned From Chain-Connect</p>
                            <input type="text" className='w-1/2 py-3 px-2 outline-none rounded-md' readOnly placeholder={userProfile?.earnedAmount ? (userProfile?.earnedAmount / 10 ** 6).toString() : "0"} />
                            <button className='bg-blue-600 p-3 text-[10px] block mt-2  text-white rounded-sm ' onClick={() => claimRewards(userProfile?.earnedAmount)}>Claim Rewards</button>

                        </div>
                        <div className='my-4'>
                            <p>Ignite Balance</p>
                            <input type="text" className='w-1/2 py-3 px-2 outline-none rounded-md' readOnly placeholder={userProfile?.igniteAmount ? (userProfile?.igniteAmount).toString() : "0"} />
                        </div>

                        <button className='bg-blue-600 py-2 px-2 text-white rounded-sm'>Update Profile</button>

                    </div>


                </div>
            </div>


        </div>
    )
}

export default ProfilePage
