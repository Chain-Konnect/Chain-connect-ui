import React from 'react'

const ProfileModal = ({ setshowProfileModal }) => {
    return (
        <div className='absolute bg-white rounded-lg min-h-[200px] min-w-[400px] z-50 ml-20 border cursor-pointer p-3 font-poppins shadow-md' onMouseLeave={() => setshowProfileModal(false)}>
            <p className='italic'>Profile Details</p>
            <div className='flex flex-col items-center mt-5'>
                <p>Address : Michael</p>
                <p>Username : Michael</p>
                <div className='flex space-x-2'>
                    <p>Followers : 1</p>
                    <p>Following : 1</p>

                </div>
                <div className='flex space-x-2'>
                    <button className='bg-orange-600 p-3 rounded-sm text-white text-[12px] w-3/2'>Follow</button>
                </div>
            </div>

        </div>
    )
}

export default ProfileModal
